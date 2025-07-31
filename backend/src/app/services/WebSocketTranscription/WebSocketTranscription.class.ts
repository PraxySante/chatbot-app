import { WebSocket } from "ws";
import {
	ResponseFailureType,
	ResponseMessageType,
} from "../../types/chatbot.type";
import { axiosChatBot } from "../ChatBot/axiosChatBot.service";
import {
	ASSISTANT,
	BEARER,
	ERROR_DATABASE_MESSAGE,
	ERROR_NOT_AUTHENTIFIED_MESSSAGE,
	ERROR_SERVER_MESSAGE,
	FAILURE_COLLECTION_MESSAGE,
	FAILURE_MESSAGE,
	SUCCESS_OK,
	USER,
} from "../../constant/constant";
import { createConversationDirectus } from "../Directus/create.service";
import {
	ConversationDirectusAttributes,
	CreateConversationDirectusAttributes,
} from "../../types/directus.type";
import { getKeyRedis, updateKeyRedis } from "../../datamapper/redis.datamapper";
import { updateConversationDirectus } from "../Directus/update.service";
import { KeyRedisType, ResponseKeyRedisType } from "../../types/redis.type";
import { readConversationDirectus } from "../Directus/read.service";

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
	protected idDirectus!: string;
	protected project!: string;

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

	startWebsocketApi(
		ip: any,
		uuidSession: string,
		uuidTranscription: string,
		project: string
	) {
		console.log("✅ Initialisation WebSocket API Transcription");

		// Instance pour connexion vers API Transcription
		this.wsTranscription = new WebSocket(this.wsAddressApi);

		this.wsTranscription.on("open", () => {
			console.log("✅ Connecté à l'API Transcription");
			this.isConnected = true;
		});

		this.wsTranscription.on("message", async (msg) => {
			if (process.env.COLLECTION_DIRECTUS === undefined) {
				console.error(FAILURE_COLLECTION_MESSAGE);
				this.wsParent.close(1011, FAILURE_COLLECTION_MESSAGE);
				return;
			}

			const { status, details }: ResponseKeyRedisType | ResponseFailureType =
				await getKeyRedis(`${ip}-${uuidSession}`);

			// Message Error Typed - error message from Redis
			if (status !== SUCCESS_OK && typeof details === "string") {
				this.wsParent.close(1011, details);
				return;
			}

			// Message Error Typed - check structure auth
			if (typeof details !== "object" || !("authToken" in details)) {
				this.wsParent.close(1011, ERROR_NOT_AUTHENTIFIED_MESSSAGE);
				return;
			}

			this.idDirectus = details?.idDirectus;

			if (this.wsParent.readyState === WebSocket.OPEN) {
				await this.getHistoryChatBot(details);

				if (!this.idDirectus) {
					this.project = project;
					const data: CreateConversationDirectusAttributes = {
						Name: project,
						Uuid_Transcription: uuidTranscription,
					};

					const responseDirectus:
						| ConversationDirectusAttributes
						| ResponseFailureType = await createConversationDirectus(
						process.env.COLLECTION_DIRECTUS,
						data
					);

					if ("details" in responseDirectus) {
						console.error({
							status: responseDirectus.status,
							details: responseDirectus.details,
						});
						this.wsParent.close(1011, ERROR_DATABASE_MESSAGE);
						return;
					}

					if ("id" in responseDirectus) {
						await updateKeyRedis(
							`${ip}-${uuidSession}`,
							"idDirectus",
							responseDirectus?.id
						);
						this.idDirectus = responseDirectus.id;
					}
				} else {
					const data: CreateConversationDirectusAttributes = {
						Name: project,
						Uuid_Transcription: uuidTranscription,
					};

					const responseDirectus:
						| ConversationDirectusAttributes
						| ResponseFailureType = await updateConversationDirectus(
						this.idDirectus,
						process.env.COLLECTION_DIRECTUS,
						data
					);

					if ("details" in responseDirectus) {
						console.error({
							status: responseDirectus.status,
							details: responseDirectus.details,
						});
						this.wsParent.close(1011, ERROR_DATABASE_MESSAGE);
						return;
					}
				}

				this.wsParent.send(msg.toString());
				const userMessage = JSON.parse(msg.toString());

				const transcript = userMessage?.message?.transcript?.[0]?.[1];

				if (transcript) {
					const preparedUserMessage = {
						role: USER,
						content: transcript,
					};
					this.updateHistoryChatAndRequest(preparedUserMessage);
					this.requestTranscriptionToLLM();
				}
			}
		});

		this.wsTranscription.on("close", (code, reason) => {
			console.log(
				`❌ Déconnecté de API Transcription (Code: ${code}, Reason: ${reason})`
			);

			this.isConnected = false;
			if (this.wsParent.readyState === WebSocket.OPEN) {
				this.wsParent.close(code, reason);
				return;
			}
		});

		this.wsTranscription.on("error", (error) => {
			console.error("❌ Erreur avec connection ws Api Transcription:", error);
			this.isConnected = false;
			if (this.wsParent.readyState === WebSocket.OPEN) {
				this.wsParent.close(1011, ERROR_SERVER_MESSAGE);
			}
		});

		// Écoute des messages du Front à relayer vers API Transcription
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

	async getHistoryChatBot(details: KeyRedisType): Promise<void> {
		if (details?.idDirectus !== "") {
			if (process.env.COLLECTION_DIRECTUS === undefined) {
				console.error(FAILURE_COLLECTION_MESSAGE);
				this.wsParent.close(1011, FAILURE_COLLECTION_MESSAGE);
				return;
			}

			const responseDirectus:
				| ConversationDirectusAttributes
				| ResponseFailureType = await readConversationDirectus(
				details?.idDirectus,
				process.env.COLLECTION_DIRECTUS
			);

			if ("details" in responseDirectus) {
				console.error(FAILURE_MESSAGE);
				this.wsParent.close(1011, ERROR_DATABASE_MESSAGE);
				return;
			}

			const historicChat: any = responseDirectus?.Historic;
			const askedQuestion: any = responseDirectus?.Asked_question;
			const modelAnswer = responseDirectus?.Model_answer;

			if (responseDirectus?.Historic) {
				this.historyChat = [
					...JSON.parse(historicChat),
					JSON.parse(askedQuestion),
					JSON.parse(modelAnswer),
				];
				return;
			}
		}
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
		if (process.env.COLLECTION_DIRECTUS === undefined) {
			console.error(FAILURE_COLLECTION_MESSAGE);
			this.wsParent.close(1011, FAILURE_COLLECTION_MESSAGE);
			return;
		}

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

			const data = {
				Asked_question: this.requestUserMessage,
				Model_answer: responseApi.data.message,
				Source_nodes: [...responseApi.data.sources],
				Historic: [...this.historyChat],
				isTranscription: true,
			};

			const responseDirectus:
				| ConversationDirectusAttributes
				| ResponseFailureType = await updateConversationDirectus(
				this.idDirectus,
				process.env.COLLECTION_DIRECTUS,
				data
			);

			if ("details" in responseDirectus) {
				console.error({
					status: responseDirectus.status,
					details: responseDirectus.details,
				});
			}

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
			this.wsParent.close(1011, ERROR_SERVER_MESSAGE);
			return;
		}
	}

	closeConnection() {
		if (
			this.wsTranscription &&
			this.wsTranscription.readyState === WebSocket.OPEN
		) {
			this.wsTranscription.close(1000, "Fermeture normale");
			return;
		}
	}
}
