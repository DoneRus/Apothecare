import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Profile | ApotheCare',
  description: 'Your ApotheCare profile and account settings',
};

export default function ProfilePage() {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-primary/5 p-6 flex flex-col md:flex-row gap-6 items-center md:items-start border-b">
            <div className="h-32 w-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
              <p className="text-gray-500 text-sm mt-1">Member since January 2024</p>
              <button className="mt-3 text-primary text-sm hover:underline">Change Profile Picture</button>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button className="px-6 py-4 text-primary font-medium border-b-2 border-primary">Personal Information</button>
              <button className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700">Address Book</button>
              <button className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700">Health Information</button>
              <button className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700">Payment Methods</button>
              <button className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700">Security</button>
              <button className="px-6 py-4 text-gray-500 font-medium hover:text-gray-700">Preferences</button>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value="John"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value="Doe"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value="john.doe@example.com"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value="+31 6 12345678"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value="January 15, 1985"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value="Male"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="email-notifications" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" checked readOnly />
                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-700">Email notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sms-notifications" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" checked readOnly />
                    <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-700">SMS notifications</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="marketing-emails" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" checked readOnly />
                    <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-700">Marketing emails</label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end space-x-3">
                <button type="button" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition">
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Activity/Recent Orders Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-800">Recent Orders</h3>
              <p className="text-gray-500 text-sm mt-1">Your most recent orders</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium">Order #ORD-2024-1268</p>
                    <p className="text-sm text-gray-500">Placed on March 5, 2024</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Processing
                  </span>
                  <Link href="/orders/ORD-2024-1268" className="text-primary hover:underline text-sm">
                    View Order
                  </Link>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <p className="font-medium">Order #ORD-2024-1144</p>
                    <p className="text-sm text-gray-500">Placed on February 20, 2024</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Shipped
                  </span>
                  <Link href="/orders/ORD-2024-1144" className="text-primary hover:underline text-sm">
                    View Order
                  </Link>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Order #ORD-2024-1001</p>
                    <p className="text-sm text-gray-500">Placed on January 15, 2024</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Delivered
                  </span>
                  <Link href="/orders/ORD-2024-1001" className="text-primary hover:underline text-sm">
                    View Order
                  </Link>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Link href="/orders" className="text-primary hover:underline">
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
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