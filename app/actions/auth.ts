"use server";

import { ENDPOINTS } from "@/lib/endpoints";
import { LoginInputs, LoginResponse } from "@/types/Form";
import axios from "axios";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(credentials: LoginInputs) {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, credentials);

    // Some APIs return token, some return accessToken, some return it inside a 'user' object
    const token = response.data.token || response.data.accessToken || response.data.data?.token;

    if (!token) {
      console.error("Token not found in response. Received data keys:", Object.keys(response.data));
      return {
        success: false,
        message: "Authentication failed: Token not found in server response. Please check API structure."
      };
    }

    // Set a secure, HttpOnly cookie on the server
    try {
      await createSession(token);
    } catch (sessionError: any) {
      console.error("Failed to create session:", sessionError);
      return { success: false, message: `Session error: ${sessionError.message}` };
    }

    return { success: true, message: response.data.message || "Welcome back!" };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Login Axios Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });

      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || error.message || "Login request failed"
      };
    }

    console.error("Login Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected network or server error occurred"
    };
  }
}

export async function registerAction(credentials: any) {
  try {
    const response = await axios.post(ENDPOINTS.REGISTER, credentials);
    return { success: true, message: response.data.message || "Registration successful!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || "Registration failed"
      };
    }
    return { success: false, message: "An unexpected error occurred" };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
