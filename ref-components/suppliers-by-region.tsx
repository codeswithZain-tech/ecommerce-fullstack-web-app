export default function SuppliersByRegion() {
  const regions = [
    {
      id: 1,
      country: 'Arab Emirates',
      flag: '/images/flags/uae.png',
      suppliers: 'shopname.ae',
    },
    {
      id: 2,
      country: 'Australia',
      flag: '/images/flags/australia.png',
      suppliers: 'shopname.au',
    },
    {
      id: 3,
      country: 'United States',
      flag: '/images/flags/usa.png',
      suppliers: 'shopname.us',
    },
    {
      id: 4,
      country: 'Russia',
      flag: '/images/flags/russia.png',
      suppliers: 'shopname.ru',
    },
    {
      id: 5,
      country: 'Italy',
      flag: '/images/flags/italy.png',
      suppliers: 'shopname.it',
    },
    {
      id: 6,
      country: 'Denmark',
      flag: '/images/flags/denmark.png',
      suppliers: 'shopname.dk',
    },
    {
      id: 7,
      country: 'France',
      flag: '/images/flags/france.png',
      suppliers: 'shopname.fr',
    },
    {
      id: 8,
      country: 'Arab Emirates',
      flag: '/images/flags/uae-alt.png',
      suppliers: 'shopname.ae',
    },
    {
      id: 9,
      country: 'China',
      flag: '/images/flags/china.png',
      suppliers: 'shopname.cn',
    },
    {
      id: 10,
      country: 'Great Britain',
      flag: '/images/flags/uk.png',
      suppliers: 'shopname.co.uk',
    },
  ];

  return (
    <section className=" rounded-md p-4 sm:p-6 shadow-sm w-full max-w-screen-xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
        Suppliers by region
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {regions.map((region) => (
          <div key={region.id} className="flex items-center gap-3 p-3">
            <img
              src={region.flag || '/placeholder.svg?height=24&width=36'}
              alt={`${region.country} flag`}
              className="w-8 h-5 object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {region.country}
              </p>
              <p className="text-xs text-gray-500">{region.suppliers}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
