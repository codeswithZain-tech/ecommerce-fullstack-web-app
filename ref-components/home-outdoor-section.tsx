import { Button } from '@/components/ui/button';

export default function HomeOutdoorSection() {
  const products = [
    {
      name: 'Soft chairs',
      price: 'USD 19',
      image: '/images/products/table-lamp.png',
    },
    {
      name: 'Sofa',
      price: 'USD 19',
      image: '/images/products/sofa.png',
    },
    {
      name: 'Kitchen dishes',
      price: 'USD 19',
      image: '/images/products/clay-pot.png',
    },
    {
      name: 'Smart watches',
      price: 'USD 19',
      image: '/images/products/smartwatch.png',
    },
    {
      name: 'Kitchen mixer',
      price: 'USD 100',
      image: '/images/products/juicer.png',
    },
    {
      name: 'Blenders',
      price: 'USD 39',
      image: '/images/products/juicer.png',
    },
    {
      name: 'Home appliance',
      price: 'USD 19',
      image: '/images/products/coffee-machine.png',
    },
    {
      name: 'Coffee maker',
      price: 'USD 10',
      image: '/images/products/clay-pot.png',
    },
  ];

  return (
    <section className="bg-white rounded-md shadow-sm overflow-hidden w-full max-w-screen-xl mx-auto mt-8">
      {/* Heading: Always visible */}
      <div className="p-4 lg:hidden ">
        <h3 className="text-lg font-semibold text-gray-900">
          Home and outdoor
        </h3>
      </div>

      {/* Desktop layout (lg and above) */}
      <div className="hidden lg:flex w-full h-[260px]">
        {/* Left Banner */}
        <div className="relative w-[280px] h-full flex-shrink-0 overflow-hidden">
          <img
            src="/images/home-interior-2.png"
            alt="Home and outdoor"
            className="absolute inset-0 w-full h-full object-cover object-left scale-x-[-1] brightness-110"
          />
          <div className="absolute inset-0 bg-[#ffcc7e64] opacity-90" />
          <div className="relative z-10 p-6 flex flex-col justify-between h-full">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              Home and
              <br />
              outdoor
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

      {/* Scrollable products */}
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

      {/* Source now link */}
      <div className="lg:hidden  pb-4">
        <div className=" w-full bg-white border rounded-md p-4 flex items-center justify-between shadow-sm">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-5 text-xl font-medium text-[#0D6EFD] bg-white  rounded-md hover:bg-blue-50 transition"
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
