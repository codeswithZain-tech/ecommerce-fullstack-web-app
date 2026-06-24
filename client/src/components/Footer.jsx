import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Linkedin, Instagram, Youtube, ChevronUp } from 'lucide-react';

const footerLinks = [
  {
    title: 'About',
    links: [
      { label: 'About Us', to: '/products' },
      { label: 'Find store', to: '/products' },
      { label: 'Categories', to: '/products' },
      { label: 'Blogs', to: '/products?featured=true' },
    ],
  },
  {
    title: 'Partnership',
    links: [
      { label: 'About Us', to: '/products' },
      { label: 'Find store', to: '/products' },
      { label: 'Categories', to: '/products' },
      { label: 'Blogs', to: '/products?featured=true' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'Help Center', section: 'help' },
      { label: 'Money Refund', to: '/products' },
      { label: 'Shipping', to: '/products' },
      { label: 'Contact us', section: 'inquiry' },
    ],
  },
  {
    title: 'For users',
    links: [
      { label: 'Login', to: '/login' },
      { label: 'Register', to: '/register' },
      { label: 'Settings', to: '/login' },
      { label: 'My Orders', to: '/cart' },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => {
    const scroll = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 400);
    } else {
      scroll();
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto px-4 py-12 max-w-screen-xl">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-[#127FFF] rounded-lg flex items-center justify-center shadow-sm">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#8db4ff] tracking-tight">Brand</span>
            </Link>
            <p className="text-[#505050] text-[15px] mb-6 max-w-xs leading-relaxed">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#bdc4cd] rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-[18px] w-[18px] text-white" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} id={section.title === 'Information' ? 'help' : undefined} className="scroll-mt-24">
              <h3 className="font-bold text-gray-900 mb-4 text-[16px]">{section.title}</h3>
              <ul className="space-y-[6px]">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.section ? (
                      <button
                        type="button"
                        onClick={() => goToSection(link.section)}
                        className="text-[#8B96A5] text-[15px] hover:text-[#127FFF] text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link to={link.to} className="text-[#8B96A5] text-[15px] hover:text-[#127FFF]">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-[16px]">Get app</h3>
            <div className="flex flex-col gap-3">
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-[40px] object-contain origin-left" />
              </a>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-[40px] object-contain origin-left" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#eff2f4] border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#505050] text-[15px]">© 2023 Ecommerce.</p>
          <button type="button" className="flex items-center gap-2 mt-4 md:mt-0 cursor-pointer">
            <img src="/images/flags/usa.png" alt="English" className="w-5 h-3 object-cover" />
            <span className="text-[#505050] text-[15px] font-medium">English</span>
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </footer>
  );
}
