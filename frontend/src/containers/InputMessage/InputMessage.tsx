import { useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Input from '../../components/Inputs/Input';

import { useChat } from '../../hooks/ChatProvider';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import useTranscription from '../../hooks/TranscriptionProvider';

export default function InputMessage() {
  // Init component
  const { settingsMicrophone, userSelectedMicrophone, isRecord, stopTranscription, startTranscription } = useTranscription();
  // Hook state to get message written by user and bot
  const [userContent, setUserContent] = useState<string>('');
  // Check selected language
  const { userLanguage } = useLanguage();
  const { stockMessageUser, whoIsWritten } = useChat();

  // Function Get any change from user message
  function onChange(e: any): void {
    setUserContent(e.target.value);
    if (e.target.value !== '') {
      whoIsWritten('user');
    } else {
      whoIsWritten('none');
    }
  }

  // Function sending message atfer press enter
  async function handleKeyDown(e: any): Promise<void> {
    if (e.key === 'Enter' && e.target.value !== '') {
      e.preventDefault();
      // Record message written by user
      setUserContent('');
      whoIsWritten('none');
      whoIsWritten('assistant');
      await stockMessageUser(userContent);
      whoIsWritten('none');
    }
  }

  // Function preparing message to ChatBot
  async function sendMessage(e: any): Promise<void> {
    e.preventDefault();
    // Record message written by user
    if (userContent !== '') {
      setUserContent('');
      whoIsWritten('none');
      whoIsWritten('assistant');
      await stockMessageUser(userContent);
      whoIsWritten('none');
    }
  }

  async function sendTranscription(e: any): Promise<void> {
    if (!userSelectedMicrophone) {      
      settingsMicrophone();
    } else {
      startTranscription()
    }
  }

  async function stop(e:any) {
    stopTranscription();
  }

  return (
    <>
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
      <IconButton
        type="submit"
        className="icon-microphone"
        icon={!isRecord ? icons?.microphone : icons?.spinner}
        onClick={(e) => !isRecord ? sendTranscription(e): stop(e)}
      />
    </>
  );
}
