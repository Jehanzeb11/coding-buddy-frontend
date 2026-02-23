"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, Clock } from "lucide-react"
import { Button } from "../ui/button"
import { useChatStore } from "@/store/store"

const Sidebar = () => {
    const {
        history,
        selectedId,
        showSidebar,
        newChat,
        openHistory,
        clearHistory
    } = useChatStore();

    return (
        <aside className={`${showSidebar ? "w-80" : "w-0"} hidden md:block transition-all duration-200 overflow-hidden shrink-0`}>
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
                                        className={`text-left p-2 rounded-md hover:bg-accent/10 dark:hover:bg-accent/20 w-full flex items-center gap-2 ${selectedId === h.id ? "ring-2 ring-accent/60 bg-accent/5 dark:bg-accent/20" : ""}`}
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
    )
}

export default Sidebar
