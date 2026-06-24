import { Link } from 'react-router-dom';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden w-full h-[180px] sm:h-[360px] rounded-md">
      <img src="/images/hero-banner.png" alt="Electronic items" className="absolute inset-0 w-full h-full object-cover object-center" />
      <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col items-start justify-center text-black">
        <p className="text-sm sm:text-lg font-medium">Latest trending</p>
        <h2 className="text-xl sm:text-3xl font-bold mb-3">Electronic items</h2>
        <Link to="/products?category=Electronics" className="bg-white hover:bg-gray-100 text-brand-500 border border-gray-300 px-4 py-2 rounded text-sm font-medium">
          Learn more
        </Link>
      </div>
    </div>
  );
}
