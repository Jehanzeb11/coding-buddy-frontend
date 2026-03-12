"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Clock, Settings, User } from "lucide-react"
import { Button } from "../ui/button"
import { useChatStore } from "@/store/store"
import LogoutButton from "../layout/LogoutButton"
import { useState } from "react"

const Sidebar = () => {
    const [showSettings, setShowSettings] = useState(false);
    const {
        history,
        selectedId,
        showSidebar,
        newChat,
        openHistory,
        clearHistory
    } = useChatStore();

    return (
        <aside className={`${showSidebar ? "w-80" : "w-0"} hidden md:block transition-all duration-200 overflow-hidden shrink-0 h-[calc(100vh-2rem)]`}>
            <div className="flex flex-col gap-4 h-full">
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                    <Button onClick={newChat} className="w-full flex items-center gap-2 justify-center bg-linear-to-r from-indigo-600 to-purple-600 dark:from-[#7c3aed] dark:to-[#8b5cf6] text-white border-0 shadow-md hover:shadow-lg transition-all">
                        <Plus className="h-4 w-4" /> New Chat
                    </Button>

                    <Card className="p-0 overflow-hidden bg-background/50 border-neutral-200 dark:border-neutral-800">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3 border-b border-neutral-100 dark:border-neutral-800 pb-2">
                                <h4 className="font-semibold text-foreground flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-indigo-500" />
                                    History
                                </h4>
                                <Button variant="ghost" size="icon" onClick={clearHistory} title="Clear history" className="text-muted-foreground hover:text-red-500 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="flex flex-col gap-1">
                                {history.length === 0 ? (
                                    <p className="text-xs text-muted-foreground py-4 text-center italic">No previous chats</p>
                                ) : (
                                    history.map((h) => (
                                        <button
                                            key={h.id}
                                            onClick={() => openHistory(h.id)}
                                            className={`text-left p-2 rounded-lg transition-all text-sm w-full flex items-center gap-2 ${selectedId === h.id ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium" : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-foreground"}`}
                                        >
                                            <div className="truncate">{h.title}</div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Section - Settings & Account */}
                <div className="relative pt-4 border-t border-neutral-200 dark:border-neutral-800 p-2">
                    {showSettings && (
                        <div className="absolute bottom-full left-2 right-2 mb-2 p-2 bg-white dark:bg-[#0f172a] rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-bottom-2 fade-in duration-200 z-50">
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
                        className={`w-full justify-start gap-3 p-3 rounded-xl transition-all ${showSettings ? "bg-neutral-100 dark:bg-neutral-800 text-foreground" : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-foreground"}`}
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
