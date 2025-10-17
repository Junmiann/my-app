import pool from "../db.js";
import bcrypt from "bcrypt";
import type { User } from "../types/user.js";

export async function authenticateUser(email: string, password: string) {
    try {
        const userResult = await pool.query("SELECT * FROM login_credentials WHERE email = $1", [email]);
        if (userResult.rowCount === 0) {
            throw new Error("User not found");
        }

        const hashedPassword = userResult.rows[0].password;

        const passwordMatches = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatches) {
            throw new Error("Invalid credentials");
        }
        /* TEST purpose */
        return userResult.rows[0].email; 

    } catch (error) {
        throw error;
    }
}

export async function createNewUser(user: User) {
    const client = await pool.connect();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await client.query("BEGIN");

        const userResult = await client.query(
            "INSERT INTO users (first_name, last_name, group_id) VALUES ($1, $2, $3) RETURNING id", 
            [user.firstName, user.lastName, user.groupId]
        );

        const userId = userResult.rows[0].id;

        await client.query(
            "INSERT INTO login_credentials (user_id, email, password) VALUES ($1, $2, $3)", 
            [userId, user.email, hashedPassword]
        );

        await client.query("COMMIT");

    } catch(error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

/* Validations */
export async function validateInputs(user: User): Promise<boolean> {
    const allFieldsFilled = Object.values(user).every(value => {
        if (typeof value === "string") {
            return value.trim() !== "";
        }
        return value !== null && value !== undefined;
    });

    if (!allFieldsFilled) {
        throw new Error("All fields must be filled in");
    }

    await validateGroupId(user.groupId);
    await validateEmail(user.email);

    return true;
}

async function validateGroupId(groupId: string) {
    const groupIdResult = await pool.query("SELECT id FROM groups WHERE id = $1", [groupId]);
    if (groupIdResult.rowCount === 0) {
      throw new Error("Group ID does not exist");
    }
}

async function validateEmail(email: string) {
    const emailResult = await pool.query("SELECT email FROM login_credentials WHERE email = $1", [email]);
    if (emailResult.rowCount === 1) {
      throw new Error("The email is already registered");
    }
}