import { TranslateAttributes } from '../languages/translate.type';
import { MessageAttributes } from '../messages/messages.type';

export type ChatContextAttributes = {
  isRestart: boolean;
  selectedRestart: () => void;
  isStart: boolean;
  verifyStartChat?: () => void;
  messages: MessageAttributes[];
  requestChatConversation: (userContent: string) => void;
  stockMessageUser: (userContent: string) => void;
  stockMessageUserTranscription: (userContent: string) => void;
  stockMessageAssistantTranscription: (reponseChatConversation: any) => void;
  reformulateChatConversation: () => void;
  endConversation: () => void;
  procedures: any;
  sendFeedback: (comment: string) => void;
  whoIsWritten: (role: string) => void;
  isUserWritten: boolean;
  isBotWritten: boolean;
  messageLoading: string;
  setVoteUser: (vote: number) => void;
};

export type LanguageContextAttributes = {
  isSelectLanguage: boolean;
  userLanguage: TranslateAttributes | null;
  selectedLanguage: string;
  selectLanguage: (value: string) => void;
};

export type NotifacationContextAttributes = {
  messageNotification: string;
  getMessageToNotification: (status: number, message: string) => void;
  isOpen: boolean;
  changeStatutNotification: (value: boolean) => void;
};

export type TranscriptionContextProviderAttributes = {
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