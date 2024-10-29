import { createContext, ReactNode, useState } from 'react';

export type ChatContextAttributes = {
  isRestart: boolean;
  selectedRestart: () => void;
};

const ChatContext = createContext<ChatContextAttributes | undefined>(undefined);

function ChatContextProvider({ children }: { children: ReactNode }) {
  const [isRestart, setIsRestart] = useState<boolean>(false);

  function selectedRestart() {
    setIsRestart(!isRestart);
  }

  return (
    <>
      <ChatContext.Provider value={{ isRestart, selectedRestart }}>
        {children}
      </ChatContext.Provider>
    </>
  );
}

export { ChatContextProvider, ChatContext };
