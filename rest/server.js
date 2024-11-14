import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getCats, getCatById, deleteCatById } from './data/cats.js';
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// view engine for ejs template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/cats', (req, res) => {
    const cats = getCats();
    res.render('cats_list', {cats});
});

app.get('/cats/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cat = getCatById(id);
    res.render('cat_detail', {'cat': cat})
})

app.delete('/cats/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        deleteCatById(id);
        res.status(200).json({"message": `deleted cat ${id}`})
    } catch (error) {
        res.status(500).json({"message": error});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});