import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageContextProvider } from './context/LanguageContext.tsx';
import { ChatContextProvider } from './context/ChatContext.tsx';
import AuthProvider from './hooks/AuthProvider.tsx';

import './reset.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.VITE_AUTH0_DOMAIN ? (
      <AuthProvider>
        <ChatContextProvider>
          <LanguageContextProvider>
            <App />
          </LanguageContextProvider>
        </ChatContextProvider>
      </AuthProvider>
    ) : (
      <LanguageContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </LanguageContextProvider>
    )}
  </StrictMode>
);
