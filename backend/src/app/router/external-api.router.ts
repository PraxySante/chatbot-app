import { Router } from "express";
import externalApiController from "../controller/external-api.controller";
import controllerWrapper from "../middlewares/controller.wraper";
import verifyOrigin from "../middlewares/verify.origin";
import apiKeyMiddleware from "../middlewares/apiKey.middleware";

export const router = Router();

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
 * @typedef {object} CallBot
 * @property {string} clientId.required - CallBot clientId
 * @property {string} apiKeay.required - CallBot apiKey
 */

/**
 *  POST /api/save-call
 * @summary Save chating during callbot
 * @security ApiKeyAuth
 * @tags Callbot
 * @param {SaveCallBot} request.body.required
 * @param {CallBot} request.headers.required
 * @example request - application/json
 * {
 * "project": "Foch",
 * "language": "fr",
 * "statut": "Processed",
 * "history": [
            {
                "role": "assistant",
                "content": "Bonjour. Je suis un assistant pouvant répondre à des questions d'ordre générale sur l'Hopital Foch. Comment puis-je vous aider ?"
            },
             {
                "role": "user",
                "content": "Prendre rendez-vous ?"
            },
            {
                "role": "assistant",
                "content": "Très bien le 20 mars 2026 à 17h."
            },
       ],
  "firstNameDoctor": "Robert",
  "lastNameDoctor": "Charles",
  "callingNumber": "0102030405",
  "dateOfBirth": "19/02/1956",
  "lastNamePatient": "Michel",
  "firstNamePatient": "Martin"
}
 * @return {object} 200 - Sucess response - application/json
 * @example response - 200 - example response
 * {
    "status": "200",
    "details": "Conversation Callbot is created"
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
	"/save-call",
	controllerWrapper(verifyOrigin),
	controllerWrapper(apiKeyMiddleware),
	controllerWrapper(externalApiController.requestAuthTokenExternalApi),
	controllerWrapper(externalApiController.saveCallBotConversation),
);
