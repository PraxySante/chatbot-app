import { useLanguage } from '../../hooks/UseLanguage';
import { MessageAttributes } from '../../types/messages/messages.type';
import Information from '../Information/Information';
import { useChat } from '../../hooks/ChatProvider';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import MessageLoading from '../Loading/MessageLoading';
import Button from '../../components/Buttons/Button';
import InputMessage from '../InputMessage/InputMessage';
import TabPanel from '../TabPanel/TabPanel';
import Title from '../../components/Text/Title';
import ListMessage from '../Messages/ListMessage';
import icons from '../../constants/icons';
import IconButton from '../../components/Buttons/IconButton';
import { feedbackApiFrontChatBot } from '../../services/ChatBot/feedbackApiFrontChatBot.service';
import FeedbackLight from '../Feedback/FeedbackLight';

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

  const [isUserWritten, setIsUserWritten] = useState<boolean>(false);
  const [isBotWritten, setIsBotWritten] = useState<boolean>(false);

  useEffect(() => {
    renderingMessages();
  }, [messages]);

  useEffect(() => {
    renderLoadingMessage();
  }, [isUserWritten, isBotWritten]);

  async function clickReformulateMessage() {
    setIsBotWritten(true);
    await reformulateChatConversation();
    setIsBotWritten(false);
  }

  function renderLoadingMessage() {
    return (
      <>
        {isUserWritten && (
          <MessageLoading className="wrapper-user" role={'user'} />
        )}
        {isBotWritten && (
          <MessageLoading className="wrapper-bot" role={'assistant'} />
        )}
      </>
    );
  }

  /* Render all messages exist */
  function renderingMessages() {
    return messages.map((message: MessageAttributes, index: number) => {
      return (
        <ListMessage
          key={index}
          message={message}
          setSelectedPanel={setSelectedPanel}
        />
      );
    });
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
        </div>
        {/* List messages chat */}
        <div id="list-messages">
          {renderingMessages()}

          {messages.length > 1 &&
          messages[messages.length - 1].role === 'assistant' &&
          userLanguage ? (
            <span className="flex flex-col gap-2 mb-2">
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
        {renderLoadingMessage()}
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
