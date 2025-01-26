import { Router } from "express";
import { router as apiRouter } from "./api.router";
import { router as testRouter } from "./test.router";

export const router = Router();

router.use(apiRouter);
router.use(testRouter);

router.use((req, res) => {
	if (!res.headersSent) {		
		res.status(404).json({ error: "Ressource not found" });
	}
});
