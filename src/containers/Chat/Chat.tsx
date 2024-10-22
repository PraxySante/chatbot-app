import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLanguage } from '../../hooks/UseLanguage';
import { MessageAttributes } from '../../types/messages/messages.type';
import {
  getMessageLocalStorage,
  setMessageLocalStorage,
} from '../../helpers/historyChat.function';
import Information from '../Information/Information';
import ListMessages from '../ListMessages/ListMessages';

export default function Chat() {
  //Init Component
  // Check selected language by user
  const { userLanguage } = useLanguage();
  // Check user data
  const { user } = useAuth0();
  // Init newMessage to implement newMessage into Chat between user and bot
  const newMessage: MessageAttributes[] = [];
  // Stock message and Init message bot
  const [messages, setMessages] = useState<MessageAttributes[]>([
    {
      id: 0,
      name: 'bot',
      message: `${userLanguage?.voc_hello} ${user?.nickname}! ${userLanguage?.chat_first_message}`,
    },
  ]);

  // Loading messages from localStorage or current chat with new message
  useEffect(() => {
    const getMessages: MessageAttributes[] | null = getMessageLocalStorage();
    if (getMessages) {
      setMessages(getMessages);
    }
    renderingMessages();
  }, [setMessages]);

  // Function to get new message
  function getMessage(name: string, message: string) {
    // Pushing new message into alt array
    newMessage.push({ id: messages.length + 1, name: name, message: message });
    // Pushing new message with historic message
    setMessages(() => {
      return [...messages, ...newMessage];
    });
    // Pushing all datas into localStorage
    setMessageLocalStorage([...messages, ...newMessage]);
  }

  // Rendering all data messages
  function renderingMessages() {
    return <ListMessages getMessage={getMessage} messages={messages} />;
  }

  return (
    <section id="chat">
      {/* Data Inofrmation chat */}
      <Information />
      {/* List messages chat */}
      {renderingMessages()}
    </section>
  );
}
