import icons from '../../constants/icons';
import { useChat } from '../../hooks/ChatProvider';
import './MessageLoading.css';

type MessageLoadingType = {
  className: string;
  role: string;
};

export default function MessageLoading({
  className,
  role,
}: MessageLoadingType) {
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
