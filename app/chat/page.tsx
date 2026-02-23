"use client"

import React, { FormEvent, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Send, Trash2, Clock, Maximize2, Minimize2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Message, ChatHistoryItem } from "@/types/chat"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      role: "bot",
      text: "Hi! I'm your coding buddy — share code or describe a problem and I'll suggest fixes or improvements.",
    },
  ])
  const [input, setInput] = useState<string>("")
  const [history, setHistory] = useState<ChatHistoryItem[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // autoscroll to bottom when messages update
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  function sendMessage(text: string): void {
    if (!text.trim()) return
    const userMsg: Message = { id: String(Date.now()), role: "user", text }
    setMessages((m) => [...m, userMsg])
    setInput("")

    // simulate bot response (replace with real API call later)
    setTimeout(() => {
      const botReply: Message = {
        id: "b-" + Date.now(),
        role: "bot",
        text:
          text.toLowerCase().includes("bug") || text.includes("function")
            ? "I looked at your code — here's a suggested fix:\n\nfunction example() {\n  // fixed logic here\n}\n\nTry this and tell me if it helps."
            : "Nice idea — here are some suggestions to improve it:\n- Break the task into smaller functions\n- Add input validation\n- Add unit tests\n",
        isCode: text.toLowerCase().includes("function") || text.includes("const ") || text.includes("=>"),
      }
      setMessages((m) => [...m, botReply])
    }, 900)
  }

  function newChat(): void {
    if (messages.length > 0) {
      // save previous to history
      const title = messages.find((x) => x.role === "user")?.text.slice(0, 40) || "Chat"
      setHistory((h) => [{ id: String(Date.now()), title, messages }, ...h])
    }
    setMessages([
      { id: "m1", role: "bot", text: "Hi! I'm your coding buddy — share code or describe a problem and I'll suggest fixes or improvements." },
    ])
    setSelected(null)
  }

  function openHistory(id: string): void {
    const item = history.find((h) => h.id === id)
    if (!item) return
    setMessages(item.messages)
    setSelected(id)
  }

  function clearHistory(): void {
    setHistory([])
  }

  return (
    <div className="h-screen w-screen bg-background text-foreground">
      <div className="w-full h-full px-4 py-4">
        <div className="flex gap-6 h-full">
          {/* Sidebar */}
          <aside className={`${showSidebar ? "w-80" : "w-0"} hidden md:block transition-all duration-200 overflow-hidden`}> 
            <div className="flex flex-col gap-4">
              <Button onClick={newChat} className="w-full flex items-center gap-2 justify-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#7c3aed] dark:to-[#8b5cf6] text-white border-0 shadow-md hover:shadow-lg transition-all">
                <Plus className="h-4 w-4" /> New Chat
              </Button>

              <Card className="p-0 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">History</h4>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear history" className="text-muted-foreground dark:text-[#cfe6ff]">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {history.length === 0 ? (
                      <p className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> No previous chats</p>
                    ) : (
                      history.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => openHistory(h.id)}
                          className={`text-left p-2 rounded-md hover:bg-accent/10 dark:hover:bg-accent/20 w-full flex items-center gap-2 ${selected === h.id ? "ring-2 ring-accent/60 bg-accent/5 dark:bg-accent/20" : ""}`}
                        >
                          <div className="truncate text-sm text-muted-foreground dark:text-[#cfe6ff]">{h.title}</div>
                        </button>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Chat area */}
          <main className="flex-1 flex flex-col h-full">
            <div className="flex-1 overflow-hidden rounded-lg border border-border bg-card p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">Coding Buddy</h3>
                  <span className="text-sm text-muted-foreground hidden sm:inline">Ask about bugs, paste code, or request improvements.</span>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button variant="outline" size="icon" onClick={() => setShowSidebar((s) => !s)}>
                      {showSidebar ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto mb-4" ref={listRef}>
                <div className="flex flex-col gap-4">
                  {messages.map((m) => (
                   <div key={m.id} className={`max-w-[80%] ${m.role === "user" ? "ml-auto text-right" : "mr-auto text-left"}`}>
                      {m.role === "user" ? (
                        <div
                          className="text-white inline-block rounded-3xl px-6 py-4 text-base font-medium leading-snug shadow-md whitespace-pre-wrap bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#7c3aed] dark:to-[#8b5cf6]"
                        >
                          {m.isCode ? (
                            <pre className="bg-transparent text-sm overflow-auto rounded font-mono"><code>{m.text}</code></pre>
                          ) : (
                            <div>{m.text}</div>
                          )}
                        </div>
                      ) : (
                        <div className="inline-block rounded-2xl px-5 py-4 text-base leading-snug shadow-sm whitespace-pre-wrap bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
                          {m.isCode ? (
                            <pre className="rounded-md p-3 font-mono text-sm overflow-auto bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100"><code>{m.text}</code></pre>
                          ) : (
                            <div>{m.text}</div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <form
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    sendMessage(input)
                  }}
                  className="flex items-center gap-3"
                >
                  <Input
                
                    value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                    placeholder="Describe a bug, paste code, or ask for suggestions..."
                    className="flex-1 rounded-xl py-4 h-12" style={{ fontSize: "1rem" }}
                  />
                  <Button type="submit" className=" w-12 h-12 flex items-center gap-2 px-5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#7c3aed] dark:to-[#8b5cf6] text-white border-0 shadow-2xl">
                     <Send className="h-5 w-5 size-5" />
                  </Button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}