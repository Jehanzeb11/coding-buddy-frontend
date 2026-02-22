export type Message = {
  id: string
  role: "user" | "bot"
  text: string
  isCode?: boolean
}

export type ChatHistoryItem = {
  id: string
  title: string
  messages: Message[]
}

export type ChatState = {
  messages: Message[]
  history: ChatHistoryItem[]
}
