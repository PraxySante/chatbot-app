import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Input from '../../components/Inputs/Input';

import { useChat } from '../../hooks/ChatProvider';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import useTranscription from '../../hooks/TranscriptionProvider';
import { Visualizer } from 'react-sound-visualizer';
import {
  BUTTON_MAINTAIN_MICROPHONE,
  BUTTON_SEND_QUESTIONS,
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
    stopTranscription,
    startTranscription,
    muteTranscription,
    isMuted,
  } = useTranscription();
  // Hook state to get message written by user and bot
  const [userContent, setUserContent] = useState<string>('');
  // Check selected language
  const { userLanguage } = useLanguage();
  const { stockMessageUser, whoIsWritten } = useChat();

  const [audio, setAudio] = useState<MediaStream | null>(null);
  const [widthUser, setWidthUser] = useState<any>();
  const isButtonPressedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!userSelectedMicrophone) {
      settingsMicrophone();
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
    if (e.key === 'Enter' && e.target.value !== '') {
      e.preventDefault();
      // Record message written by user
      setUserContent('');
      whoIsWritten(ROLE_NONE);
      whoIsWritten(ROLE_ASSISTANT);
      await stockMessageUser(userContent);
      whoIsWritten(ROLE_NONE);
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
    }
  }

  async function handleMicrophoneDown(): Promise<void> {
    isButtonPressedRef.current = true;
    if (!isRecord) {
      const hostname = document.location.hostname;
      await startTranscription(hostname);
    } else if (isMuted) {
      whoIsWritten(ROLE_USER_MICROPHONE);
      muteTranscription();
    }
  }

  async function handleMicrophoneUp(): Promise<void> {
    isButtonPressedRef.current = false;
    if (isRecord && !isMuted) {
      muteTranscription();
      whoIsWritten(ROLE_ASSISTANT_TRANSCRIBE);
    }
  }

  async function stopRecording(): Promise<void> {
    stopTranscription();
  }

  return (
    <>
      <form className="container-input">
        {isRecord && !isMuted ? (
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
              variant={'text'}
              content={userLanguage ? userLanguage?.chat_question_title : ''}
            />
            <IconButton
              aria-label={BUTTON_SEND_QUESTIONS}
              title={BUTTON_SEND_QUESTIONS}
              type="submit"
              className="icon-send-message"
              icon={icons?.sendMessage}
              onClick={(e) => sendMessage(e)}
            />
          </>
        )}
      </form>

      <IconButton
        aria-label={BUTTON_MAINTAIN_MICROPHONE}
        title={BUTTON_MAINTAIN_MICROPHONE}
        type="button"
        className={`icon-microphone ${isButtonPressedRef.current ? 'active-microphone' : ''}`}
        icon={icons?.microphone}
        onMouseDown={handleMicrophoneDown}
        onMouseUp={handleMicrophoneUp}
        onTouchStart={handleMicrophoneDown}
        onTouchEnd={handleMicrophoneUp}
        onMouseLeave={handleMicrophoneUp}
      />

      {isRecord && !isMuted && (
        <IconButton
          type="button"
          className="icon-stop"
          icon={icons?.stop}
          onClick={stopRecording}
        />
      )}
    </>
  );
}
