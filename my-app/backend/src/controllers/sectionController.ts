import type { Request, Response } from "express";
import * as sectionService from "../services/sectionService.js";

export const createSection = async (req: Request, res: Response) => {
    try {
        const { userId, title } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({ error: "Please fill in a title." });
        }

        const newSection = await sectionService.createNewSection(userId, title);

        res.status(201).json({ message: "New section created", section: newSection });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};
