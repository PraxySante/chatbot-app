import { createContext, useRef, useState } from 'react';
import { WebSocketFront } from '../services/Transcription/webSocket.class';
import { TranscriptionContextProviderAttributes } from '../types/provider/provider.type';
import { ERROR_USE_RECAPTCHA, STATUS_ERROR_SERVER } from '../constants/notifications.constants';
import { ReponseFailureType } from '../types/chatbot/chatbot.type';
import { transcribeAudio } from '../services/Transcription/transcription.service';

const TranscriptionContext = createContext<
  TranscriptionContextProviderAttributes | undefined
>(undefined);

function TranscriptionContextProvider({
  children,
  useNotification,
  useRecaptcha,
}: any) {
  const { isHuman } = useRecaptcha();
  const { getMessageToNotification } = useNotification();

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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  if (!useRecaptcha) {
    throw new Error(ERROR_USE_RECAPTCHA);
  }

  async function startTranscription(hostname: string, uuidSession: string) {
    let wsUrl: string = '';
    switch (true) {
      case hostname.includes(import.meta.env.VITE_HOST_FOCH):
        wsUrl = import.meta.env.VITE_WS_API_CHATBOT_FOCH;
        break;
      case hostname.includes(import.meta.env.VITE_HOST_AHP):
        wsUrl = import.meta.env.VITE_WS_API_CHATBOT_AHP;
        break;
      case hostname.includes(import.meta.env.VITE_HOST_HPSJ):
        wsUrl = import.meta.env.VITE_WS_API_CHATBOT_HPSJ;
        break;
      case hostname.includes(import.meta.env.VITE_HOST_ENNOV):
        wsUrl = import.meta.env.VITE_WS_API_CHATBOT_ENNOV;
        break;
      default:
        wsUrl = import.meta.env.VITE_WS_API_CHATBOT_DEV;
        break;
    }

    if (isHuman) {
      wsTranscriptionRef.current = new WebSocketFront(
        `${wsUrl}?uuidSession=${uuidSession}`,
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
      //await wsTranscriptionRef.current.startWebsocketApi();
      //muteTranscription();
    }
  }

  function stopTranscription() {
    setIsRecord(!isRecord);
    setMessagesLLM(null);
    setMessagesError(null);
    //wsTranscriptionRef.current?.closeWebsocketApi();
  }

  function muteTranscription() {
    setIsMuted(!isMuted);
    wsTranscriptionRef.current?.muteWebsocketApi(!isMuted);
  }

  async function startRecordingAudioToTranscription() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
      setIsRecord(true);
    } catch (err) {
      console.error('Erreur accès micro :', err);
    }
  }

  async function stopRecordingAudioToTranscription(
    /*isSuperTrainer: boolean,*/
    uuidSession: string
  ) {
    return new Promise<string>((resolve, reject) => {
      if (!mediaRecorderRef.current) {
        getMessageToNotification(
          STATUS_ERROR_SERVER,
          'Missing audio in-progress'
        );
        return reject(new Error('Missing audio in-progress'));
      }

      mediaRecorderRef.current.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: 'audio/webm',
          });
          const arrayBuffer = await audioBlob.arrayBuffer();

          const audioContext = new AudioContext({ sampleRate: 16000 });
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          const audioFloatArray = audioBuffer.getChannelData(0);

          const response: string | ReponseFailureType = await transcribeAudio(
            audioFloatArray,
            uuidSession
          );

          if (typeof response === 'string') {
            resolve(response);
          } else {
            getMessageToNotification(response.status, response.message);
            return reject(new Error('Missing audio in-progress'));
          }
          // Message transcribe send auto to api LLM
          // if (isSuperTrainer) {
          //   setMessagesUserTranscriptionTrainer(response);
          //   return;
          // }
          // setMessagesUserTranscriptionChat(response);
        } catch (error: any) {
          getMessageToNotification(error.status, error.message);
          console.error('Erreur lors de la transcription audio :', error);
          reject(error);
        }
      };

      mediaRecorderRef.current.stop();
      setIsRecord(false);
    });
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
        startRecordingAudioToTranscription,
        stopRecordingAudioToTranscription,
      }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
}

export { TranscriptionContext, TranscriptionContextProvider };
