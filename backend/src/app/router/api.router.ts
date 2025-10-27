import { Router } from "express";
import controllerWrapper from "../middlewares/controller.wraper";
import apiController from "../controller/api.controller";
import limiterRequestApi from "../middlewares/limiter.request";
import verifyAuthRedis from "../middlewares/verify.authRedis";
import verifyOrigin from "../middlewares/verify.origin";

export const router = Router();

router.post("/auth", controllerWrapper(apiController.requestAuthToken));

router.post(
	"/start",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.startChat)
);

router.post(
	"/chat",
	controllerWrapper(verifyOrigin),
	controllerWrapper(limiterRequestApi),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.continueChat)
);

router.post(
	"/reformulate",
	controllerWrapper(verifyOrigin),
	controllerWrapper(limiterRequestApi),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.reformulationChat)
);

router.post(
	"/transcribe-audio",
	controllerWrapper(verifyOrigin),
	controllerWrapper(limiterRequestApi),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.requestTranscribeAudio)
);

router.post(
	"/document",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.getDocumentPdf)
);

router.post(
	"/feedback",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.feedbackChat)
);

router.post(
	"/restart",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.restartChat)
);

router.post(
	"/end",
	controllerWrapper(verifyOrigin),
	controllerWrapper(verifyAuthRedis),
	controllerWrapper(apiController.endChat)
);
