import { useLanguage } from '../../hooks/UseLanguage';
import { MessageAttributes } from '../../types/messages/messages.type';
import { useChat } from '../../hooks/ChatProvider';
import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from 'react';
import MessageLoading from '../Loading/MessageLoading';
import Button from '../../components/Buttons/Button';
import ListMessage from '../Messages/ListMessage';

import FeedbackLight from '../Feedback/FeedbackLight';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import HeaderChat from './HeaderChat';
import FooterChat from './FooterChat';

interface IChatAttributes {
  selectedPanel: 'chat' | 'procedure';
  setSelectedPanel: Dispatch<SetStateAction<'chat' | 'procedure'>>;
}

export default function Chat({
  selectedPanel,
  setSelectedPanel,
}: IChatAttributes) {
  //Init Component
  //
  const {
    messages,
    reformulateChatConversation,
    isUserWritten,
    isBotWritten,
    whoIsWritten,
  } = useChat();
  // Check selected language by user
  const { userLanguage } = useLanguage();
  const autoScrollMessage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    renderingMessages();
    autoScrollMessage.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotWritten, isUserWritten]);

  async function clickReformulateMessage() {
    await reformulateChatConversation();
    whoIsWritten('assistant');
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
        {index === messages.length - 1 && role === 'user' && isBotWritten && (
          <span className="flex flex-row justify-start">
            <IconButton className={'icon icon-bot'} icon={icons?.bot} />
            <MessageLoading className="wrapper-bot" role={'assistant'} />
          </span>
        )}
        {index === messages.length - 1 && isUserWritten && (
          <span className="flex flex-row justify-end">
            <MessageLoading className="wrapper-user" role={'user'} />
            <IconButton className={'icon icon-user'} icon={icons?.user} />
          </span>
        )}
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
      <div className="chat-room-containers_list-messages">
        {renderingMessages()}
        {messages.length > 1 &&
        messages[messages.length - 1].role === 'assistant' &&
        userLanguage && (
            <span className="chat-room-containers_reformulate">
            <Button
              type={'button'}
              content={userLanguage?.reformulate_button}
              onClick={() => clickReformulateMessage()}
            />
            <FeedbackLight />
          </span>
          )}
        {/* <div ref={autoScrollMessage}></div> */}
      </div>
      <FooterChat />
    </section>
  );
}
