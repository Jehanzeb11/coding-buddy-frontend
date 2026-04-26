const api_url = process.env.NEXT_PUBLIC_API_URL;

if (!api_url) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined. Please check your .env file.");
}

export const BASE_URL = api_url;

export const ENDPOINTS = {
  LOGIN: `login`,
  REGISTER: `register`,
  USER: `user`,

  // Chat endpoints
  CREATE_CHAT: `chat/create-chat`,
  GET_CHATS: `chat/get-chats`,
  GET_CHAT: (id: string) => `chat/get-chat/${id}`,
  DELETE_CHAT: (id: string) => `chat/delete-chat/${id}`,
  DELETE_ALL_CHATS: `chat/delete-all-users-chat`,

  // Message endpoints
  SEND_MESSAGE: (chatId: string) => `message/send-message/${chatId}`,
  GET_MESSAGES: (chatId: string) => `message/get-messages/${chatId}`,
  DELETE_MESSAGE: (id: string) => `message/delete-message/${id}`,
  DELETE_ALL_MESSAGES: (chatId: string) => `message/delete-all-messages/${chatId}`,
}