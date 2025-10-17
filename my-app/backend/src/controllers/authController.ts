import type { Request, Response } from "express";
import * as authService from "../services/authService.js";

export const login = async (req: Request, res: Response) => {
    try {
        const user = await authService.authenticateUser(req.body.email, req.body.password);
        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ error: (error as Error).message });
    }
};