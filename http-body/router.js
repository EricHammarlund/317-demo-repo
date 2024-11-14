import express from 'express';

import {createCat, updateCat, deleteCat} from './data/cats.js';

const router = express.Router();

// add POST and PATCH api routes here
router.post("/cats", (req, res) => {
    const catData = req.body;
    const cat = createCat(catData);
    res.status(200).json(cat);
});

router.patch("/cats/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const catData = req.body;
    const cat = updateCat(id, catData);
    res.status(200).json(cat);
});

router.delete('/cats/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cat = deleteCat(id);
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json({"message": `${error}`})
    }
});

export default router;