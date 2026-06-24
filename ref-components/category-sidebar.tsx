// components/CategorySidebar.tsx

export default function CategorySidebar() {
  const categories = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and tech',
    'Tools, equipments',
    'Sports and outdoor',
    'Animal and pets',
    'Machinery tools',
    'More category',
  ];

  return (
    <div className="hidden lg:block bg-white rounded-md overflow-hidden shadow-sm w-[250px] max-h-[360px] ">
      <ul className="h-full">
        {categories.map((category, index) => (
          <li key={index} className="h-10">
            <a
              href="#"
              className={`block px-1 py-1 text-gray-700 hover:bg-gray-50 transition-colors h-full   ${
                index === 0 ? 'bg-blue-50' : ''
              }`}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
