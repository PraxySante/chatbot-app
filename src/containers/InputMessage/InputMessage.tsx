import { useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Input from '../../components/Inputs/Input';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import { sendMessageToChatBot } from '../../helpers/chat-engine.function';
import { IInputMessage } from '../../types/messages/messages.interface';

export default function InputMessage({ getMessage }: IInputMessage) {
  // Init component
  // Hook state to get message written by user and bot
  const [userContent, setUserContent] = useState<string>('');
  // Check selected language
  const { userLanguage } = useLanguage();

  // Function Get any change from user message
  function onChange(e: any): void {
    setUserContent(e.target.value);
  }

  // Function preparing message to ChatBot
  function sendMessage(e: any): void {
    //sendMessageToChatBot({ content: userContent, updateMessageInRealTime });
    e.preventDefault();
    // Record message written by user
    getMessage('user', userContent);
    requestToChatBot(userContent);
  }

  // Function request message to chatbot
  async function requestToChatBot(userContent: string) {
    if (userLanguage) {
      const response: any = await sendMessageToChatBot({
        content: userContent,
      });
      // Record message written by bot
      getMessage(response.name, response.message);
    }
  }

  return (
    <form className="container-input">
      <Input
        onChange={onChange}
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
