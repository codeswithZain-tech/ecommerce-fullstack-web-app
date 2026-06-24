import { Card, CardContent } from '@/components/ui/card';

const products = [
  {
    id: 1,
    name: 'Blue suit jacket for men',
    price: '$79.99',
    image: '/images/products/suit.png',
  },
  {
    id: 2,
    name: 'Denim backpack for travel',
    price: '$34.50',
    image: '/images/products/backpack.png',
  },
  {
    id: 3,
    name: 'Xiaomi smartphone with fingerprint',
    price: '$299.99',
    image: '/images/products/smartphone.png',
  },
  {
    id: 4,
    name: 'Premium leather wallet',
    price: '$45.00',
    image: '/images/products/wallet.png',
  },
  {
    id: 5,
    name: 'Canon EOS 2000D DSLR camera',
    price: '$499.00',
    image: '/images/products/camera.png',
  },
  {
    id: 6,
    name: 'Gaming headset with microphone',
    price: '$59.99',
    image: '/images/products/headset.png',
  },
  {
    id: 7,
    name: 'Premium white headphones',
    price: '$89.99',
    image: '/images/products/white-headphones.png',
  },
  {
    id: 8,
    name: 'Red iPhone with dual camera',
    price: '$799.00',
    image: '/images/products/iphone.png',
  },
  {
    id: 9,
    name: 'Tablet with high-res display',
    price: '$349.99',
    image: '/images/products/tablet.png',
  },
  {
    id: 10,
    name: 'Ultrabook laptop with HD display',
    price: '$1299.00',
    image: '/images/products/laptop.png',
  },
];

export default function RecommendedItems() {
  const half = Math.ceil(products.length / 2);
  const row1 = products.slice(0, half);
  const row2 = products.slice(half);

  return (
    <section className="w-full max-w-screen-xl mx-auto bg-white rounded-md p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Recommended items
      </h3>

      {/* Mobile: 2 scrollable rows */}
      <div className="space-y-4 lg:hidden">
        {[row1, row2].map((row, index) => (
          <div key={index} className="overflow-x-auto">
            <div className="flex gap-4 w-max px-1">
              {row.map((product) => (
                <div key={product.id} className="w-[140px] flex-shrink-0">
                  <Card className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="aspect-square flex items-center justify-center mb-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900 text-sm">
                          {product.price}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {product.name}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: 5-column grid */}
      <div className="hidden lg:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="border hover:shadow-md transition-shadow"
          >
            <CardContent className="p-3">
              <div className="aspect-square flex items-center justify-center mb-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-gray-900">{product.price}</p>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {product.name}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
