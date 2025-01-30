import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageContextProvider } from './context/LanguageContext.tsx';
import { ChatContextProvider } from './context/ChatContext.tsx';
import RoutesProvider from './hooks/RoutesProvider.tsx';
import AuthProvider from './hooks/AuthProvider.tsx';

import './reset.css';
import './index.css';
import { NotificationHandlerProvider } from './context/NotificationContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.VITE_OPT_AUT0_ACCOUNT ? (
      <AuthProvider>
        <LanguageContextProvider>
          <NotificationHandlerProvider>
            <ChatContextProvider>
              <RoutesProvider />
            </ChatContextProvider>
          </NotificationHandlerProvider>
        </LanguageContextProvider>
      </AuthProvider>
    ) : (
      <LanguageContextProvider>
        <NotificationHandlerProvider>
          <ChatContextProvider>
            <RoutesProvider />
          </ChatContextProvider>
        </NotificationHandlerProvider>
      </LanguageContextProvider>
    )}
  </StrictMode>
);
