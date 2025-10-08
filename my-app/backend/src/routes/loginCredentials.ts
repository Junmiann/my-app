import { Router } from "express";
import type { Request, Response } from "express";
import type { LoginCredential } from "../types/loginCredential.js";

const router = Router();

const credentials: LoginCredential[] = [
    {id: 1, userId: 1, email: "AnnaJohnson@gmail.com", password: "Hi123"},
    {id: 2, userId: 2, email: "Bob@gmail.com", password: "Bob"}
];

/* TEST: created solely to try existingGroup */
const groups = [
    {id: 3},
    {id: 19}
];

router.post("/register", (req: Request, res: Response) => {
    const { userId, email, password, groupId } = req.body;

    const existingEmail = credentials.find(user => user.email === email);
    if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
    }

    const existingGroup = groups.find(group => group.id === groupId);
    if (!existingGroup) {
        return res.status(400).json({ error: "Group ID doesn't exist "});
    }

    const lastUser = credentials.at(-1);
    const newId = lastUser ? lastUser.id + 1 : 1;

    const newCredential = {id: newId, userId, email, password};
    credentials.push(newCredential);
    res.json(newCredential);
});

router.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = credentials.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful!", user });
});

export default router;