const express = require('express');
const router = express.Router();
const { register, login, getProtectedData, generateApiKey } = require('../controllers/userController');
const { authenticateToken, checkPayment } = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/protected', authenticateToken, checkPayment, getProtectedData);
router.post('/generate-api-key', authenticateToken, generateApiKey);

module.exports = router;