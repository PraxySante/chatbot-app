import { CardMessageType } from '../../../types/messages/messages.type';
import TransformMarkDownToMessage from './TransformMarkDownToMessage';
import HeaderMeassage from './HeaderMessage';

export default function Message({ message }: CardMessageType) {
  return (
    <div className={`flex flex-col`}>
      <HeaderMeassage role={message.role} date={message.date} />
      <div
        id="message"
        className={`message-${message.role} bg-${message.role} relative`}
      >
        <TransformMarkDownToMessage
          id={`text-bot-${message.id}`}
          content={message.content}
          className={`${message.role}`}
        />
      </div>
    </div>
  );
}
