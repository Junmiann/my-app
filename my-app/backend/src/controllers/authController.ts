import type { Request, Response } from "express";
import * as authService from "../services/authService.js";
import type { User } from "../types/user.js";

export const login = async (req: Request, res: Response) => {
    try {
        const user = await authService.authenticateUser(req.body.email, req.body.password);
        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};

export const registration = async (req: Request, res: Response) => {
    try {
        const user: User = req.body;

        await authService.validateInputs(user);
        await authService.createNewUser(user);

        res.status(200).json({ message: "A new user has been created" });
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};