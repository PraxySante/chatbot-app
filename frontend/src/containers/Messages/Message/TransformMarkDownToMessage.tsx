import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkDownType } from '../../../types/messages/messages.type';

export default function TransformMarkDownToMessage({
  id,
  content,
  className,
}: MarkDownType) {
  //const formattedContent = content.replace(/\\n/g, '\n');
  return (
    <div id={id} className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ node, ...props }) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline break-all"
            >
              {props.children}
            </a>
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          strong: ({ node, ...props }) => (
            <strong className="font-bold" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
