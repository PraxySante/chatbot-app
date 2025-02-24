import { createContext, ReactNode } from 'react';

const TranscriptionContext = createContext<any>(undefined);

function TranscriptionContextProvider({ children }: { children: ReactNode }) {
  return (
    <TranscriptionContext.Provider value="">
      {children}
    </TranscriptionContext.Provider>
  );
}

export { TranscriptionContext, TranscriptionContextProvider };
