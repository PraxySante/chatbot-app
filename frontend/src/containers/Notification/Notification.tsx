import { useEffect } from 'react';
import { useNotification } from '../../hooks/NotificationProvider';
import IconButton from '../../components/Buttons/IconButton';
import icons from '../../constants/icons';

export default function Notification() {
  const { messageNotification, isOpen, changeStatutNotification } =
    useNotification();
  console.log('🚀 ~ Notification ~ messageNotification:', messageNotification);

  const notificationStyles = {
    success: 'text-success bg-success',
    error: 'text-error bg-error',
    warning: 'text-warning bg-warning',
  };

  useEffect(() => {
    if (isOpen && messageNotification?.message) {
      renderingNotification();
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [messageNotification?.message]);

  function handleClose() {
    changeStatutNotification(false);
  }

  function renderingNotification() {
    return (
      <>
        <div
          id={`toast-${messageNotification?.type}`}
          className={`absolute mt-2 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-bg rounded-lg shadow-sm`}
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${notificationStyles[messageNotification?.type]} rounded-lg`}
          >
            <IconButton
              type="button"
              onClick={() => {}}
              icon={icons[`${messageNotification?.type}`]}
              title={`icon ${messageNotification?.type}`}
            />
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">
            {messageNotification?.message}
          </div>
          <button
            onClick={handleClose}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-bg text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-primary hover:text-textHover inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#toast-success"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <IconButton
              type="button"
              onClick={handleClose}
              icon={icons.iconClose}
              title={'icon close'}
            />
          </button>
        </div>
      </>
    );
  }

  return <>{renderingNotification()}</>;
}
