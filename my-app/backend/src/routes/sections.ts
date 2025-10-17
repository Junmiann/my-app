import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../db.js";
import type { Section } from "../types/section.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { userId } = req.body;
    const { title } = req.body as Section;

    const client = await pool.connect();

    try {
        if (title.trim() === "") {
            return res.status(400).json({ error: "Please fill in a title." });
        }

        const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
        const groupId = userResult.rows[0].group_id;

        await pool.query(
            "INSERT INTO sections (title, group_id) VALUES ($1, $2)", 
            [title, groupId]
        );
        res.status(201).json({ message: "New section created", title });

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Could not create a new section" });
    }
});

export default router;