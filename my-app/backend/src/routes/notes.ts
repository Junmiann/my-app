import { Router } from "express";
import * as noteController from "../controllers/noteController.js";

const router = Router();

router.get("/", noteController.fetchNotes);
router.post("/", noteController.createNote);

export default router;