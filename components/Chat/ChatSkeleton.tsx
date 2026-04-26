const ChatSkeleton = () => (
    <div className="flex flex-col gap-6 animate-pulse w-full">
        <div className="flex justify-end">
            <div className="w-[75%] sm:w-[50%] h-20 bg-black/5 dark:bg-white/5 rounded-2xl rounded-br-sm" />
        </div>
        <div className="flex justify-start">
            <div className="w-[85%] sm:w-[65%] h-32 bg-black/5 dark:bg-white/5 rounded-2xl rounded-bl-sm" />
        </div>
        <div className="flex justify-end">
            <div className="w-[60%] sm:w-[40%] h-16 bg-black/5 dark:bg-white/5 rounded-2xl rounded-br-sm" />
        </div>
    </div>
);

export default ChatSkeleton;
