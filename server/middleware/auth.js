import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { userMemoryStore } from '../data/userMemoryStore.js';

const useMemory = () => mongoose.connection.readyState !== 1;

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');

    if (useMemory()) {
      const user = userMemoryStore.findById(decoded.id);
      if (!user) return res.status(401).json({ message: 'User not found' });
      req.user = user;
      return next();
    }

    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};
