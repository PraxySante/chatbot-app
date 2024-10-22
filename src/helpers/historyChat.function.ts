import { MessageAttributes } from '../types/messages/messages.type';

// Function Get all messages from Local Storage user
function getMessageLocalStorage(): MessageAttributes[] | null {
  const getMessages: string | null = localStorage.getItem('messages');
  if (!getMessages) {
    return null;
  }
  return JSON.parse(getMessages);
}

// Function Set all messages from Local Storage user
function setMessageLocalStorage(messages: MessageAttributes[]) {
  localStorage.setItem('messages', JSON.stringify(messages));
}

// Function Reset all messages from Local Storage user
function resetMessageLocalStorage() {
  localStorage.removeItem('messages');
}

export {
  getMessageLocalStorage,
  setMessageLocalStorage,
  resetMessageLocalStorage,
};
