"use server";

import { ENDPOINTS } from "@/lib/endpoints";
import { 
  CreateChatResponse, 
  GetChatsResponse, 
  GetChatResponse, 
  DeleteChatResponse,
  CreateChatRequest,
  ChatError 
} from "@/types/chat";
import api from "@/lib/api-client";
import axios from "axios";
import { getSession } from "@/lib/session";

export async function createChatAction(title?: string, persona?: string) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const requestBody: CreateChatRequest = {
      title: title || "New Chat",
      persona
    };

    const response = await api.post(ENDPOINTS.CREATE_CHAT, requestBody);
    
    const chatData = response.data.chat || response.data.data || response.data;

    return { 
      success: true, 
      data: {
        ...chatData,
        id: chatData.id || chatData._id
      },
      message: response.data.message || "Chat created successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Create Chat Axios Error:", {
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
        message: data?.error?.message || data?.message || error.message || "Failed to create chat"
      };
    }

    console.error("Create Chat Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while creating chat"
    };
  }
}

export async function getChatsAction() {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.get(ENDPOINTS.GET_CHATS);

    const chats = response.data.chats || response.data.data || (Array.isArray(response.data) ? response.data : []);
    const normalizedChats = Array.isArray(chats) ? chats.map((c: any) => ({
      ...c,
      id: c.id || c._id
    })) : [];

    return { 
      success: true, 
      data: normalizedChats,
      message: response.data.message || "Chats retrieved successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Get Chats Axios Error:", {
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
        message: data?.error?.message || data?.message || error.message || "Failed to retrieve chats"
      };
    }

    console.error("Get Chats Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while retrieving chats"
    };
  }
}

export async function getChatAction(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.get(ENDPOINTS.GET_CHAT(id));

    const chatData = response.data.chat || response.data.data || response.data;

    return { 
      success: true, 
      data: {
        ...chatData,
        id: chatData.id || chatData._id
      },
      message: response.data.message || "Chat retrieved successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Get Chat Axios Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 404) {
        return {
          success: false,
          message: "Chat not found."
        };
      }

      if (error.response?.status === 500) {
        return {
          success: false,
          message: "Internal Server Error (500). Our servers are having trouble, please try again later."
        };
      }

      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || error.message || "Failed to retrieve chat"
      };
    }

    console.error("Get Chat Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while retrieving chat"
    };
  }
}

export async function deleteChatAction(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.delete(ENDPOINTS.DELETE_CHAT(id));

    return { 
      success: true, 
      message: response.data.message || "Chat deleted successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Delete Chat Axios Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 404) {
        return {
          success: false,
          message: "Chat not found."
        };
      }

      if (error.response?.status === 500) {
        return {
          success: false,
          message: "Internal Server Error (500). Our servers are having trouble, please try again later."
        };
      }

      const data: any = error.response?.data;
      return {
        success: false,
        message: data?.error?.message || data?.message || error.message || "Failed to delete chat"
      };
    }

    console.error("Delete Chat Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while deleting chat"
    };
  }
}

export async function deleteAllChatsAction() {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.delete(ENDPOINTS.DELETE_ALL_CHATS);

    return { 
      success: true, 
      message: response.data.message || "All chats deleted successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Delete All Chats Axios Error:", {
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
        message: data?.error?.message || data?.message || error.message || "Failed to delete all chats"
      };
    }

    console.error("Delete All Chats Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while deleting all chats"
    };
  }
}
