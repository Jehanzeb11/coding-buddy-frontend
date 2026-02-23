"use client"
import React, { FormEvent, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Maximize2, Minimize2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useChatStore } from "@/store/store"

const ChatArea = () => {
    const {
        messages,
        input,
        setInput,
        sendMessage,
        showSidebar,
        setShowSidebar
    } = useChatStore();

    const listRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        // autoscroll to bottom when messages update
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight
        }
    }, [messages])

    return (
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
    )
}

export default ChatArea
