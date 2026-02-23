import { create } from 'zustand';
import { Message, ChatHistoryItem } from '@/types/chat';

interface ChatStore {
    messages: Message[];
    history: ChatHistoryItem[];
    selectedId: string | null;
    showSidebar: boolean;
    input: string;

    setMessages: (messages: Message[]) => void;
    setHistory: (history: ChatHistoryItem[]) => void;
    setSelectedId: (id: string | null) => void;
    setShowSidebar: (show: boolean | ((prev: boolean) => boolean)) => void;
    setInput: (input: string) => void;

    sendMessage: (text: string) => void;
    newChat: () => void;
    openHistory: (id: string) => void;
    clearHistory: () => void;
}

const initialMessages: Message[] = [
    {
        id: "m1",
        role: "bot",
        text: "Hi! I'm your coding buddy — share code or describe a problem and I'll suggest fixes or improvements.",
    },
];

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: initialMessages,
    history: [],
    selectedId: null,
    showSidebar: true,
    input: "",

    setMessages: (messages) => set({ messages }),
    setHistory: (history) => set({ history }),
    setSelectedId: (selectedId) => set({ selectedId }),
    setShowSidebar: (show) => set((state) => ({
        showSidebar: typeof show === 'function' ? show(state.showSidebar) : show
    })),
    setInput: (input) => set({ input }),

    sendMessage: (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { id: String(Date.now()), role: "user", text };
        const currentMessages = get().messages;

        set({
            messages: [...currentMessages, userMsg],
            input: ""
        });

        // simulate bot response
        setTimeout(() => {
            const isCode = text.toLowerCase().includes("function") ||
                text.includes("const ") ||
                text.includes("=>") ||
                text.toLowerCase().includes("bug");

            const botReply: Message = {
                id: "b-" + Date.now(),
                role: "bot",
                text: isCode
                    ? "I looked at your code — here's a suggested fix:\n\nfunction example() {\n  // fixed logic here\n}\n\nTry this and tell me if it helps."
                    : "Nice idea — here are some suggestions to improve it:\n- Break the task into smaller functions\n- Add input validation\n- Add unit tests\n",
                isCode: isCode,
            };

            set((state) => ({ messages: [...state.messages, botReply] }));
        }, 900);
    },

    newChat: () => {
        const { messages, history } = get();
        if (messages.length > 1) { // more than just the initial bot message
            const title = messages.find((x) => x.role === "user")?.text.slice(0, 40) || "Chat";
            set({
                history: [{ id: String(Date.now()), title, messages }, ...history],
            });
        }
        set({
            messages: initialMessages,
            selectedId: null,
        });
    },

    openHistory: (id: string) => {
        const { history } = get();
        const item = history.find((h) => h.id === id);
        if (!item) return;
        set({
            messages: item.messages,
            selectedId: id,
        });
    },

    clearHistory: () => set({ history: [] }),
}));
