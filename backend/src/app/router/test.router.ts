import { Router } from "express";
import testController from "../controller/test.controller";
import controllerWrapper from "../middlewares/controller.wraper";

export const router = Router();

/**
 * GET /api/test
 * @summary Test ping API chatbot
 * @tags Health
 * @return {object} 200 - OK - application/json
 * @example response - 200 - application/json
 * {
 *   "ping": "pong"
 * }
 * @return {object} 404 - Not found
 * @example response - 404 - application/json
 * {
 *   "details": "Not Found"
 * }
 * @return {object} 500 - Internal Server Error
 * @example response - 500 - application/json
 * {
 *   "error": "Internal Server Error"
 * }
 */
router.get("/test", controllerWrapper(testController.testPing));
