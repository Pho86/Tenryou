import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from "framer-motion";

export default function Markdown({
    content
}: {
    content: unknown
}) {
    const text =
        typeof content === "string"
            ? content
            : content && typeof content === "object"
                ? String(
                    (content as Record<string, unknown>).text ??
                    (content as Record<string, unknown>).error ??
                    ""
                )
                : "";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="prose prose-invert max-w-none"
        >
            <ReactMarkdown
                components={{
                    h1: ({ node, ...props }) => <h2 className="text-2xl font-bold text-primary mb-3 mt-6 tracking-tight" {...props} />,
                    h2: ({ node, ...props }) => <h3 className="text-xl font-semibold text-text mb-2 mt-5" {...props} />,
                    h3: ({ node, ...props }) => <h4 className="text-lg font-medium text-primary mb-2 mt-4" {...props} />,
                    h4: ({ node, ...props }) => <h5 className="text-base font-medium text-text mb-1 mt-3" {...props} />,
                    p: ({ node, ...props }) => <p className="text-base text-text/90 leading-relaxed mb-3 text-wrap-pretty" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1.5 text-base text-text/90 mb-3" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1.5 text-base text-text/90 mb-3" {...props} />,
                    li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-semibold text-text" {...props} />,
                    em: ({ node, ...props }) => <em className="italic text-text/90" {...props} />,
                    code: ({ node, ...props }) => <code className="bg-bg-light/80 px-1.5 py-0.5 rounded text-sm font-mono text-primary" {...props} />,
                    pre: ({ node, ...props }) => <pre className="bg-bg-dark p-4 rounded-xl overflow-x-auto mb-3 border border-bg-light/30" {...props} />,
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4 text-text/80" {...props} />
                    ),
                    a: ({ node, ...props }) => <a className="text-primary underline underline-offset-2 hover:no-underline transition-colors" {...props} />,
                    hr: ({ node, ...props }) => <hr className="border-bg-light/30 my-6" {...props} />,
                }}
            >
                {text}
            </ReactMarkdown>
        </motion.div>
    );
};