import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../db.js";
import type { Note } from "../types/note.js";

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

export default router;