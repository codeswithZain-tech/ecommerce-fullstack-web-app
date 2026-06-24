import { Button } from '@/components/ui/button';

export default function UserPanel() {
  return (
    <div className="hidden lg:block space-y-4">
      {/* User Login Panel */}
      <div className="rounded-md p-3 bg-[#E3F0FF] h-[150px]">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">Hi, user</p>
            <p className="text-xs text-gray-500">let's get started</p>
          </div>
        </div>
        <div className="space-y-2 ">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-xs py-1.5">
            Join now
          </Button>
          <Button
            variant="outline"
            className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 text-xs py-1.5"
          >
            Log in
          </Button>
        </div>
      </div>

      {/* Promo Panels */}
      <div className="bg-orange-400 rounded-md p-3 text-white h-[95px]">
        <p className="font-medium text-xs">Get US $10 off</p>
        <p className="text-xs">with a new</p>
        <p className="text-xs">supplier</p>
      </div>

      <div className="bg-teal-500 rounded-md p-3 text-white h-[95px] mb-1.5">
        <p className="font-medium text-xs">Send quotes with</p>
        <p className="text-xs">supplier</p>
        <p className="text-xs">preferences</p>
      </div>
    </div>
  );
}
