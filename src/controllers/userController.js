const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        freeTrialEnd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias de teste grátis
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProtectedData = async (req, res) => {
  res.json({ message: 'This is protected data' });
};

const generateApiKey = async (req, res) => {
  const userId = req.user.userId;

  try {
    const apiKey = jwt.sign({ userId }, process.env.JWT_SECRET);
    await prisma.user.update({
      where: { id: userId },
      data: { apiKey },
    });

    res.json({ apiKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login, getProtectedData, generateApiKey };