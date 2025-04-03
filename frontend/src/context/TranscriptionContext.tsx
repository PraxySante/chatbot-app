import { createContext, ReactNode, useRef, useState } from 'react';
import { WebSocketFront } from '../services/Transcription/webSocket.class';
import useRecaptcha from '../hooks/RecaptchaProvider';

type TranscriptionContextProviderAttributes = {
  startTranscription: () => void;
  muteTranscription: () => void;
  stopTranscription: () => void;
  settingsMicrophone: () => void;
  selectedMicrophone: (microphone: string) => void;
  stateOpenModal: () => void;
  listMicrophones: any[];
  isOpenModal: boolean;
  userSelectedMicrophone: boolean;
  userMicrophone: any;
  messagesUser: any;
  messagesLLM: any;
  messagesError: any;
  isRecord: boolean;
  isMuted: boolean;
};

const TranscriptionContext = createContext<
  TranscriptionContextProviderAttributes | undefined
>(undefined);

function TranscriptionContextProvider({ children, useRecaptcha} :any ) {

  const { isHuman } = useRecaptcha();

  const [listMicrophones, setListMicrophones] = useState<any>([]);
  const [userMicrophone, setUserMicrophone] = useState<any>();
  const [messagesUser, setMessagesUser] = useState<any>();
  const [messagesLLM, setMessagesLLM] = useState<any>();
  const [messagesError, setMessagesError] = useState<any>();


  const [isRecord, setIsRecord] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);


  const [userSelectedMicrophone, setUserSelectedMicrophone] =
    useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const wsTranscriptionRef = useRef<WebSocketFront | null>(null);

  if (!useRecaptcha) {
    throw new Error(
      'useRecaptcha was not provided to RecaptchaContextProvider'
    );
  }

  async function startTranscription() {
    if (isHuman) {      
      wsTranscriptionRef.current = new WebSocketFront(
        `${import.meta.env.VITE_WS_API_CHATBOT}`,
        userMicrophone.id,
        (message: any) => {
          setMessagesUser(message);
        },
        (message: any) => {
          setMessagesLLM(message);
        },
        (message: any) => {
          setMessagesError(message);
        }
      );
      setIsRecord(!isRecord);
      await wsTranscriptionRef.current.startWebsocketApi();
      muteTranscription()
    }
  }

  function stopTranscription() {
    setIsRecord(!isRecord);
    wsTranscriptionRef.current?.closeWebsocketApi();
  }

  function muteTranscription() {
    setIsMuted(!isMuted)
    wsTranscriptionRef.current?.muteWebsocketApi(!isMuted);
  }

  async function populateListMicrophone() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const devicesAudioInput = devices
      .filter((device) => device.kind === 'audioinput')
      .map((device) => {
        return {
          id: device.deviceId,
          label: device.label || `microphone-${device.deviceId}`,
        };
      });
      setListMicrophones(devicesAudioInput);
      setUserMicrophone(devicesAudioInput[0]);
    } catch (error) {
      console.error('Error getting audio devices:', error);
    }
  }

  async function initializeAudioDevices() {
    try {
      // Get initial audio permission to see device labels
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop the test stream
      await populateListMicrophone();
    } catch (error) {
      console.error('Error initializing audio devices:', error);
    }
  }

  function settingsMicrophone() {
    initializeAudioDevices();
    if (!userSelectedMicrophone) {
      //stateOpenModal();
    }
  }

  function stateOpenModal() {
    setIsOpenModal(!isOpenModal);
  }

  function selectedMicrophone(microphoneLabel: any) {
    setUserSelectedMicrophone(!userSelectedMicrophone);
    const foundMicrophone = listMicrophones.filter((microphone: any) => {
      return microphone.label === microphoneLabel;
    });
    setUserMicrophone(foundMicrophone[0]);
  }
  return (
    <TranscriptionContext.Provider
      value={{
        startTranscription,
        muteTranscription,
        stopTranscription,
        settingsMicrophone,
        selectedMicrophone,
        stateOpenModal,
        listMicrophones,
        isOpenModal,
        userSelectedMicrophone,
        userMicrophone,
        messagesUser,
        messagesLLM,
        messagesError,
        isRecord,
        isMuted,
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
}

export { TranscriptionContext, TranscriptionContextProvider };
