import { pool } from '../config/database.js';

const getUser = async (user) => {
    try {
        const results = await pool.query('SELECT * FROM users WHERE username=$1;', [user])
        if (results.rows.length === 0) {
            throw new Error("user not found");
        }
        return results.rows[0];
    } catch (error) {
        console.error( error.message )
    }
};

const createUser = async (user, hashedPassword) => {
    try {
        const results = await pool.query('INSERT INTO users (username, hashedPassword) VALUES ($1, $2);', [user, hashedPassword]);
        return results.rows[0];
    } catch (error) {
        console.error( error.message )
    }
};

export {getUser, createUser};