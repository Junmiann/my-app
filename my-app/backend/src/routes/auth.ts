import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/login", authController.login);
router.post("/registration", authController.registration);

export default router;