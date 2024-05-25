import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function Markdown({
    content
}: {
    content: string
}) {
    return (
        <ReactMarkdown
            components={{
                h1: ({ node, ...props }) => <h2 className="text-3xl text-primary font-semibold" {...props} />,
                h2: ({ node, ...props }) => <h3 className="font-bold text-xl" {...props} />,
                h3: ({ node, ...props }) => <h4 className="font-bold text-2xl text-primary -mb-1" {...props} />,
                h4: ({ node, ...props }) => <h5 className="font-semibold text-xl -mb-2 " {...props} />,
                p: ({ node, ...props }) => <p className="text-base" {...props} />,
                ul: ({ node, ...props }) => <ul className="text-base" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside my-1" {...props} />,
                li: ({ node, ...props }) => <li className="my-1 list-inside " {...props} />,

                blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                ),
            }}
        >
            {content}
        </ReactMarkdown>
    );
};