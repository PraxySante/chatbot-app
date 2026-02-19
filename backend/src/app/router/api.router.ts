import { Router } from "express";
import controllerWrapper from "../middlewares/controller.wraper";
import apiController from "../controller/api.controller";
import limiterRequestApi from "../middlewares/limiter.request";
import verifyAuthRedis from "../middlewares/verify.authRedis";
import verifyOrigin from "../middlewares/verify.origin";

/**
 * @typedef {object} Auth
 * @property {string} project.required - Auth project
 * @property {string} language.required - Auth language
 */

/**
 * @typedef {object} ContinueChat
 * @property {string} project.required - Conversation project
 * @property {string} language.required - Conversation language
 * @property {string} uuidSession.required - Conversation uuidSession
 * @property {string[]} history.required - Conversation history
 * @property {string} message.required - Conversation message
 */

/**
 * @typedef {object} SaveCallBot
 * @property {string} project.required - CallBot project
 * @property {string} language.required - CallBot language
 * @property {string} firstNameDoctor.required - CallBot First name doctor
 * @property {string} lastNameDoctor.required - CallBot Last name doctor
 * @property {string} callingNumber.required - CallBot calling number patient
 * @property {string} dateOfBirth.required - CallBot day or birth patient
 * @property {string} First_name_patient.required - CallBot First name patient
 * @property {string} lastNamePatient.required - CallBot Last name patient
 * @property {string} firstNamePatient.required - CallBot First name patient
 * @property {string[]} history.required - CallBot history
 */

/**
 * @typedef {object} Feedback
 * @property {string} project.required - Document project
 * @property {string} language.required - Document language
 * @property {string} uuidSession.required - Document uuidSession
 * @property {string} note.required - TranscribeAudio project
 * @property {string} comment.required - TranscribeAudio language
 */

/**
 * @typedef {object} Document
 * @property {string} project.required - Document project
 * @property {string} language.required - Document language
 * @property {string} uuidSession.required - Document uuidSession
 * @property {string} urlDocument.required - TranscribeAudio uuidSession
 */

/**
 * @typedef {object} TranscribeAudio
 * @property {string} project.required - TranscribeAudio project
 * @property {string} language.required - TranscribeAudio language
 * @property {string} uuidSession.required - TranscribeAudio uuidSession
 * @property {string[]} audioBase64.required - TranscribeAudio audio
 */

/**
 * @typedef {object} RestartConversation
 * @property {string} project.required - RestartConversation project
 * @property {string} language.required - RestartConversation language
 * @property {string} uuidSession.required - RestartConversation uuidSession
 * @property {string[]} audioBase64.required - TranscribeAudio audio
 */

/**
 * @typedef {object} EndingConversation
 * @property {string} project.required - EndingConversation project
 * @property {string} language.required - EndingConversation language
 * @property {string} uuidSession.required - EndingConversation uuidSession
 */

/**
 * @typedef {object} BadRequest
 * @property {string} message - message bad request
 * @property {string} details - details bad request
 */

/**
 * @typedef {object} ErrorResponse
 * @property {string} message - message error
 * @property {string} details - details error
 */

export const router = Router();

