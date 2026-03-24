import { CardMessageType } from '../../../types/messages/messages.type';
import TransformMarkDownToMessage from './TransformMarkDownToMessage';
import HeaderMeassage from './HeaderMessage';
import { useEffect } from 'react';
import { useChat } from '../../../hooks/ChatProvider';
import { ROLE_NONE } from '../../../constants/chat.constants';

export default function Message({ message }: CardMessageType) {
  const { reformulateChatConversation, whoIsWritten } = useChat();

  useEffect(() => {
    searchWord();
  }, [message]);

  async function searchWord() {
    if (
      message.content.includes(
        'Pourriez-vous la reformuler pour que je puisse mieux vous aider ?'
      )
    ) {
      await reformulateChatConversation();
      whoIsWritten(ROLE_NONE);
    }
  }
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
