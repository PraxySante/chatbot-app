import icons from '../../constants/icons';
import { useChat } from '../../hooks/ChatProvider';
import './MessageLoading.css';

type MessageLoadingType = {
  className: string;
};

export default function MessageLoading({ className }: MessageLoadingType) {
  const { messageLoading } = useChat();
  return (
    <>
      <section className={`wrapper ${className}`}>
        <div className={`loader`}>
          {icons.spinner}
          {messageLoading}
        </div>
      </section>
    </>
  );
}
