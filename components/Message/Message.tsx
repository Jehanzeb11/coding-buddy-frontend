import CodeBlock from "@/components/Message/CodeBlock";

const MessageContent = ({ text, isCode, isUser }: { text: string, isCode?: boolean, isUser?: boolean }) => {
    if (!text) return null;

    // If explicitly marked as code, render the whole thing as a code block
    if (isCode) {
        return <CodeBlock code={text} isUser={isUser} />;
    }

    // Parse for markdown code blocks (triple backticks)
    if (!text.includes('```')) {
        return <div className="whitespace-pre-wrap">{text}</div>;
    }

    const parts = text.split(/(```[\s\S]*?```)/g);

    return (
        <div className="whitespace-pre-wrap">
            {parts.map((part, index) => {
                if (part.startsWith('```') && part.endsWith('```')) {
                    const content = part.slice(3, -3);
                    const firstNewline = content.indexOf('\n');
                    let language = '';
                    let code = content;

                    if (firstNewline !== -1) {
                        language = content.substring(0, firstNewline).trim();
                        code = content.substring(firstNewline + 1);
                        if (language.length > 20 || language.includes(' ')) {
                            language = '';
                            code = content;
                        }
                    }

                    return <CodeBlock key={index} code={code.trimEnd()} language={language} isUser={isUser} />;
                }
                return <span key={index}>{part}</span>;
            })}
        </div>
    );
};

export default MessageContent;
