import { Factory, Palette, Plane, ShieldCheck } from 'lucide-react';

export default function ExtraServices() {
  const services = [
    {
      id: 1,
      title: 'Source from Industry Hubs',
      icon: <Factory size={18} />,
      image: '/images/services/shipping-boxes.png',
    },
    {
      id: 2,
      title: 'Customize Your Products',
      icon: <Palette size={18} />,
      image: '/images/services/color-swatches.png',
    },
    {
      id: 3,
      title: 'Fast, reliable shipping by ocean or air',
      icon: <Plane size={18} />,
      image: '/images/services/air-freight.png',
    },
    {
      id: 4,
      title: 'Product monitoring and inspection',
      icon: <ShieldCheck size={18} />,
      image: '/images/services/warehouse-worker.png',
    },
  ];

  return (
    <section className="w-full max-w-screen-xl mx-auto bg-white rounded-md p-4 sm:p-6 shadow-sm">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Our extra services
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-md border bg-white overflow-hidden relative shadow-sm"
          >
            {/* Image Section with overlay */}
            <div className="relative h-28 sm:h-36 w-full">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#1C1C1C]/50" />

              {/* Icon bubble */}
              <div className="absolute right-1 bottom-0 translate-y-1/2 z-10 bg-blue-100 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg border border-white">
                {service.icon}
              </div>
            </div>

            {/* Text section */}
            <div className="pt-6 pb-3 px-4 text-center">
              <p className="text-sm sm:text-base font-medium text-gray-900 leading-snug">
                {service.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
