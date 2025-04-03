import { Router } from "express";
import { router as apiRouter } from "./api.router";
import { router as testRouter } from "./test.router";
import { router as verifyRouter } from "./verify.router";
import { ERROR_NOT_FOUND, ERROR_NOT_FOUND_MESSAGE } from "../constant/constant";

export const router = Router();

router.use(apiRouter);
router.use(verifyRouter);
router.use(testRouter);

router.use((req, res) => {
	if (!res.headersSent) {
		res.status(ERROR_NOT_FOUND).json({ error: ERROR_NOT_FOUND_MESSAGE });
	}
});
