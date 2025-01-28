import { useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Input from '../../components/Inputs/Input';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { IInputMessage } from '../../types/messages/messages.interface';
import { useChat } from '../../hooks/ChatProvider';

export default function InputMessage({
  setIsBotWritten,
  setIsUserWritten,
}: IInputMessage) {
  // Init component
  // Hook state to get message written by user and bot
  const [userContent, setUserContent] = useState<string>('');
  // Check selected language
  const { userLanguage } = useLanguage();
  const { requestChatConversation, stockMessageUser } = useChat();

  // Function Get any change from user message
  function onChange(e: any): void {
    setUserContent(e.target.value);
    if (e.target.value !== '') {
      setIsUserWritten(true);
    } else {
      setIsUserWritten(false);
    }
  }

  // Function sending message atfer press enter
  async function handleKeyDown(e: any): Promise<void> {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Record message written by user
      await stockMessageUser(userContent);
      setIsUserWritten(false);
      setIsBotWritten(true);
      // Request message to bot
      await requestChatConversation(userContent);
      setIsBotWritten(false);
      setUserContent('');
    }
  }

  // Function preparing message to ChatBot
  async function sendMessage(e: any): Promise<void> {
    e.preventDefault();
    // Record message written by user
    await stockMessageUser(userContent);
    setIsUserWritten(false);
    setIsBotWritten(true);
    // Request message to bot
    await requestChatConversation(userContent);
    setIsBotWritten(false);
    setUserContent('');
  }

  return (
    <form className="container-input">
      <Input
        value={userContent}
        onChange={onChange}
        handleKeyDown={(e) => {
          handleKeyDown(e);
        }}
        variant={'text'}
        content={userLanguage ? userLanguage?.chat_question_title : ''}
      />
      <IconButton
        type="submit"
        className="icon-send-message"
        icon={icons?.sendMessage}
        onClick={(e) => sendMessage(e)}
      />
    </form>
  );
}
