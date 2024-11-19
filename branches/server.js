import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send("we love orange cat");
});

app.get('/route1', (req, res) => {
    res.send("we also love black cat, this is route 1");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});