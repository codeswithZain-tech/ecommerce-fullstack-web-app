import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const deals = [
  { name: 'Smart watches', discount: '-25%', image: '/images/products/smartwatch.jpg', category: 'Electronics' },
  { name: 'Laptops', discount: '-15%', image: '/images/products/laptop.jpg', category: 'Electronics' },
  { name: 'GoPro cameras', discount: '-40%', image: '/images/products/canon-camera.jpg', category: 'Electronics' },
  { name: 'Headphones', discount: '-25%', image: '/images/products/gaming-headset.jpg', category: 'Electronics' },
  { name: 'Canon cameras', discount: '-25%', image: '/images/products/iphone-red.png', category: 'Mobile accessory' },
];

// Set deal end time: 4 days from now
const DEAL_END = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);

function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function pad(n) { return String(n).padStart(2, '0'); }

function TimerBlock({ value, label }) {
  return (
    <div className="bg-[#606060] text-white text-center px-2 py-1 rounded min-w-[44px]">
      <div className="text-xl font-bold leading-tight">{pad(value)}</div>
      <div className="text-[11px] leading-tight">{label}</div>
    </div>
  );
}

export default function DealsSection() {
  const { days, hours, mins, secs } = useCountdown(DEAL_END);

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 max-w-screen-xl mx-auto my-4">
      {/* Mobile header */}
      <div className="md:hidden flex justify-between items-center px-4 pt-4 pb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Deals and offers</h3>
          <p className="text-sm text-gray-500">Hygiene equipments</p>
        </div>
        <div className="flex gap-1">
          <TimerBlock value={hours} label="Hour" />
          <TimerBlock value={mins} label="Min" />
          <TimerBlock value={secs} label="Sec" />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex px-4 py-4 items-center">
        <div className="w-[220px] flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-900">Deals and offers</h3>
          <p className="text-sm text-gray-500 mb-4">Hygiene equipments</p>
          <div className="flex gap-1">
            <TimerBlock value={days} label="Days" />
            <TimerBlock value={hours} label="Hour" />
            <TimerBlock value={mins} label="Min" />
            <TimerBlock value={secs} label="Sec" />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto ml-4">
          <div className="flex lg:grid lg:grid-cols-5 gap-0 min-w-[560px] lg:min-w-0 divide-x divide-gray-200">
            {deals.map((deal) => (
              <Link
                key={deal.name}
                to={`/products?category=${encodeURIComponent(deal.category)}`}
                className="min-w-[140px] lg:min-w-0 p-4 flex flex-col items-center hover:bg-gray-50 transition-colors group"
              >
                <div className="w-[90px] h-[90px] flex items-center justify-center mb-2">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-medium text-center text-gray-800 mb-1">{deal.name}</h4>
                <span className="px-2 py-0.5 bg-[#FFE3E3] text-[#FA3434] rounded-full text-xs font-semibold">
                  {deal.discount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile product row */}
      <div className="md:hidden overflow-x-auto border-t border-gray-200 pb-2 scrollbar-hide">
        <div className="flex gap-0 divide-x divide-gray-200 min-w-max">
          {deals.map((deal) => (
            <Link
              key={deal.name}
              to={`/products?category=${encodeURIComponent(deal.category)}`}
              className="min-w-[130px] px-3 py-3 flex flex-col items-center hover:bg-gray-50 transition-colors"
            >
              <img src={deal.image} alt={deal.name} className="h-20 object-contain mb-2" />
              <h4 className="text-xs font-medium text-center text-gray-800 mb-1">{deal.name}</h4>
              <span className="px-2 py-0.5 bg-[#FFE3E3] text-[#FA3434] rounded-full text-xs font-semibold">
                {deal.discount}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
