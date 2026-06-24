import { Link } from 'react-router-dom';

export default function RecommendedItems({ products = [] }) {
  // Show exactly 10 items to match the 2-row, 5-column design perfectly
  const displayProducts = products.slice(0, 10);

  return (
    <div className="max-w-screen-xl mx-auto my-6 px-4">
      <h3 className="text-[22px] font-bold text-gray-900 mb-5">Recommended items</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayProducts.map((product) => (
          <Link
            key={product._id || product.name}
            to={product._id ? `/product/${product._id}` : '/products'}
            className="bg-white border border-gray-200 rounded-md p-4 hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="w-full h-[160px] flex items-center justify-center mb-4">
              <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
            </div>
            <div className="mt-auto">
              <p className="text-[16px] font-bold text-gray-900 mb-1">${Number(product.price).toFixed(2)}</p>
              <p className="text-[14px] text-[#8B96A5] line-clamp-2 leading-snug">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
