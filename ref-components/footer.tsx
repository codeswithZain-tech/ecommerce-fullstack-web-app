import {
  ShoppingBag,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';

const footerLinks = [
  {
    title: 'About',
    links: ['About Us', 'Find store', 'Categories', 'Blogs'],
  },
  {
    title: 'Partnership',
    links: ['About Us', 'Find store', 'Categories', 'Blogs'],
  },
  {
    title: 'Information',
    links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'],
  },
  {
    title: 'For users',
    links: ['Login', 'Register', 'Settings', 'My Orders'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto px-4 py-12 max-w-screen-xl">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-600">Brand</span>
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-xs">
              Best information about the company gies here but now lorem ipsum
              is
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
                  >
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Link Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 text-sm hover:text-blue-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get App Section */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 ml-5">Get app</h3>
            <div className="flex flex-col space-y-2">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on App Store"
                className="h-10 object-contain "
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-10 object-contain scale-[0.90] filter grayscale contrast-125"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2023 Ecommerce.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <img
              src="/images/flags/usa.png"
              alt="English"
              className="w-5 h-3"
            />
            <span className="text-gray-600 text-sm">English</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
