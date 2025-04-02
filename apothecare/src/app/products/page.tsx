import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products | ApotheCare',
  description: 'Browse our pharmacy products',
};

const products = [
  {
    id: 1,
    name: 'Pain Relief Tablets',
    description: 'Fast-acting pain relief for headaches and minor aches',
    price: 9.99,
    category: 'Pain Relief'
  },
  {
    id: 2,
    name: 'Cold & Flu Syrup',
    description: 'Relieves symptoms of cold and flu',
    price: 12.99,
    category: 'Cold & Flu'
  },
  {
    id: 3,
    name: 'Allergy Relief',
    description: 'Fast-acting allergy symptom relief',
    price: 14.99,
    category: 'Allergies'
  },
  {
    id: 4,
    name: 'Multivitamin Complex',
    description: 'Daily multivitamin for overall health',
    price: 19.99,
    category: 'Vitamins'
  },
  {
    id: 5,
    name: 'First Aid Kit',
    description: 'Complete kit for minor injuries',
    price: 24.99,
    category: 'First Aid'
  },
  {
    id: 6,
    name: 'Digestive Health Tablets',
    description: 'Promotes digestive health and comfort',
    price: 11.99,
    category: 'Digestive Health'
  },
  {
    id: 7,
    name: 'Sleep Aid',
    description: 'Natural formula to help improve sleep quality',
    price: 15.99,
    category: 'Sleep & Relaxation'
  },
  {
    id: 8,
    name: 'Antiseptic Cream',
    description: 'Prevents infection in minor cuts and burns',
    price: 8.99,
    category: 'First Aid'
  }
];

export default function ProductsPage() {
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
      <main className="container mx-auto px-4 py-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Products</h1>
          
          {/* Category filters */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(products.map(p => p.category))).map(category => (
                <button key={category} className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-primary hover:text-white transition">
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{product.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-primary font-bold">€{product.price.toFixed(2)}</span>
                    <div className="flex space-x-2">
                      <Link href={`/products/${product.id}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition">
                        Details
                      </Link>
                      <button className="bg-primary text-white px-3 py-1 rounded-md text-sm hover:bg-primary-dark transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
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