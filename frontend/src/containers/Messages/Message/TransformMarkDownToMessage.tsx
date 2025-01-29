import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkDownType = {
  id: string;
  content: string;
  className?: string;
};

export default function TransformMarkDownToMessage({ id, content, className }: MarkDownType) {
  return (
    <div id={id} className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
