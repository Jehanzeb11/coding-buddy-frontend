const api_url = process.env.NEXT_PUBLIC_API_URL;

if (!api_url) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined. Please check your .env file.");
}

export const BASE_URL = api_url;

export const ENDPOINTS = {
  LOGIN: `/api/login`,
  REGISTER: `/api/register`,
  USER: `/api/user`,

  // Chat endpoints
  CREATE_CHAT: `/api/chat/create-chat`,
  GET_CHATS: `/api/chat/get-chats`,
  GET_CHAT: (id: string) => `/api/chat/get-chat/${id}`,
  DELETE_CHAT: (id: string) => `/api/chat/delete-chat/${id}`,
  DELETE_ALL_CHATS: `/api/chat/delete-all-users-chat`,

  // Message endpoints
  SEND_MESSAGE: (chatId: string) => `/api/message/send-message/${chatId}`,
  GET_MESSAGES: (chatId: string) => `/api/message/get-messages/${chatId}`,
  DELETE_MESSAGE: (id: string) => `/api/message/delete-message/${id}`,
  DELETE_ALL_MESSAGES: (chatId: string) => `/api/message/delete-all-messages/${chatId}`,
}