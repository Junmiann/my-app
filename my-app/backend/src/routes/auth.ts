import { Router } from "express";
import type { Request, Response } from "express";
import pool from "../db.js";
import bcrypt from 'bcrypt';
import type { LoginCredential } from "../types/loginCredential.js";
import type { User } from "../types/user.js";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginCredential;

    try {
      const userResult = await pool.query("SELECT * FROM login_credentials WHERE email = $1", [email]);
      if (userResult.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const hashedPassword = userResult.rows[0].password;

      const passwordMatches = await bcrypt.compare(password, hashedPassword);
      if (!passwordMatches) {
          return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({ message: "Login successful!", userResult });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Database error" });
    }
});

router.post("/register", async (req: Request, res: Response) => {
  const { groupId, firstName, lastName, email, password } = req.body as User;

  const client = await pool.connect();

  try {
    const groupIdResult = await client.query("SELECT id FROM groups WHERE id = $1", [groupId]);
    if (groupIdResult.rowCount === 0) {
      return res.status(400).json({ error: "Group ID does not exist" });
    }

    const emailResult = await client.query("SELECT email FROM login_credentials WHERE email = $1", [email]);
    if (emailResult.rowCount === 1) {
      return res.status(409).json({ error: "The email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query("BEGIN");

    const userResult = await client.query(
        "INSERT INTO users (first_name, last_name, group_id) VALUES ($1, $2, $3) RETURNING id", 
        [firstName, lastName, groupId]
    );

    const userId = userResult.rows[0].id;

    await client.query(
        "INSERT INTO login_credentials (user_id, email, password) VALUES ($1, $2, $3)", 
        [userId, email, hashedPassword]
    );

    await client.query("COMMIT");

    res.status(201).json({ message: "New user created", userId });

  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Database error" });

  } finally {
    client.release();
  }
});

export default router;