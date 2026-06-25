import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, MessageCircle, Package, ShoppingCart, Menu, Search, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { label: 'Hot offers', to: '/products?featured=true' },
  { label: 'Gift boxes', to: '/products?category=Clothes%20and%20wear' },
  { label: 'Projects', section: 'inquiry', path: '/' },
  { label: 'Menu item', to: '/products?category=Electronics' },
  { label: 'Help', section: 'help' },
];

const languageOptions = [
  { label: 'English, USD', flag: '/images/flags/usa.png' },
  { label: 'English, GBP', flag: '/images/flags/uk.png' },
  { label: 'Arabic, AED', flag: '/images/flags/uae.png' },
  { label: 'German, EUR', flag: '/images/flags/germany.png' },
  { label: 'French, EUR', flag: '/images/flags/france.png' },
  { label: 'Chinese, CNY', flag: '/images/flags/china.png' },
  { label: 'Australian, AUD', flag: '/images/flags/australia.png' },
];

const shipOptions = [
  { country: 'United States', flag: '/images/flags/usa.png' },
  { country: 'United Kingdom', flag: '/images/flags/uk.png' },
  { country: 'United Arab Emirates', flag: '/images/flags/uae.png' },
  { country: 'Germany', flag: '/images/flags/germany.png' },
  { country: 'France', flag: '/images/flags/france.png' },
  { country: 'China', flag: '/images/flags/china.png' },
  { country: 'Australia', flag: '/images/flags/australia.png' },
  { country: 'Italy', flag: '/images/flags/italy.png' },
  { country: 'Denmark', flag: '/images/flags/denmark.png' },
  { country: 'Russia', flag: '/images/flags/russia.png' },
];

export default function Header({ onSearch }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [selectedShipTo, setSelectedShipTo] = useState(shipOptions[0]);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId, path = location.pathname) => {
    const scroll = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname !== path) {
      navigate(path);
      setTimeout(scroll, 400);
    } else {
      scroll();
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    const trimmedSearch = search.trim();
    if (trimmedSearch) params.set('search', trimmedSearch);
    if (category && category !== 'all') params.set('category', category);
    navigate(`/products${params.toString() ? `?${params.toString()}` : ''}`);
    onSearch?.(search, category);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link to="/" className="flex items-center gap-2">
              <img src="/images/brand/logo-colored.svg" alt="Brand" className="h-10 w-auto" />
            </Link>
          </div>

          <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-2xl mx-4">
            <div className="flex flex-1 border-2 border-brand-500 rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-2 text-sm focus:outline-none bg-white"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-l border-gray-300 px-3 py-2 text-sm bg-[#eff2f4] focus:outline-none cursor-pointer"
              >
                <option value="all">All category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothes and wear">Clothes and wear</option>
                <option value="Home interiors">Home interiors</option>
                <option value="Mobile accessory">Mobile accessory</option>
              </select>
              <button type="submit" className="bg-[#127FFF] hover:bg-brand-700 text-white px-6 py-2 text-sm font-medium">
                Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/cart" className="hidden lg:flex flex-col items-center text-gray-500 hover:text-brand-600 text-xs">
              <Package className="h-5 w-5" />
              <span className="mt-0.5">Orders</span>
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection('inquiry', '/')}
              className="hidden lg:flex flex-col items-center text-gray-500 hover:text-brand-600 text-xs"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="mt-0.5">Message</span>
            </button>
            {user ? (
              <div className="hidden lg:flex flex-col items-center text-gray-500 text-xs relative group">
                <User className="h-5 w-5" />
                <span className="mt-0.5">{user.name.split(' ')[0]}</span>
                <div className="absolute top-full right-0 bg-white shadow-lg rounded-md py-2 w-36 hidden group-hover:block z-50">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-50">Admin Panel</Link>
                  )}
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden lg:flex flex-col items-center text-gray-500 hover:text-brand-600 text-xs">
                <User className="h-5 w-5" />
                <span className="mt-0.5">Profile</span>
              </Link>
            )}
            <Link to="/cart" className="flex flex-col items-center text-gray-500 hover:text-brand-600 text-xs relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="mt-0.5 hidden sm:block">My cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        <form onSubmit={handleSearch} className="lg:hidden pb-3 flex gap-2">
          <div className="flex flex-1">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none"
            />
            <button type="submit" className="bg-brand-600 text-white px-4 rounded-r-md">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>

      <div className="hidden lg:flex bg-white border-t border-gray-200 text-sm text-gray-600">
        <div className="max-w-screen-xl mx-auto px-4 w-full flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <Link to="/products" className="hover:text-brand-600 cursor-pointer flex items-center gap-1">
              <Menu className="h-4 w-4" />
              All category
            </Link>
            {navLinks.map((link) =>
              link.to ? (
                <Link key={link.label} to={link.to} className="hover:text-brand-600 cursor-pointer flex items-center gap-0.5">
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollToSection(link.section, link.path)}
                  className="hover:text-brand-600 cursor-pointer flex items-center gap-0.5"
                >
                  {link.label}
                  {link.label === 'Help' && <ChevronDown className="h-3 w-3" />}
                </button>
              )
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'language' ? null : 'language')}
                className="flex items-center gap-1 hover:text-brand-600"
              >
                <img src={selectedLanguage.flag} alt="" className="w-5 h-3 object-cover" />
                {selectedLanguage.label}
                <ChevronDown className="h-3 w-3" />
              </button>
              {openDropdown === 'language' && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                  {languageOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => { setSelectedLanguage(option); setOpenDropdown(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-[#505050]"
                    >
                      <img src={option.flag} alt="" className="w-5 h-3 object-cover" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'ship' ? null : 'ship')}
                className="flex items-center gap-1 hover:text-brand-600"
              >
                Ship to
                <img src={selectedShipTo.flag} alt="" className="w-5 h-3 object-cover" />
                <ChevronDown className="h-3 w-3" />
              </button>
              {openDropdown === 'ship' && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                  {shipOptions.map((option) => (
                    <button
                      key={option.country}
                      type="button"
                      onClick={() => { setSelectedShipTo(option); setOpenDropdown(null); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 text-[#505050]"
                    >
                      <img src={option.flag} alt="" className="w-5 h-3 object-cover" />
                      <span>{option.country}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4">
          <nav className="flex flex-col gap-3 text-sm">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>All category</Link>
            <Link to="/products?featured=true" onClick={() => setMenuOpen(false)}>Hot offers</Link>
            <Link to="/products?category=Clothes%20and%20wear" onClick={() => setMenuOpen(false)}>Gift boxes</Link>
            <button type="button" onClick={() => { scrollToSection('inquiry', '/'); setMenuOpen(false); }}>Projects</button>
            <Link to="/products?category=Electronics" onClick={() => setMenuOpen(false)}>Menu item</Link>
            <button type="button" onClick={() => { scrollToSection('help'); setMenuOpen(false); }}>Help</button>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>My cart</Link>
            {user ? (
              <>
                {user.role === 'admin' && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>}
                <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
