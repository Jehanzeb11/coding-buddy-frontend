"use server";

import { ENDPOINTS } from "@/lib/endpoints";
import { 
  SendMessageRequest,
  SendMessageResponse, 
  GetMessagesResponse, 
  DeleteMessageResponse,
  DeleteAllMessagesResponse,
  MessageError 
} from "@/types/chat";
import api from "@/lib/api-client";
import axios from "axios";
import { getSession } from "@/lib/session";

export async function sendMessageAction(chatId: string, messageData: SendMessageRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.post(ENDPOINTS.SEND_MESSAGE(chatId), {
      message: messageData.content,
      content: messageData.content, // Fallback
      isCode: messageData.isCode
    });

    const msgData = response.data.messageObj || response.data.data || response.data;

    return { 
      success: true, 
      data: {
        ...msgData,
        id: msgData.id || msgData._id,
        role: msgData.role === "bot" ? "ai" : (msgData.role || "ai"),
        text: msgData.text || msgData.content || ""
      },
      message: response.data.message || "Message sent successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Send Message Axios Error:", {
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
        message: data?.error?.message || data?.message || error.message || "Failed to send message"
      };
    }

    console.error("Send Message Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while sending message"
    };
  }
}

export async function getMessagesAction(chatId: string) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.get(ENDPOINTS.GET_MESSAGES(chatId));

    const msgs = response.data.messages || response.data.data || (Array.isArray(response.data) ? response.data : []);
    const normalizedMsgs = Array.isArray(msgs) ? msgs.map((m: any) => ({
      ...m,
      id: m.id || m._id,
      role: m.role === "bot" ? "ai" : (m.role || "ai"),
      text: m.text || m.content || ""
    })) : [];

    return { 
      success: true, 
      data: normalizedMsgs,
      message: response.data.message || "Messages retrieved successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Get Messages Axios Error:", {
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
        message: data?.error?.message || data?.message || error.message || "Failed to retrieve messages"
      };
    }

    console.error("Get Messages Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while retrieving messages"
    };
  }
}

export async function deleteMessageAction(id: string) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.delete(ENDPOINTS.DELETE_MESSAGE(id));

    return { 
      success: true, 
      message: response.data.message || "Message deleted successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Delete Message Axios Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 404) {
        return {
          success: false,
          message: "Message not found."
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
        message: data?.error?.message || data?.message || error.message || "Failed to delete message"
      };
    }

    console.error("Delete Message Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while deleting message"
    };
  }
}

export async function deleteAllMessagesAction(chatId: string) {
  try {
    const session = await getSession();
    if (!session) {
      return {
        success: false,
        message: "Authentication required. Please login again."
      };
    }

    const response = await api.delete(ENDPOINTS.DELETE_ALL_MESSAGES(chatId));

    return { 
      success: true, 
      message: response.data.message || "All messages deleted successfully!" 
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Delete All Messages Axios Error:", {
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
        message: data?.error?.message || data?.message || error.message || "Failed to delete all messages"
      };
    }

    console.error("Delete All Messages Non-Axios Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred while deleting all messages"
    };
  }
}
