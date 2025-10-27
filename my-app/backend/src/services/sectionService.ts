import pool from "../db.js";

export async function createNewSection(userId: number, title: string) {
    const client = await pool.connect();
    
    try {
        const userResult = await client.query("SELECT group_id FROM users WHERE id = $1", [userId]);

        if (userResult.rowCount === 0) {
            throw new Error("User not found");
        }

        const groupId = userResult.rows[0].group_id;

        const sectionResult = await client.query(
            "INSERT INTO sections (title, group_id) VALUES ($1, $2) RETURNING *",
            [title, groupId]
        );

        return sectionResult.rows[0];
    } finally {
        client.release();
    }
}
