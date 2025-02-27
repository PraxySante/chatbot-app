import { AudioConfigClass } from './audioConfig.class';

export class WebSocketFront {
  protected wsAddressApi!: string;
  protected microphoneId!: string;
  protected ws!: WebSocket;
  protected messagesTranscription!: any;
  protected audioConfig!: any;

  constructor(wsAddressApi: string, microphoneId: string, messagesTranscription?:any) {
    this.wsAddressApi = wsAddressApi;
    this.microphoneId = microphoneId;
    this.messagesTranscription = messagesTranscription;
  }

  startWebsocketApi() {
    this.ws = new WebSocket(this.wsAddressApi);
    this.audioConfig = new AudioConfigClass(this.ws, this.microphoneId);
    this.audioConfig.startAudioConfig();

    this.ws.onopen = () => {
      console.log('Websocket is opened');
    };
    this.ws.onmessage = (e: any) => {
      console.log('Message received from : ', JSON.parse(e.data));
      this.messagesTranscription(JSON.parse(e.data))
    };
    this.ws.onclose = () => {
      console.log('Websocket is closed');
    };

    this.ws.onerror = (e: any) => {
      console.log('Message received from : ', e);
    };
  }



  closeWebsocketApi() {
    this.audioConfig.stopAudioConfig();
    this.ws.onclose = () => {
      console.log('Websocket is closed');
    };
  }

}
