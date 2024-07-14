const { v4: uuidv4 } = require('uuid');
const express = require("express");
const axios = require('axios');
const app = express();

// Função para criar uma sessão
async function create_section() {
    const uniqueId = uuidv4();
    const url = `http://localhost:3000/session/start/${uniqueId}`;
    const options = {
        headers: {
            'accept': 'application/json',
            'x-api-key': 'vendas'
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error('Erro na operação axios:', error);
        throw error;
    }
}

// Função para iniciar uma sessão
async function startSession(req, res) {
    try {
        const sessionData = await create_section();
        res.json(sessionData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao iniciar sessão' });
    }
}

// Definir a rota
app.get('/start-session', startSession);

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
