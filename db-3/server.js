import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {getCats, getCat, getToysForCat} from './data/cats.js';
import router  from "./router.js";
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json())
app.use("/api", router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/cats', async (req, res) => {
    const cats = await getCats();
    res.render('cats_list', {cats});
});

app.get('/cats/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const cat = await getCat(id);
    const toys = await getToysForCat(id);
    console.log(toys);
    res.render('cat_detail', {cat, toys});
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});