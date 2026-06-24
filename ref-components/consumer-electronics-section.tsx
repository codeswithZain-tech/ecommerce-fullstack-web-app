import { Button } from '@/components/ui/button';

export default function ConsumerElectronicsSection() {
  const products = [
    {
      name: 'Smart watches',
      price: 'USD 19',
      image: '/images/products/smartwatch.png',
    },
    { name: 'Cameras', price: 'USD 89', image: '/images/products/camera.png' },
    {
      name: 'Headphones',
      price: 'USD 10',
      image: '/images/products/white-headphones.png',
    },
    {
      name: 'Smart watches',
      price: 'USD 90',
      image: '/images/products/smartwatch.png',
    },
    {
      name: 'Gaming set',
      price: 'USD 35',
      image: '/images/products/headset.png',
    },
    {
      name: 'Laptops & PC',
      price: 'USD 340',
      image: '/images/products/laptop.png',
    },
    {
      name: 'Smartphones',
      price: 'USD 19',
      image: '/images/products/smartphone.png',
    },
    {
      name: 'Electric kettle',
      price: 'USD 240',
      image: '/images/products/kettle.png',
    },
  ];

  return (
    <section className="bg-white rounded-md shadow-sm overflow-hidden w-full max-w-screen-xl mx-auto lg:mt-8">
      {/* Heading (mobile only) */}
      <div className="p-4 lg:hidden">
        <h3 className="text-lg font-semibold text-gray-900">
          Consumer electronics
        </h3>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex w-full h-[260px]">
        {/* Left Banner */}
        <div className="relative w-[280px] h-full flex-shrink-0 overflow-hidden">
          <img
            src="/images/products/tech-gadgets.png"
            alt="Consumer electronics"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent z-10" />
          <div className="relative z-20 p-6 flex flex-col justify-between h-full">
            <h3 className="text-xl font-bold text-gray-900 leading-snug">
              Consumer
              <br />
              electronics and
              <br />
              gadgets
            </h3>
            <Button
              variant="outline"
              className="mt-4 bg-white hover:bg-gray-100"
            >
              Source now
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 grid grid-cols-4 grid-rows-2 divide-x divide-y">
          {products.map((product, index) => (
            <div key={index} className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">From</p>
                <p className="text-sm text-gray-700">{product.price}</p>
              </div>
              <div className="w-20 h-20 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Scrollable product cards */}
      <div className="lg:hidden px-4 pb-4 overflow-x-auto">
        <div className="flex gap-4 w-max">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-48 min-w-[12rem] border rounded-md p-4 flex-shrink-0 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <h4 className="text-sm font-medium text-gray-900">
                {product.name}
              </h4>
              <p className="text-xs text-gray-500">From</p>
              <p className="text-sm text-gray-700">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Source now link with arrow */}
      <div className="lg:hidden pb-4">
        <div className="w-full bg-white border rounded-md p-4 flex items-center justify-between shadow-sm">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 text-xl font-medium text-[#0D6EFD] bg-white rounded-md hover:bg-blue-50 transition"
          >
            Source now{' '}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00008 0.666687L6.70758 1.95919L11.8226 7.08335H0.666748V8.91669H11.8226L6.70758 14.0409L8.00008 15.3334L15.3334 8.00002L8.00008 0.666687Z"
                fill="#0D6EFD"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
