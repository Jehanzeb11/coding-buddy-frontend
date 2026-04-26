"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CodeBlock = ({ code, language, isUser }: { code: string, language?: string, isUser?: boolean }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`relative group mt-2 mb-2 rounded-xl overflow-hidden border shadow-inner ${isUser ? 'border-white/20 bg-black/20' : 'border-neutral-200 dark:border-white/10 bg-gray-50 dark:bg-[#0f172a]'}`}>
            <div className={`flex items-center justify-between px-3 py-1.5 border-b ${isUser ? 'bg-black/20 border-white/10 text-white/70' : 'bg-gray-200/50 dark:bg-white/5 border-neutral-200 dark:border-white/10 text-muted-foreground'}`}>
                <span className="text-xs font-mono">{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1 text-xs transition-colors ${isUser ? 'hover:text-white' : 'hover:text-foreground'}`}
                    title="Copy code"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <pre className={`p-3 overflow-auto text-[13px] font-mono ${isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;