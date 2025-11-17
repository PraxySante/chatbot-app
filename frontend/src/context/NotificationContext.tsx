import { ReactNode, createContext, useState } from 'react';
import { NotifacationContextAttributes } from '../types/provider/provider.type';
import {
  STATUS_ERROR_BAD_REQUEST,
  STATUS_ERROR_SERVER,
  STATUS_ERROR_SERVICE_NOT_AVAILABLE,
  STATUS_ERROR_TOO_MANY_REQUEST,
  STATUS_ERROR_UNAUTHORIZED,
  STATUS_ERROR_WRONG_WAY,
} from '../constants/notifications.constants';
import { useLanguage } from '../hooks/UseLanguage';

const NotifacationContext = createContext<
  NotifacationContextAttributes | undefined
>(undefined);

function NotificationHandlerProvider({ children }: { children: ReactNode }) {
  const [messageNotification, setMessageNotification] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { userLanguage } = useLanguage();

  function getMessageToNotification(status: number, value?: string) {
    if (value !== '') {
      switch (status) {
        case STATUS_ERROR_SERVER:
          setMessageNotification(
            `${value}: ${userLanguage?.error_msg_refresh}`
          );
          setIsOpen(true);
          break;
        case STATUS_ERROR_SERVICE_NOT_AVAILABLE:
          setMessageNotification(
            `${userLanguage?.error_msg_not_enough_content}`
          );
          setIsOpen(true);
          break;
        case STATUS_ERROR_TOO_MANY_REQUEST:
          setMessageNotification(
            `${value}: ${userLanguage?.error_msg_too_many_request}`
          );
          setIsOpen(true);
          break;
        case STATUS_ERROR_WRONG_WAY:
          setMessageNotification(`${userLanguage?.error_msg_wrong_way}`);
          setIsOpen(true);
          break;
        case STATUS_ERROR_BAD_REQUEST:
          setMessageNotification(`${userLanguage?.error_msg_wrong_way}`);
          setIsOpen(true);
          break;
        case STATUS_ERROR_UNAUTHORIZED:
          !value
            ? setMessageNotification(`${userLanguage?.error_msg_unauthorized}`)
            : setMessageNotification(value);
          setIsOpen(true);
          break;
        case 200:
          !value
            ? setMessageNotification(
                `${userLanguage?.success_msg_request_done}`
              )
            : setMessageNotification(value);

          setIsOpen(true);
          break;

        default:
          setMessageNotification(`${userLanguage?.error_msg_refresh}`);
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
