import type { Request, Response } from "express";
import * as classService from "../services/classService.js";

// GET /classes
export const fetchAllCharacters = async (req: Request, res: Response) => {
    try {
        const allCharacters = await classService.allCharacters();
        res.status(200).json(allCharacters);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

// GET /classes/job?name=
export const fetchJob = async (req: Request, res: Response) => {
    try {
        const jobName = req.query.name as string;
        if (!jobName) return res.status(400).json({ error: "Missing job name" });

        const job = await classService.selectedJob(jobName);
        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

// GET /classes/origin?name=
export const fetchOrigin = async (req: Request, res: Response) => {
    try {
        const originName = req.query.name as string;
        if (!originName) return res.status(400).json({ error: "Missing origin name" });

        const origin = await classService.selectedOrigin(originName);
        res.status(200).json(origin);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

// GET /classes/character/:id
export const fetchCharacter = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Missing character ID" });
        }

        const charId = parseInt(id);
        if (isNaN(charId)) {
            return res.status(400).json({ error: "Invalid character ID" });
        }

        const character = await classService.selectedCharacter(charId);
        res.status(200).json(character);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};
