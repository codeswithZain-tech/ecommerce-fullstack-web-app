import { Link } from 'react-router-dom';

export default function ProductSection({ title, bgImage, products, categoryFilter = '' }) {
  const sourceLink = categoryFilter
    ? `/products?category=${encodeURIComponent(categoryFilter)}`
    : '/products';

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm max-w-screen-xl mx-auto my-4 overflow-hidden flex flex-col lg:flex-row lg:h-[260px]">
      <div className="relative lg:w-[280px] flex-shrink-0 h-[200px] lg:h-full">
        <img src={bgImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 p-6 flex flex-col items-start">
          <h3 className="text-xl font-bold text-gray-900 mb-4 w-[160px] leading-tight">{title}</h3>
          <Link to={sourceLink} className="inline-block bg-white text-gray-900 shadow-sm px-4 py-2 rounded text-sm font-medium hover:bg-gray-50">
            Source now
          </Link>
        </div>
      </div>

      <div className="flex-1 bg-white lg:border-l border-gray-200">
        <div className="flex lg:grid lg:grid-cols-4 lg:grid-rows-2 h-full divide-x divide-y border-gray-200 overflow-x-auto scrollbar-hide">
          {products.map((product) => (
            <Link
              key={product._id || product.name}
              to={product._id ? `/product/${product._id}` : '/products'}
              className="relative flex flex-col p-4 min-w-[160px] lg:min-w-0 hover:bg-gray-50 transition-colors bg-white lg:border-t-0"
            >
              <p className="text-[15px] text-gray-900 font-medium pr-8 line-clamp-2 leading-tight">{product.name}</p>
              <div className="mt-2 text-[#8B96A5] text-xs">
                From<br />
                <span className="text-[13px]">USD {product.price}</span>
              </div>
              <div className="absolute bottom-2 right-2 w-[72px] h-[72px] flex items-center justify-center">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
