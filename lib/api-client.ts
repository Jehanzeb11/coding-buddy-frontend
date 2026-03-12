import axios from "axios";
import { toast } from "sonner";

// Create a configured axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
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
