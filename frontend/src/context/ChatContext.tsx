import { useAuth0 } from '@auth0/auth0-react';
import { createContext, useEffect, useState } from 'react';
import { MessageAttributes } from '../types/messages/messages.type';
import { useLanguage } from '../hooks/UseLanguage';
import { MessageType, SourceType } from '../types/chatbot/chatbot.type';
import { pingPongChat } from '../services/ChatBot/pingChat.service';
import { requestApiFrontChatBot } from '../services/ChatBot/requestApiFrontChatBot.service';
import { startApiFrontChatBot } from '../services/ChatBot/startApiFrontChatBot.service';
import { sendMessageApiFrontChatBot } from '../services/ChatBot/sendMessageApiFronChatBot.service';
import { reformulateChat } from '../services/ChatBot/reformulateChat.service';
import { endChat } from '../services/ChatBot/endChat.service';
import { feedbackApiFrontChatBot } from '../services/ChatBot/feedbackApiFrontChatBot.service';
import { ChatContextAttributes } from '../types/provider/provider.type';
import { restartChat } from '../services/ChatBot/restartChat.service';
import {
  ERROR_TYPE_FAILURE,
  ERROR_USE_NOTIFICATION,
  ERROR_USE_RECAPTCHA,
  STATUS_SUCCESS,
} from '../constants/notifications.constants';
import {
  DOC_TYPE_REFORMULATE,
  ROLE_ASSISTANT,
  ROLE_ASSISTANT_TRANSCRIBE,
  ROLE_NONE,
  ROLE_USER,
  ROLE_USER_MICROPHONE,
  ROLE_USER_TEXT,
} from '../constants/chat.constants';
import { useClient } from '../hooks/ClientProvider';

const ChatContext = createContext<ChatContextAttributes | undefined>(undefined);

