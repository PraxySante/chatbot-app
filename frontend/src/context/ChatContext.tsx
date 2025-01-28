import { useAuth0 } from '@auth0/auth0-react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { MessageAttributes } from '../types/messages/messages.type';
import { useLanguage } from '../hooks/UseLanguage';
import { MessageType, SourceType } from '../types/chatbot/chatbot.type';
import { pingPongChat } from '../services/ChatBot/pingChat.service';
import { requestApiFrontChatBot } from '../services/ChatBot/requestApiFrontChatBot.service';
import { startApiFrontChatBot } from '../services/ChatBot/startApiFrontChatBot.service';
import { sendMessageApiFrontChatBot } from '../services/ChatBot/sendMessageApiFronChatBot.service';
import { reformulateChat } from '../services/ChatBot/reformulateChat.service';
import { endChat } from '../services/ChatBot/endChat.service';

export type ChatContextAttributes = {
  isRestart: boolean;
  selectedRestart: () => void;
  isStart: boolean;
  verifyStartChat?: () => void;
  messages: MessageAttributes[];
  requestChatConversation: (userContent: string) => void;
  stockMessageUser: (userContent: string) => void;
  reformulateChatConversation: () => void;
  endConversation: () => void;
  procedures: any;
};

const ChatContext = createContext<ChatContextAttributes | undefined>(undefined);

function ChatContextProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { selectedLanguage } = useLanguage();
  const [isRestart, setIsRestart] = useState<boolean>(false);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageAttributes[]>([]);
  const [historyChat, setHistoryChat] = useState<MessageType[]>([]);
  const [procedures, setProcedures] = useState<any[]>([]);

  useEffect(() => {
    async function start() {
      await startConversation();
    }
    start();
  }, []);

  function selectedRestart(): void {
    setIsStart(!isStart);
    setIsRestart(!isRestart);
  }

  async function verifyStartChat(): Promise<void> {
    setIsStart(!isStart);
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      localStorage.setItem('authToken', token);
    }
  }

  async function startConversation() {
    const responseApi = await pingPongChat();

    if (responseApi) {
      const responseRequest = await requestApiFrontChatBot();

      if (responseRequest === 'Success connection') {
        const responseStartChat = await startApiFrontChatBot();

        if ('role' in responseStartChat && 'content' in responseStartChat) {
          updateMessages([
            {
              id: 0,
              role: `${responseStartChat.role}`,
              content: `${responseStartChat.content}`,
              date: new Date().toLocaleDateString(selectedLanguage),
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
  }

  async function stockMessageUser(userContent: string) {
    let lengthMessage = messages.length + 1;

    const newMessages: MessageAttributes[] = [
      {
        id: lengthMessage,
        role: 'user',
        content: userContent,
        date: new Date().toLocaleDateString(selectedLanguage),
      },
    ];
    updateMessages(newMessages);
    updateHistoryChat(newMessages);
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

    const newMessages: MessageAttributes[] = [
      {
        id: lengthMessage + 1,
        role: responseChatConversation.details.role,
        content: responseChatConversation.details.content,
        date: new Date().toLocaleDateString(selectedLanguage),
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
          date: new Date().toLocaleDateString(selectedLanguage),
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
    const propositionChatConversation: any = await reformulateChat();

    let lengthMessage = messages.length;
    const newMessages: MessageAttributes[] = [];
    propositionChatConversation.map((proposition: MessageType) => {
      lengthMessage++;
      newMessages.push({
        id: lengthMessage,
        role: proposition.role,
        content: proposition.content,
        doc_type: 'reformulate',
        date: new Date().toLocaleDateString(selectedLanguage),
      });
    });
    updateMessages(newMessages);
  }

  async function endConversation() {
    await endChat();
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
              reformulateChatConversation,
              endConversation,
              procedures,
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
            reformulateChatConversation,
            endConversation,
            procedures,
          }}
        >
          {children}
        </ChatContext.Provider>
      )}
    </>
  );
}

export { ChatContextProvider, ChatContext };
