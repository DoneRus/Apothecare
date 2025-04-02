import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Orders | ApotheCare',
  description: 'View and manage your orders from ApotheCare',
};

// Mock order data - would come from an API/database in a real app
const orders = [
  {
    id: 'ORD-2024-1001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 56.97,
    items: [
      { id: 1, name: 'Pain Relief Tablets', quantity: 2, price: 9.99, status: 'Delivered' },
      { id: 3, name: 'Allergy Relief', quantity: 1, price: 14.99, status: 'Delivered' },
      { id: 7, name: 'Sleep Aid', quantity: 1, price: 15.99, status: 'Delivered' }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'Credit Card (•••• 4321)',
    trackingNumber: 'NL9876543210',
    estimatedDelivery: '2024-01-18',
    actualDelivery: '2024-01-17'
  },
  {
    id: 'ORD-2024-0892',
    date: '2023-12-10',
    status: 'Delivered',
    total: 43.97,
    items: [
      { id: 2, name: 'Cold & Flu Syrup', quantity: 1, price: 12.99, status: 'Delivered' },
      { id: 4, name: 'Multivitamin Complex', quantity: 1, price: 19.99, status: 'Delivered' },
      { id: 8, name: 'Antiseptic Cream', quantity: 1, price: 8.99, status: 'Delivered' }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'Credit Card (•••• 4321)',
    trackingNumber: 'NL8765432109',
    estimatedDelivery: '2023-12-14',
    actualDelivery: '2023-12-13'
  },
  {
    id: 'ORD-2024-1144',
    date: '2024-02-20',
    status: 'Shipped',
    total: 49.97,
    items: [
      { id: 5, name: 'First Aid Kit', quantity: 1, price: 24.99, status: 'Shipped' },
      { id: 6, name: 'Digestive Health Tablets', quantity: 2, price: 11.99, status: 'Shipped' }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'PayPal',
    trackingNumber: 'NL0123456789',
    estimatedDelivery: '2024-02-25',
    actualDelivery: null
  },
  {
    id: 'ORD-2024-1268',
    date: '2024-03-05',
    status: 'Processing',
    total: 44.97,
    items: [
      { id: 1, name: 'Pain Relief Tablets', quantity: 1, price: 9.99, status: 'Processing' },
      { id: 2, name: 'Cold & Flu Syrup', quantity: 1, price: 12.99, status: 'Processing' },
      { id: 4, name: 'Multivitamin Complex', quantity: 1, price: 19.99, status: 'Processing' }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'Credit Card (•••• 4321)',
    trackingNumber: null,
    estimatedDelivery: '2024-03-10',
    actualDelivery: null
  }
];

export default function OrdersPage() {
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
            <div className="flex items-center space-x-2">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="all">All Orders</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  className="border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-3 md:mb-0">
                    <span className="font-medium">Order {order.id}</span>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <div className="flex items-center flex-wrap gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/orders/${order.id}`} className="text-primary hover:underline text-sm">
                        View Details
                      </Link>
                      {(order.status === 'Shipped' || order.status === 'Delivered') && (
                        <Link href={`#track-${order.trackingNumber}`} className="text-primary hover:underline text-sm">
                          Track Package
                        </Link>
                      )}
                      {order.status === 'Delivered' && (
                        <button className="text-primary hover:underline text-sm">Reorder</button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="h-16 w-16 bg-gray-200 rounded-md flex-shrink-0"></div>
                        <div className="ml-4 flex-grow">
                          <Link href={`/products/${item.id}`} className="font-medium text-gray-800 hover:text-primary transition">
                            {item.name}
                          </Link>
                          <div className="text-sm text-gray-500">
                            <span>Qty: {item.quantity}</span>
                            <span className="mx-2">•</span>
                            <span>€{item.price.toFixed(2)} each</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">€{(item.quantity * item.price).toFixed(2)}</div>
                          {order.status === 'Delivered' && (
                            <button className="text-sm text-primary hover:underline">Write Review</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 mt-6 pt-4 flex justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Payment Method:</span>
                      <span className="ml-2 text-sm">{order.paymentMethod}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Order Total:</div>
                      <div className="font-semibold text-lg">€{order.total.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm">
              <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-primary">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
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