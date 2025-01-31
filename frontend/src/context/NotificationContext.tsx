import { ReactNode, createContext, useState } from 'react';

type NotifacationContext = {
  messageNotification: string;
  getMessageToNotification: (status: number, message: string) => void;
  isOpen: boolean;
  changeStatutNotification: (value: boolean) => void;
};

const NotifacationContext = createContext<NotifacationContext | undefined>(
  undefined
);

function NotificationHandlerProvider({ children }: { children: ReactNode }) {
  const [messageNotification, setMessageNotification] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  function getMessageToNotification(status: number, value?: string) {
    if (value !== '') {
      switch (status) {
        case 500:
          setMessageNotification(
            `${value}: Redemarrer une nouvelle session ou contacter un administrateur.`
          );
          setIsOpen(true);
          break;
        case 503:
          setMessageNotification(
            `Pas assez de contenus pour donner votre avis.`
          );
          setIsOpen(true);
          break;
        case 429:
          setMessageNotification(
            `${value}: Trop de requêtes, attendez 1 minute.`
          );
          setIsOpen(true);
          break;
        case 404:
          setMessageNotification(
            `Mauvaise requête, veuillez transmettre votre question.`
          );
          setIsOpen(true);
          break;
        case 400:
          setMessageNotification(
            `Mauvaise requête, veuillez transmettre votre question.`
          );
          setIsOpen(true);
          break;
        case 401:
          setMessageNotification(
            `Session perdue, redemarrer une nouvelle session ou contacter un administrateur.`
          );
          setIsOpen(true);
          break;
        case 200:
          !value
            ? setMessageNotification(
                `Session perdue, redemarrer une nouvelle session ou contacter un administrateur.`
              )
            : setMessageNotification(value);

          setIsOpen(true);
          break;

        default:
          setMessageNotification(
            `Redemarrer une nouvelle session ou contacter un administrateur.`
          );
          setIsOpen(true);
          break;
      }
    }
  }
  function changeStatutNotification(value: boolean) {
    setIsOpen(value);
    setMessageNotification('');
  }

  return (
    <NotifacationContext.Provider
      value={{
        messageNotification,
        isOpen,
        getMessageToNotification,
        changeStatutNotification,
      }}
    >
      {children}
    </NotifacationContext.Provider>
  );
}

export { NotificationHandlerProvider, NotifacationContext };
