import { ReactNode, createContext, useState } from 'react';

type NotifacationContext = {
  message: string;
  getMessageToNotification: (value: string) => void;
};

const NotifacationContext = createContext<NotifacationContext | undefined>(
  undefined
);

function NotificationHandlerProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string>('');

  function getMessageToNotification(value: string) {
    setMessage(value);
  }

  return (
    <NotifacationContext.Provider value={{ message, getMessageToNotification }}>
      {children}
    </NotifacationContext.Provider>
  );
}

export { NotificationHandlerProvider, NotifacationContext };
