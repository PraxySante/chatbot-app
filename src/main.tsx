import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { LanguageContextProvider } from './context/LanguageContext.tsx';
import { ChatContextProvider } from './context/ChatContext.tsx';
import RoutesProvider from './hooks/RoutesProvider.tsx';
import AuthProvider from './hooks/AuthProvider.tsx';

import './reset.css';
import './index.css';

console.log(import.meta.env.VITE_AUT0_OPT)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.VITE_OPT_AUT0 ? (
      <AuthProvider>
        <ChatContextProvider>
          <LanguageContextProvider>
            <RoutesProvider />
          </LanguageContextProvider>
        </ChatContextProvider>
      </AuthProvider>
    ) : (
      <LanguageContextProvider>
        <ChatContextProvider>
          <RoutesProvider />
        </ChatContextProvider>
      </LanguageContextProvider>
    )}
  </StrictMode>
);
