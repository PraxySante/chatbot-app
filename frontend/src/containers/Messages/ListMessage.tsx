import { useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import Message from './Message/Message';
import { useChat } from '../../hooks/ChatProvider';
import Video from '../Procedures/Video/Video';
import Button from '../../components/Buttons/Button';
import { ListMessageType } from '../../types/messages/messages.interface';
import { DOC_TYPE_DOC, DOC_TYPE_REFORMULATE, DOC_TYPE_URL, DOC_TYPE_VIDEO, ROLE_ASSISTANT, ROLE_USER } from '../../constants/chat.constants';

export default function ListMessage({
  message,
  setSelectedPanel,
}: ListMessageType) {
  const { stockMessageUser, whoIsWritten } = useChat();

  useEffect(() => {
    renderingMessage();
  }, [message]);

  function renderingMessage() {
    switch (message.role) {
      case ROLE_ASSISTANT:
        if (message.doc_type === DOC_TYPE_VIDEO) {
          return (
            <span className="flex flex-row justify-start cursor-pointer">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              {message.doc_ref && <Video fileDocument={message.doc_ref} />}
            </span>
          );
        }
        if (message.doc_type === DOC_TYPE_REFORMULATE) {
          return (
            <span className="flex flex-row justify-start cursor-pointer">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              <Button
                type={'button'}
                content={`${message.content}`}
                onClick={() => handleClick(message.content, '')}
              ></Button>
            </span>
          );
        }
        if (message.doc_type) {
          return (
            <span className="flex flex-row justify-start cursor-pointer">
              <IconButton className={'icon icon-bot'} icon={icons?.bot} />
              <span className="w-full flex flex-row justify-start cursor-pointer">
                <IconButton
                  className={'flex align-center btn_actions border border-solid border-secondary whitespace-pre-line'}
                  type={'button'}
                  icon={icons.chain}
                  content={`Voici un lien qui peut vous intéresser :\n${message.content}`}
                  onClick={() => handleClick(message.content, message.doc_ref)}
                />
              </span>
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

      case ROLE_USER:
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

  async function handleClick(
    requestReformulation: string,
    url: string | undefined
  ) {
    switch (message.doc_type) {
      case DOC_TYPE_URL:
        window.open(url, '_blank', 'noopener,noreferrer');
        break;

      case DOC_TYPE_DOC:
        setSelectedPanel('procedure');
        break;

      case DOC_TYPE_REFORMULATE:
        whoIsWritten(ROLE_ASSISTANT);
        await stockMessageUser(requestReformulation);
        break;

      default:
        break;
    }
  }
  return (
    <section
      className={
        message.role === ROLE_ASSISTANT
          ? 'message justify-start'
          : 'message justify-end'
      }
    >
      <div
        className={message.role === ROLE_ASSISTANT ? 'message-bot' : 'message-user'}
      >
        {renderingMessage()}
      </div>
    </section>
  );
}
