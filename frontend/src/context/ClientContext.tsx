import { createContext, Suspense, useEffect, useState } from 'react';
import { ClientConfig, clientsConfig } from '../config/clientConfig';

type ClientContextAttributes = {
  configClient: ClientConfig;
};

const ClientContext = createContext<ClientContextAttributes | undefined>(
  undefined
);

function ClientContextProvider({ children }: any) {
  const [configClient, setConfigClient] = useState<ClientConfig | null>(null);

  useEffect(() => {
    const hostname = document.location.hostname;
    getClientId(hostname);
  }, []);

  function getClientId(hostname: string): void {
    const foundClient = clientsConfig[hostname];
    if (!foundClient) {
      throw new Error('Client not found');
    }
    setConfigClient(foundClient);
    document.documentElement.classList.add(
      `theme-${foundClient.project.toLowerCase()}`
    );
    return;
  }

  return configClient ? (
    <ClientContext.Provider value={{ configClient }}>
      {children}
    </ClientContext.Provider>
  ) : (
    <Suspense
      fallback={<div>Client not recognized for this domain.</div>}
    ></Suspense>
  );
}

export { ClientContextProvider, ClientContext };
