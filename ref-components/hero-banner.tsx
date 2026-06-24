// components/HeroBanner.tsx
import { Button } from '@/components/ui/button';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden w-full  h-[180px] sm:h-[360px]">
      {/* Background image */}
      <img
        src="/images/hero-banner.png"
        alt="Electronic items"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay content */}
      <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col items-start text-black">
        <p className="text-sm sm:text-lg font-medium mr-2">Latest trending</p>
        <h2 className="text-xl sm:text-3xl font-bold mb-3 mr-2">
          Electronic items
        </h2>
        <Button
          variant="outline"
          className="bg-white hover:bg-gray-100 text-blue-500 border-gray-300 px-2.5 py-[7px] sm:px-6 sm:py-0"
        >
          Learn more
        </Button>
      </div>
    </div>
  );
}
