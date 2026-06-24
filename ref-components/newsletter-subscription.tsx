import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function NewsletterSubscription() {
  return (
    <section className=" rounded-md p-6 mt-4  shadow-sm w-full max-w-screen-md mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Subscribe to our newsletter
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Get daily updates on offers from suppliers around the world.
        </p>

        <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch justify-center">
          <div className="relative flex-grow">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            <Input
              type="email"
              placeholder="Enter your email"
              className="pl-10 h-10"
              aria-label="Email address"
              required
            />
          </div>

          <Button
            type="submit"
            className="h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
