import { useLanguage } from '../../hooks/UseLanguage';
import { MessageAttributes } from '../../types/messages/messages.type';
import Information from '../Information/Information';
import { useChat } from '../../hooks/ChatProvider';
import Message from '../Message/Message';
import { Dispatch, SetStateAction, useState } from 'react';
import MessageLoading from '../Loading/MessageLoading';
import Button from '../../components/Buttons/Button';
import InputMessage from '../InputMessage/InputMessage';
import TabPanel from '../TabPanel/TabPanel';

interface IChatAttributes {
  selectedPanel: string;
  setSelectedPanel: Dispatch<SetStateAction<string>>;
}

export default function Chat({
  selectedPanel,
  setSelectedPanel,
}: IChatAttributes) {
  //Init Component
  //
  const { isRestart, messages, reformulateChatConversation } = useChat();
  // Check selected language by user
  const { userLanguage } = useLanguage();

  const [isUserWritten, setIsUserWritten] = useState<boolean>(false);
  const [isBotWritten, setIsBotWritten] = useState<boolean>(false);

  function renderLoadingMessage() {
    return (
      <>
        {isUserWritten && <MessageLoading />}
        {isBotWritten && <MessageLoading />}
      </>
    );
  }
  return (
    <section id="chat">
      {/* Data Inofrmation chat */}
      <Information />
      <div className="flex relative w-screen h-12 justify-center">
        <TabPanel
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
        />
      </div>

      {/* List messages chat */}
      <div id="list-messages">
        {/* Render all messages exist */}
        {messages.map((message: MessageAttributes, index: number) => {
          return (
            <Message
              key={index}
              id={message.id}
              content={message.content}
              role={message.role}
              date={message.date}
            />
          );
        })}

        {renderLoadingMessage()}
        {messages.length > 1 &&
        messages[messages.length - 1].role === 'assistant' &&
        userLanguage ? (
          <>
            {/* <IconButton icon={icons?.thumbdown} />
            <IconButton icon={icons?.thumbup} /> */}
            <Button
              type={'button'}
              content={userLanguage?.reformulate_button}
              onClick={() => reformulateChatConversation()}
            />
          </>
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
  );
}
