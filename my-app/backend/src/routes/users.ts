import { Router } from "express";
import type { Request, Response } from "express";
import type { User } from "../types/user.js";

const router = Router();

const users: User[] = [
  { id: 1, firstName: "Anna", lastName: "Johnson" },
  { id: 2, firstName: "Bob", lastName: "McKnight" },
];

router.get("/", (req: Request, res: Response) => {
    res.json(users);
});

router.post("/", (req: Request, res: Response) => {
  const lastUser = users.at(-1);
  const newId = lastUser ? lastUser.id + 1 : 1;

  const { firstName, lastName } = req.body;

  const newUser = { id: newId, firstName, lastName };
  users.push(newUser);
  res.json(newUser);
});

export default router;