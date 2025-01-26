import { Router } from "express";
import testController from "../controller/test.controller";
import controllerWrapper from "../middlewares/controller.wraper";

export const router = Router();

router.get("/test", controllerWrapper(testController.testPing));
