"use server";

import { ENDPOINTS } from "@/lib/endpoints";
import { LoginInputs, LoginResponse } from "@/types/Form";
import api from "@/lib/api-client";
import axios from "axios";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function loginAction(credentials: LoginInputs) {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, credentials);

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
      console.error("Auth Axios Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 500) {
        return {
          success: false,
          message: "Internal Server Error (500). Our servers are having trouble, please try again later."
        };
      }

      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || error.message || "Request failed"
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
    const response = await api.post(ENDPOINTS.REGISTER, credentials);
    return { success: true, message: response.data.message || "Registration successful!" };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Register Axios Error:", error.response?.status, error.response?.data);

      if (error.response?.status === 500) {
        return {
          success: false,
          message: "Internal Server Error (500). Please try again later."
        };
      }

      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || "Registration failed"
      };
    }
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}

export async function getUserAction() {
  try {
    const response = await api.get(ENDPOINTS.USER);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Get User Axios Error:", error.response?.status, error.response?.data);

      if (error.response?.status === 500) {
        return {
          success: false,
          message: "Internal Server Error (500). Please try again later."
        };
      }

      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || "Get user failed"
      };
    }
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}

export async function updateUserAction(user: any) {
  try {
    const response = await api.patch(ENDPOINTS.USER, user);
    return { success: true, message: response.data.message || "Update successful!" };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Update Axios Error:", error.response?.status, error.response?.data);

      if (error.response?.status === 500) {
        return {
          success: false,
          message: "Internal Server Error (500). Please try again later."
        };
      }

      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || "Update failed"
      };
    }
    return { success: false, message: error.message || "An unexpected error occurred" };
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
