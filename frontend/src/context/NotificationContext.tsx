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
  const [messageNotification, setMessageNotification] = useState<{
    message: string;
    type: 'error' | 'warning' | 'success';
  }>({ message: '', type: 'success' });
  const [isOpen, setIsOpen] = useState(false);
  const { userLanguage } = useLanguage();

  function getMessageToNotification(status: number, value?: string) {
    if (value !== '') {
      switch (status) {
        case STATUS_ERROR_SERVER:
          setMessageNotification({
            message: `${value}: ${userLanguage?.error_msg_refresh}`,
            type: 'error',
          });
          setIsOpen(true);
          break;
        case STATUS_ERROR_SERVICE_NOT_AVAILABLE:
          setMessageNotification({
            message: `${userLanguage?.error_msg_not_enough_content}`,
            type: 'error',
          });
          setIsOpen(true);
          break;
        case STATUS_ERROR_TOO_MANY_REQUEST:
          setMessageNotification({
            message: `${value}: ${userLanguage?.error_msg_too_many_request}`,
            type: 'warning',
          });
          setIsOpen(true);
          break;
        case STATUS_ERROR_WRONG_WAY:
          setMessageNotification({
            message: `${userLanguage?.error_msg_wrong_way}`,
            type: 'error',
          });
          setIsOpen(true);
          break;
        case STATUS_ERROR_BAD_REQUEST:
          setMessageNotification({
            message: `${userLanguage?.error_msg_wrong_way}`,
            type: 'error',
          });
          setIsOpen(true);
          break;
        case STATUS_ERROR_UNAUTHORIZED:
          !value
            ? setMessageNotification({
                message: `${userLanguage?.error_msg_unauthorized}`,
                type: 'error',
              })
            : setMessageNotification({ message: value, type: 'error' });
          setIsOpen(true);
          break;
        case 422:
          !value
            ? setMessageNotification({
                message: `${userLanguage?.error_msg_refresh}`,
                type: 'error',
              })
            : setMessageNotification({ message: value, type: 'error' });
          setIsOpen(true);
          break;
        case 200:
          !value
            ? setMessageNotification({
                message: `${userLanguage?.success_msg_request_done}`,
                type: 'success',
              })
            : setMessageNotification({ message: value, type: 'success' });

          setIsOpen(true);
          break;

        default:
          setMessageNotification({
            message: `${userLanguage?.error_msg_refresh}`,
            type: 'error',
          });
          setIsOpen(true);
          break;
      }
    }
  }
  function changeStatutNotification(value: boolean) {
    setIsOpen(value);
    setMessageNotification({ message: '', type: 'success' });
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
