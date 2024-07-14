const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);

app.use('/session', sessionRoutes);
app.use('/client', clientRoutes);

module.exports = app;