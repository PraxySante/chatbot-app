import { useContext } from 'react';
import { ChatContext, ChatContextAttributes } from '../context/ChatContext';

// Custom Hook to use context
function useChat(): ChatContextAttributes {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('No Chat function found');
  }
  return context;
}

export { useChat };