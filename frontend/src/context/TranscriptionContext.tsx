import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { WebSocketFront } from '../services/Transcription/webSocket.class';

type TranscriptionContextProviderAttributes = {
  startTranscription: () => void;
  stopTranscription: () => void;
  settingsMicrophone: () => void;
  selectedMicrophone: (microphone: string) => void;
  stateOpenModal: () => void;
  listMicrophones: any[];
  isOpenModal: boolean;
  userSelectedMicrophone: boolean;
  userMicrophone: any;
  returnMessage: any;
  isRecord: boolean;
};

const TranscriptionContext = createContext<
  TranscriptionContextProviderAttributes | undefined
>(undefined);

function TranscriptionContextProvider({ children }: { children: ReactNode }) {
  const [listMicrophones, setListMicrophones] = useState<any>([]);
  const [userMicrophone, setUserMicrophone] = useState<any>();
  const [messages, setMessages] = useState<any>();
  const [returnMessage, setReturnMessage] = useState<any>('');
  const [isRecord, setIsRecord] = useState<boolean>(false);

  const [userSelectedMicrophone, setUserSelectedMicrophone] =
    useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const wsTranscriptionRef = useRef<WebSocketFront | null>(null);

  useEffect(() => {
    setIsOpenModal(false);
    setUserSelectedMicrophone(false);
  }, []);

  useEffect(() => {
    if (messages?.message?.transcript?.[0]?.[1]) {
      console.log(
        '🚀 ~ useEffect ~ message?.message?.transcript?.[0]?.[1]:',
        messages?.message?.transcript?.[0]?.[1]
      );
      setReturnMessage(messages?.message?.transcript?.[0]?.[1]);
    }
  }, [messages]);

  function startTranscription() {
    wsTranscriptionRef.current = new WebSocketFront(
      `${import.meta.env.VITE_WS_API_CHATBOT}`,
      userMicrophone.id,
      (message: any) => {
        console.log('message', message);
        setMessages(message);
      }
    );
    setIsRecord(!isRecord);
    wsTranscriptionRef.current.startWebsocketApi();
  }

  function stopTranscription() {
    setIsRecord(!isRecord);
    wsTranscriptionRef.current?.closeWebsocketApi();
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
    if (!userSelectedMicrophone) {
      stateOpenModal();
      initializeAudioDevices();
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
        stopTranscription,
        settingsMicrophone,
        selectedMicrophone,
        stateOpenModal,
        listMicrophones,
        isOpenModal,
        userSelectedMicrophone,
        userMicrophone,
        returnMessage,
        isRecord,
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
}

export { TranscriptionContext, TranscriptionContextProvider };
