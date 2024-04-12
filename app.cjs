const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados MongoDB (certifique-se de instalar o mongoose)
mongoose.connect('mongodb://localhost/surveyPlatformDB', { useNewUrlParser: true, useUnifiedTopology: true });

const surveySchema = new mongoose.Schema({
    title: String,
    questions: [
        {
            text: String,
            options: [String],
        },
    ],
});

const Survey = mongoose.model('Survey', surveySchema);

app.use(express.json());

// Rota para criar uma nova pesquisa
app.post('/surveys', async (req, res) => {
    const { title, questions } = req.body;
    const survey = new Survey({ title, questions });
    await survey.save();
    res.json(survey);
});

// Rota para listar todas as pesquisas
app.get('/surveys', async (req, res) => {
    const surveys = await Survey.find();
    res.json(surveys);
});

app.listen(PORT, () => {
    console.log(`Servidor da plataforma de questionários e pesquisas rodando na porta ${PORT}`);
});
