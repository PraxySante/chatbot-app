import { AudioConfigClass } from './audioConfig.class';

export class WebSocketFront {
  protected wsAddressApi!: string;
  protected microphoneId!: string;
  protected ws!: WebSocket;
  protected messagesTranscription!: any;
  protected messagesLLM!: any;
  protected messagesError!: any;
  protected audioConfig!: any;
  protected wakeLockRef!: WakeLockSentinel;

  constructor(
    wsAddressApi: string,
    microphoneId: string,
    messagesTranscription?: any,
    messagesLLM?: any,
    messagesError?: any
  ) {
    this.wsAddressApi = wsAddressApi;
    this.microphoneId = microphoneId;
    this.messagesTranscription = messagesTranscription;
    this.messagesLLM = messagesLLM;
    this.messagesError = messagesError;
  }

  async askKeepAwakeScreenPermission() {
    try {
      if ('wakeLock' in navigator) {
        // Demande un wake lock pour l’écran
        this.wakeLockRef = await (navigator as any).wakeLock.request('screen');
        console.log('Wake lock activé ✅');
      } else {
        console.log('Wake Lock API non supportée ❌');
      }
    } catch (err: any) {
      console.error(`${err.name}, ${err.message}`);
    }
  }

  async closeKeepAwakeScreenPermission() {
    try {
      if ('wakeLock' in navigator) {
        // Demande un wake lock pour l’écran
        this.wakeLockRef = await (navigator as any).wakeLock.request('screen');
        this.wakeLockRef.release();
        console.log('Wake lock désactivé ✅');
      } else {
        console.log('Wake Lock API non supportée ❌');
      }
    } catch (err: any) {
      console.error(`${err.name}, ${err.message}`);
    }
  }

  async startWebsocketApi() {
    this.ws = new WebSocket(this.wsAddressApi);
    this.audioConfig = new AudioConfigClass(this.ws, this.microphoneId);

    if (this.microphoneId) {      
      this.audioConfig = new AudioConfigClass(this.ws, this.microphoneId);
      await this.askKeepAwakeScreenPermission()
  
      try {
        await this.audioConfig.startAudioConfig();
      } catch (error) {
        console.error("Erreur lors de l'initialisation audio:", error);
        this.ws.close(1011, 'Internal Error');
      }
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
    this.ws.onclose = async (event: CloseEvent) => {
      await this.closeKeepAwakeScreenPermission();
      console.log('Websocket is closed : ', event);
      this.messagesError(event.reason);
    };

    this.ws.onerror = async (e: any) => {
      await this.closeKeepAwakeScreenPermission();
      console.error('❌ Erreur WebSocket:', e);
      this.messagesError('Internal Error');
    };
  }

  muteWebsocketApi(isMuted: boolean) {
    this.audioConfig.hasMutedMicrophone(isMuted);
  }

  async closeWebsocketApi() {
    this.audioConfig.stopAudioConfig();
    await this.closeKeepAwakeScreenPermission();
    this.ws.onclose = () => {
      console.log('Websocket is closed');
    };
  }
}
