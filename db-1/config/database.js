import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const config = {
    connectionString: process_params.env.CONNECTION_STRING
}

const pool = new pg.Pool(config);
export { pool };