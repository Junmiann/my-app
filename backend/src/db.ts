import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

async function verifyConnection(): Promise<void> {
    try {
        const client = await pool.connect();
        console.log("Connected to database");
        client.release();
    } catch (error) {
        console.error("Failed to connect to database");
    }
}

verifyConnection();

export default pool;