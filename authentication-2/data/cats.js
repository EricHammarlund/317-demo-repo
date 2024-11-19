import { pool } from '../config/database.js';

const getCats = async () => {
    try {
        const results = await pool.query('SELECT * FROM cats ORDER BY id ASC')
        return results.rows;
    } catch (error) {
        console.error( error.message )
    }
};

const getCat = async (id) => {
    try {
        const results = await pool.query('SELECT * FROM cats WHERE id=$1', [id])
        return results.rows[0];
    } catch (error) {
        console.error( error.message )
    }
};

const createCat = async (data) => {
    try {
        const { name, color, human, photo } = data;
        const results = await pool.query('INSERT INTO cats (name, color, human, photo) VALUES ($1, $2, $3, $4) RETURNING *', [name, color, human, photo]);
        return results.rows[0];
    } catch (error) {
        console.error( error.message )
    }
};

const updateCat = async (id, data) => {
    try {
        const query = await pool.query('SELECT * FROM cats WHERE id = $1', [id])
        const current = query.rows[0];
        let updatedData = {
            ...current,
            ...data
        }
        const { name, color, human, photo } = updatedData;
        const results = await pool.query('UPDATE cats SET name = $1, color = $2, human = $3, photo = $4 WHERE id = $5 RETURNING *', [name, color, human, photo, id])
        console.log(results.rows)
        return results.rows;
    } catch (error) {
        console.error( error.message )
    }
};

const deleteCat = async (id) => {
    try {
        const results = await pool.query('DELETE FROM cats WHERE id = $1', [id])
        return results.rows;
    } catch (error) {
        console.error( error.message )
    }
};

const getToysForCat = async (cat_id) => {
    try {
        const results = await pool.query('SELECT name FROM toys WHERE cat_id = $1', [cat_id])
        return results.rows;
    } catch (error) {
        console.error( error.message )
    }
};

export {getCats, getCat, getToysForCat, createCat, updateCat, deleteCat};