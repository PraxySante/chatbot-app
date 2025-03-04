import { AudioConfigClass } from './audioConfig.class';

export class WebSocketFront {
  protected wsAddressApi!: string;
  protected microphoneId!: string;
  protected ws!: WebSocket;
  protected messagesTranscription!: any;
  protected messagesLLM!: any;
  protected messagesError!:any
  protected audioConfig!: any;

  constructor(
    wsAddressApi: string,
    microphoneId: string,
    messagesTranscription?: any,
    messagesLLM?: any,
    messagesError?:any
  ) {
    this.wsAddressApi = wsAddressApi;
    this.microphoneId = microphoneId;
    this.messagesTranscription = messagesTranscription;
    this.messagesLLM = messagesLLM;
    this.messagesError = messagesError;

  }

  async startWebsocketApi() {
    this.ws = new WebSocket(this.wsAddressApi);
    this.audioConfig = new AudioConfigClass(this.ws, this.microphoneId);
    
    try {
      await this.audioConfig.startAudioConfig();
    } catch (error) {
      console.error("Erreur lors de l'initialisation audio:", error);
    }

    this.ws.onopen = () => {
      console.log('Websocket is opened');
    };
    this.ws.onmessage = (e: any) => {

      const data = JSON.parse(e.data);

      if (data.type === 'llm_response') {
        this.messagesLLM(JSON.parse(e.data));
      }

      if (data.type === 'transcript') {
        this.messagesTranscription(JSON.parse(e.data));
      }

      if (data.type === 'error') {
        this.messagesError(JSON.parse(e.data));
      }
    };
    this.ws.onclose = () => {
      console.log('Websocket is closed');
    };

    this.ws.onerror = (e: any) => {
			console.error("❌ Erreur WebSocket:", e);
    };
  }

  muteWebsocketApi(isMuted: boolean) {
    this.audioConfig.hasMutedMicrophone(isMuted);
  }

  closeWebsocketApi() {
    this.audioConfig.stopAudioConfig();
    this.ws.onclose = () => {
      console.log('Websocket is closed');
    };
  }
}
