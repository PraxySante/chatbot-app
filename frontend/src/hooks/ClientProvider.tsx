import { useContext } from 'react';
import { ClientContext } from '../context/ClientContext';

function useClient() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('No Client function found');
  }
  return context;
}

export { useClient };
