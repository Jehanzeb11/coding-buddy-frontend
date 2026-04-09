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
            <div className="flex-1 overflow-hidden rounded-2xl border border-neutral-200/50 dark:border-white/10 bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-2xl shadow-2xl p-4 flex flex-col h-full ring-1 ring-black/5 dark:ring-white/5">
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
                    <div className="flex flex-col gap-4 p-1">
                        {messages.map((m) => (
                            <div key={m.id} className={`max-w-[80%] ${m.role === "user" ? "ml-auto text-right" : "mr-auto text-left"}`}>
                                {m.role === "user" ? (
                                    <div
                                        className="inline-block rounded-2xl rounded-br-sm px-5 py-3 text-[15px] leading-snug whitespace-pre-wrap bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 dark:shadow-violet-500/30 ring-1 ring-white/20"
                                    >
                                        {m.isCode ? (
                                            <pre className="bg-black/20 backdrop-blur-md text-[13px] overflow-auto rounded-xl p-3 font-mono border border-white/10 mt-1"><code>{m.text}</code></pre>
                                        ) : (
                                            <div>{m.text}</div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="inline-block rounded-2xl rounded-bl-sm px-5 py-3 text-[15px] leading-snug shadow-sm whitespace-pre-wrap bg-white/95 dark:bg-[#1e293b]/90 backdrop-blur-xl border border-neutral-200/50 dark:border-white/10 text-gray-900 dark:text-gray-100 ring-1 ring-black/5 dark:ring-white/5">
                                        {m.isCode ? (
                                            <pre className="rounded-xl p-3 font-mono text-[13px] overflow-auto bg-gray-50 text-gray-900 dark:bg-[#0f172a] dark:text-gray-100 border border-neutral-200 dark:border-white/10 mt-1 shadow-inner"><code>{m.text}</code></pre>
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
                            className="flex-1 rounded-xl py-4 h-14 bg-white/80 dark:bg-black/20 dark:backdrop-blur-md border border-neutral-200 dark:border-white/10 focus-visible:ring-indigo-500/50 dark:focus-visible:ring-purple-500/50 transition-all text-base shadow-sm"
                        />
                        <Button type="submit" className="w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl hover:shadow-indigo-500/25 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/40 active:scale-95 transition-all outline-none border-0 group">
                            <Send className="h-6 w-6" />
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default ChatArea
