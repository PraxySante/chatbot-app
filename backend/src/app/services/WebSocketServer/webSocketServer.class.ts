import { WebSocketServer, WebSocket } from "ws";
import { deleteKeyRedis, getKeyRedis } from "../../datamapper/redis.datamapper";
import { ResponseFailureType } from "../../types/chatbot.type";
import { ResponseKeyRedisType } from "../../types/redis.type";
import { WebSocketTranscription } from "../WebSocketTranscription/WebSocketTranscription.class";
import { startTranscription } from "../ApiTranscription/transcription.service";
import {
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	ERROR_SERVER_MESSAGE,
	FAILURE_TOKEN_EXPIRED,
	MILLISECONDS,
	SUCCESS_OK,
	USER,
} from "../../constant/constant";
import { TranscriptionType } from "../../types/transcription.type";

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
			ws.close(1008, ERROR_NOT_AUTHENTIFIED_MESSSAGE);
			return;
		}

		try {
			// Vérifier l'authentification une seule fois à la connexion
			const { status, details }: ResponseKeyRedisType | ResponseFailureType =
				await getKeyRedis(ip);

			// Message Error Typed - error message from Redis
			if (status !== SUCCESS_OK || typeof details === "string") {
				ws.close(1008, ERROR_NOT_AUTHENTIFIED_MESSSAGE);
				return;
			}

			// Message Error Typed - check structure auth
			if (typeof details !== "object" || !("authToken" in details)) {
				ws.close(1011, "Transcription initialization failed");
				return;
			}

			if (typeof details === "object" && "token_expires_in" in details) {
				const currentTime = Math.floor(Date.now() / MILLISECONDS);
				if (currentTime > details?.token_expires_in) {
					console.info(`${FAILURE_TOKEN_EXPIRED} ${req.ip}`);
					await deleteKeyRedis(req.ip);
					await deleteKeyRedis(`${USER}-${req.ip}`);
					ws.close(1008, FAILURE_TOKEN_EXPIRED);
					return;
				}
			}

			const userUuid = `${details.project}-${ip}`;
			const authToken = details?.authToken;
			const userLanguage = details?.language;
			const uuidChat = details?.uuid;

			// Créer une transcription et un WebSocket une seule fois
			const responseTranscription: TranscriptionType | ResponseFailureType =
				await startTranscription(authToken);

			if (!("data" in responseTranscription)) {
				ws.close(1011, responseTranscription.message);
				return;
			}

			// Créer une nouvelle connexion WebSocket vers l'API 3
			const wsTranscription = new WebSocketTranscription(
				`${process.env.WS_API_TRANSCRIPTION}/${responseTranscription.data.uuid}?token=${authToken}&user_uuid=${userUuid}&language=${userLanguage}&dictation_mode=false`,
				ws,
				uuidChat,
				authToken
			);

			// Démarrer la connexion ws à l'API Transcription
			wsTranscription.startWebsocketApi(
				ip,
				responseTranscription.data.uuid,
				details.project
			);

			// Stocker la connexion pour pouvoir fermer plus tard
			this.wsTranscriptionMap.set(ip, wsTranscription);

			// Gérer la fermeture
			ws.on("close", (code, reason) => {
				console.log(`❌ Client déconnecté (Code: ${code}, Reason: ${reason})`);
				const transcription = this.wsTranscriptionMap.get(ip);
				if (transcription) {
					// Fermer proprement la connexion ws à l'API Transcription
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
			ws.close(1011, ERROR_SERVER_MESSAGE);
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
