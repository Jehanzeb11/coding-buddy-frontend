const api_url = process.env.NEXT_PUBLIC_API_URL;

if (!api_url) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined. Please check your .env file.");
}

export const BASE_URL = api_url;

export const ENDPOINTS = {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    USER: `${BASE_URL}/user`,
}