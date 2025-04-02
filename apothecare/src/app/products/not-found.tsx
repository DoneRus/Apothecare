import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-2xl font-bold">ApotheCare</Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/dashboard" className="hover:text-primary-light transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary-light transition">Products</Link></li>
              <li><Link href="/orders" className="hover:text-primary-light transition">Orders</Link></li>
              <li><Link href="/profile" className="hover:text-primary-light transition">Profile</Link></li>
              <li><Link href="/auth/login" className="hover:text-primary-light transition">Sign Out</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center py-16 bg-white rounded-lg shadow-md">
          <div className="text-primary text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the product you're looking for. It may have been removed or doesn't exist.
          </p>
          <Link href="/products" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition">
            Return to Products
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ApotheCare</h3>
              <p className="text-gray-400 text-sm">Your trusted online pharmacy for all your healthcare needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
                <li><Link href="#services" className="hover:text-white transition">Services</Link></li>
                <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="#shipping" className="hover:text-white transition">Shipping</Link></li>
                <li><Link href="#returns" className="hover:text-white transition">Returns</Link></li>
                <li><Link href="#privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@apothecare.com</li>
                <li>Phone: +31 123 456 789</li>
                <li>Address: Amsterdam, Netherlands</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ApotheCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 