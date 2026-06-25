import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import User from './models/User.js';

dotenv.config();

let mongoConnectionPromise;

const ensureAdminUser = async () => {
  try {
    const admin = await User.findOne({ email: 'admin@ecommerce.com' });
    if (!admin) {
      await User.create({ name: 'Admin', email: 'admin@ecommerce.com', password: 'admin123', role: 'admin' });
      console.log('Admin user created: admin@ecommerce.com / admin123');
    } else if (admin.role !== 'admin') {
      admin.role = 'admin';
      await admin.save();
      console.log('Admin role restored for admin@ecommerce.com');
    }
  } catch (err) {
    console.warn('Could not ensure admin user:', err.message);
  }
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json());

// Product images — public for everyone (login/register not required)
app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

export const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  const mongoUri = process.env.MONGODB_URI || (!process.env.VERCEL ? 'mongodb://localhost:27017/ecommerce' : '');
  if (!mongoUri) {
    console.log('MONGODB_URI not set; using in-memory product store');
    return null;
  }

  if (!mongoConnectionPromise) {
    mongoConnectionPromise = mongoose
      .connect(mongoUri, { serverSelectionTimeoutMS: 5000 })
      .then(async () => {
        console.log('MongoDB connected');
        await ensureAdminUser();
        return mongoose.connection;
      })
      .catch((err) => {
        mongoConnectionPromise = null;
        console.error('MongoDB connection error:', err.message);
        console.log('Using in-memory product store (30 products loaded)');
        return null;
      });
  }

  return mongoConnectionPromise;
};

if (isDirectRun) {
  connectDatabase();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
