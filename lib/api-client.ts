import axios from "axios";
import { toast } from "sonner";

// Create a configured axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// Request interceptor to attach auth token
api.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    // We are on the server (Server Actions, SSR, etc.)
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const token = cookieStore.get('session')?.value;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error attaching token to request:", error);
    }
  }
  return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if it's a 500 error
    if (error.response?.status === 500) {
      if (typeof window !== 'undefined') {
        toast.error("Internal Server Error (500). Please try again later.");
      }
    }

    // Check for network errors/timeouts
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      if (typeof window !== 'undefined') {
        toast.error("Network timeout or connection error. Please check your internet.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
