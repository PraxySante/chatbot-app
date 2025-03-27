import { WebSocket } from "ws";
import { ResponseMessageType } from "../../types/chatbot.type";
import { axiosChatBot } from "../ChatBot/axiosChatBot.service";
import { ASSISTANT, BEARER } from "../../constant/constant";
import { updateConversationDirectus } from "../Directus/update.service";

export class WebSocketTranscription {
	wsAddressApi: string = "";
	protected wsParent!: WebSocket;
	protected wsTranscription!: WebSocket;
	protected uuidChat!: string;
	protected authToken!: string;
	protected isConnected: boolean = false;
	protected historyChat: { role: string; content: string }[] = [];
	protected requestUserMessage!: { role: string; content: string };
	protected chatConversation!: any;

	constructor(
		wsAddressApi: string,
		wsParent: WebSocket,
		uuidChat: string,
		authToken: string
	) {
		this.wsAddressApi = wsAddressApi;
		this.wsParent = wsParent;
		this.uuidChat = uuidChat;
		this.authToken = authToken;
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
			if (this.wsParent.readyState === WebSocket.OPEN) {
				this.wsParent.send(msg.toString());
				const userMessage = JSON.parse(msg.toString());

				const transcript = userMessage?.message?.transcript?.[0]?.[1];

				if (transcript) {
					const preparedUserMessage = {
						role: "user",
						content: transcript,
					};
					this.updateHistoryChatAndRequest(preparedUserMessage);
					this.requestTranscriptionToLLM();
				}
			}
		});

		this.wsTranscription.on("close", (code, reason) => {
			console.log(`❌ Déconnecté de API 3 (Code: ${code}, Reason: ${reason})`);

			this.isConnected = false;
			if (this.wsParent.readyState === WebSocket.OPEN) {
				this.wsParent.close(code, reason);
				return;
			}
		});

		this.wsTranscription.on("error", (error) => {
			console.error("❌ Erreur WebSocketTranscription:", error);
			this.isConnected = false;
			if (this.wsParent.readyState === WebSocket.OPEN) {
				this.wsParent.close(1011, "Internal Error");
			}
		});

		// Écoute des messages du Front à relayer vers API 3
		this.wsParent.on("message", (message) => {
			// Vérifier que la connexion est bien établie
			if (
				this.isConnected &&
				this.wsTranscription.readyState === WebSocket.OPEN
			) {
				this.wsTranscription.send(message);
			}
		});
	}

	updateHistoryChatAndRequest(preparedMessage: any) {
		this.historyChat.push(preparedMessage);
		if (preparedMessage.role !== ASSISTANT) {
			this.requestUserMessage = preparedMessage;
		}

		this.chatConversation = {
			history: this.historyChat,
			message: this.requestUserMessage,
		};
	}

	async requestTranscriptionToLLM() {
		try {
			const responseApi: ResponseMessageType = await axiosChatBot.post(
				`/chat/${this.uuidChat}`,
				this.chatConversation,
				{
					headers: {
						Authorization: `${BEARER} ${this.authToken}`,
					},
				}
			);

			const preparedAssistantMessage = {
				role: ASSISTANT,
				content: responseApi.data.message.content,
			};

			this.updateHistoryChatAndRequest(preparedAssistantMessage);

			// Vérifier que la connexion est toujours active
			if (this.wsParent.readyState === WebSocket.OPEN) {
				// Envoyer la réponse du LLM au front
				this.wsParent.send(
					JSON.stringify({
						type: "llm_response",
						data: {
							status: responseApi.status,
							details: responseApi.data.message,
							sources: [...responseApi.data.sources],
						},
					})
				);
			}
		} catch (error: any) {
			console.error(error.message);
			this.wsParent.close(1011, "Internal Error");
		}
	}

	closeConnection() {
		if (
			this.wsTranscription &&
			this.wsTranscription.readyState === WebSocket.OPEN
		) {
			this.wsTranscription.close(1000, "Fermeture normale");
		}
	}
}
