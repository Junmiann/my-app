import { Router } from "express";
import type { Request, Response } from "express";
import type { Note } from "../types/note.js";

const router = Router();

const notes: Note[] = [
  { id: 1, title: "Greeting", writtenByUser: 1, note: "Hello /Anna" },
  { id: 2, title: "First note", writtenByUser: 2, note: "This is my first note." },
];

router.get("/", (req: Request, res: Response) => {
    res.json(notes);
});

export default router;