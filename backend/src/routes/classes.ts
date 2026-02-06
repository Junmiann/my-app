import { Router } from "express";
import * as classController from "../controllers/classController.js";

const router = Router();

router.get("/", classController.fetchClasses);
router.get("/job", classController.fetchJob);
router.get("/origin", classController.fetchOrigin);
router.get("/character/:id", classController.fetchCharacter);

export default router;