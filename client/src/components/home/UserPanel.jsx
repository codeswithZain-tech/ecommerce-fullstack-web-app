import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function UserPanel() {
  const { user } = useAuth();

  return (
    <div className="hidden lg:block space-y-4 w-full">
      <div className="rounded-md p-3 bg-[#E3F0FF] h-[150px] flex flex-col justify-between">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-800 truncate">Hi, {user ? user.name : 'user'}</p>
            <p className="text-xs text-gray-500">let&apos;s get stated</p>
          </div>
        </div>
        {!user ? (
          <div className="space-y-2 mt-auto">
            <Link to="/register" className="block w-full bg-[#127FFF] hover:bg-blue-700 text-white text-xs py-1.5 rounded text-center font-medium">
              Join now
            </Link>
            <Link to="/login" className="block w-full bg-white text-[#127FFF] border border-gray-200 hover:bg-gray-50 text-xs py-1.5 rounded text-center font-medium">
              Log in
            </Link>
          </div>
        ) : (
          <Link to="/products" className="block w-full bg-[#127FFF] hover:bg-blue-700 text-white text-xs py-1.5 rounded text-center font-medium mt-auto">
            Browse products
          </Link>
        )}
      </div>

      <Link to="/register" className="block bg-[#F38332] rounded-md p-3 text-white h-[95px] hover:opacity-95 transition-opacity">
        <p className="font-medium text-sm w-3/4">Get US $10 off</p>
        <p className="text-xs mt-1">with a new supplier</p>
      </Link>

      <Link to="/#inquiry" className="block bg-[#55BDC3] rounded-md p-3 text-white h-[95px] hover:opacity-95 transition-opacity mb-1.5">
        <p className="font-medium text-sm w-3/4">Send quotes with</p>
        <p className="text-xs mt-1">supplier preferences</p>
      </Link>
    </div>
  );
}
