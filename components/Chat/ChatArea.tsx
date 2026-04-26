"use client"
import React, { FormEvent, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Maximize2, Minimize2, Loader2, Bot, FileSearch, Bug, BookOpen } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useChatStore } from "@/store/store"
import MessageContent from "@/components/Message/Message"
import TypingIndicator from "@/components/Message/TypingIndicator"
import ChatSkeleton from "@/components/Chat/ChatSkeleton"

const ChatArea = () => {
    const {
        messages,
        input,
        setInput,
        sendMessage,
        showSidebar,
        setShowSidebar,
        isLoading,
        error,
        selectedId,
        selectedPersona,
        setSelectedPersona
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

                <div className="flex-1 overflow-auto mb-4 scroll-hide" ref={listRef}>
                    {/* Error Display */}
                    {error && (
                        <div className="text-sm text-red-500 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 mb-4">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-4 p-1">
                        {isLoading && messages.length === 0 ? (
                            <ChatSkeleton />
                        ) : messages.length === 0 ? (
                            !selectedId ? (
                                <div className="flex flex-col items-center justify-center py-12 gap-6 animate-in fade-in duration-500">
                                    <div className="text-center space-y-2">
                                        <h2 className="text-2xl font-bold">Select a Persona</h2>
                                        <p className="text-muted-foreground">Who would you like to chat with today?</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 max-w-lg w-full">
                                        {[
                                            { id: 'assistant', title: 'Assistant', icon: Bot, desc: 'General coding help' },
                                            { id: 'reviewer', title: 'Reviewer', icon: FileSearch, desc: 'Code review & best practices' },
                                            { id: 'debugger', title: 'Debugger', icon: Bug, desc: 'Find and fix bugs' },
                                            { id: 'explainer', title: 'Explainer', icon: BookOpen, desc: 'Explain code simply' }
                                        ].map((p) => (
                                            <Button
                                                key={p.id}
                                                variant={selectedPersona === p.id ? "default" : "outline"}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedPersona(p.id);
                                                }}
                                                className={`h-auto flex-col items-center justify-center p-6 gap-3 transition-all ${selectedPersona === p.id ? 'bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 border-transparent hover:from-indigo-500 hover:to-violet-500' : 'hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20'}`}
                                            >
                                                <p.icon className={`h-8 w-8 ${selectedPersona === p.id ? '' : 'text-indigo-500 dark:text-indigo-400'}`} />
                                                <div className="space-y-1 text-center">
                                                    <div className="font-semibold">{p.title}</div>
                                                    <div className={`text-xs ${selectedPersona === p.id ? 'text-indigo-100' : 'text-muted-foreground'}`}>{p.desc}</div>
                                                </div>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-muted-foreground text-sm">
                                        No messages in this chat yet. Start a conversation!
                                    </div>
                                </div>
                            )
                        ) : (
                            <>
                                {messages.map((m) => (
                                    <div key={m.id} className={`max-w-[80%] ${m.role === "user" ? "ml-auto text-right" : "mr-auto text-left"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                        {m.role === "user" ? (
                                            <div
                                                className="inline-block rounded-2xl rounded-br-sm px-5 py-3 text-[15px] leading-snug bg-linear-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 dark:shadow-violet-500/30 ring-1 ring-white/20"
                                            >
                                                <MessageContent text={m.text} isCode={m.isCode} isUser={true} />
                                            </div>
                                        ) : (
                                            <div className="inline-block rounded-2xl rounded-bl-sm px-5 py-3 text-[15px] leading-snug shadow-sm bg-white/95 dark:bg-[#1e293b]/90 backdrop-blur-xl border border-neutral-200/50 dark:border-white/10 text-gray-900 dark:text-gray-100 ring-1 ring-black/5 dark:ring-white/5">
                                                <MessageContent text={m.text} isCode={m.isCode} isUser={false} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && messages[messages.length - 1]?.role === "user" && (
                                    <TypingIndicator />
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-auto">
                    <form
                        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                            e.preventDefault()
                            await sendMessage(input)
                        }}
                        className="flex items-center gap-3"
                    >
                        <Input
                            value={input}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                            placeholder="Describe a bug, paste code, or ask for suggestions..."
                            disabled={isLoading}
                            className="flex-1 rounded-xl py-4 h-14 bg-white/80 dark:bg-black/20 dark:backdrop-blur-md border border-neutral-200 dark:border-white/10 focus-visible:ring-indigo-500/50 dark:focus-visible:ring-purple-500/50 transition-all text-base shadow-sm disabled:opacity-50"
                        />
                        <Button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl hover:shadow-indigo-500/25 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/40 active:scale-95 transition-all outline-none border-0 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Send className="h-6 w-6" />}
                        </Button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default ChatArea
