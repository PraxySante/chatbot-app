/**
* Interface of iframe communication handler
*/
interface IframeCommunicationHandler {
  /**
  * sets a listener to messages from elq chat-client
  * @param type type of event
  * @param listener listener
  */
  onElqChatClientEvent(type: IframeEventType, listener: (data?: IframeEventValue) => void) : void;
  /**
  * send a object to elq chat-client
  * @param type type of event
  * @param value object to be sent
  */
  sendElqChatEvent(type: IframeEventType, value: IframeEventValue) : void;
  /**
  * sets a listener to authenticate to elq chat-client
  * @param listener listener called for jwe authentication. To validate authentication, sendAuthenticate method has to be called.
  */
  onElqChatClientAuthenticate(listener: (sendAuthenticate: (jwe:string) => void) => void) : void;
  }

export type IframeEventType = "chat-client-ready" | "context-parameters" | "conversation";
  
/** type for value sent with the event */
export type IframeEventValue = ContextParametersReserved | { [key: string]: string } | ChatConversation[] | undefined;

type ContextParametersReserved = {
  /** current client's URL */
  readonly client_url?: string,
  /** timestamp when client accessed the URL */
  readonly client_url_timestamp?: number,
  /** current title of viewed page */
  readonly client_title?: string,
  /** locale of browser */
  readonly client_navigator_language?: string,
  /** useragent */
  readonly client_navigator_useragent?: string,
  /** platform */
  readonly client_navigator_platform?: string
}
  
type ContextParametersReservedRoutage = {
  /** Nom du contact. */
  readonly contact_lastname?: string,
  /** Identifiant externe. */
  readonly contact_external_id?: string,
  /** Prénom du contact. */
  readonly contact_firstname?: string,
  /** Mail du contact. */
  readonly contact_email?: string,
  /** Téléphone du contact. */
  readonly contact_phone?: string,
  /** Campagne. */
  readonly campaign?: string
}

interface ChatConversation {
  /** Rôle de l'emetteur du message */
  role: "CHATBOT" | "CLIENT";
  /** valeur affichée pour l'emetteur du message dans le chat
  * Pour un message client, cette valeur est optionnelle (Par défaut recupérée dans la campagne) */
  displayName?: string;
  /** message
  * ATTENTION - les caractères suivant doivent être encodés
  * & -> &amp;amp;
  * < -> &amp;lt;
  **/
  message: string;
  }
  

export default function Frame() {


  return (
    <>
      <iframe title="chat-ahp" className="w-full h-full border border-2 border-indigo-600"></iframe>
    </>
  );
}
