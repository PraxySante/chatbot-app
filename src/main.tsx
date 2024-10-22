import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageContextProvider } from './context/LanguageContext.tsx';
import AuthProvider from './hooks/AuthProvider.tsx';

import './reset.css';
import './index.css';

//const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.VITE_AUTH0_DOMAIN ?
      <AuthProvider>
        <LanguageContextProvider>
          <App />
        </LanguageContextProvider>
      </AuthProvider>
      :
      <LanguageContextProvider>
        <App />
      </LanguageContextProvider>}
  </StrictMode>
);
