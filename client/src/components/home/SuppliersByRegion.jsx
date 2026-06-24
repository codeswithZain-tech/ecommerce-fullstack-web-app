import { Link } from 'react-router-dom';

const regions = [
  { flag: '/images/flags/uae.png', country: 'Arabic Emirates', shop: 'shopname.ae' },
  { flag: '/images/flags/australia.png', country: 'Australia', shop: 'shopname.ae' },
  { flag: '/images/flags/usa.png', country: 'United States', shop: 'shopname.ae' },
  { flag: '/images/flags/russia.png', country: 'Russia', shop: 'shopname.ru' },
  { flag: '/images/flags/italy.png', country: 'Italy', shop: 'shopname.it' },
  { flag: '/images/flags/denmark.png', country: 'Denmark', shop: 'denmark.com.dk' },
  { flag: '/images/flags/france.png', country: 'France', shop: 'shopname.com.fr' },
  { flag: '/images/flags/uae.png', country: 'Arabic Emirates', shop: 'shopname.ae' },
  { flag: '/images/flags/china.png', country: 'China', shop: 'shopname.ae' },
  { flag: '/images/flags/uk.png', country: 'Great Britain', shop: 'shopname.co.uk' },
];

export default function SuppliersByRegion() {
  return (
    <div className="max-w-screen-xl mx-auto my-8 px-4">
      <h3 className="text-[24px] font-bold text-gray-900 mb-6">Suppliers by region</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-4">
        {regions.map((region, i) => (
          <Link
            key={`${region.country}-${i}`}
            to={`/products?search=${encodeURIComponent(region.country)}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={region.flag} alt={region.country} className="w-7 h-5 object-cover rounded-sm" />
            <div>
              <p className="text-[15px] font-medium text-gray-900 leading-tight">{region.country}</p>
              <p className="text-[13px] text-[#8B96A5] leading-tight">{region.shop}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
