import { Dispatch, SetStateAction, useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import Description from '../../components/Text/Description';
import icons from '../../constants/icons';
import { MessageAttributes } from '../../types/messages/messages.type';
import TransformMarkDownToMessage from './TransformMarkDownToMessage';
import { useChat } from '../../hooks/ChatProvider';

type MessageType = {
  message: MessageAttributes;
  setSelectedPanel: Dispatch<SetStateAction<'chat' | 'procedure'>>;
};

export default function Message({ message, setSelectedPanel }: MessageType) {
  const { stockMessageUser, requestChatConversation } = useChat();
  useEffect(() => {
    renderingMessage();
  }, [message]);

  async function handleClick(requestReformulation: string) {
    switch (message.doc_type) {
      case 'url':
        setSelectedPanel('procedure');
        break;

      case 'doc':
        setSelectedPanel('procedure');
        break;

      case 'reformulate':
        await stockMessageUser(requestReformulation);
        await requestChatConversation(requestReformulation);
        break;

      default:
        break;
    }
  }
  // Function rendering message according user or bot
  function renderingMessage() {
    return (
      <>
        {/* Render message bot left side - icon and text */}
        {message.role === 'assistant' ? (
          <article>
            {message.doc_type ? (
              <span
                className="flex flex-row justify-start gap-2 cursor-pointer"
                onClick={() => handleClick(message.content)}
              >
                <IconButton className={'icon icon-bot'} icon={icons?.bot} />
                <TransformMarkDownToMessage
                  id={`text-bot-${message.id}`}
                  content={message.content}
                  className={'text--bot'}
                />
              </span>
            ) : (
              <span className="flex flex-row justify-start gap-2">
                <IconButton className={'icon icon-bot'} icon={icons?.bot} />
                <TransformMarkDownToMessage
                  id={`text-bot-${message.id}`}
                  content={message.content}
                  className={'text--bot'}
                />
              </span>
            )}
            <span className="flex flex-row justify-end font-size ml-16">
              <Description
                content={`${message.role} - ${message.date}`}
                tag={'p'}
                className={'text-xs'}
              />
            </span>
          </article>
        ) : (
          <>
            {/* Render message user right side - text and icon*/}
            <article>
              <span className="flex flex-row gap-2 justify-end">
                <TransformMarkDownToMessage
                  id={`text-user-${message.id}`}
                  content={message.content}
                  className={'text--user'}
                />

                <IconButton className={'icon icon-user'} icon={icons?.user} />
              </span>
              <span className="flex flex-row justify-start font-size">
                <Description
                  content={`${message.role} - ${message.date}`}
                  tag={'p'}
                  className={'text-xs'}
                />
              </span>
            </article>
          </>
        )}
      </>
    );
  }

  return (
    <section
      className={
        message.role === 'assistant'
          ? 'message justify-start'
          : 'message justify-end'
      }
    >
      <div
        className={message.role === 'assitant' ? 'message-bot' : 'message-user'}
      >
        {renderingMessage()}
      </div>
    </section>
  );
}
