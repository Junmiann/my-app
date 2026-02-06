import pool from "../db.js";

export async function classes() {
    const client = await pool.connect();
    
    try {
        const charactersResults = await client.query("SELECT * FROM classes");

        return charactersResults.rows;
    } finally {
        client.release();
    }
}

export async function selectedJob(jobName: string) {
    const client = await pool.connect();

    try {
        const selectedJobResult = await client.query(
            `SELECT * FROM classes c WHERE EXISTS (
                SELECT 1
                FROM unnest(c.job) AS x
                WHERE LOWER(x) = LOWER($1)
            );`,
            [jobName]
        );

        return selectedJobResult.rows;
    } finally {
        client.release();
    }
}

export async function selectedOrigin(originName: string) {
    const client = await pool.connect();

    try {
        const selectedOriginResult = await client.query("SELECT * FROM classes WHERE LOWER(origin) = LOWER($1)", 
            [originName]);

        return selectedOriginResult.rows;
    } finally {
        client.release();
    }
}

export async function selectedCharacter(charId: number) {
    const client = await pool.connect();

    try {
        const selectedCharacterResult = await client.query("SELECT * FROM classes WHERE id = $1", 
            [charId]);

        return selectedCharacterResult.rows;
    } finally {
        client.release();
    }
}