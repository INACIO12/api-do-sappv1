const express = require('express');
const router = express.Router();
const { startSession, getQRCodeImage } = require('../controllers/sessionController');

// Iniciar sessão
router.get('/start/:id', startSession);

// Obter imagem QR code
router.get('/qr/:id/image', getQRCodeImage);

module.exports = router;