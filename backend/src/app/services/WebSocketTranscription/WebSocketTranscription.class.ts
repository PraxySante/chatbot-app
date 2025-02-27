import { WebSocket } from "ws";

export class WebSocketTranscription {
  wsAddressApi: string = "";
  protected wsParent!: WebSocket;
  protected wsTranscription!: WebSocket;
  protected isConnected: boolean = false;

  constructor(wsAddressApi: string, wsParent: WebSocket) {
    this.wsAddressApi = wsAddressApi;
    this.wsParent = wsParent;
  }

  startWebsocketApi() {
    console.log("✅ Initialisation WebSocket API Transcription");
    
    // Créer la connexion
    this.wsTranscription = new WebSocket(this.wsAddressApi);

    this.wsTranscription.on("open", () => {
      console.log("✅ Connecté à l'API Transcription");
      this.isConnected = true;
    });

    this.wsTranscription.on("message", (msg) => {
      console.log("📩 Message reçu de API 3:", msg.toString()); // Debug API 3 → API 1
      if (this.wsParent.readyState === WebSocket.OPEN) {
        this.wsParent.send(msg.toString()); // Relais API3 → Front
      }
    });

    this.wsTranscription.on("close", (code, reason) => {
      console.log(`❌ Déconnecté de API 3 (Code: ${code}, Reason: ${reason})`);
      this.isConnected = false;
    });

    this.wsTranscription.on("error", (error) => {
      console.error("❌ Erreur WebSocketTranscription:", error);
      this.isConnected = false;
    });

    // Écoute des messages du Front à relayer vers API 3
    this.wsParent.on("message", (message) => {
      // Vérifier que la connexion est bien établie
      if (this.isConnected && this.wsTranscription.readyState === WebSocket.OPEN) {
        console.log("🚀 Relais message du Front vers API 3");
        this.wsTranscription.send(message);
      } else {
        console.log("⚠️ Impossible d'envoyer le message, connexion non établie");
      }
    });
  }

  closeConnection() {
    if (this.wsTranscription && this.wsTranscription.readyState === WebSocket.OPEN) {
      this.wsTranscription.close();
    }
  }
}