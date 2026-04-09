import ChatArea from "@/components/Chat/ChatArea";
import Sidebar from "@/components/Chat/Sidebar";

export default function ChatPage() {
  return (
    <div className="w-full h-full p-2 sm:p-4">
      <div className="flex gap-4 sm:gap-6 h-full w-full">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat area */}
        <ChatArea />
      </div>
    </div>
  )
}