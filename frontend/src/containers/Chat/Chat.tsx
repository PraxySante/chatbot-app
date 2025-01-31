import { useLanguage } from '../../hooks/UseLanguage';
import { MessageAttributes } from '../../types/messages/messages.type';
import Information from '../Information/Information';
import { useChat } from '../../hooks/ChatProvider';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import MessageLoading from '../Loading/MessageLoading';
import Button from '../../components/Buttons/Button';
import InputMessage from '../InputMessage/InputMessage';
import TabPanel from '../TabPanel/TabPanel';
import Title from '../../components/Text/Title';
import ListMessage from '../Messages/ListMessage';

import FeedbackLight from '../Feedback/FeedbackLight';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { useNotification } from '../../hooks/NotificationProvider';
import Notification from '../Notification/Notification';

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
  const { messages, reformulateChatConversation } = useChat();
  // Check selected language by user
  const { userLanguage } = useLanguage();
  const { messageNotification } = useNotification();
  const [isUserWritten, setIsUserWritten] = useState<boolean>(false);
  const [isBotWritten, setIsBotWritten] = useState<boolean>(false);

  useEffect(() => {
    renderingMessages();
  }, [messages, isBotWritten, isUserWritten]);

  useEffect(() => {
    renderingNotification();
  }, [messageNotification]);

  async function clickReformulateMessage() {
    setIsBotWritten(true);
    await reformulateChatConversation();
  }

  function renderingNotification() {
    setTimeout(() => {
      return <Notification />;
    }, 100);
  }

  /* Render all messages exist */
  function renderingMessages() {
    return messages.map((message: MessageAttributes, index: number) => (
      <Fragment key={index}>
        <ListMessage
          message={message}
          setSelectedPanel={setSelectedPanel}
          setIsBotWritten={setIsBotWritten}
        />
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
    <>
      <section id="chat-room">
        {/* Data Inofrmation chat */}
        <Title
          content={
            "Posez vos questions concernant le fonctionnement de l'Hôpital Foch 🏥"
          }
          tag={'h1'}
          className={''}
        ></Title>
        <Information />
        <div className="absolute sticky flex w-screen justify-center z-10">
          <TabPanel
            selectedPanel={selectedPanel}
            setSelectedPanel={setSelectedPanel}
          />
          {messageNotification && <Notification />}
        </div>
        {/* List messages chat */}
        <div id="list-messages">
          {renderingMessages()}

          {messages.length > 1 &&
          messages[messages.length - 1].role === 'assistant' &&
          userLanguage ? (
            <span className="flex flex-row justify-start gap-2 mb-2 text-xs">
              <Button
                type={'button'}
                content={userLanguage?.reformulate_button}
                onClick={() => clickReformulateMessage()}
              />
              <FeedbackLight />
            </span>
          ) : null}

          {/* Including Input  */}
        </div>
        <section id="input">
          <InputMessage
            setIsBotWritten={setIsBotWritten}
            setIsUserWritten={setIsUserWritten}
          />
        </section>
      </section>
    </>
  );
}
