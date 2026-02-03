"use client";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo / Brand */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold">FoodHub</h2>
          <p className="text-sm text-green-200 max-w-xs">
            Fresh meals delivered to your doorstep. Fast, reliable, and
            delicious.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold">Quick Links</h3>
          <a href="#" className="text-green-200 hover:text-white transition">
            Home
          </a>
          <a href="#" className="text-green-200 hover:text-white transition">
            Categories
          </a>
          <a href="#" className="text-green-200 hover:text-white transition">
            Popular Meals
          </a>
          <a href="#" className="text-green-200 hover:text-white transition">
            Contact
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold">Contact</h3>
          <p className="text-green-200 text-sm">
            Email: tonmoynht1930@gmail.com
          </p>
          <p className="text-green-200 text-sm">Phone: +8801407641417</p>
          <p className="text-green-200 text-sm">Gazipur, Bangladesh</p>
        </div>
      </div>

      <div className="mt-10 text-center text-green-200 text-sm">
        &copy; {new Date().getFullYear()} FoodHub. All rights reserved.
      </div>
    </footer>
  );
}
