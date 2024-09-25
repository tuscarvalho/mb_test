import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());


app.get("/registration", (req, res) => {
    res.json({
        message: 'Aplicação carregada com sucesso!',
        status: 200,
    });
});

app.post('/registration', (req, res) => {
    res.json({
        message: 'Dados recebidos e retornados com sucesso!',
        objeto: req.body
    });
});


app.listen(3000, function () {
    console.log(`Server rodando na porta http://localhost:3000`);
});

