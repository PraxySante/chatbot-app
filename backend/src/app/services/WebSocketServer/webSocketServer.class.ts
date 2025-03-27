import { WebSocketServer, WebSocket } from "ws";
import { getKeyRedis } from "../../datamapper/redis.datamapper";
import { ResponseFailureType } from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { WebSocketTranscription } from "../WebSocketTranscription/WebSocketTranscription.class";
import { startTranscription } from "../ApiTranscription/transcription.service";
import { SUCCESS_OK } from "../../constant/constant";

// Modification pour WebSocketServerClass.ts
export class WebSocketServerClass {
  protected wss!: WebSocketServer;
  protected wsTranscriptionMap = new Map<string, WebSocketTranscription>(); // Stocke les connexions par IP

  constructor(server: any) {
    if (!server) {
      console.log("WebSocket address is required.");
      return;
    }

    this.wss = new WebSocketServer({ server, path: "/ws" });
    this.wss.on("connection", (ws: WebSocket, req: any) => {
      console.log("✅ WebSocket Server initialized");
      this.startConnection(ws, req);
    });
  }

  async startConnection(ws: WebSocket, req: any) {
    const ip: string | undefined = req.socket.remoteAddress;

    if (!ip) {
      ws.close(1008, "Unauthorized");
      return;
    }

    try {
      // Vérifier l'authentification une seule fois à la connexion
      const { status, details }: ResponseKeyRedisType | ResponseFailureType = await getKeyRedis(ip);

      // Message Error Typed - error message from Redis
      if (status !== SUCCESS_OK || typeof details === "string") {
        ws.close(1008, "Unauthorized");
        return;
      }

      // Message Error Typed - check structure auth
      if (typeof details !== "object" || !("authToken" in details)) {
        ws.close(1011, "Transcription initialization failed");
        return;
      }

      const userUuid = `${details.project}-${ip}`;
      const authToken = details?.authToken;
      const userLanguage = details?.language;
      const uuidChat = details?.uuid;

      // Créer une transcription et un WebSocket une seule fois
      const uuidTranscription = await startTranscription(authToken);
      
      // Créer une nouvelle connexion WebSocket vers l'API 3
      const wsTranscription = new WebSocketTranscription(
        `${process.env.WS_API_TRANSCRIPTION}/${uuidTranscription}?token=${authToken}&user_uuid=${userUuid}&language=${userLanguage}&dictation_mode=false`,
        ws,
        uuidChat,
        authToken
      );
      
      // Démarrer la connexion à l'API 3
      wsTranscription.startWebsocketApi();
      
      // Stocker la connexion pour pouvoir la fermer plus tard
      this.wsTranscriptionMap.set(ip, wsTranscription);

      // Gérer la fermeture
      ws.on("close", (code, reason) => {
        console.log(`❌ Client déconnecté (Code: ${code}, Reason: ${reason})`);
        const transcription = this.wsTranscriptionMap.get(ip);
        if (transcription) {
          // Fermer proprement la connexion à l'API 3
          transcription.closeConnection();
          this.wsTranscriptionMap.delete(ip);
        }
      });

      ws.on("error", (error) => {
        console.error("❌ Erreur WebSocket:", error);
        const transcription = this.wsTranscriptionMap.get(ip);
        if (transcription) {
          transcription.closeConnection();
          this.wsTranscriptionMap.delete(ip);
        }
      });
      
      // Le transfert des messages est géré dans WebSocketTranscription
    } catch (error) {
      console.error(error);
      ws.close(1011, "Internal Server Error");
    }
  }

  closeConnection() {
    try {
      this.wss.close();
    } catch (error) {
      console.error("Error closing WebSocket server:", error);
    }
  }
}