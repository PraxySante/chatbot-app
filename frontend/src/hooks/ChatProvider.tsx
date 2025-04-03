import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
import { ChatContextAttributes } from '../types/provider/provider.type';

// Custom Hook to use context
function useChat(): ChatContextAttributes {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('No Chat function found');
  }
  return context;
}

export { useChat };