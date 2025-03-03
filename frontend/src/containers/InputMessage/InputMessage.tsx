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
  } = useTranscription();
  // Hoo state to get message written by user and bot
  const [userContent, setUserContent] = useState<string>('');
  // Check selected language
  const { userLanguage } = useLanguage();
  const { stockMessageUser, whoIsWritten } = useChat();

  const [audio, setAudio] = useState<MediaStream | null>(null);
  const [widthUser, setWidthUser] = useState<any>();

  useEffect(() => {
    const width = document.querySelector('.container-input')?.clientWidth;
    width && setWidthUser(width);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then(setAudio);
  }, [isRecord, widthUser]);

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

  async function sendTranscription(): Promise<void> {
    if (!userSelectedMicrophone) {
      settingsMicrophone();
    } else {
      startTranscription();
    }
  }

  async function stop() {
    stopTranscription();
  }

  async function mute() {
    muteTranscription();
  }

  return (
    <>
      <form className="container-input">
        {isRecord ? (
          <Visualizer
            audio={audio}
            mode="continuous"
            autoStart={isRecord ? true : false}
            strokeColor="green"
          >
            {({ canvasRef }) => (
              <>
                <canvas
                  ref={canvasRef}
                  width={widthUser}
                  height={50}
                  className=".container-input_vizualizer"
                />
              </>
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
      {isRecord ? (
        <IconButton
          type="submit"
          className="icon-mute"
          icon={icons?.neutral}
          onClick={() => mute()}
        />
      ) : null}
      <IconButton
        type="submit"
        className="icon-microphone"
        icon={icons?.microphone}
        onClick={() => (!isRecord ? sendTranscription() : stop())}
      />
    </>
  );}
