import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { initialProducts } from '../data/productsData.js';

dotenv.config();

// Same catalog for everyone — guest, registered users, and admin
const products = initialProducts.map(({ _id, ...rest }) => rest);

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany();
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    const adminExists = await User.findOne({ email: 'admin@ecommerce.com' });
    if (!adminExists) {
      await User.create({ name: 'Admin', email: 'admin@ecommerce.com', password: 'admin123', role: 'admin' });
      console.log('Admin user created: admin@ecommerce.com / admin123');
    } else if (adminExists.role !== 'admin') {
      adminExists.role = 'admin';
      adminExists.name = 'Admin';
      await adminExists.save();
      console.log('Admin role restored for admin@ecommerce.com');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
