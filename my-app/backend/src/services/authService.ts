import pool from "../db.js";
import bcrypt from 'bcrypt';

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