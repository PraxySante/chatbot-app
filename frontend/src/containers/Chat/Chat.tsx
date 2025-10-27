import { useLanguage } from '../../hooks/UseLanguage';
import { MessageAttributes } from '../../types/messages/messages.type';
import { useChat } from '../../hooks/ChatProvider';
import {
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import MessageLoading from '../Loading/MessageLoading';
import Button from '../../components/Buttons/Button';
import ListMessage from '../Messages/ListMessage';

import FeedbackLight from '../Feedback/FeedbackLight';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import HeaderChat from './HeaderChat';
import FooterChat from './FooterChat';
import Modal from '../Modal/Modal';
import { IChatAttributes } from '../../types/chatbot/chatbot.interface';
import { ROLE_ASSISTANT, ROLE_USER } from '../../constants/chat.constants';



export default function Chat({
  selectedPanel,
  setSelectedPanel,
}: IChatAttributes) {
  //Init Component
  //
  const { messages, reformulateChatConversation, isUserWritten, isBotWritten } =
    useChat();
  // Check selected language by user
  const { userLanguage } = useLanguage();
  const autoScrollMessage = useRef<HTMLDivElement | null>(null);
  const [isOpenModalFeedback, setIsOpenModalFeedback] =
    useState<boolean>(false);

  useEffect(() => {
    renderingModalFeedback();
  }, [isOpenModalFeedback]);

  useEffect(() => {
    renderingMessages();
    if (autoScrollMessage.current) {
      autoScrollMessage.current.scrollTop =
        autoScrollMessage.current.scrollHeight;
    }
  }, [messages, isBotWritten, isUserWritten]);

  async function clickReformulateMessage() {
    await reformulateChatConversation();
  }

  /* Render all messages exist */
  function renderingMessages() {
    return messages.map((message: MessageAttributes, index: number) => (
      <Fragment key={index}>
        <ListMessage message={message} setSelectedPanel={setSelectedPanel} />
        {renderLoadingMessage(index, message.role)}
      </Fragment>
    ));
  }

  function renderLoadingMessage(index: number, role: string) {
    return (
      <>
        {index === messages.length - 1 && role === ROLE_USER && isBotWritten && (
          <span className="flex flex-row justify-start">
            <IconButton className={'icon icon-bot'} icon={icons.bot} />
            <MessageLoading className="wrapper-bot" role={'assistant'} />
          </span>
        )}
        {index === messages.length - 1 && isUserWritten && (
          <span className="flex flex-row justify-end">
            <MessageLoading className="wrapper-user" role={ROLE_USER} />
            <IconButton className={'icon icon-user'} icon={icons.user} />
          </span>
        )}
      </>
    );
  }

  function renderingModalFeedback() {
    const className = isOpenModalFeedback
      ? 'flex flex-row overflow-y-auto overflow-x-hidden absolute z-50 justify-center items-center w-full h-3/4'
      : 'hidden';
    return (
      <>
        <div id="authentication-modal" aria-hidden="true" className={className}>
          <Modal setIsOpenModalFeedback={setIsOpenModalFeedback} />
        </div>
      </>
    );
  }

  return (
    <section id="chat-room">
      <HeaderChat
        selectedPanel={selectedPanel}
        setSelectedPanel={setSelectedPanel}
      />
      {/* List messages chat */}
      {renderingModalFeedback()}

      <div
        ref={autoScrollMessage}
        className="chat-room-containers_list-messages"
      >
        {renderingMessages()}
        {messages.length > 1 &&
          messages[messages.length - 1].role === ROLE_ASSISTANT &&
          userLanguage && (
            <span className="chat-room-containers_reformulate">
              <Button
                type={'button'}
                content={userLanguage?.reformulate_button}
                onClick={() => clickReformulateMessage()}
              />
            <FeedbackLight setIsOpenModalFeedback={setIsOpenModalFeedback} />
            </span>
          )}
      </div>
      <FooterChat />
    </section>
  );
}
