export type Message = {
  id: string
  role: "user" | "ai"
  text: string
  isCode?: boolean
  chatId?: string
  createdAt?: string
  updatedAt?: string
}

export type ChatHistoryItem = {
  id: string
  title: string
  messages: Message[]
  createdAt?: string
  updatedAt?: string
}

export type ChatState = {
  messages: Message[]
  history: ChatHistoryItem[]
}

// API Response Types
export type CreateChatResponse = {
  data: {
    id: string
    title: string
    createdAt: string
    updatedAt: string
  }
  message: string
}

export type GetChatsResponse = {
  data: ChatHistoryItem[]
  message: string
}

export type GetChatResponse = {
  data: ChatHistoryItem
  message: string
}

export type DeleteChatResponse = {
  message: string
}

export type SendMessageRequest = {
  message?: string
  content: string
  isCode?: boolean
}

export type CreateChatRequest = {
  title: string
  message?: string
  prompt?: string
  persona?: string
}

export type SendMessageResponse = {
  data: Message
  message: string
}

export type GetMessagesResponse = {
  data: Message[]
  message: string
}

export type DeleteMessageResponse = {
  message: string
}

export type DeleteAllMessagesResponse = {
  message: string
}

// Error Types
export type ChatError = {
  message: string
  field?: string
}

export type MessageError = {
  message: string
  field?: string
}
