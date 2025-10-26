import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkDownType } from '../../../types/messages/messages.type';

export default function TransformMarkDownToMessage({
  id,
  content,
  className,
}: MarkDownType) {
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
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
