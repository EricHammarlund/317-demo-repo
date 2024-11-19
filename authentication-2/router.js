import express from 'express';

import {createCat, updateCat, deleteCat} from './data/cats.js';

const router = express.Router();

router.post('/cats', async (req, res) => {
    const catData = req.body;
    try {
        const cat = await createCat(catData);
        res.status(200).json(cat)
    } catch (error) {
        console.log(error)
        res.status(500).json({"message": `${error}`})
    }
});

router.patch('/cats/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const catData = req.body;
    try {
        const cat = await updateCat(id, catData);
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json({"message": `${error}`})
    }
});


router.delete('/cats/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cat = await deleteCat(id);
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json({"message": `${error}`})
    }
});

export default router;