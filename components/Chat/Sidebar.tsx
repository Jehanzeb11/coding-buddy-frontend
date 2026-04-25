"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Clock, Settings, User, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useChatStore } from "@/store/store"
import LogoutButton from "../layout/LogoutButton"
import { useState, useEffect } from "react"

const Sidebar = () => {
    const [showSettings, setShowSettings] = useState(false);
    const {
        history,
        selectedId,
        showSidebar,
        newChat,
        openHistory,
        clearHistory,
        loadChats,
        isLoading,
        error,
        deleteChat
    } = useChatStore();

    useEffect(() => {
        // Load chats when component mounts
        loadChats();
    }, [loadChats]);

    return (
        <aside className={`${showSidebar ? "w-80" : "w-0"} hidden md:block transition-all duration-200 overflow-hidden shrink-0 h-[calc(100vh-2rem)]`}>
            <div className="flex flex-col gap-4 h-full">
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                    <Button 
                        onClick={newChat} 
                        disabled={isLoading}
                        className="w-full flex items-center gap-2 justify-center bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl hover:shadow-indigo-500/25 dark:shadow-violet-500/20 dark:hover:shadow-violet-500/40 active:scale-95 transition-all py-6 rounded-2xl font-medium text-base ring-1 ring-white/20 border-0 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />} 
                        {isLoading ? "Creating..." : "New Chat"}
                    </Button>

                    <Card className="p-0 overflow-hidden bg-white/60 dark:bg-[#0f172a]/60 backdrop-blur-2xl border-neutral-200/50 dark:border-white/10 shadow-xl ring-1 ring-black/5 dark:ring-white/5 rounded-2xl">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-indigo-500" />
                                    History
                                </h4>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={clearHistory} 
                                    disabled={isLoading}
                                    title="Clear history" 
                                    className="text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                </Button>
                            </div>

                            {/* Error Display */}
                            {error && (
                                <div className="text-xs text-red-500 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                {isLoading && history.length === 0 ? (
                                    <div className="flex items-center justify-center py-4">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground ml-2">Loading chats...</span>
                                    </div>
                                ) : history.length === 0 ? (
                                    <p className="text-xs text-muted-foreground py-4 text-center italic">No previous chats</p>
                                ) : (
                                    history.map((h) => (
                                        <div
                                            key={h.id}
                                            className={`group flex items-center gap-1 ${selectedId === h.id ? "bg-indigo-50/80 text-indigo-700 ring-1 ring-inset ring-indigo-600/20 dark:bg-violet-500/10 dark:text-violet-300 dark:ring-violet-500/30 backdrop-blur-md font-medium rounded-xl" : "text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-white/5 hover:text-foreground rounded-xl"}`}
                                        >
                                            <button
                                                onClick={() => openHistory(h.id)}
                                                className="text-left p-3 rounded-xl transition-all text-sm flex-1 flex items-center gap-2"
                                            >
                                                <div className="truncate">{h.title}</div>
                                            </button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteChat(h.id);
                                                }}
                                                disabled={isLoading}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6 hover:text-red-500"
                                                title="Delete chat"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Section - Settings & Account */}
                <div className="relative pt-4 border-t border-neutral-200 dark:border-neutral-800 p-2">
                    {showSettings && (
                        <div className="absolute bottom-full left-2 right-2 mb-2 p-2 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-neutral-200/50 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5 animate-in slide-in-from-bottom-2 fade-in duration-200 z-50">
                            <div className="flex flex-col gap-1">
                                <Button variant="ghost" size="sm" className="justify-start text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400">
                                    <User className="h-4 w-4 mr-2" />
                                    Account Settings
                                </Button>
                                <div className="h-px bg-neutral-100 dark:bg-neutral-800 my-1" />
                                <LogoutButton />
                            </div>
                        </div>
                    )}
                    
                    <Button 
                        variant="ghost" 
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-full justify-start gap-3 p-4 rounded-2xl transition-all h-auto ${showSettings ? "bg-neutral-100/80 dark:bg-white/10 text-foreground shadow-sm" : "text-muted-foreground hover:bg-neutral-100/50 dark:hover:bg-white/5 hover:text-foreground"}`}
                    >
                        <Settings className={`h-5 w-5 transition-transform duration-500 ${showSettings ? "rotate-90" : ""}`} />
                        <span className="font-medium">Settings</span>
                    </Button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
