import { initialProducts } from './productsData.js';

let products = initialProducts.map((p) => ({ ...p }));
let nextId = products.length + 1;

const matches = (product, { search, category, featured, brands, features, minPrice, maxPrice, condition, ratings }) => {
  if (category && category !== 'all' && product.category.toLowerCase() !== category.toLowerCase()) return false;
  if (featured === 'true' && !product.featured) return false;
  
  if (brands && brands.length > 0) {
    const brandList = brands.split(',');
    // If product has no brand, or brand is not in list, filter it out. 
    // To be forgiving with dummy data, we check if product.name includes the brand if brand field is missing.
    const matchBrand = brandList.some(b =>
      product.brand?.toLowerCase() === b.toLowerCase() || product.name.toLowerCase().includes(b.toLowerCase())
    );
    if (!matchBrand) return false;
  }

  if (minPrice) {
    if (product.price < Number(minPrice)) return false;
  }
  if (maxPrice) {
    if (product.price > Number(maxPrice)) return false;
  }

  if (ratings && ratings.length > 0) {
    const ratingList = ratings.split(',').map(Number);
    const productRating = Math.floor(product.rating || 0);
    if (!ratingList.includes(productRating)) return false;
  }

  // Conditions and features are mocked in DB, so we loosely match them or ignore if not present in dummy data
  if (condition && condition !== 'Any') {
    if (product.condition && product.condition !== condition) return false;
  }

  if (features && features.length > 0) {
    const featureList = features.split(',');
    const productFeatures = product.features || [];
    const hasAllFeatures = featureList.every(f =>
      productFeatures.some((feature) => feature.toLowerCase() === f.toLowerCase())
    );
    if (!hasAllFeatures) return false;
  }

  if (search) {
    const q = search.toLowerCase();
    const hay = `${product.name} ${product.category} ${product.description || ''} ${product.brand || ''} ${(product.features || []).join(' ')}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  return true;
};

const sortProducts = (list, sort) => {
  const sorted = [...list];
  switch (sort) {
    case 'price_asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price_desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest':
      return sorted.sort((a, b) => Number(b._id) - Number(a._id));
    case 'featured':
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
};

export const memoryStore = {
  getAll(query = {}) {
    const { page = 1, limit = 12, sort } = query;
    const filtered = sortProducts(products.filter((p) => matches(p, query)), sort);
    const skip = (Number(page) - 1) * Number(limit);
    const sliced = filtered.slice(skip, skip + Number(limit));
    return {
      products: sliced,
      total: filtered.length,
      page: Number(page),
      pages: Math.ceil(filtered.length / Number(limit)) || 1,
    };
  },

  getById(id) {
    return products.find((p) => p._id === id) || null;
  },

  create(data) {
    const product = { _id: String(nextId++), ...data };
    products.push(product);
    return product;
  },

  update(id, data) {
    const index = products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...data, _id: id };
    return products[index];
  },

  delete(id) {
    const index = products.findIndex((p) => p._id === id);
    if (index === -1) return null;
    const [removed] = products.splice(index, 1);
    return removed;
  },
};
