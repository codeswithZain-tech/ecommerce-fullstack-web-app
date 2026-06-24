import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Shield, Headphones, Truck, ChevronDown, Check, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SELLERS = ['Artel Market', 'Best factory LLC', 'Artel Market'];

const VALID_COUPONS = { 'SAVE10': 10, 'WELCOME20': 20, 'DEAL50': 50 };

export default function Cart() {
  const { cart, saved, cartCount, subtotal, updateQty, removeFromCart, clearCart, saveForLater, moveToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMsg, setCouponMsg] = useState(null);
  const [toast, setToast] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const couponDiscount = appliedCoupon ? VALID_COUPONS[appliedCoupon] : 0;
  const discount = cart.length > 0 ? Math.min(couponDiscount, subtotal) : 0;
  const tax = cart.length > 0 ? 14 : 0;
  const total = subtotal - discount + tax;

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponMsg({ type: 'success', text: `Coupon applied! $${VALID_COUPONS[code]} off.` });
    } else {
      setCouponMsg({ type: 'error', text: 'Invalid coupon code. Try SAVE10, WELCOME20, or DEAL50.' });
    }
    setTimeout(() => setCouponMsg(null), 4000);
  };

  const handleCheckout = () => {
    if (!user) {
      showToast('Please log in to checkout', 'error');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
    showToast('Order placed successfully! 🎉');
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl text-white text-sm font-medium animate-fade-in ${
          toast.type === 'success' ? 'bg-[#00B517]' : 'bg-[#FA3434]'
        }`}>
          {toast.type === 'success' ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
          {toast.msg}
          <button onClick={() => setToast(null)} className="ml-2 opacity-80 hover:opacity-100"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <Header />
      <hr className="border-t border-[#E3E8EE]" />

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-[#1C1C1C] mb-5">
          My cart ({cartCount})
        </h1>

        {/* Order Placed Success State */}
        {orderPlaced ? (
          <div className="bg-white border border-[#E3E8EE] rounded-lg p-16 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-[#00B517]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Order Placed!</h2>
            <p className="text-[#8B96A5] mb-6">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-[#0D6EFD] hover:bg-blue-700 text-white px-6 py-2.5 rounded text-sm font-medium transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : cart.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#E3E8EE] p-16 text-center">
            <ShoppingCart className="h-14 w-14 text-[#C5CDD6] mx-auto mb-4" />
            <p className="text-[#8B96A5] text-base mb-5">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#0D6EFD] hover:bg-blue-700 text-white px-6 py-2.5 rounded text-sm font-medium transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ── Left Column: Cart Items ── */}
            <div className="flex-1 min-w-0">
              {/* Items Card */}
              <div className="bg-white border border-[#E3E8EE] rounded-lg overflow-hidden mb-4">
                {cart.map((item, index) => (
                  <div
                    key={item._id}
                    className={`p-4 flex flex-col sm:flex-row gap-4 ${index < cart.length - 1 ? 'border-b border-[#E3E8EE]' : ''}`}
                  >
                    {/* Product Image */}
                    <div className="w-20 h-20 flex-shrink-0 border border-[#E3E8EE] rounded-md p-1 flex items-center justify-center bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-[#1C1C1C] mb-0.5 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#8B96A5] mb-0.5">
                        Size: medium, Color: blue,&nbsp; Material: Plastic
                      </p>
                      <p className="text-xs text-[#8B96A5] mb-2">
                        Seller: {SELLERS[index % SELLERS.length]}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-xs text-[#FA3434] hover:underline font-medium"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => saveForLater(item)}
                          className="text-xs text-[#0D6EFD] hover:underline font-medium"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>

                    {/* Price + Qty */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <p className="text-base font-semibold text-[#1C1C1C]">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      {/* Qty dropdown style */}
                      <div className="relative">
                        <select
                          value={item.qty}
                          onChange={(e) => updateQty(item._id, Number(e.target.value))}
                          className="appearance-none border border-[#E3E8EE] rounded px-3 py-1.5 pr-7 text-sm text-[#1C1C1C] bg-white focus:outline-none focus:border-[#0D6EFD] cursor-pointer"
                        >
                          {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>Qty: {n}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8B96A5] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back to shop + Remove all */}
              <div className="flex items-center justify-between mb-5">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 border border-[#E3E8EE] bg-white hover:bg-gray-50 text-[#1C1C1C] text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to shop
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-[#0D6EFD] hover:underline font-medium"
                >
                  Remove all
                </button>
              </div>

              {/* Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { Icon: Shield, title: 'Secure payment', desc: 'Have you ever finally just' },
                  { Icon: Headphones, title: 'Customer support', desc: 'Have you ever finally just' },
                  { Icon: Truck, title: 'Free delivery', desc: 'Have you ever finally just' },
                ].map(({ Icon, title, desc }) => (
                  <div
                    key={title}
                    className="bg-white border border-[#E3E8EE] rounded-lg p-4 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EFF2F4] flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-[#8B96A5]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1C1C]">{title}</p>
                      <p className="text-xs text-[#8B96A5]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right Column: Order Summary ── */}
            <div className="lg:w-72 xl:w-80 flex-shrink-0 sticky top-24">
              <div className="bg-white border border-[#E3E8EE] rounded-lg p-5">
                {/* Coupon */}
                <p className="text-sm font-medium text-[#1C1C1C] mb-3">Have a coupon?</p>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add coupon"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    className="flex-1 border border-[#E3E8EE] rounded px-3 py-2 text-sm text-[#505050] placeholder-[#8B96A5] focus:outline-none focus:border-[#0D6EFD] transition-colors"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="text-sm font-medium text-[#0D6EFD] hover:text-blue-700 px-2 transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg && (
                  <p className={`text-xs mb-3 ${couponMsg.type === 'success' ? 'text-[#00B517]' : 'text-[#FA3434]'}`}>
                    {couponMsg.text}
                  </p>
                )}

                <hr className="border-t border-[#E3E8EE] mb-4" />

                {/* Pricing */}
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#505050]">Subtotal:</span>
                    <span className="font-medium text-[#1C1C1C]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#505050]">Discount:</span>
                    <span className="font-medium text-[#FA3434]">- ${discount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#505050]">Tax:</span>
                    <span className="font-medium text-[#00B517]">+ ${tax.toFixed(2)}</span>
                  </div>

                  <hr className="border-t border-[#E3E8EE]" />

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base text-[#1C1C1C]">Total:</span>
                    <span className="font-bold text-xl text-[#1C1C1C]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#00B517] hover:bg-green-600 active:bg-green-700 text-white py-3 rounded-md font-semibold text-sm transition-colors mb-4"
                >
                  Checkout
                </button>

                {/* Payment Icons */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {/* Visa */}
                  <div className="border border-[#E3E8EE] rounded px-2 py-1">
                    <span className="text-xs font-bold text-[#1A1F71] tracking-wide">VISA</span>
                  </div>
                  {/* Mastercard */}
                  <div className="border border-[#E3E8EE] rounded px-1 py-1 flex items-center gap-0.5">
                    <div className="w-3.5 h-3.5 bg-[#EB001B] rounded-full" />
                    <div className="w-3.5 h-3.5 bg-[#F79E1B] rounded-full -ml-1" />
                  </div>
                  {/* PayPal */}
                  <div className="border border-[#E3E8EE] rounded px-2 py-1">
                    <span className="text-xs font-bold text-[#003087]">Pay<span className="text-[#009CDE]">Pal</span></span>
                  </div>
                  {/* Visa (again) */}
                  <div className="border border-[#E3E8EE] rounded px-2 py-1">
                    <span className="text-xs font-bold italic text-[#1A1F71]">VISA</span>
                  </div>
                  {/* Apple Pay */}
                  <div className="border border-[#E3E8EE] rounded px-2 py-1">
                    <span className="text-xs font-bold text-[#1C1C1C]">⌘Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Saved for later ── */}
        {saved.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#1C1C1C] mb-4">Saved for later</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {saved.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border border-[#E3E8EE] rounded-lg p-3 flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-square rounded-md overflow-hidden mb-3 bg-[#EFF2F4] flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  </div>

                  {/* Price */}
                  <p className="text-base font-bold text-[#1C1C1C] mb-0.5">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Name */}
                  <p className="text-xs text-[#505050] line-clamp-2 mb-3 flex-1">
                    {item.name}
                  </p>

                  {/* Move to cart */}
                  <button
                    onClick={() => moveToCart(item)}
                    className="w-full flex items-center justify-center gap-2 border border-[#0D6EFD] text-[#0D6EFD] hover:bg-blue-50 py-1.5 rounded text-xs font-medium transition-colors"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Move to cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Super Discount Banner ── */}
        <div className="mt-8 bg-gradient-to-r from-[#2370FC] to-[#0D50D0] rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between text-white gap-4">
          <div>
            <h3 className="text-xl font-bold">Super discount on more than 100 USD</h3>
            <p className="text-blue-100 text-sm mt-1">Have you ever finally just write dummy info</p>
          </div>
          <Link
            to="/products"
            className="flex-shrink-0 bg-[#FF9017] hover:bg-[#e07f12] text-white px-6 py-2.5 rounded font-medium text-sm transition-colors"
          >
            Shop now
          </Link>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
