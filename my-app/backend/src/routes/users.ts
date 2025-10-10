import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../db.js";

const router = Router();

/* TEST: will probably be changed onwards */
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Could not fetch users" });
  }
});

export default router;