/**
 *  POST /api/auth
 * @summary Auth M2M Auth Keycloack
 * @tags Auth
 * @param {Auth} request.body.required
 * @example request - application/json
 * {
	"project": "Foch",
	"language": "fr"
	}
 * @return {object} 200 - OK - application/json
* @example response - 200 - application/json
* {
*   "message": "Success connection"
* }
 * @return {BadRequest} 400 - Bad request - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post("/auth", controllerWrapper(apiController.requestAuthToken));

/**
 *  POST /api/start
 * @summary Start conversation between chatbot and api LLM
 * @tags Chatbot
 * @param {Auth} request.body.required
 * @example request - application/json
 * {
	"project": "Foch",
	"language": "fr"
}
 * @return {object} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
    "message": {
        "role": "assistant",
        "content": "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre général sur l'Hôpital Foch. Comment puis-je vous aider ?"
    },
    "uuid": "303c1810a40f427a9c7eedc87be5de22"}
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * 		"message": "Failure",
 * 		"details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/start",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.startChat),
);

/**
 *  POST /api/chat
 * @summary Keep chating between chatbot and api LLM
 * @tags Chatbot
 * @param {ContinueChat} request.body.required
 * @example request - application/json
 * {
 * 	"project": "Foch",
 * "language": "fr",
 * "uuidSession": "303c1810a40f427a9c7eedc87be5de22",
 *   "history": [
            {
                "role": "assistant",
                "content": "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
            }
       ],
    "message": {
                "role": "user",
                "content": "mon patient a de l'hypertension, est obèse, une insufissance cardiaque, a mal toléré son traitement de statines, quels examens complémentaires recommandes tu ? et quelles options de traitement"
            }
}
 * @return {object} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
    "message": {
        "role": "assistant",
        "content": "Je ne suis pas autorisé à vous donner des informations de nature médicale."
    },
    "sources": [
        {
            "doc_type": "doc",
            "doc_ref": "doc_folders/foch_data/Fiche_info_patient_arteriographie_maj-nov-21.pdf",
            "doc_name": "arteriographie diagnostique EN RADIOLOGIE.",
            "url": "/document/303c1810a40f427a9c7eedc87be5de22?doc_id=ZG9jX2ZvbGRlcnMvZm9jaF9kYXRhL0ZpY2hlX2luZm9fcGF0aWVudF9hcnRlcmlvZ3JhcGhpZV9tYWotbm92LTIxLnBkZg=="
        },
				{
            "doc_type": "doc",
            "doc_ref": "doc_folders/foch_data/Livret_de_loperej0_stc_2024.pdf",
            "doc_name": "Livret_De_L'OpéréJ0_STC_2024",
						"url": "/document/303c1810a40f427a9c7eedc87be5de22?doc_id=ZG9jX2ZvbGRlcnMvZm9jaF9kYXRhL0xpdnJldF9kZV9sb3BlcmVqMF9zdGNfMjAyNC5wZGY="
						}
						]
 * }
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/chat",
	controllerWrapper(verifyOrigin),
	controllerWrapper(limiterRequestApi),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.continueChat),
);

/**
 *  POST /api/reformulate
 * @summary Reformulate question by api LLM
 * @tags Chatbot
 * @param {ContinueChat} request.body.required
 * @example request - application/json
 * {
 *  "project": "Foch",
 * 	"language": "fr",
 *  "uuidSession": "303c1810a40f427a9c7eedc87be5de22"
 * }
 * @return {object} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
    "reformulations": [
        {
            "role": "assistant",
            "content": ". Quelles sont les examens complémentaires recommandés pour un patient hypertendu, obèse, en insuffisance cardiaque, ayant mal toléré ses statines, et quelles options thérapeutiques possibles ?"
        },
        {
            "role": "assistant",
            "content": ". Pour un patient présentant une hypertension, une obésité, une insuffisance cardiaque et une mauvaise tolérance aux statines, quels examens complémentaires sont indiqués et quelles stratégies de traitement envisager ?"
        },
        {
            "role": "assistant",
            "content": ". Quelles investigations complémentaires préconiseriez-vous pour un patient avec ces antécédents et quelles sont les options de traitement adaptées dans ce contexte ?"
        }
    ]
 * }
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/reformulate",
	controllerWrapper(verifyOrigin),
	controllerWrapper(limiterRequestApi),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.reformulationChat),
);

/**
 *  POST /api/transcribe-audio
 * @summary Transcription speech to text by api Transcription
 * @tags Chatbot
 * @param {TranscribeAudio} request.body.required
 * @example request - application/json
 * {
 *  "project": "Foch",
 * 	"language": "fr",
 *  "uuidSession": "303c1810a40f427a9c7eedc87be5de22",
 *  "audioBase64" : ["base64string"]
 * }
 * @return {string} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
 *  "data": "J'utilise mon microphone"
 * }
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/transcribe-audio",
	controllerWrapper(verifyOrigin),
	controllerWrapper(limiterRequestApi),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.requestTranscribeAudio),
);

/**
 * POST /api/document
 * @summary Display document
 * @tags Chatbot
 * @param {Document} request.body.required
 * @example request - application/json
 * {
 *  "project": "Foch",
 * 	"language": "fr",
 *  "uuidSession": "303c1810a40f427a9c7eedc87be5de22",
 *   "urlDocument": "/document/303c1810a40f427a9c7eedc87be5de22doc_id=ZG9jX2ZvbGRlcnMvZm9jaF9kYXRhL0ZpY2hlX2luZm9fcGF0aWVudF9hcnRlcmlvZ3JhcGhpZV9tYWotbm92LTIxLnBkZg=="
 * }
 * @return {object} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
 *  "content": "document pdf"
 * }
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/document",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.getDocumentPdf),
);

/**
 * POST /api/feedback
 * @summary Record feedback
 * @tags Chatbot
 * @param {Feedback} request.body.required
 * @example request - application/json
 * {
 *  "project": "Foch",
 * 	"language": "fr",
 *  "uuidSession": "303c1810a40f427a9c7eedc87be5de22",
 *  "note": "5",
 * 	"comment": "C'est top"
 * }
 * @return {string} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
 *  "status": 200,
 *  "details": "message"
 * }
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/feedback",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.feedbackChat),
);

/**
 * POST /api/restart
 * @summary Restart a new conversation
 * @tags Chatbot
 * @param {RestartConversation} request.body.required
 * @example request
 * {
 *  "project": "Foch",
 * 	"language": "fr",
 *  "uuidSession": "303c1810a40f427a9c7eedc87be5de22"
 * }
 * @return {string} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
 *  "status": 200,
 *  "details": "message"
 * }
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/restart",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.restartChat),
);

/**
 * POST /api/end
 * @summary Ending conversation
 * @tags Chatbot
 * @param {EndingConversation} request.body.required
 * @example request
 * {
 *  "project": "Foch",
 * 	"language": "fr",
 *  "uuidSession": "303c1810a40f427a9c7eedc87be5de22"
 * }
 * @return {object} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
 *  "status": 200,
 *  "details": "message"
 * }
 * @return {BadRequest} 400 - Bad request response - application/json
 * @example response - 400 - example error response
 * {
 * "message": "Failure",
 * "details": "Missing ip in request headers."
 * }
 * @return {ErrorResponse} 500 - Internal Server Error - application/json
 * @example response - 500 - example error response
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.post(
	"/end",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.endChat),
);
