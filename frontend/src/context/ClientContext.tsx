import { createContext, useEffect, useState } from 'react';
import { ClientConfig, clientsConfig } from '../config/clientConfig';

type ClientContextAttributes = {
  configClient: ClientConfig;
};

const ClientContext = createContext<ClientContextAttributes | undefined>(
  undefined
);

function ClientContextProvider({ children }: any) {
  const [configClient, setConfigClient] = useState<ClientConfig>({
    host: '',
    name: '',
    project: '',
    logo: '',
    title: '',
    languages: [
      {
        id: '',
        name: '',
        icon: '',
      },
    ],
    modalMenu: [
      {
        id: '',
        name: '',
      },
    ],
    feedback: [],
    authAccountOption: false,
    sideBarOption: false,
    menuParameterOption: false,
    audioParameterOption: false,
    RecaptchaOption: false,
  });

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

  return (
    <ClientContext.Provider value={{ configClient }}>
      {children}
    </ClientContext.Provider>
  );
}

export { ClientContextProvider, ClientContext };
