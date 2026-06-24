import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }
    setMessage({ type: 'success', text: 'Subscribed successfully! Check your inbox for offers.' });
    setEmail('');
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="bg-[#eff2f4] py-10 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center text-center">
        <h3 className="text-[20px] font-bold text-gray-900 mb-1">Subscribe on our newsletter</h3>
        <p className="text-[#8B96A5] text-[15px] mb-6">
          Get daily news on upcoming offers from many suppliers all over the world
        </p>
        {message && (
          <p className={`text-sm mb-4 ${message.type === 'success' ? 'text-[#00B517]' : 'text-[#FA3434]'}`}>
            {message.text}
          </p>
        )}
        <form className="flex w-full md:w-auto items-center gap-2" onSubmit={handleSubmit}>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-72 pl-10 pr-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#127FFF]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#127FFF] hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium whitespace-nowrap shadow-sm"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
