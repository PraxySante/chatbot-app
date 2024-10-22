import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

// Custom Hooks to implement data Auth0
export default function AuthProvider({ children }: { children: ReactNode }) {

  return (
    <>
      <Auth0Provider
        domain={`${import.meta.env.VITE_AUTH0_DOMAIN}`}
        clientId={`${import.meta.env.VITE_AUTH0_CLIENTID}`}
        authorizationParams={{
          redirect_uri: import.meta.env.VITE_AUTH0_DOMAIN_CALLBACK      
        }}
      >
        {children}
      </Auth0Provider>
    </>
  );
}
