import { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext';

function useErrorHandler() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('No Error handler found');
  }
  return context;
}

export { useErrorHandler };
