import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

const notes = [
  { id: 1, userId: 1, text: "Hello /Anna" },
  { id: 2, userId: 2, text: "This is my first note." },
];

router.get("/", (req: Request, res: Response) => {
    res.json(notes);
});

export default router;