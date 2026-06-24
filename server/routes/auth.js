import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { userMemoryStore } from '../data/userMemoryStore.js';

const router = express.Router();

const useMemory = () => mongoose.connection.readyState !== 1;

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '30d' });

const formatUser = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token,
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (useMemory()) {
      const exists = userMemoryStore.findByEmail(email);
      if (exists) return res.status(400).json({ message: 'Email already registered' });
      const user = await userMemoryStore.create({ name, email, password });
      return res.status(201).json(formatUser(user, generateToken(user._id)));
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password });
    res.status(201).json(formatUser(user, generateToken(user._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (useMemory()) {
      const user = userMemoryStore.findByEmail(email);
      if (!user || !(await userMemoryStore.comparePassword(user, password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const { password: _, ...safe } = user;
      return res.json(formatUser(safe, generateToken(user._id)));
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json(formatUser(user, generateToken(user._id)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/me', protect, (req, res) => {
  res.json(req.user);
});

export default router;
