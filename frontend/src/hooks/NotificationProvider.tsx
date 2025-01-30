import { useContext } from 'react';
import { NotifacationContext } from '../context/NotificationContext';

function useNotification() {
  const context = useContext(NotifacationContext);
  if (context === undefined) {
    throw new Error('No Error handler found');
  }
  return context;
}

export { useNotification };
