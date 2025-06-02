import { CardMessageType } from '../../../types/messages/messages.type';
import TransformMarkDownToMessage from './TransformMarkDownToMessage';
import HeaderMeassage from './HeaderMessage';

export default function Message({ message }: CardMessageType) {
  return (
    <>
      <div
        id="message"
        className={`message-${message.role} bg-${message.role}`}
      >
        <HeaderMeassage role={message.role} date={message.date} />
        <TransformMarkDownToMessage
          id={`text-bot-${message.id}`}
          content={message.content}
          className={`${message.role}`}
        />
      </div>
    </>
  );
}
