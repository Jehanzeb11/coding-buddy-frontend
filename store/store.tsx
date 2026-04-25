import { create } from 'zustand';
import { Message, ChatHistoryItem } from '@/types/chat';
import { createChatAction, getChatsAction, getChatAction, deleteChatAction, deleteAllChatsAction } from '@/app/actions/chat';
import { sendMessageAction, getMessagesAction } from '@/app/actions/message';

interface ChatStore {
    messages: Message[];
    history: ChatHistoryItem[];
    selectedId: string | null;
    showSidebar: boolean;
    input: string;
    isLoading: boolean;
    error: string | null;

    setMessages: (messages: Message[]) => void;
    setHistory: (history: ChatHistoryItem[]) => void;
    setSelectedId: (id: string | null) => void;
    setShowSidebar: (show: boolean | ((prev: boolean) => boolean)) => void;
    setInput: (input: string) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;

    selectedPersona: string;
    setSelectedPersona: (persona: string) => void;

    sendMessage: (text: string) => Promise<void>;
    newChat: () => Promise<void>;
    openHistory: (id: string) => Promise<void>;
    clearHistory: () => Promise<void>;
    loadChats: () => Promise<void>;
    loadChatMessages: (chatId: string) => Promise<void>;
    deleteChat: (id: string) => Promise<void>;
    deleteAllChats: () => Promise<void>;
}

const initialMessages: Message[] = [
    {
        id: "m1",
        role: "bot",
        text: "Hi! I'm your coding buddy — share code or describe a problem and I'll suggest fixes or improvements.",
    },
];

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    history: [],
    selectedId: null,
    showSidebar: true,
    input: "",
    isLoading: false,
    error: null,
    selectedPersona: "assistant",

    setMessages: (messages) => set({ messages }),
    setHistory: (history) => set({ history }),
    setSelectedId: (selectedId) => set({ selectedId }),
    setShowSidebar: (show) => set((state) => ({
        showSidebar: typeof show === 'function' ? show(state.showSidebar) : show
    })),
    setInput: (input) => set({ input }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setSelectedPersona: (selectedPersona) => set({ selectedPersona }),

    sendMessage: async (text: string) => {
        if (!text.trim()) return;

        const { selectedId, messages, selectedPersona } = get();
        set({ isLoading: true, error: null });

        try {
            // If no chat is selected, create a new chat first
            let chatId = selectedId;
            if (!chatId) {
                const title = text.slice(0, 40) || "New Chat";
                const createResult = await createChatAction(title, selectedPersona);
                if (!createResult.success) {
                    set({ error: createResult.message, isLoading: false });
                    return;
                }
                chatId = createResult.data?.id;
                set({ selectedId: chatId });
                await get().loadChats(); // Refresh chat list
            }

            // Send the message
            const isCode = text.toLowerCase().includes("function") ||
                text.includes("const ") ||
                text.includes("=>") ||
                text.toLowerCase().includes("bug");

            const messageResult = await sendMessageAction(chatId!, { content: text, isCode });
            if (!messageResult.success) {
                set({ error: messageResult.message, isLoading: false });
                return;
            }

            // Reload messages to get the updated conversation
            await get().loadChatMessages(chatId!);
            set({ input: "", isLoading: false });

        } catch (error) {
            set({ error: "Failed to send message", isLoading: false });
        }
    },

    newChat: async () => {
        set({ 
            selectedId: null,
            messages: [],
            input: "",
            isLoading: false,
            error: null,
            selectedPersona: "assistant"
        });
    },

    openHistory: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
            await get().loadChatMessages(id);
            set({ selectedId: id, isLoading: false });
        } catch (error) {
            set({ error: "Failed to load chat", isLoading: false });
        }
    },

    clearHistory: async () => {
        set({ isLoading: true, error: null });
        
        try {
            const result = await deleteAllChatsAction();
            if (!result.success) {
                set({ error: result.message, isLoading: false });
                return;
            }

            set({ 
                history: [], 
                messages: [], 
                selectedId: null, 
                isLoading: false 
            });

        } catch (error) {
            set({ error: "Failed to clear history", isLoading: false });
        }
    },

    loadChats: async () => {
        set({ isLoading: true, error: null });
        
        try {
            const result = await getChatsAction();
            if (!result.success) {
                set({ error: result.message, isLoading: false });
                return;
            }

            set({ 
                history: result.data || [], 
                isLoading: false 
            });

        } catch (error) {
            set({ error: "Failed to load chats", isLoading: false });
        }
    },

    loadChatMessages: async (chatId: string) => {
        set({ isLoading: true, error: null });
        
        try {
            const result = await getMessagesAction(chatId);
            if (!result.success) {
                set({ error: result.message, isLoading: false });
                return;
            }

            set({ 
                messages: result.data || [], 
                isLoading: false 
            });

        } catch (error) {
            set({ error: "Failed to load messages", isLoading: false });
        }
    },

    deleteChat: async (id: string) => {
        set({ isLoading: true, error: null });
        
        try {
            const result = await deleteChatAction(id);
            if (!result.success) {
                set({ error: result.message, isLoading: false });
                return;
            }

            // If we deleted the currently selected chat, clear it
            const { selectedId } = get();
            if (selectedId === id) {
                set({ 
                    selectedId: null, 
                    messages: [] 
                });
            }

            // Refresh chat list
            await get().loadChats();
            set({ isLoading: false });

        } catch (error) {
            set({ error: "Failed to delete chat", isLoading: false });
        }
    },

    deleteAllChats: async () => {
        await get().clearHistory();
    },
}));
