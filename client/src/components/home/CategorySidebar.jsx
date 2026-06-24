import { Link } from 'react-router-dom';

const categories = [
  { label: 'Automobiles', to: '/products?category=Electronics' },
  { label: 'Clothes and wear', to: '/products?category=Clothes%20and%20wear' },
  { label: 'Home interiors', to: '/products?category=Home%20interiors' },
  { label: 'Computer and tech', to: '/products?category=Electronics' },
  { label: 'Tools, equipments', to: '/products?category=Electronics' },
  { label: 'Sports and outdoor', to: '/products?category=Electronics' },
  { label: 'Animal and pets', to: '/products?category=Electronics' },
  { label: 'Machinery tools', to: '/products?category=Electronics' },
  { label: 'More category', to: '/products' },
];

export default function CategorySidebar() {
  return (
    <div className="hidden lg:block w-[200px] flex-shrink-0">
      <ul>
        {categories.map((cat, index) => (
          <li key={cat.label}>
            <Link
              to={cat.to}
              className={`block px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-brand-600 transition-colors ${
                index === 0 ? 'bg-blue-50 font-medium text-brand-600' : ''
              }`}
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
