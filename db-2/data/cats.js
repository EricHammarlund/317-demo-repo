import { pool } from '../config/database.js';

const getCats = async () => {
    const results = await pool.query('SELECT * FROM cats');
    // console.log(results.rows);
    return results.rows;
};

const getCat = async (id) => {
    const results = await pool.query(
        'SELECT * FROM cats WHERE id=$1 ORDER BY id ASC', [id]);
    return results.rows[0]; // no error checking, assumes 1 row
};


const createCat = async (data) => {
    const { name, color, human, image } = data; // assumes data has all these fields (and will error if required field missing)
    const results = await pool.query(
        'INSERT INTO cats (name, color, human, photo) VALUES ($1, $2, $3, $4) RETURNING *',
        [ name, color, human, image ]);
    return results.rows[0];
};

const updateCat = async (id, data) => {
    const cat = await pool.query('SELECT * FROM cats WHERE id = $1', [id]);
    const currentCat = cat.rows[0];
    let updatedCat = {
        ...currentCat,
        ...data
    }
    console.log(updatedCat);

    const {name, color, human, photo} = updatedCat;
    const results = await pool.query(
        'UPDATE  cats SET name = $1, color = $2, human = $3, photo = $4 WHERE id = $5 RETURNING *', 
        [name, color, human, photo, id]);
    return results.rows;
};

const deleteCat = async (id) => {
    const cat = await pool.query('SELECT * FROM cats WHERE id = $1', [id]);
    await pool.query('DELETE FROM cats WHERE id = $1', [id]);
    return cat.rows;
};

export {getCats, getCat, createCat, updateCat, deleteCat};