import { Link } from 'react-router-dom';
import { Search, Archive, Send, Shield } from 'lucide-react';

const services = [
  { title: 'Source from\nIndustry Hubs', image: '/images/services/shipping-boxes.png', icon: Search, to: '/products?category=Electronics' },
  { title: 'Customize Your\nProducts', image: '/images/services/color-swatches.png', icon: Archive, to: '/products?category=Clothes%20and%20wear' },
  { title: 'Fast, reliable shipping\nby ocean or air', image: '/images/services/air-freight.png', icon: Send, to: '/products' },
  { title: 'Product monitoring\nand inspection', image: '/images/services/warehouse-worker.png', icon: Shield, to: '/#inquiry' },
];

export default function ExtraServices() {
  return (
    <div className="max-w-screen-xl mx-auto my-6 px-4">
      <h3 className="text-[22px] font-bold text-gray-900 mb-5">Our extra services</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.title}
              to={service.to}
              className="bg-white border border-gray-200 rounded-md overflow-hidden relative group hover:shadow-md transition-shadow block"
            >
              <div className="h-[120px] w-full relative">
                <img src={service.image} alt={service.title.replace('\n', ' ')} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="p-4 pt-4 pr-16">
                <p className="text-[15px] font-medium text-gray-900 leading-snug whitespace-pre-line">{service.title}</p>
              </div>
              <div className="absolute right-4 top-[95px] w-[50px] h-[50px] bg-[#E3F0FF] rounded-full border-2 border-white flex items-center justify-center text-[#127FFF]">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
