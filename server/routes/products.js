import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import { memoryStore } from '../data/memoryStore.js';

const router = express.Router();

const useMemory = () => mongoose.connection.readyState !== 1;

router.get('/', async (req, res) => {
  try {
    if (useMemory()) {
      return res.json(memoryStore.getAll(req.query));
    }

    const { search, category, featured, page = 1, limit = 12, brands, features, minPrice, maxPrice, condition, ratings, sort } = req.query;
    const query = {};
    const andConditions = [];

    if (search) {
      andConditions.push({ $or: [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { features: { $elemMatch: { $regex: search, $options: 'i' } } },
      ] });
    }
    if (category && category !== 'all') query.category = { $regex: `^${category}$`, $options: 'i' };
    if (featured === 'true') query.featured = true;

    if (brands && brands.length > 0) {
      const brandArray = brands.split(',');
      andConditions.push({
        $or: brandArray.flatMap((brandName) => [
          { brand: { $regex: `^${brandName}$`, $options: 'i' } },
          { name: { $regex: brandName, $options: 'i' } },
        ]),
      });
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (ratings && ratings.length > 0) {
      const ratingArray = ratings.split(',').map(Number);
      // Let's filter by exact Math.floor or just match the ones where rating >= selected
      query.rating = { $gte: Math.min(...ratingArray) };
    }

    if (condition && condition !== 'Any') {
      query.condition = condition;
    }

    if (features && features.length > 0) {
      const featureArray = features.split(',');
      andConditions.push({
        features: { $all: featureArray.map((feature) => new RegExp(`^${feature}$`, 'i')) },
      });
    }

    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    const sortMap = {
      price_asc: { price: 1 },
      price_desc: { price: -1 },
      rating: { rating: -1 },
      newest: { createdAt: -1 },
      featured: { featured: -1, createdAt: -1 },
    };
    const mongoSort = sortMap[sort] || sortMap.featured;

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(Number(limit)).sort(mongoSort),
      Product.countDocuments(query),
    ]);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.json(memoryStore.getAll(req.query));
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (useMemory()) {
      const product = memoryStore.getById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json(product);
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch {
    const product = memoryStore.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    if (useMemory()) {
      const product = memoryStore.create(req.body);
      return res.status(201).json(product);
    }
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    if (useMemory()) {
      const product = memoryStore.update(req.params.id, req.body);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json(product);
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    if (useMemory()) {
      const product = memoryStore.delete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json({ message: 'Product deleted' });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
