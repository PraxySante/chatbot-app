import { Dispatch, SetStateAction, useEffect } from 'react';
import { MessageAttributes } from '../../types/messages/messages.type';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import Message from './Message/Message';
import { useChat } from '../../hooks/ChatProvider';
import Video from '../Procedures/Video/Video';
import Button from '../../components/Buttons/Button';

type MessageType = {
  message: MessageAttributes;
  setIsBotWritten: Dispatch<SetStateAction<boolean>>;
  setSelectedPanel: Dispatch<SetStateAction<'chat' | 'procedure'>>;
};
export default function ListMessage({
  message,
  setSelectedPanel,
  setIsBotWritten,
}: MessageType) {
  const { stockMessageUser } = useChat();

  useEffect(() => {
    renderingMessage();
  }, [message]);

  function renderingMessage() {
    switch (message.role) {
      case 'assistant':
        if (message.doc_type === 'video') {
          return (
            <span className="flex flex-row justify-start cursor-pointer">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              {message.doc_ref && <Video fileDocument={message.doc_ref} />}
            </span>
          );
        }
        if (message.doc_type) {
          return (
            <span
              className="flex flex-row justify-start cursor-pointer">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              <Button
                type={'button'}
                content={message.content}
                onClick={() => handleClick(message.content)}
              >
                <IconButton icon={icons.chain} />
              </Button>
            </span>
          );
        }
        return (
          <>
            <span className="flex flex-row justify-start">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              <Message message={message} />
            </span>
          </>
        );

      case 'user':
        return (
          <>
            <span className="flex flex-row justify-end">
              <Message message={message} />
              <IconButton className={'icon icon-user'} icon={icons?.user} />
            </span>
          </>
        );
      default:
        break;
    }
  }

  async function handleClick(requestReformulation: string) {
    switch (message.doc_type) {
      case 'url':
        setSelectedPanel('procedure');
        break;

      case 'doc':
        setSelectedPanel('procedure');
        break;

      case 'reformulate':
        setIsBotWritten(true)
        await stockMessageUser(requestReformulation);
        break;

      default:
        break;
    }
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
