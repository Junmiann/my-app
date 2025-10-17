import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const { sectionId } = req.body;
        const notesResults = await pool.query("SELECT * FROM notes WHERE section_id = $1", [sectionId]);

        if (notesResults.rows.length === 0) {
            return res.status(200).json({ message: "No notes found", notes: [] });
        }

        res.json(notesResults.rows);
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Could not fetch notes" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { userId, sectionId } = req.body as { userId: number, sectionId: number };

        await pool.query("INSERT INTO notes (written_by, section_id) VALUES ($1, $2)", 
            [userId, sectionId]);
        
        return res.status(200).json({ message: "New note created"});
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Could not create a new note"});
    }
});

export default router;