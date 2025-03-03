import { useEffect, useState } from 'react';
import { useLanguage } from '../../hooks/UseLanguage';
import Input from '../../components/Inputs/Input';

import { useChat } from '../../hooks/ChatProvider';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';
import useTranscription from '../../hooks/TranscriptionProvider';
import { Visualizer } from 'react-sound-visualizer';

export default function InputMessage() {
  // Init component
  const {
    settingsMicrophone,
    userSelectedMicrophone,
    isRecord,
    stopTranscription,
    startTranscription,
    muteTranscription,
    isMuted
  } = useTranscription();
  // Hook state to get message written by user and bot
  const [userContent, setUserContent] = useState<string>('');
  // Check selected language
  const { userLanguage } = useLanguage();
  const { stockMessageUser, whoIsWritten } = useChat();

  const [audio, setAudio] = useState<MediaStream | null>(null);
  const [widthUser, setWidthUser] = useState<any>();
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

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
      whoIsWritten('user');
    } else {
      whoIsWritten('none');
    }
  }

  // Function sending message after press enter
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

  async function SelectMicrophone() {
    //Microphone not selected
    if (!userSelectedMicrophone) {
      await settingsMicrophone();
    }
  }

  async function handleMicrophoneDown(): Promise<void> {
    if (!userSelectedMicrophone) {
      return;
    }
    
    setIsButtonPressed(true);
    
    if (!isRecord) {
      await startTranscription();
    } else if (isMuted) {
      whoIsWritten('user');
      await muteTranscription();
    }
    

  }

  async function handleMicrophoneUp(): Promise<void> {
    if (!userSelectedMicrophone) {
      return;
    }
    
    setIsButtonPressed(false);
    
    if (isRecord && !isMuted) {
      whoIsWritten('none');
      await muteTranscription();
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
              type="submit"
              className="icon-send-message"
              icon={icons?.sendMessage}
              onClick={(e) => sendMessage(e)}
            />
          </>
        )}
      </form>
      <IconButton
        type="button"
        className={`icon-microphone ${isButtonPressed ? 'active-microphone' : ''}`}
        icon={icons?.microphone}
        onClick={!userSelectedMicrophone ? SelectMicrophone : undefined}
        onMouseDown={handleMicrophoneDown}
        onMouseUp={handleMicrophoneUp}
        onTouchStart={handleMicrophoneDown}
        onTouchEnd={handleMicrophoneUp}
        onMouseLeave={isButtonPressed ? handleMicrophoneUp : undefined}
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
