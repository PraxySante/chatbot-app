import { Router } from "express";
import controllerWrapper from "../middlewares/controller.wraper";
import verifyController from "../controller/verify.controller";

export const router = Router();

router.post("/verify-user", controllerWrapper(verifyController.verifyUserReCaptcha));
