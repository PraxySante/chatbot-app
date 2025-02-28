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

const ChatContext = createContext<ChatContextAttributes | undefined>(undefined);

function ChatContextProvider({ children, useNotification, useTranscription }: any) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { selectedLanguage } = useLanguage();
  const { getMessageToNotification } = useNotification();
  const { messagesUser, messagesLLM, messagesError } = useTranscription();

  const [isRestart, setIsRestart] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageAttributes[]>([]);
  const [historyChat, setHistoryChat] = useState<MessageType[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);

  const [vote, setVote] = useState<number>(0);
  const [isUserWritten, setIsUserWritten] = useState<boolean>(false);
  const [isBotWritten, setIsBotWritten] = useState<boolean>(false);

  if (!useNotification) {
    throw new Error(
      'useNotification was not provided to NotificationContentProvider'
    );
  }

  useEffect(() => {
    async function start() {
      await startConversation();
    }
    start();
  }, []);

  useEffect(() => {
    if (messagesUser?.message?.transcript?.[0]?.[1]) {
      stockMessageUserTranscription(messagesUser?.message?.transcript?.[0]?.[1]);
    }
  }, [messagesUser]);

  useEffect(() => {
    if (messagesLLM) {
      stockMessageAssistantTranscription(messagesLLM);
    }
  }, [messagesLLM]);

  useEffect(() => {
    if (messagesError) {
      if (messagesError.type === 'failure') {
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
      case 'assistant':
        setIsBotWritten(true);
        break;
      case 'user':
        setIsUserWritten(true);
        break;
      case 'none':
        setIsBotWritten(false);
        setIsUserWritten(false);
        break;
      default:
        setIsBotWritten(false);
        setIsUserWritten(false);
        break;
    }
  }

  async function selectedRestart(): Promise<void> {
    setIsStart(!isStart);
    setHistoryChat([]);
    setProcedures([]);
    setMessages([]);
    setIsRestart(!isRestart);
    getMessageToNotification(200, 'Nouvelle session démarrée');
    await startConversation();
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

    if (responseApi.message === 'failure') {
      getMessageToNotification(responseApi.status, responseApi.details);
      return;
    }

    if (responseApi) {
      const responseRequest: any = await requestApiFrontChatBot();

      if (responseRequest.message === 'failure') {
        getMessageToNotification({
          status: responseApi.status,
          message: responseRequest.details,
        });
        return;
      }

      if (responseRequest === 'Success connection') {
        const responseStartChat: any = await startApiFrontChatBot();

        if (responseStartChat.message === 'failure') {
          getMessageToNotification({
            status: responseApi.status,
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

  async function stockMessageUser(userContent: any) {
    let lengthMessage = messages.length + 1;

    const newMessages: MessageAttributes[] = [
      {
        id: lengthMessage,
        role: 'user',
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
        role: 'user',
        content: userContent,
        date: new Date().toLocaleTimeString(selectedLanguage),
      },
    ];
    updateMessages(newMessages);
    updateHistoryChat(newMessages);
  }

  async function stockMessageAssistantTranscription(
    responseChatConversation: any
  ) {
    let lengthMessage = messages.length + 1;

    if (responseChatConversation.data.message === 'failure') {
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
  }

  async function requestChatConversation(userContent: string) {
    let lengthMessage = messages.length + 1;

    const responseChatConversation: any = await sendMessageApiFrontChatBot(
      historyChat,
      {
        role: 'user',
        content: userContent,
      }
    );

    if (responseChatConversation.message === 'failure') {
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

    whoIsWritten('assistant');

    const propositionChatConversation: any = await reformulateChat();

    if (propositionChatConversation.message === 'failure') {
      getMessageToNotification(
        propositionChatConversation.status,
        propositionChatConversation.details
      );
      return;
    }

    const newMessages: MessageAttributes[] = [];
    newMessages.push({
      id: lengthMessage++,
      role: 'assistant',
      content:
        "Il semble que j'ai mal interprété votre question. Je vais essayer de reformuler votre question pour mieux répondre à vos attentes. Voici 3 propositions de questions similaires à votre question, cliquez sur celle qui correspond au mieux à ce que vous avez en tête :",
      date: new Date().toLocaleTimeString(selectedLanguage),
    });
    propositionChatConversation.map((proposition: MessageType) => {
      lengthMessage++;
      newMessages.push({
        id: lengthMessage,
        role: proposition.role,
        content: proposition.content,
        doc_type: 'reformulate',
        date: new Date().toLocaleTimeString(selectedLanguage),
      });
    });

    updateMessages(newMessages);
    whoIsWritten('none');
  }

  function setVoteUser(vote: number) {
    setVote(vote);
  }

  async function sendFeedback(comment: string) {
    const responseApi: any = await feedbackApiFrontChatBot(vote, comment);
    if (responseApi.message === 'failure') {
      getMessageToNotification(responseApi.status, responseApi.details);
      return;
    } else {
      getMessageToNotification(200, 'Feedback envoyé');
    }
  }

  async function endConversation() {
    const responseApi: any = await endChat();
    if (responseApi.message === 'failure') {
      getMessageToNotification(responseApi.status, responseApi.details);
      return;
    } else {
      getMessageToNotification(200, 'Conversation clôturée');
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
      {import.meta.env.VITE_OPT_AUT0_ACCOUNT ? (
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
              setVoteUser,
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
            setVoteUser,
          }}
        >
          {children}
        </ChatContext.Provider>
      )}
    </>
  );
}

export { ChatContextProvider, ChatContext };
