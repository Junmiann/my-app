import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

const users = [
  { id: 1, name: "Anna" },
  { id: 2, name: "Charlie" },
];

router.get("/", (req: Request, res: Response) => {
    res.json(users);
});

export default router;