import { useEffect, useRef, useState } from 'react';
import { ChatConversation, IframeCommunicationHandler } from './frame.interface';
import { MessageAttributes } from '../../types/messages/messages.type';
import { useChat } from '../../hooks/ChatProvider';

export default function Frame() {
  const { messages } = useChat();
  let scriptRef = useRef<HTMLScriptElement>(document.createElement('script'));

  const [isChatReady, setIsChatReady] = useState<boolean>(false);
  const [elqComHandler, setElqComHandler] =
    useState<IframeCommunicationHandler | null>(null);

  useEffect(() => {
    if (!scriptRef.current.src) {
      scriptRef.current.src =
        'https://contact.eloquant.cloud/productv3/api/client/chat/trigger/333ff1cefa66557076321f86a667637b';
      scriptRef.current.async = true;

      // Écouter l'événement de chargement du script
      scriptRef.current.onload = () => {
        console.log('Script chargé avec succès');
        const elqComHandler = (window as any).elqComHandler;
        setElqComHandler(elqComHandler);
        setIsChatReady(true);
      };

      scriptRef.current.onerror = () => {
        console.error('Erreur lors du chargement du script');
      };

      document.body.appendChild(scriptRef.current);
    }
  }, []);

  useEffect(() => {
    if (!messages || messages.length === 0 || !isChatReady) {
      return;
    }

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
      return;
    }

    const data :any = transformChatContextToEloquant(lastMessage);

    if (elqComHandler && isChatReady && data) {
      console.log('🚀 ~ elqComHandler:', elqComHandler);
       elqComHandler.onElqChatClientEvent('chat-client-ready', function ()  {
         console.log("🚀 ~ elqComHandler.onElqChatClientEvent ~ data:", data)
         elqComHandler.sendElqChatEvent('conversation', data);
       });
    }
  }, [messages, isChatReady, elqComHandler]);

  function transformChatContextToEloquant(message: MessageAttributes) {
    switch (message.role) {
      case 'assistant':
        return [{
          role: 'CHATBOT',
          message: message.content,
        }];
      case 'user':
        return [{
          role: 'CLIENT',
          message: message.content,
        }];
      default:
        break;
    }
  }

  return <></>;
}
