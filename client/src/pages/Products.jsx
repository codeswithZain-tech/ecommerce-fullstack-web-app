import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, ChevronRight, Heart, Grid, Menu, ChevronLeft, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import Toast, { useToast } from '../components/Toast';

const sidebarCategories = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech'];
const brands = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo'];
const features = ['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory'];
const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items'];

export default function Products() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch {
      return [];
    }
  });
  const { addToCart } = useCart();
  const { toast, setToast, showToast } = useToast();

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const featured = searchParams.get('featured') || '';

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [condition, setCondition] = useState('Any');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [localMinPrice, setLocalMinPrice] = useState('');
  const [localMaxPrice, setLocalMaxPrice] = useState('');

  const toggleArrayItem = (setter, item) => {
    setter(prev => {
      const newArr = prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item];
      setPage(1);
      return newArr;
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      localStorage.setItem('wishlist', JSON.stringify(next));
      showToast(prev.includes(id) ? 'Removed from wishlist' : 'Added to wishlist');
      return next;
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`"${product.name.slice(0, 30)}${product.name.length > 30 ? '...' : ''}" added to cart!`);
  };

  const handleApplyPrice = () => {
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setSelectedRatings([]);
    setCondition('Any');
    setMinPrice('');
    setMaxPrice('');
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setPage(1);
  };

  const handleCategoryClick = (cat) => {
    navigate(`/products?category=${encodeURIComponent(cat)}`);
    setPage(1);
  };

  useEffect(() => {
    setLoading(true);
    const effectiveLimit = view === 'grid' ? limit : limit;
    getProducts({
      search,
      category: category || undefined,
      featured: featured || undefined,
      brands: selectedBrands.join(','),
      features: selectedFeatures.join(','),
      ratings: selectedRatings.join(','),
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      condition: condition !== 'Any' ? condition : undefined,
      sort: sortBy,
      page,
      limit: effectiveLimit,
    })
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.total);
        setPages(res.data.pages || Math.ceil(res.data.total / effectiveLimit) || 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, category, featured, page, limit, view, selectedBrands, selectedFeatures, selectedRatings, minPrice, maxPrice, condition, sortBy]);

  const activeFilters = [
    ...selectedBrands.map(b => ({ label: b, onRemove: () => toggleArrayItem(setSelectedBrands, b) })),
    ...selectedFeatures.map(f => ({ label: f, onRemove: () => toggleArrayItem(setSelectedFeatures, f) })),
    ...selectedRatings.map(r => ({ label: `${r} star`, onRemove: () => toggleArrayItem(setSelectedRatings, r) })),
  ];

  // Compute visible page numbers (max 5 around current)
  const getPageNumbers = () => {
    const totalPages = pages;
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[15px] text-[#8B96A5] mb-5 flex-wrap">
          <Link to="/" className="hover:text-[#127FFF]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/products" className="hover:text-[#127FFF]">All Products</Link>
          {category && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#1C1C1C]">{category}</span>
            </>
          )}
          {search && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-[#1C1C1C]">Search: "{search}"</span>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-[240px] flex-shrink-0">
            <div className="space-y-6 text-[15px]">
              {/* Category */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-[#1C1C1C]">Category</p>
                  <ChevronUpIcon />
                </div>
                <ul className="space-y-3 text-[#505050]">
                  {sidebarCategories.map((cat) => (
                    <li
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className={`cursor-pointer hover:text-[#127FFF] transition-colors ${category === cat ? 'text-[#127FFF] font-medium' : ''}`}
                    >
                      {cat}
                    </li>
                  ))}
                  <li
                    onClick={() => navigate('/products')}
                    className="text-[#127FFF] cursor-pointer mt-1 font-medium hover:underline"
                  >
                    See all
                  </li>
                </ul>
              </div>

              {/* Brands */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-[#1C1C1C]">Brands</p>
                  <ChevronUpIcon />
                </div>
                <div className="space-y-3 text-[#505050]">
                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-3 cursor-pointer hover:text-[#1C1C1C]">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleArrayItem(setSelectedBrands, b)}
                        className="w-4 h-4 border-gray-300 rounded text-[#127FFF] focus:ring-[#127FFF] accent-[#127FFF]"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                  <div className="text-[#127FFF] cursor-pointer mt-1 font-medium hover:underline">See all</div>
                </div>
              </div>

              {/* Features */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-[#1C1C1C]">Features</p>
                  <ChevronUpIcon />
                </div>
                <div className="space-y-3 text-[#505050]">
                  {features.map((f) => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer hover:text-[#1C1C1C]">
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(f)}
                        onChange={() => toggleArrayItem(setSelectedFeatures, f)}
                        className="w-4 h-4 border-gray-300 rounded text-[#127FFF] focus:ring-[#127FFF] accent-[#127FFF]"
                      />
                      <span>{f}</span>
                    </label>
                  ))}
                  <div className="text-[#127FFF] cursor-pointer mt-1 font-medium hover:underline">See all</div>
                </div>
              </div>

              {/* Price range */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-[#1C1C1C]">Price range</p>
                  <ChevronUpIcon />
                </div>
                <div className="mb-3">
                  <div className="relative w-full h-1 bg-gray-200 rounded-full mb-4 mt-2">
                    <div className="absolute left-1/4 right-1/4 h-full bg-[#127FFF] rounded-full" />
                    <div className="absolute left-1/4 -mt-1.5 w-4 h-4 bg-white border-2 border-[#127FFF] rounded-full cursor-pointer" />
                    <div className="absolute right-1/4 -mt-1.5 w-4 h-4 bg-white border-2 border-[#127FFF] rounded-full cursor-pointer" />
                  </div>
                </div>
                <div className="flex gap-2 items-center mb-3">
                  <div className="w-full">
                    <p className="text-[13px] text-[#1C1C1C] mb-1">Min</p>
                    <input
                      type="number"
                      placeholder="0"
                      value={localMinPrice}
                      onChange={(e) => setLocalMinPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[15px] outline-none focus:border-[#127FFF]"
                    />
                  </div>
                  <div className="w-full">
                    <p className="text-[13px] text-[#1C1C1C] mb-1">Max</p>
                    <input
                      type="number"
                      placeholder="999999"
                      value={localMaxPrice}
                      onChange={(e) => setLocalMaxPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-[15px] outline-none focus:border-[#127FFF]"
                    />
                  </div>
                </div>
                <button
                  onClick={handleApplyPrice}
                  className="w-full border border-[#127FFF] bg-white text-[#127FFF] font-medium py-2 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Condition */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-[#1C1C1C]">Condition</p>
                  <ChevronUpIcon />
                </div>
                <div className="space-y-3 text-[#505050]">
                  {conditions.map((c) => (
                    <label key={c} className="flex items-center gap-3 cursor-pointer hover:text-[#1C1C1C]">
                      <input
                        type="radio"
                        name="condition"
                        checked={condition === c}
                        onChange={() => { setCondition(c); setPage(1); }}
                        className="w-4 h-4 border-gray-300 text-[#127FFF] focus:ring-[#127FFF] accent-[#127FFF]"
                      />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-[#1C1C1C]">Ratings</p>
                  <ChevronUpIcon />
                </div>
                <div className="space-y-3">
                  {[5, 4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleArrayItem(setSelectedRatings, rating)}
                        className="w-4 h-4 border-gray-300 rounded text-[#127FFF] focus:ring-[#127FFF] accent-[#127FFF]"
                      />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-[16px] w-[16px] ${i < rating ? 'fill-[#FF9017] text-[#FF9017]' : 'fill-gray-200 text-gray-200'}`} />
                        ))}
                        <span className="text-xs text-[#8B96A5] ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Manufacturer (collapsible header only) */}
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between items-center mb-3 cursor-pointer">
                  <p className="font-semibold text-[#1C1C1C]">Manufacturer</p>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top Bar & Active Filters */}
            <div className="bg-white border border-gray-200 rounded-md mb-5 shadow-sm">
              <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200">
                <p className="text-[15px] text-[#1C1C1C]">
                  <span className="font-bold">{total.toLocaleString()}</span> items
                  {category && <> in <span className="font-bold">{category}</span></>}
                  {search && <> for <span className="font-bold">"{search}"</span></>}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Sort dropdown */}
                  <div className="relative border border-gray-300 rounded-md bg-white">
                    <select
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                      className="appearance-none pl-3 pr-8 py-1.5 text-[15px] text-[#1C1C1C] outline-none bg-transparent cursor-pointer"
                    >
                      <option value="featured">Featured</option>
                      <option value="price_asc">Price: Low to High</option>
                      <option value="price_desc">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                  </div>

                  {/* Grid / List toggle */}
                  <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white">
                    <button
                      onClick={() => setView('grid')}
                      title="Grid view"
                      className={`p-1.5 transition-colors ${view === 'grid' ? 'bg-[#127FFF] text-white' : 'bg-white hover:bg-gray-50 text-[#1C1C1C]'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <div className="w-px bg-gray-300" />
                    <button
                      onClick={() => setView('list')}
                      title="List view"
                      className={`p-1.5 transition-colors ${view === 'list' ? 'bg-[#127FFF] text-white' : 'bg-white hover:bg-gray-50 text-[#1C1C1C]'}`}
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filter Tags */}
              {activeFilters.length > 0 && (
                <div className="p-3 flex flex-wrap items-center gap-2">
                  {activeFilters.map(filter => (
                    <button
                      key={filter.label}
                      onClick={filter.onRemove}
                      className="flex items-center gap-1.5 px-3 py-1 bg-white border border-[#127FFF] text-[#505050] text-[14px] rounded-[5px] hover:bg-blue-50 transition-colors"
                    >
                      {filter.label}
                      <span className="text-[#8B96A5] text-[12px] font-bold leading-none">×</span>
                    </button>
                  ))}
                  <button
                    onClick={clearAllFilters}
                    className="text-[#127FFF] text-[14px] font-medium ml-2 hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {/* Product List */}
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-[#127FFF] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-md p-16 text-center">
                <p className="text-[#8B96A5] text-lg mb-2">No products found</p>
                <p className="text-[#8B96A5] text-sm mb-5">Try adjusting your filters or search term</p>
                <button
                  onClick={clearAllFilters}
                  className="text-[#127FFF] font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                  <div key={product._id} className="bg-white border border-gray-200 rounded-md hover:shadow-md transition-shadow flex flex-col relative group">
                    <div className="h-[210px] w-full p-6 flex items-center justify-center border-b border-gray-100 relative">
                      <Link to={`/product/${product._id}`} className="flex items-center justify-center w-full h-full">
                        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                      </Link>
                      {/* Wishlist button overlay */}
                      <button
                        onClick={() => toggleWishlist(product._id)}
                        title={wishlist.includes(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-md border flex items-center justify-center transition-colors ${wishlist.includes(product._id) ? 'bg-red-50 border-red-300 text-red-500' : 'bg-white border-[#E3E8EE] text-[#8B96A5] hover:text-[#127FFF] hover:border-[#127FFF]'}`}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product._id) ? 'fill-red-500' : ''}`} />
                      </button>
                    </div>

                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-end gap-2 mb-1">
                            <span className="text-[18px] font-bold text-[#1C1C1C]">${(product.price || 0).toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-[13px] text-[#8B96A5] line-through mb-[2px]">${product.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[13px]">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-[13px] w-[13px] ${i < Math.floor(product.rating || 4) ? 'fill-[#FF9017] text-[#FF9017]' : 'fill-gray-200 text-gray-200'}`} />
                            ))}
                            <span className="text-[#FF9017] ml-1">{(product.rating || 7.5).toFixed(1)}</span>
                          </div>
                        </div>
                      </div>

                      <Link to={`/product/${product._id}`} className="text-[15px] text-[#505050] leading-snug line-clamp-2 hover:text-[#127FFF] transition-colors mb-3 flex-1">
                        {product.name}
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full mt-auto border border-[#127FFF] text-[#127FFF] hover:bg-[#127FFF] hover:text-white py-2 rounded-md text-sm font-medium transition-colors"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product._id} className="bg-white border border-gray-200 rounded-md p-5 flex flex-col sm:flex-row gap-6 relative hover:shadow-md transition-shadow">
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className={`absolute top-5 right-5 w-10 h-10 border rounded-md flex items-center justify-center transition-colors ${wishlist.includes(product._id) ? 'bg-red-50 border-red-300 text-red-500' : 'border-gray-200 bg-white hover:bg-gray-50 text-[#127FFF]'}`}
                    >
                      <Heart className={`w-5 h-5 ${wishlist.includes(product._id) ? 'fill-red-500' : ''}`} />
                    </button>

                    <div className="w-full sm:w-[200px] h-[200px] flex-shrink-0 flex items-center justify-center p-2 border border-gray-100 rounded-md">
                      <Link to={`/product/${product._id}`}>
                        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                      </Link>
                    </div>

                    <div className="flex-1 pt-1 pr-14 flex flex-col">
                      <Link to={`/product/${product._id}`} className="text-[16px] font-medium text-[#1C1C1C] mb-2 hover:text-[#127FFF] transition-colors">
                        {product.name}
                      </Link>
                      <div className="flex items-end gap-3 mb-3">
                        <span className="text-[20px] font-bold text-[#1C1C1C]">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-[15px] text-[#8B96A5] line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-[14px] text-[#8B96A5] mb-3">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 4) ? 'fill-[#FF9017] text-[#FF9017]' : 'fill-gray-200 text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-[#FF9017]">{(product.rating || 7.5).toFixed(1)}</span>
                        <span className="text-[#E3E8EE]">|</span>
                        <span>{product.orders || 154} orders</span>
                        <span className="text-[#E3E8EE]">|</span>
                        <span className="text-[#00B517]">Free Shipping</span>
                      </div>

                      <p className="text-[15px] text-[#505050] mb-4 line-clamp-2 leading-relaxed flex-1">
                        {product.description || 'High quality product with great features. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'}
                      </p>

                      <div className="flex gap-3">
                        <Link
                          to={`/product/${product._id}`}
                          className="inline-block border border-[#127FFF] text-[#127FFF] hover:bg-blue-50 px-5 py-2 rounded-md text-[15px] font-medium transition-colors"
                        >
                          View details
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="inline-block bg-[#127FFF] hover:bg-blue-700 text-white px-5 py-2 rounded-md text-[15px] font-medium transition-colors"
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-between mt-8 mb-6">
                {/* Per-page selector */}
                <div className="relative border border-gray-300 rounded-md bg-white">
                  <select
                    value={limit}
                    onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                    className="appearance-none pl-4 pr-10 py-1.5 text-[15px] text-[#1C1C1C] outline-none bg-transparent cursor-pointer"
                  >
                    <option value={9}>Show 9</option>
                    <option value={18}>Show 18</option>
                    <option value={27}>Show 27</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>

                <div className="flex rounded-md overflow-hidden bg-white border border-[#E3E8EE]">
                  {/* Previous */}
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-2 border-r border-[#E3E8EE] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Page numbers */}
                  {getPageNumbers().map((num) => (
                    <button
                      key={num}
                      onClick={() => setPage(num)}
                      className={`px-4 py-2 border-r border-[#E3E8EE] text-[15px] font-medium transition-colors ${page === num ? 'bg-[#127FFF] text-white' : 'text-[#1C1C1C] hover:bg-gray-50'}`}
                    >
                      {num}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    onClick={() => setPage(p => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="px-3 py-2 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

function ChevronUpIcon() {
  return (
    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#8B96A5"/>
    </svg>
  );
}
