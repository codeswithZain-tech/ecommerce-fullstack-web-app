import { useState } from 'react';

export default function InquirySection() {
  const [item, setItem] = useState('');
  const [details, setDetails] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('Pcs');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item.trim()) {
      setError('Please enter the item you need.');
      return;
    }
    setError('');
    setSubmitted(true);
    setItem('');
    setDetails('');
    setQuantity('');
    setUnit('Pcs');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div
      id="inquiry"
      className="relative rounded-md max-w-screen-xl mx-auto my-4 bg-cover bg-center overflow-hidden scroll-mt-24"
      style={{ backgroundImage: "url('/images/services/warehouse-background.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#2C7CF1] to-[#2bd2ff] opacity-80" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 p-6 lg:p-10">
        <div className="text-white lg:w-1/2 lg:pl-4">
          <h3 className="text-[28px] lg:text-[32px] font-bold mb-4 leading-tight w-[90%]">
            An easy way to send requests to all suppliers
          </h3>
          <p className="text-[15px] text-white/90 leading-relaxed w-4/5 hidden lg:block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>

        <div className="bg-white rounded-md p-6 w-full lg:w-[480px] lg:flex-shrink-0 shadow-sm mr-2">
          <h4 className="font-bold text-gray-900 mb-4 text-[20px]">Send quote to suppliers</h4>

          {submitted && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
              Your inquiry has been sent! Suppliers will contact you shortly.
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="What item you need?"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder-gray-500"
            />
            <textarea
              placeholder="Type more details"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none placeholder-gray-400"
            />
            <div className="flex gap-2 mb-5 w-full lg:w-[300px]">
              <input
                type="number"
                min="1"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder-gray-800"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-500 w-[100px] text-gray-800"
              >
                <option>Pcs</option>
                <option>Kg</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-[#127FFF] hover:bg-blue-700 text-white py-2 px-5 rounded-md text-[15px] font-medium w-fit"
            >
              Send inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
