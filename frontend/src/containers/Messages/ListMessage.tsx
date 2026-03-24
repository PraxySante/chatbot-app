import { useEffect } from 'react';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import Message from './Message/Message';
import { useChat } from '../../hooks/ChatProvider';
import Video from '../Procedures/Video/Video';
import Button from '../../components/Buttons/Button';
import { ListMessageType } from '../../types/messages/messages.interface';
import {
  DOC_TYPE_DOC,
  DOC_TYPE_REFORMULATE,
  DOC_TYPE_URL,
  DOC_TYPE_VIDEO,
  ROLE_ASSISTANT,
  ROLE_NONE,
  ROLE_USER,
} from '../../constants/chat.constants';
import Title from '../../components/Text/Title';
import Description from '../../components/Text/Description';
import { useLanguage } from '../../hooks/UseLanguage';
import { useClient } from '../../hooks/ClientProvider';
import './Message.css';
import { useNotification } from '../../hooks/NotificationProvider';
import { STATUS_ERROR_TOO_MANY_REQUEST } from '../../constants/notifications.constants';

export default function ListMessage({ message }: ListMessageType) {
  const {
    stockMessageUser,
    whoIsWritten,
    updateSelectPanel,
    isBotWritten,
    reformulateChatConversation,
  } = useChat();
  const { userLanguage } = useLanguage();
  const { configClient } = useClient();
  const { getMessageToNotification } = useNotification();

  useEffect(() => {
    renderingMessage();
  }, [message]);

  function renderingMessage() {
    switch (message.role) {
      case ROLE_ASSISTANT:
        if (message.doc_type === DOC_TYPE_VIDEO) {
          return (
            <span className="message-video">
              <IconButton className={'icon icon-bot'} icon={icons.bot} />
              {message.doc_ref && <Video fileDocument={message.doc_ref} />}
            </span>
          );
        }
        if (message.doc_type === DOC_TYPE_REFORMULATE) {
          return (
            <span className="message-reformulate">
              <Button
                type={'button'}
                content={`${message.content}`}
                onClick={() => handleClick(message.content, '')}
              ></Button>
            </span>
          );
        }
        if (
          message.doc_type === DOC_TYPE_DOC &&
          !configClient?.displayDocument
        ) {
          return;
        }
        if (message.doc_type) {
          return (
            <span
              className="message-doc"
              onClick={() => handleClick(message.content, message.doc_ref)}
            >
              <span className="message-containers_file-link group">
                <IconButton
                  className="message-containers_icons group-hover:text-textHover"
                  type="button"
                  icon={message.doc_type === 'doc' ? icons.file : icons.chain}
                />
                <div className="message_containers_description">
                  <Title
                    content={`${userLanguage?.chat_link_text} ${message.doc_type === 'doc' ? userLanguage?.chat_link_type_doc : userLanguage?.chat_link_type_link} ${userLanguage?.chat_link_text_end}`}
                    tag="h2"
                    className="message_title group-hover:text-textHover"
                  />
                  <Description
                    content={`${message.content}`}
                    tag={'p'}
                    className={'message_description group-hover:text-textHover'}
                  />
                </div>
              </span>
            </span>
          );
        }
        return (
          <>
            <span className="message_containers-bot">
              <IconButton className={'icon icon-bot'} icon={icons.bot} />
              <Message message={message} />
            </span>
          </>
        );

      case ROLE_USER:
        return (
          <>
            <span className="message_containers-user">
              <Message message={message} />
              <IconButton className={'icon icon-user'} icon={icons.user} />
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
    if (isBotWritten) {
      getMessageToNotification(
        STATUS_ERROR_TOO_MANY_REQUEST,
        userLanguage ? userLanguage?.error_msg_wait_bot : ''
      );
      return;
    }
    switch (message.doc_type) {
      case DOC_TYPE_URL:
        window.open(url, '_blank', 'noopener,noreferrer');
        break;

      case DOC_TYPE_DOC:
        updateSelectPanel('procedure');
        break;

      case DOC_TYPE_REFORMULATE:
        whoIsWritten(ROLE_ASSISTANT);
        await stockMessageUser(requestReformulation);
        whoIsWritten(ROLE_NONE);

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
        className={
          message.role === ROLE_ASSISTANT ? 'message-assistant' : 'message-user'
        }
      >
        {renderingMessage()}
      </div>
    </section>
  );
}
