import { useContext } from 'react';
import { RecaptchaContext } from '../context/RecaptchaContext';

export default function useRecaptcha() {
  const context = useContext(RecaptchaContext);

  if (!context) {
    throw new Error('No Error handler found');
  }
  return context;
}

export { useRecaptcha };