function ChatContextProvider({
  children,
  useRecaptcha,
  useNotification,
  useTranscription,
}: any) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { selectedLanguage, userLanguage } = useLanguage();
  const { getMessageToNotification } = useNotification();
  const { messagesUser, messagesLLM, messagesError } = useTranscription();

  const { isHuman } = useRecaptcha();
  const { configClient } = useClient();

  const [uuidSession, setUuidSession] = useState<string>('');
  const [isRestart, setIsRestart] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageAttributes[]>([]);
  const [historyChat, setHistoryChat] = useState<MessageType[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);

  const [vote, setVote] = useState<number>(0);
  const [isUserWritten, setIsUserWritten] = useState<boolean>(false);
  const [isBotWritten, setIsBotWritten] = useState<boolean>(false);
  const [messageLoading, setMessageLoading] = useState<string>('');

  if (!useRecaptcha) {
    throw new Error(ERROR_USE_RECAPTCHA);
  }

  if (!useNotification) {
    throw new Error(ERROR_USE_NOTIFICATION);
  }

  useEffect(() => {
    async function start() {
      await startConversation();
    }
    isHuman ? start() : null;
  }, [isHuman]);

  useEffect(() => {
    // ambiant mode : messagesUser?.message?.transcript?.[0]?.[1]
    if (messagesUser?.message?.transcript) {
      stockMessageUserTranscription(messagesUser?.message?.transcript);
    }
  }, [messagesUser]);

  useEffect(() => {
    if (messagesLLM) {
      stockMessageAssistantTranscription(messagesLLM);
    }
  }, [messagesLLM]);

  useEffect(() => {
    if (messagesError) {
      if (
        messagesError.type === ERROR_TYPE_FAILURE.toLowerCase() ||
        messagesError.type === ERROR_TYPE_FAILURE
      ) {
        getMessageToNotification(
          messagesError.data.status,
          messagesError.data.details
        );
        return;
      }
    }
  }, [messagesError]);

  function whoIsWritten(role: string): void {
    switch (role) {
      case ROLE_ASSISTANT:
        setIsBotWritten(true);
        setIsUserWritten(false);
        setMessageLoading(
          userLanguage ? userLanguage?.chat_loading_msg_assistant : ''
        );
        break;
      case ROLE_ASSISTANT_TRANSCRIBE:
        setIsUserWritten(true);
        setIsBotWritten(false);
        setMessageLoading(
          userLanguage ? userLanguage?.chat_loading_retranscribe_assistant : ''
        );
        break;
      case ROLE_USER_TEXT:
        setIsUserWritten(true);
        setIsBotWritten(false);
        setMessageLoading(
          userLanguage ? userLanguage?.chat_loading_write_user : ''
        );
        break;
      case ROLE_USER_MICROPHONE:
        setIsUserWritten(true);
        setIsBotWritten(false);
        setMessageLoading(
          userLanguage ? userLanguage?.chat_loading_speak_user : ''
        );
        break;
      case ROLE_NONE:
        setMessageLoading('');
        setIsBotWritten(false);
        setIsUserWritten(false);
        break;
      default:
        setMessageLoading('');
        setIsBotWritten(false);
        setIsUserWritten(false);
        break;
    }
  }

  async function selectedRestart(selectedLanguage?: string): Promise<void> {
    setIsStart(!isStart);
    setHistoryChat([]);
    setProcedures([]);
    setMessages([]);
    setIsRestart(!isRestart);
    getMessageToNotification(STATUS_SUCCESS, userLanguage?.success_msg_session);
    await restartConversation(selectedLanguage);
  }

  async function verifyStartChat(): Promise<void> {
    setIsStart(!isStart);
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      localStorage.setItem('authToken', token);
    }
  }

  async function startConversation() {
    const responseApi: any = await pingPongChat();

    if (responseApi.message === ERROR_TYPE_FAILURE.toLowerCase()) {
      getMessageToNotification(responseApi.status, responseApi.details);
      return;
    }

    if (responseApi) {
      const responseRequest: any =
        await requestApiFrontChatBot(selectedLanguage);

      if (responseRequest.message === ERROR_TYPE_FAILURE.toLowerCase()) {
        getMessageToNotification({
          status: responseRequest.status,
          message: responseRequest.details,
        });
        return;
      }

      if (responseRequest) {
        setUuidSession(responseRequest);

        const responseStartChat: any = await startApiFrontChatBot(
          selectedLanguage
        );

        if (responseStartChat.message === ERROR_TYPE_FAILURE.toLowerCase()) {
          getMessageToNotification({
            status: responseStartChat.status,
            message: responseStartChat.details,
          });
          return;
        }

        updateMessages([
          {
            id: 0,
            role: `${responseStartChat.role}`,
            content: `${responseStartChat.content}`,
            date: new Date().toLocaleTimeString(selectedLanguage),
          },
        ]);

        updateHistoryChat([
          {
            role: `${responseStartChat.role}`,
            content: `${responseStartChat.content}`,
          },
        ]);
      }
    }
  }

  async function restartConversation(userSelectedLanguage?: string) {
    const responseRequest: any = await restartChat(
      uuidSession,
      userSelectedLanguage ? userSelectedLanguage : selectedLanguage
    );

    if (responseRequest.message === ERROR_TYPE_FAILURE.toLowerCase()) {
      getMessageToNotification({
        status: responseRequest.status,
        message: responseRequest.details,
      });
      return;
    }

    updateMessages([
      {
        id: 0,
        role: `${responseRequest.role}`,
        content: `${responseRequest.content}`,
        date: new Date().toLocaleTimeString(selectedLanguage),
      },
    ]);

    updateHistoryChat([
      {
        role: `${responseRequest.role}`,
        content: `${responseRequest.content}`,
      },
    ]);
  }

  async function stockMessageUser(userContent: any) {
    let lengthMessage = messages.length + 1;

    const newMessages: MessageAttributes[] = [
      {
        id: lengthMessage,
        role: ROLE_USER,
        content: userContent,
        date: new Date().toLocaleTimeString(selectedLanguage),
      },
    ];
    updateMessages(newMessages);
    updateHistoryChat(newMessages);
    await requestChatConversation(userContent);
  }

  async function stockMessageUserTranscription(userContent: any) {
    let lengthMessage = messages.length + 1;

    const newMessages: MessageAttributes[] = [
      {
        id: lengthMessage,
        role: ROLE_USER,
        content: userContent,
        date: new Date().toLocaleTimeString(selectedLanguage),
      },
    ];
    updateMessages(newMessages);
    updateHistoryChat(newMessages);
    whoIsWritten(ROLE_ASSISTANT);
  }

  async function stockMessageAssistantTranscription(
    responseChatConversation: any
  ) {
    let lengthMessage = messages.length + 1;

    if (
      responseChatConversation.data.message === ERROR_TYPE_FAILURE.toLowerCase()
    ) {
      getMessageToNotification(
        responseChatConversation.data.status,
        responseChatConversation.data.details
      );
      return;
    }

    const newMessages: MessageAttributes[] = [
      {
        id: lengthMessage + 1,
        role: responseChatConversation.data.details.role,
        content: responseChatConversation.data.details.content,
        date: new Date().toLocaleTimeString(selectedLanguage),
      },
    ];

    if (responseChatConversation.data.sources) {
      responseChatConversation.data.sources.map((source: SourceType) => {
        lengthMessage++;
        const sourceProcedures = {
          id: lengthMessage,
          role: responseChatConversation.data.details.role,
          content: source.doc_name,
          doc_type: source.doc_type,
          doc_ref: source.doc_ref,
          url: source.url,
          date: new Date().toLocaleTimeString(selectedLanguage),
        };
        newMessages.push(sourceProcedures);
        if (messages.length > 0) {
          setProcedures((prevHistoryChat) => {
            return [...prevHistoryChat, ...[sourceProcedures]];
          });
        } else {
          setProcedures(() => {
            return [...messages, ...[sourceProcedures]];
          });
        }
      });
      updateMessages(newMessages);
    }

    updateHistoryChat([
      {
        role: `${responseChatConversation.data.details.role}`,
        content: `${responseChatConversation.data.details.content}`,
      },
    ]);
    whoIsWritten(ROLE_NONE);
  }

  async function requestChatConversation(userContent: string) {
    let lengthMessage = messages.length + 1;

    const responseChatConversation: any = await sendMessageApiFrontChatBot(
      historyChat,
      {
        role: ROLE_USER,
        content: userContent,
      },
      uuidSession,
      selectedLanguage
    );

    if (responseChatConversation.message === ERROR_TYPE_FAILURE.toLowerCase()) {
      getMessageToNotification(
        responseChatConversation.status,
        responseChatConversation.details
      );
      return;
    }

    const newMessages: MessageAttributes[] = [
      {
        id: lengthMessage + 1,
        role: responseChatConversation.details.role,
        content: responseChatConversation.details.content,
        date: new Date().toLocaleTimeString(selectedLanguage),
      },
    ];

    if (responseChatConversation.sources) {
      responseChatConversation.sources.map((source: SourceType) => {
        lengthMessage++;
        const sourceProcedures = {
          id: lengthMessage,
          role: responseChatConversation.details.role,
          content: source.doc_name,
          doc_type: source.doc_type,
          doc_ref: source.doc_ref,
          url: source.url,
          date: new Date().toLocaleTimeString(selectedLanguage),
        };
        newMessages.push(sourceProcedures);
        if (messages.length > 0) {
          setProcedures((prevHistoryChat) => {
            return [...prevHistoryChat, ...[sourceProcedures]];
          });
        } else {
          setProcedures(() => {
            return [...messages, ...[sourceProcedures]];
          });
        }
      });
      updateMessages(newMessages);
    }

    updateHistoryChat([
      {
        role: `${responseChatConversation.details.role}`,
        content: `${responseChatConversation.details.content}`,
      },
    ]);
  }

  async function reformulateChatConversation() {
    let lengthMessage = messages.length;

    whoIsWritten(ROLE_ASSISTANT);

    const propositionChatConversation: any = await reformulateChat(
      uuidSession,
      selectedLanguage
    );

    if (
      propositionChatConversation.message === ERROR_TYPE_FAILURE.toLowerCase()
    ) {
      getMessageToNotification(
        propositionChatConversation.status,
        propositionChatConversation.details
      );
      return;
    }

    const newMessages: MessageAttributes[] = [];
    newMessages.push({
      id: lengthMessage++,
      role: ROLE_ASSISTANT,
      content: userLanguage ? userLanguage?.chat_msg_reformulate : '',
      date: new Date().toLocaleTimeString(selectedLanguage),
    });
    propositionChatConversation.map((proposition: MessageType) => {
      lengthMessage++;
      newMessages.push({
        id: lengthMessage,
        role: proposition.role,
        content: proposition.content,
        doc_type: DOC_TYPE_REFORMULATE,
        date: new Date().toLocaleTimeString(selectedLanguage),
      });
    });

    updateMessages(newMessages);
    whoIsWritten(ROLE_NONE);
  }

  function setVoteUser(vote: number) {
    setVote(vote);
  }

  async function sendFeedback(comment: string) {
    const responseApi: any = await feedbackApiFrontChatBot(
      vote,
      comment,
      uuidSession,
      selectedLanguage
    );
    if (responseApi.message === ERROR_TYPE_FAILURE.toLowerCase()) {
      getMessageToNotification(responseApi.status, responseApi.details);
      return;
    } else {
      getMessageToNotification(
        STATUS_SUCCESS,
        userLanguage?.success_msg_feedback
      );
    }
  }

  async function endConversation() {
    const responseApi: any = await endChat(uuidSession, selectedLanguage);
    if (responseApi.message === ERROR_TYPE_FAILURE.toLowerCase()) {
      getMessageToNotification(responseApi.status, responseApi.details);
      return;
    } else {
      getMessageToNotification(
        STATUS_SUCCESS,
        userLanguage?.success_msg_close_connection
      );
    }
  }

  function updateMessages(newMessage: MessageAttributes[]) {
    if (messages.length > 0) {
      setMessages((prevHistoryChat) => {
        return [...prevHistoryChat, ...newMessage];
      });
    } else {
      setMessages(() => {
        return [...messages, ...newMessage];
      });
    }
  }

  function updateHistoryChat(newMessage: MessageType[]) {
    if (messages.length > 0) {
      setHistoryChat((prevHistoryChat) => {
        return [...prevHistoryChat, ...newMessage];
      });
    } else {
      setHistoryChat(() => {
        return [...messages, ...newMessage];
      });
    }
  }

  return (
    <>
      {configClient.authAccountOption ? (
        <>
          <ChatContext.Provider
            value={{
              isRestart,
              selectedRestart,
              isStart,
              verifyStartChat,
              messages,
              requestChatConversation,
              stockMessageUser,
              stockMessageUserTranscription,
              stockMessageAssistantTranscription,
              reformulateChatConversation,
              endConversation,
              procedures,
              sendFeedback,
              whoIsWritten,
              isUserWritten,
              isBotWritten,
              messageLoading,
              setVoteUser,
              uuidSession,
            }}
          >
            {children}
          </ChatContext.Provider>
        </>
      ) : (
        <ChatContext.Provider
          value={{
            isRestart,
            selectedRestart,
            isStart,
            messages,
            requestChatConversation,
            stockMessageUser,
            stockMessageUserTranscription,
            stockMessageAssistantTranscription,
            reformulateChatConversation,
            endConversation,
            procedures,
            sendFeedback,
            whoIsWritten,
            isUserWritten,
            isBotWritten,
            messageLoading,
            setVoteUser,
            uuidSession,
          }}
        >
          {children}
        </ChatContext.Provider>
      )}
    </>
  );
}

export { ChatContextProvider, ChatContext };
