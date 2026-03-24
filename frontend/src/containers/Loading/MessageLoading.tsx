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
        <button disabled type="button" className={`loader`}>
          {icons.spinner}
          {messageLoading}
        </button>
      </section>
    </>
  );
}
