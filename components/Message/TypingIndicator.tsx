const TypingIndicator = () => (
    <div className="mr-auto text-left max-w-[80%] animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm bg-white/95 dark:bg-[#1e293b]/90 backdrop-blur-xl border border-neutral-200/50 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/5">
            <div className="w-2 h-2 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60 animate-[bounce_1.4s_infinite_.2s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60 animate-[bounce_1.4s_infinite_.4s]" />
            <div className="w-2 h-2 rounded-full bg-indigo-500/60 dark:bg-indigo-400/60 animate-[bounce_1.4s_infinite_.6s]" />
        </div>
    </div>
);

export default TypingIndicator;