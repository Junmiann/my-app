import pool from "../db.js";

export async function fetchAllNotes(sectionId: number) {
    const client = await pool.connect();
    
    try {
        const notesResults = await client.query("SELECT * FROM notes WHERE section_id = $1", 
            [sectionId]);
        
        if (notesResults.rows.length === 0) {
            throw new Error("No notes found");
        }

        return notesResults.rows;
    } finally {
        client.release();
    }
}

export async function createNewNote(userId: number, sectionId: number) {
    const client = await pool.connect();

    try {
        await client.query("INSERT INTO notes (written_by, section_id) VALUES ($1, $2)", 
            [userId, sectionId]);
    } finally {
        client.release();
    }
}