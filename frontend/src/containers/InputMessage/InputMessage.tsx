import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Input from '../../components/Inputs/Input';

import { useChat } from '../../hooks/ChatProvider';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import useTranscription from '../../hooks/TranscriptionProvider';
import { Visualizer } from 'react-sound-visualizer';
import {
  ROLE_ASSISTANT,
  ROLE_ASSISTANT_TRANSCRIBE,
  ROLE_NONE,
  ROLE_USER_MICROPHONE,
  ROLE_USER_TEXT,
} from '../../constants/chat.constants';

export default function InputMessage() {
  // Init component
  const {
    settingsMicrophone,
    userSelectedMicrophone,
    isRecord,
    startRecordingAudioToTranscription,
    stopRecordingAudioToTranscription,
  } = useTranscription();

  // Hook state to get message written by user and bot
  const [userContent, setUserContent] = useState<string>('');
  // Check selected language
  const { userLanguage } = useLanguage();
  const { stockMessageUser, whoIsWritten, uuidSession } = useChat();

  const [audio, setAudio] = useState<MediaStream | null>(null);
  const [widthUser, setWidthUser] = useState<any>();
  const isTranscribeAudioUser = useRef<boolean>(false);

  useEffect(() => {
    if (!userSelectedMicrophone) {
      settingsMicrophone();
      isTranscribeAudioUser.current = false;
    }
  }, []);

  useEffect(() => {
    const width = document.querySelector('.container-input')?.clientWidth;
    width && setWidthUser(width);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(setAudio);
  }, [userSelectedMicrophone, widthUser]);

  // Function Get any change from user message
  function onChange(e: any): void {
    setUserContent(e.target.value);
    if (e.target.value !== '') {
      whoIsWritten(ROLE_USER_TEXT);
    } else {
      whoIsWritten(ROLE_NONE);
    }
  }

  // Function sending message after press enter
  async function handleKeyDown(e: any): Promise<void> {
    if (e.key === 'Enter' && !e.shiftKey && e.target.value !== '') {
      e.preventDefault();
      // Record message written by user
      setUserContent('');
      whoIsWritten(ROLE_NONE);
      whoIsWritten(ROLE_ASSISTANT);
      await stockMessageUser(userContent);
      whoIsWritten(ROLE_NONE);
      //await loadingMessageContext(userContent);
    }
  }

  // Function preparing message to ChatBot
   async function sendMessage(e: any): Promise<void> {
     e.preventDefault();
     // Record message written by user
     if (userContent !== '') {
       setUserContent('');
       whoIsWritten(ROLE_NONE);
       whoIsWritten(ROLE_ASSISTANT);
       await stockMessageUser(userContent);
       whoIsWritten(ROLE_NONE);
       //await loadingMessageContext(userContent);
     }
   }

  // async function loadingMessageContext(userContent: string) {
  //   await stockMessageUser(userContent);
  // }

  async function toggleMicrophone() {
    //const hostname = document.location.hostname;
    if (!isRecord) {
      whoIsWritten(ROLE_USER_MICROPHONE);
      await startRecordingAudioToTranscription();
    } else {
      whoIsWritten(ROLE_ASSISTANT_TRANSCRIBE);
      const userTranscribeContent =
        await stopRecordingAudioToTranscription(uuidSession);
      if (userTranscribeContent) {
        whoIsWritten(ROLE_ASSISTANT);
      }
      //await stockMessageUser(userTranscribeContent);
      setUserContent(userTranscribeContent);
      isTranscribeAudioUser.current = true;
      whoIsWritten(ROLE_USER_TEXT);
      //whoIsWritten(ROLE_NONE);
    }
  }

  return (
    <>
      <form className="container-input">
        {isRecord ? (
          <Visualizer
            audio={audio}
            mode="continuous"
            autoStart={true}
            strokeColor="green"
          >
            {({ canvasRef }) => (
              <div className="visualizer-container">
                <canvas ref={canvasRef} className="visualizer-canvas" />
              </div>
            )}
          </Visualizer>
        ) : (
          <>
            <Input
              value={userContent}
              onChange={onChange}
              handleKeyDown={(e) => {
                handleKeyDown(e);
              }}
              className={
                isTranscribeAudioUser.current
                  ? 'container-message_transcribed'
                  : 'container-message_written'
              }
              variant={'textarea'}
              content={userLanguage ? userLanguage?.chat_question_title : ''}
            />
            <IconButton
              aria-label={userLanguage?.btn_chat_maintain_microphone}
              title={userLanguage?.btn_chat_maintain_microphone}
              type="button"
              className={`icon-send-message`}
              icon={icons.microphone}
              onClick={toggleMicrophone}
            />

            <IconButton
              aria-label={userLanguage?.btn_chat_send_question}
              title={userLanguage?.btn_chat_send_question}
              type="submit"
              className="icon-microphone"
              icon={icons.sendMessage}
              onClick={(e) => sendMessage(e)}
            />
          </>
        )}
      </form>

      {isRecord && (
        <>
          <IconButton
            aria-label={userLanguage?.btn_chat_maintain_microphone}
            title={userLanguage?.btn_chat_maintain_microphone}
            type="button"
            className={`icon-microphone`}
            icon={icons.microphone}
            onClick={toggleMicrophone}
          />
          <IconButton
            type="button"
            className="icon-stop"
            icon={icons.stop}
            onClick={toggleMicrophone}
          />
        </>
      )}
    </>
  );
}
