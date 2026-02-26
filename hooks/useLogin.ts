import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "@/lib/endpoints";
import { LoginInputs, LoginResponse } from "@/types/Form";
import axios from "axios";

const loginUser = async (credentials: LoginInputs): Promise<LoginResponse> => {
  try {
    const response = await axios.post(ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data: any = error.response?.data;
      const message =
        data?.error?.message || data?.message || "Login failed";

      throw new Error(message);
    }
    throw new Error("An unexpected error occurred");
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginInputs>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};

