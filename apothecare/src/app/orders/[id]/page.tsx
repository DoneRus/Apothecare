import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

// Mock order data - would come from an API/database
const orders = [
  {
    id: 'ORD-2024-1001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 56.97,
    subtotal: 50.97,
    shipping: 5.00,
    tax: 1.00,
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
    billingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'Credit Card (•••• 4321)',
    trackingNumber: 'NL9876543210',
    carrier: 'PostNL',
    estimatedDelivery: '2024-01-18',
    actualDelivery: '2024-01-17',
    orderEvents: [
      { date: '2024-01-15 09:23', status: 'Order Placed', description: 'Your order has been received' },
      { date: '2024-01-15 10:45', status: 'Payment Confirmed', description: 'Payment has been processed successfully' },
      { date: '2024-01-15 14:30', status: 'Processing', description: 'Your order is being prepared' },
      { date: '2024-01-16 08:15', status: 'Shipped', description: 'Your order has been shipped' },
      { date: '2024-01-17 13:42', status: 'Delivered', description: 'Your order has been delivered' }
    ]
  },
  {
    id: 'ORD-2024-0892',
    date: '2023-12-10',
    status: 'Delivered',
    total: 43.97,
    subtotal: 41.97,
    shipping: 0.00,
    tax: 2.00,
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
    billingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'Credit Card (•••• 4321)',
    trackingNumber: 'NL8765432109',
    carrier: 'DHL',
    estimatedDelivery: '2023-12-14',
    actualDelivery: '2023-12-13',
    orderEvents: [
      { date: '2023-12-10 11:05', status: 'Order Placed', description: 'Your order has been received' },
      { date: '2023-12-10 11:35', status: 'Payment Confirmed', description: 'Payment has been processed successfully' },
      { date: '2023-12-10 15:12', status: 'Processing', description: 'Your order is being prepared' },
      { date: '2023-12-11 09:30', status: 'Shipped', description: 'Your order has been shipped' },
      { date: '2023-12-13 14:20', status: 'Delivered', description: 'Your order has been delivered' }
    ]
  },
  {
    id: 'ORD-2024-1144',
    date: '2024-02-20',
    status: 'Shipped',
    total: 49.97,
    subtotal: 48.97,
    shipping: 0.00,
    tax: 1.00,
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
    billingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'PayPal',
    trackingNumber: 'NL0123456789',
    carrier: 'PostNL',
    estimatedDelivery: '2024-02-25',
    actualDelivery: null,
    orderEvents: [
      { date: '2024-02-20 14:30', status: 'Order Placed', description: 'Your order has been received' },
      { date: '2024-02-20 14:35', status: 'Payment Confirmed', description: 'Payment has been processed successfully' },
      { date: '2024-02-21 09:15', status: 'Processing', description: 'Your order is being prepared' },
      { date: '2024-02-22 13:45', status: 'Shipped', description: 'Your order has been shipped' }
    ]
  },
  {
    id: 'ORD-2024-1268',
    date: '2024-03-05',
    status: 'Processing',
    total: 44.97,
    subtotal: 42.97,
    shipping: 0.00,
    tax: 2.00,
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
    billingAddress: {
      name: 'John Doe',
      street: '123 Main Street',
      city: 'Amsterdam',
      zipCode: '1012 AB',
      country: 'Netherlands',
    },
    paymentMethod: 'Credit Card (•••• 4321)',
    trackingNumber: null,
    carrier: null,
    estimatedDelivery: '2024-03-10',
    actualDelivery: null,
    orderEvents: [
      { date: '2024-03-05 16:42', status: 'Order Placed', description: 'Your order has been received' },
      { date: '2024-03-05 16:45', status: 'Payment Confirmed', description: 'Payment has been processed successfully' },
      { date: '2024-03-06 09:30', status: 'Processing', description: 'Your order is being prepared' }
    ]
  }
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const order = orders.find(o => o.id === params.id);
  
  if (!order) {
    return {
      title: 'Order Not Found | ApotheCare',
    };
  }
  
  return {
    title: `Order ${order.id} | ApotheCare`,
    description: `Details for your order placed on ${order.date}`,
  };
}

export default function OrderDetailPage({ params }: Props) {
  const order = orders.find(o => o.id === params.id);
  
  if (!order) {
    notFound();
  }
  
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
        <div className="mb-6">
          <Link href="/orders" className="text-primary hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order {order.id}</h1>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
              order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-red-100 text-red-800'
            }`}>
              {order.status}
            </span>
          </div>
          
          {/* Order items */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Items in Your Order</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="h-24 w-24 bg-gray-200 rounded-md flex-shrink-0"></div>
                  <div className="ml-4 flex-grow">
                    <Link href={`/products/${item.id}`} className="font-semibold text-gray-800 hover:text-primary transition">
                      {item.name}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        item.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Price:</div>
                    <div className="font-medium">€{item.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-500 mt-2">Subtotal:</div>
                    <div className="font-medium">€{(item.quantity * item.price).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-end">
              <div className="w-full md:w-64">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">€{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">€{order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">€{order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-lg font-semibold text-primary">€{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Tracking */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Order Tracking</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <div className="relative">
                <div className="absolute left-0 inset-y-0 w-0.5 bg-gray-200 ml-4"></div>
                <ul className="space-y-8">
                  {order.orderEvents.map((event, index) => (
                    <li key={index} className="relative">
                      <div className="flex items-start">
                        <div className={`absolute left-0 mt-1.5 rounded-full h-8 w-8 flex items-center justify-center ${
                          event.status === order.status ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {event.status === 'Order Placed' && (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          )}
                          {event.status === 'Payment Confirmed' && (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {event.status === 'Processing' && (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                          {event.status === 'Shipped' && (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                          )}
                          {event.status === 'Delivered' && (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-12">
                          <h3 className={`text-base font-semibold ${event.status === order.status ? 'text-primary' : 'text-gray-700'}`}>{event.status}</h3>
                          <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{event.date}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {order.trackingNumber && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-800 mb-3">Tracking Information</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div>
                      <div className="text-sm text-gray-500">Carrier:</div>
                      <div>{order.carrier}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tracking Number:</div>
                      <div>{order.trackingNumber}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Estimated Delivery:</div>
                      <div>{order.estimatedDelivery}</div>
                    </div>
                    {order.actualDelivery && (
                      <div>
                        <div className="text-sm text-gray-500">Actual Delivery:</div>
                        <div>{order.actualDelivery}</div>
                      </div>
                    )}
                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition text-sm mt-2 sm:mt-0">
                      Track Package
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Shipping and Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
            </div>
            <div className="p-6">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 mb-2">Payment Method</h3>
                <p>{order.paymentMethod}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Billing Address</h3>
                <p>{order.billingAddress.name}</p>
                <p>{order.billingAddress.street}</p>
                <p>{order.billingAddress.city}, {order.billingAddress.zipCode}</p>
                <p>{order.billingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
            Download Invoice
          </button>
          {order.status === 'Delivered' && (
            <button className="border border-primary text-primary px-4 py-2 rounded-md hover:bg-primary hover:text-white transition">
              Return or Exchange
            </button>
          )}
          <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 transition">
            Contact Support
          </button>
          {order.status === 'Delivered' && (
            <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-50 transition">
              Buy Again
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
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