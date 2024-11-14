import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {getCats, getCat} from './data/cats.js';
import router  from "./router.js";
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// add middleware for json and for the api router
app.use(express.json());
app.use("/api", router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cats', (req, res) => {
    const cats = getCats();
    res.render('cats_list', {cats});
});

app.get('/cats/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cat = getCat(id);
    res.render('cat_detail', {cat});
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});