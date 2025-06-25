import { useEffect, useRef, useState } from 'react';
import { IProcedureAttributes } from '../../types/procedures/procedures.interface';
import TabPanel from '../TabPanel/TabPanel';
import { ChatConversation, ContextParametersReserved, ContextParametersReservedRoutage, IframeCommunicationHandler, IframeEventType, IframeEventValue } from './frame.interface';

export default function Frame({
  selectedPanel,
  setSelectedPanel,
}: IProcedureAttributes) {
  let scriptRef = useRef<HTMLScriptElement>(document.createElement('script'));
  const [isChatReady, setIsChatReady] = useState(false);
  const [conversation, setConversation] = useState<ChatConversation[]>([]);
  
  useEffect(() => {
    // Écouter quand le chatbot est prêt
    elqComHandler.onElqChatClientEvent(
      'chat-client-ready',
      () => {
        console.log('Chat client ready!');
        setIsChatReady(true);
        // Envoyer automatiquement les paramètres de contexte
        sendContextParameters();
      }
    );

    // Écouter les messages de conversation
     elqComHandler.onElqChatClientEvent(
      'conversation',
      (data) => {
        if (Array.isArray(data)) {
          setConversation(data);
          console.log('Conversation updated:', data);
        }
      }
    );

    // Configurer l'authentification
    onElqChatClientAuthenticate();

  }, []);

  useEffect(() => {
    scriptRef.current.src = 'https://contact.eloquant.cloud/productv3/api/client/chat/trigger/333ff1cefa66557076321f86a667637b'; 
    scriptRef.current.async = true;

    document.body.appendChild(scriptRef.current);
    setIsChatReady(true)

    return () => {
      document.body.removeChild(scriptRef.current);
    };
  }, []);

  useEffect(() => {
    if (isChatReady) {
      // Vous pouvez ici envoyer des informations client spécifiques
      // selon les données disponibles dans votre application
      const clientInfo: ContextParametersReservedRoutage = {
        contact_firstname: "Jean",
        contact_lastname: "Dupont",
        contact_email: "jean.dupont@example.com",
        campaign: "support-technique"
      };

      sendClientInfo(clientInfo);
    }
  }, [isChatReady]);
  

  // Implémentation du handler de communication
  const elqComHandler: IframeCommunicationHandler = {
    onElqChatClientEvent: (
      type: IframeEventType,
      listener: (data?: IframeEventValue) => void
    ) => {
      const handleMessage = (event: MessageEvent) => {
        // Vérifiez l'origine si nécessaire pour la sécurité
        // if (event.origin !== 'https://votre-chatbot-domain.com') return;

        if (event.data && event.data.type === type) {
          listener(event.data.value);
        }
      };

      window.addEventListener('message', handleMessage);

      // Retourner une fonction de nettoyage
      return () => window.removeEventListener('message', handleMessage);
    },

    sendElqChatEvent: (type: IframeEventType, value: IframeEventValue) => {
      if (scriptRef.current) {
      
      } else {
        console.warn('Iframe not ready or contentWindow not available');
      }
    },

    onElqChatClientAuthenticate: (
      listener: (sendAuthenticate: (jwe: string) => void) => void
    ) => {
      function sendAuthenticate(jwe: string) {
        elqComHandler.sendElqChatEvent('context-parameters', {
          authentication: jwe,
        } as any);
      }
      listener(sendAuthenticate);
    },
  };

  // Fonction pour envoyer les paramètres de contexte
  function sendContextParameters() {
    const contextParams: ContextParametersReserved = {
      client_url: window.location.href,
      client_url_timestamp: Date.now(),
      client_title: document.title,
      client_navigator_language: navigator.language,
      client_navigator_useragent: navigator.userAgent,
      client_navigator_platform: navigator.platform,
    };

    elqComHandler.sendElqChatEvent('context-parameters', contextParams);
  }

  // Fonction pour envoyer les informations client
  function sendClientInfo(clientInfo: ContextParametersReservedRoutage) {
    elqComHandler.sendElqChatEvent('context-parameters', clientInfo);
  };

  // Fonction d'authentification personnalisée
  function onElqChatClientAuthenticate() {
    elqComHandler.onElqChatClientAuthenticate((sendAuthenticate) => {
      // Ici, vous pouvez récupérer votre token d'authentification
      // Par exemple depuis votre contexte d'authentification ou API
      // const authToken = getAuthenticationToken();
      // sendAuthenticate(authToken);

      console.log('Authentification demandée par le chatbot');
      // Pour l'instant, on peut envoyer un token factice
      // sendAuthenticate('your-jwe-token-here');
    });
  }

  return (
    <>
      <div className="flex relative w-screen h-12 justify-center">
        <TabPanel
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
        />
      </div>

      {/* <div className="w-full h-full relative">
        <iframe
          ref={iframeRef}
          title="chat-ahp"
          src="https://chatbot.com" // ⚠️ Remplacez par l'URL de votre chatbot
          className="w-full h-full border border-2 border-indigo-600"
          onLoad={() => {
            console.log('Iframe loaded');
          }}
        />
      </div> */}
    </>
  );
}
