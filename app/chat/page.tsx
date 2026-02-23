import ChatArea from "@/components/Chat/ChatArea";
import Sidebar from "@/components/Chat/Sidebar";

export default function ChatPage() {
  return (
    <div className="h-screen w-screen bg-background text-foreground">
      <div className="w-full h-full px-4 py-4">
        <div className="flex gap-6 h-full">
          {/* Sidebar */}
          <Sidebar />
          {/* Chat area */}
          <ChatArea />
        </div>
      </div>
    </div>
  )
}