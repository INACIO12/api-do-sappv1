const { v4: uuidv4 } = require('uuid');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs'); // Para salvar a imagem

const app = express();
app.use(express.json());
app.use(cors());

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
        console.log('URL chamada:', url);
        return response.data; // Retorna os dados da resposta
    } catch (error) {
        console.error('Erro na operação axios:', error);
        throw error;
    }
}

// Função para iniciar uma sessão
async function startSession(req, res) {
    try {
        const sessionData = await create_section();
        return res.json(sessionData);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao iniciar sessão' });
    }
}

// Função para obter a imagem do QR Code
async function getQRCodeImage(req, res) {
    const { name } = req.body; // Obtém o parâmetro "name" do corpo da requisição
    const url = `http://localhost:3000/session/qr/${name}/image`;
    const options = {
        headers: {
            'accept': 'image/png',
            'x-api-key': 'vendas'
        },
        responseType: 'arraybuffer' // Para lidar com a resposta binária da imagem
    };

    try {
        const response = await axios.get(url, options);
        // Salvar a imagem recebida
        const filePath = `qr_code_image_${name}.png`;
        fs.writeFileSync(filePath, response.data);
        console.log(`Imagem QR Code salva como ${filePath}`);
        res.sendFile(filePath, { root: __dirname }); // Envia o arquivo como resposta

        return response
    } catch (error) {
        console.error('Erro na operação axios:', error);
        return res.status(500).json({ error: 'Erro ao obter a imagem do QR Code' });
    }
}

// Definir as rotas
app.get('/start-session', startSession);
app.post('/get-QRCode', getQRCodeImage);

// Iniciar o servidor
const port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
