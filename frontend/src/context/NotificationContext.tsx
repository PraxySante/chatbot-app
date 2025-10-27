import { ReactNode, createContext, useState } from 'react';
import { NotifacationContextAttributes } from '../types/provider/provider.type';
import {
  ERROR_MESSAGE_NOT_ENOUGH_CONTENT,
  ERROR_MESSAGE_REFRESH,
  ERROR_MESSAGE_TOO_MANY_REQUEST,
  ERROR_MESSAGE_UNAUTHORIZED,
  ERROR_MESSAGE_WRONG_WAY,
  STATUS_ERROR_BAD_REQUEST,
  STATUS_ERROR_SERVER,
  STATUS_ERROR_SERVICE_NOT_AVAILABLE,
  STATUS_ERROR_TOO_MANY_REQUEST,
  STATUS_ERROR_UNAUTHORIZED,
  STATUS_ERROR_WRONG_WAY,
  SUCCESS_MESSAGE_REQUEST_DONE,
} from '../constants/notifications.constants';

const NotifacationContext = createContext<
  NotifacationContextAttributes | undefined
>(undefined);

function NotificationHandlerProvider({ children }: { children: ReactNode }) {
  const [messageNotification, setMessageNotification] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  function getMessageToNotification(status: number, value?: string) {
    if (value !== '') {
      switch (status) {
        case STATUS_ERROR_SERVER:
          setMessageNotification(`${value}: ${ERROR_MESSAGE_REFRESH}`);
          setIsOpen(true);
          break;
        case STATUS_ERROR_SERVICE_NOT_AVAILABLE:
          setMessageNotification(ERROR_MESSAGE_NOT_ENOUGH_CONTENT);
          setIsOpen(true);
          break;
        case STATUS_ERROR_TOO_MANY_REQUEST:
          setMessageNotification(`${value}: ${ERROR_MESSAGE_TOO_MANY_REQUEST}`);
          setIsOpen(true);
          break;
        case STATUS_ERROR_WRONG_WAY:
          setMessageNotification(ERROR_MESSAGE_WRONG_WAY);
          setIsOpen(true);
          break;
        case STATUS_ERROR_BAD_REQUEST:
          setMessageNotification(ERROR_MESSAGE_WRONG_WAY);
          setIsOpen(true);
          break;
        case STATUS_ERROR_UNAUTHORIZED:
          !value
            ? setMessageNotification(ERROR_MESSAGE_UNAUTHORIZED)
            : setMessageNotification(value);
          setIsOpen(true);
          break;
        case 200:
          !value
            ? setMessageNotification(SUCCESS_MESSAGE_REQUEST_DONE)
            : setMessageNotification(value);

          setIsOpen(true);
          break;

        default:
          setMessageNotification(ERROR_MESSAGE_REFRESH);
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
