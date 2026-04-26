"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className={`h-auto py-1 px-2 flex items-center gap-1 text-xs transition-colors hover:bg-transparent ${isUser ? 'text-white/70 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
                    title="Copy code"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
            <pre className={`p-3 overflow-auto text-[13px] font-mono ${isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default CodeBlock;