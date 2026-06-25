import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ChevronRight, Heart, MessageCircle, ShoppingBag, Shield, Globe, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { getProduct, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import Toast, { useToast } from '../components/Toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const { toast, setToast, showToast } = useToast();
  const { addToCart, saveForLater } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getProduct(id)
      .then((res) => {
        setProduct(res.data);
        return getProducts({ category: res.data.category, limit: 10 });
      })
      .then((res) => {
        setRelated(res.data.products.filter((p) => p._id !== id));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-[#0D6EFD] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Product not found</p>
      </div>
    );
  }

  // Create an array of 6 variation thumbnail images using the main product image and some related files
  const galleryImages = [
    product.image,
    '/images/products/polo-shirt.jpg',
    '/images/products/blue-backpack.jpg',
    '/images/products/blue-wallet.jpg',
    '/images/products/smartwatch.jpg',
    product.image,
  ];

  // Related products from same category
  const relatedProducts = related.slice(0, 6);
  const youMayLikeItems = related.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Header />
      <hr className="border-t border-[#E3E8EE]" />
      
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-[#8B96A5] mb-4 flex-wrap">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-[#8B96A5]" />
          <Link to="/products" className="hover:text-brand-600">Products</Link>
          {product.category && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-[#8B96A5]" />
              <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-600">{product.category}</Link>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5 text-[#8B96A5]" />
          <span className="text-gray-800 font-medium">{product.name}</span>
        </div>

        {/* Main Product Info Card */}
        <div className="bg-white rounded-lg border border-[#E3E8EE] p-5 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery (Left: 5 cols) */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="border border-[#E3E8EE] rounded-md p-4 mb-3 flex items-center justify-center bg-white h-80 lg:h-96">
                <img src={galleryImages[selectedImage]} alt={product.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {galleryImages.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImage(i)} 
                    className={`border rounded p-1 flex items-center justify-center bg-white aspect-square hover:border-[#0D6EFD] transition-colors ${selectedImage === i ? 'border-[#0D6EFD] border-2' : 'border-[#E3E8EE]'}`}
                  >
                    <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details (Middle: 4 cols) */}
            <div className="lg:col-span-4 flex flex-col">
              {/* Stock Badge */}
              <div className="flex items-center gap-1.5 text-[#00B517] text-sm font-medium mb-1.5">
                <Check className="h-4 w-4" />
                In stock
              </div>

              {/* Title */}
              <h1 className="text-xl font-semibold text-[#1C1C1C] mb-2 leading-relaxed">
                {product.name}
              </h1>

              {/* Rating and Orders */}
              <div className="flex items-center gap-3 mb-4 text-sm text-[#8B96A5] flex-wrap">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#FF9017] text-[#FF9017]" />
                  <span className="text-[#FF9017] font-semibold">{product.rating || '9.3'}</span>
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  {product.orders || '32'} reviews
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4" />
                  {product.orders || '154'} sold
                </span>
              </div>

              {/* Pricing Grid */}
              <div className="bg-[#FFF0DF] rounded-md p-3 flex mb-4 items-center justify-between border-l-4 border-[#FF9017]">
                <div className="flex-1 text-center pr-3 border-r border-[#E0E0E0]">
                  <p className="font-semibold text-base text-[#FA3434]">${product.price?.toFixed(2)}</p>
                  <p className="text-xs text-[#8B96A5] mt-0.5">50-100 pcs</p>
                </div>
                <div className="flex-1 text-center px-3 border-r border-[#E0E0E0]">
                  <p className="font-semibold text-base text-[#1C1C1C]">${(product.price * 0.92)?.toFixed(2)}</p>
                  <p className="text-xs text-[#8B96A5] mt-0.5">100-700 pcs</p>
                </div>
                <div className="flex-1 text-center pl-3">
                  <p className="font-semibold text-base text-[#1C1C1C]">${(product.price * 0.8)?.toFixed(2)}</p>
                  <p className="text-xs text-[#8B96A5] mt-0.5">700+ pcs</p>
                </div>
              </div>

              {/* Product Specifications Table */}
              <div className="grid grid-cols-[120px_1fr] gap-y-2.5 text-sm mb-4 border-b border-[#E3E8EE] pb-4">
                <span className="text-[#8B96A5]">Price:</span>
                <span className="text-[#505050]">Negotiable</span>

                <span className="text-[#8B96A5]">Type:</span>
                <span className="text-[#505050]">{product.brand || 'Classic shoes'}</span>

                <span className="text-[#8B96A5]">Material:</span>
                <span className="text-[#505050]">Plastic material</span>

                <span className="text-[#8B96A5]">Design:</span>
                <span className="text-[#505050]">Modern nice</span>
              </div>

              {/* Extras Table */}
              <div className="grid grid-cols-[120px_1fr] gap-y-2.5 text-sm">
                <span className="text-[#8B96A5]">Customization:</span>
                <span className="text-[#505050]">Customized logo and design custom packages</span>

                <span className="text-[#8B96A5]">Protection:</span>
                <span className="text-[#505050]">Refund Policy</span>

                <span className="text-[#8B96A5]">Warranty:</span>
                <span className="text-[#505050]">2 years full warranty</span>
              </div>
            </div>

            {/* Supplier Info (Right: 3 cols) */}
            <div className="lg:col-span-3">
              <div className="border border-[#E3E8EE] rounded-md p-4 bg-white shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#E0F2FE] text-[#0D6EFD] flex items-center justify-center font-bold text-xl rounded-md shrink-0">
                    R
                  </div>
                  <div>
                    <p className="text-xs text-[#8B96A5] uppercase tracking-wider">Supplier</p>
                    <p className="text-sm font-semibold text-[#1C1C1C] line-clamp-1">{product.supplier || 'Guanjoi Trading LLC'}</p>
                  </div>
                </div>

                <hr className="border-t border-[#E3E8EE] mb-4" />

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-2.5 text-sm text-[#505050]">
                    <img src="/images/flags/germany.png" alt="Germany" className="w-5 h-3.5 object-cover rounded" />
                    <span>Germany, Berlin</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#505050]">
                    <Shield className="w-5 h-5 text-[#8B96A5]" />
                    <span>Verified Seller</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm text-[#505050]">
                    <Globe className="w-5 h-5 text-[#8B96A5]" />
                    <span>Worldwide shipping</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => showToast('Your inquiry has been sent to the supplier!')}
                    className="w-full bg-[#0D6EFD] text-white hover:bg-blue-700 py-2.5 rounded-md font-medium text-sm transition-colors"
                  >
                    Send inquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(product);
                      showToast(`"${product.name.slice(0, 28)}${product.name.length > 28 ? '...' : ''}" added to cart!`);
                    }}
                    className="w-full border border-[#0D6EFD] bg-[#0D6EFD]/5 text-[#0D6EFD] hover:bg-[#0D6EFD]/10 py-2.5 rounded-md font-medium text-sm transition-colors"
                  >
                    Add to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/products')}
                    className="w-full border border-[#E3E8EE] text-[#0D6EFD] hover:bg-gray-50 py-2.5 rounded-md font-medium text-sm transition-colors"
                  >
                    Seller's profile
                  </button>
                </div>
              </div>

              {/* Centered Save Link */}
              <div className="flex justify-center mt-3">
                <button
                  type="button"
                  onClick={() => {
                    saveForLater(product);
                    setSaved(true);
                    showToast('Saved for later!');
                  }}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${saved ? 'text-[#00B517]' : 'text-[#0D6EFD] hover:text-blue-700'}`}
                >
                  <Heart className={`h-4 w-4 ${saved ? 'fill-[#00B517] text-[#00B517]' : 'fill-none'}`} />
                  {saved ? 'Saved' : 'Save for later'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab & Sidebar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Tabs Content (Left: 9 cols) */}
          <div className="lg:col-span-9 bg-white border border-[#E3E8EE] rounded-lg p-5">
            {/* Tabs Headers */}
            <div className="flex gap-6 border-b border-[#E3E8EE] mb-5 overflow-x-auto">
              {['description', 'reviews', 'shipping', 'about seller'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium capitalize whitespace-nowrap border-b-2 transition-all ${
                    activeTab === tab 
                      ? 'border-[#0D6EFD] text-[#0D6EFD]' 
                      : 'border-transparent text-[#8B96A5] hover:text-[#505050]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            {activeTab === 'description' && (
              <div>
                <p className="text-sm text-[#505050] leading-relaxed mb-6">
                  {product.description || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                </p>

                {/* Specs Table Grid */}
                <table className="w-full border-collapse border border-[#E3E8EE] text-sm text-[#505050] mb-5">
                  <tbody>
                    <tr>
                      <td className="w-48 border border-[#E3E8EE] bg-[#EFF2F4] px-4 py-2 font-normal text-[#505050]">Model</td>
                      <td className="border border-[#E3E8EE] px-4 py-2 text-[#505050]">#8786867</td>
                    </tr>
                    <tr>
                      <td className="w-48 border border-[#E3E8EE] bg-[#EFF2F4] px-4 py-2 font-normal text-[#505050]">Style</td>
                      <td className="border border-[#E3E8EE] px-4 py-2 text-[#505050]">Classic style</td>
                    </tr>
                    <tr>
                      <td className="w-48 border border-[#E3E8EE] bg-[#EFF2F4] px-4 py-2 font-normal text-[#505050]">Certificate</td>
                      <td className="border border-[#E3E8EE] px-4 py-2 text-[#505050]">ISO-898921212</td>
                    </tr>
                    <tr>
                      <td className="w-48 border border-[#E3E8EE] bg-[#EFF2F4] px-4 py-2 font-normal text-[#505050]">Size</td>
                      <td className="border border-[#E3E8EE] px-4 py-2 text-[#505050]">34mm x 450mm x 19mm</td>
                    </tr>
                    <tr>
                      <td className="w-48 border border-[#E3E8EE] bg-[#EFF2F4] px-4 py-2 font-normal text-[#505050]">Memory</td>
                      <td className="border border-[#E3E8EE] px-4 py-2 text-[#505050]">360B RAM</td>
                    </tr>
                  </tbody>
                </table>

                {/* Bullets with gray checks */}
                <div className="space-y-2 mt-4">
                  {['Some great feature name here', 'Lorem ipsum dolor sit amet, consectetur', 'Duis aute irure dolor in reprehenderit', 'Some great feature name here'].map((feat, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-sm text-[#505050]">
                      <Check className="h-4 w-4 text-[#8B96A5]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-sm text-[#505050] py-4">No reviews yet for this product.</div>
            )}
            {activeTab === 'shipping' && (
              <div className="text-sm text-[#505050] py-4 leading-relaxed">
                Worldwide shipping options are available with tracking details. Estimated delivery ranges from 7-14 business days.
              </div>
            )}
            {activeTab === 'about seller' && (
              <div className="text-sm text-[#505050] py-4 leading-relaxed">
                Guanjoi Trading LLC is a verified manufacturer specializing in cotton apparel and premium accessories, delivering worldwide.
              </div>
            )}
          </div>

          {/* You May Like (Right: 3 cols) */}
          <div className="lg:col-span-3 bg-white border border-[#E3E8EE] rounded-lg p-4">
            <h3 className="text-base font-semibold text-[#1C1C1C] mb-4">You may like</h3>
            <div className="space-y-4">
              {youMayLikeItems.map((item) => (
                <div key={item._id} className="flex gap-3 items-start border-b border-gray-100 last:border-0 pb-3 mb-3 last:pb-0 last:mb-0">
                  <div className="w-20 h-20 border border-[#E3E8EE] rounded flex items-center justify-center p-1 shrink-0 bg-white">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-[#1C1C1C] hover:text-[#0D6EFD] font-normal line-clamp-2 transition-colors">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </h4>
                    <p className="text-sm text-[#8B96A5] mt-1">
                      ${item.price.toFixed(2)} - ${(item.price * 14.2).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
        <div className="mt-6 border border-[#E3E8EE] bg-white rounded-lg p-5">
          <h3 className="text-lg font-semibold text-[#1C1C1C] mb-4">Related products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {relatedProducts.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p._id}`}
                className="flex flex-col group"
              >
                <div className="bg-[#EEEEEE] rounded-md p-4 flex items-center justify-center aspect-square mb-2.5 group-hover:bg-gray-200 transition-colors">
                  <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <h4 className="text-sm text-[#505050] font-normal line-clamp-2 leading-snug mb-1 group-hover:text-[#0D6EFD] transition-colors">{p.name}</h4>
                <p className="text-sm text-[#8B96A5]">${p.price.toFixed(2)}-${(p.price * 1.25).toFixed(2)}</p>
              </Link>
            ))}
          </div>
        </div>
        )}

        {/* You May Like sidebar - only when items exist */}
        <div className="mt-6 bg-[#2370FC] bg-gradient-to-r from-[#2370FC] to-[#0D50D0] rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between text-white shadow-sm">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-xl font-bold">Super discount on more than 100 USD</h3>
            <p className="text-blue-100 text-sm mt-1">Have you ever finally just write dummy info</p>
          </div>
          <Link to="/products" className="bg-[#FF9017] hover:bg-[#e07f12] text-white px-6 py-2.5 rounded font-medium text-sm transition-colors shadow-sm">
            Shop now
          </Link>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
