import { ReactNode, createContext, useState } from 'react';

type ErrorContext = {
  messageError: string;
  getMessageError: (vallue: string) => void;
};

const ErrorContext = createContext<ErrorContext | undefined>(undefined);

function ErrorHandlerProvider({ children }: { children: ReactNode }) {
  const [messageError, setMessageError] = useState<string>('');

  function getMessageError(value: string) { }
  
  return (
    <ErrorContext.Provider value={{ messageError, getMessageError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export { ErrorHandlerProvider, ErrorContext };
