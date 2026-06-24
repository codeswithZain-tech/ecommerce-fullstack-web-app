import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, default: '' },
    category: { type: String, required: true },
    stock: { type: Number, default: 100 },
    rating: { type: Number, default: 4.5 },
    orders: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    brand: { type: String, default: '' },
    condition: { type: String, default: 'Brand new' },
    supplier: { type: String, default: 'Guanjoi Trading LLC' },
    discount: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
