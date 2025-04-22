import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageContextProvider } from './context/LanguageContext.tsx';
import { ChatContextProvider } from './context/ChatContext.tsx';
import RoutesProvider from './hooks/RoutesProvider.tsx';
import AuthProvider from './hooks/AuthProvider.tsx';

import './reset.css';
import './index.css';
import { NotificationHandlerProvider } from './context/NotificationContext.tsx';
import { useNotification } from './hooks/NotificationProvider.tsx';
import { TranscriptionContextProvider } from './context/TranscriptionContext.tsx';
import useTranscription from './hooks/TranscriptionProvider.tsx';
import { RecaptchaContextProvider } from './context/RecaptchaContext.tsx';
import useRecaptcha from './hooks/RecaptchaProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div>Chargement...</div>}>
    {import.meta.env.VITE_OPT_AUT0_ACCOUNT === true ? (
      <AuthProvider>
        <LanguageContextProvider>
          <NotificationHandlerProvider>
            <RecaptchaContextProvider>
              <TranscriptionContextProvider useRecaptcha={useRecaptcha}>
                <ChatContextProvider
                  useRecaptcha={useRecaptcha}
                  useTranscription={useTranscription}
                  useNotification={useNotification}
                >
                  <RoutesProvider />
                </ChatContextProvider>
              </TranscriptionContextProvider>
            </RecaptchaContextProvider>
          </NotificationHandlerProvider>
        </LanguageContextProvider>
      </AuthProvider>
    ) : (
      <LanguageContextProvider>
        <NotificationHandlerProvider>
          <RecaptchaContextProvider>
            <TranscriptionContextProvider useRecaptcha={useRecaptcha}>
              <ChatContextProvider
                useRecaptcha={useRecaptcha}
                useTranscription={useTranscription}
                useNotification={useNotification}
              >
                <RoutesProvider />
              </ChatContextProvider>
            </TranscriptionContextProvider>
          </RecaptchaContextProvider>
        </NotificationHandlerProvider>
      </LanguageContextProvider>
    )}
  </Suspense>
);
