'use client';

import React, { useEffect, useState } from 'react';
import { productsAPI, cartAPI } from '@/services/api';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  sale_price?: number;
  rating: number;
  reviews: number;
  properties: Record<string, any>;
  is_new: boolean;
  is_featured: boolean;
  image_url?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [salesData, setSalesData] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Load products
      const productsData = await productsAPI.getAll();
      setProducts(productsData);

      // Try to load cart items
      try {
        const cartData = await cartAPI.getItems();
        setCartItems(cartData);
      } catch (err) {
        console.error('Error loading cart items:', err);
      }

      // Generate sample sales data for the charts
      generateSampleData();
      
      setError(null);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleData = () => {
    // Sample sales data for charts
    const salesData = {
      revenue: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Revenue',
            data: [12500, 14000, 15500, 14800, 16200, 18500, 17800, 19200, 20100, 21500, 22800, 24500],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      },
      categorySales: {
        labels: ['Vitamins', 'Supplements', 'Skincare', 'Medications', 'Health Foods'],
        datasets: [
          {
            label: 'Sales by Category',
            data: [9500, 7800, 6500, 12300, 4900],
            backgroundColor: [
              'rgba(16, 185, 129, 0.7)',  // Primary green
              'rgba(14, 165, 115, 0.7)',  // Slightly darker
              'rgba(12, 145, 100, 0.7)',  // Even darker
              'rgba(10, 125, 85, 0.7)',   // Very dark
              'rgba(8, 105, 70, 0.7)',    // Darkest
            ],
            borderWidth: 0,
          },
        ],
      },
      customerActivity: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [
          {
            label: 'New Customers',
            data: [35, 42, 38, 45],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            barPercentage: 0.6,
          },
          {
            label: 'Returning Customers',
            data: [65, 59, 72, 68],
            backgroundColor: 'rgba(16, 185, 129, 0.7)',
            barPercentage: 0.6,
          },
        ],
      },
    };

    setSalesData(salesData);
  };

  // Calculate metrics for stat cards
  const getMetrics = () => {
    return {
      totalProducts: products.length,
      totalRevenue: '€24,500.00',
      avgOrderValue: '€85.75',
      conversionRate: '3.2%',
    };
  };

  const metrics = getMetrics();

  if (loading) {
    return (
      <AdminLayout
        title="Dashboard"
        subtitle="Loading dashboard data..."
      >
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout
        title="Dashboard"
        subtitle="Error loading dashboard"
      >
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={loadData}
                className="mt-2 text-sm font-medium text-red-700 hover:text-red-600 underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Welcome to the ApotheCare Admin Dashboard"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Products" 
          value={metrics.totalProducts.toString()}
          iconName="cube"
          bgColor="bg-green-500"
          change="+12% from last month"
          trend="up"
        />
        <StatCard 
          title="Total Revenue" 
          value={metrics.totalRevenue}
          iconName="currency-euro"
          bgColor="bg-blue-500"
          change="+8.1% from last month"
          trend="up"
        />
        <StatCard 
          title="Avg. Order Value" 
          value={metrics.avgOrderValue}
          iconName="shopping-cart"
          bgColor="bg-purple-500"
          change="+2.3% from last month"
          trend="up"
        />
        <StatCard 
          title="Conversion Rate" 
          value={metrics.conversionRate}
          iconName="chart-bar"
          bgColor="bg-amber-500"
          change="-0.5% from last month"
          trend="down"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend Chart - 2/3 width */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Revenue Trend</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-md">
                Year
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-md">
                Month
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm font-medium rounded-md">
                Week
              </button>
            </div>
          </div>
          {salesData && (
            <div className="w-full h-80">
              <Line 
                data={salesData.revenue}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: false,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                      ticks: {
                        callback: (value) => `€${value/1000}k`,
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Revenue: €${context.parsed.y.toLocaleString()}`,
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Sales by Category - 1/3 width */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Sales by Category</h3>
          {salesData && (
            <div className="w-full h-64 flex items-center justify-center">
              <Doughnut 
                data={salesData.categorySales}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 15,
                      },
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `€${context.parsed.toLocaleString()}`,
                      },
                    },
                  },
                  cutout: '65%',
                }}
              />
            </div>
          )}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Top Category</p>
              <p className="text-sm font-semibold text-gray-800">Medications</p>
              <p className="text-xs text-green-600">€12,300 sales</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-500">Growth</p>
              <p className="text-sm font-semibold text-gray-800">Vitamins</p>
              <p className="text-xs text-blue-600">+24% this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Customer Activity Chart - 1/3 width */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Customer Activity</h3>
          {salesData && (
            <div className="w-full h-64">
              <Bar 
                data={salesData.customerActivity}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                      },
                      stacked: true,
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                      stacked: true,
                    },
                  },
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 12,
                        padding: 15,
                      },
                    },
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Recent Orders - 2/3 width */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <Link 
              href="/admin/orders" 
              className="text-primary text-sm font-medium hover:text-primary-dark"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
                <tr>
                  <th scope="col" className="px-4 py-3">Order ID</th>
                  <th scope="col" className="px-4 py-3">Customer</th>
                  <th scope="col" className="px-4 py-3">Date</th>
                  <th scope="col" className="px-4 py-3">Amount</th>
                  <th scope="col" className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">#{order.id}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">{order.date}</td>
                    <td className="px-4 py-3">€{order.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Section - Quick Access & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Access */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionCard 
              title="Add Product" 
              icon="plus-circle"
              href="/admin/products"
              bgColor="bg-gradient-to-br from-green-500 to-green-600"
            />
            <QuickActionCard 
              title="Process Orders" 
              icon="shopping-bag"
              href="/admin/orders"
              bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
            />
            <QuickActionCard 
              title="Manage Users" 
              icon="users"
              href="/admin/customers"
              bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
            />
            <QuickActionCard 
              title="Reports" 
              icon="chart-pie"
              href="/admin/reports"
              bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
            />
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Inventory Alerts</h3>
          <div className="space-y-4">
            {inventoryAlerts.map((alert, index) => (
              <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-10 ${alert.level === 'critical' ? 'bg-red-500' : 'bg-amber-500'} rounded-full mr-4`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{alert.product}</p>
                  <p className="text-xs text-gray-500">{alert.message}</p>
                </div>
                <Link href="/admin/products" className="text-primary text-sm hover:text-primary-dark font-medium">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
          <div className="relative">
            {/* Activity timeline with connecting line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="flex">
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${activityTypeColors[activity.type]} shrink-0 z-10`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activityIcons[activity.type]} />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">
                      <span className="font-semibold">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Components
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  iconName: string;
  bgColor: string;
}

function StatCard({ title, value, change, trend, iconName, bgColor }: StatCardProps) {
  const icons = {
    'cube': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    'currency-euro': 'M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z',
    'shopping-cart': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    'chart-bar': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[iconName as keyof typeof icons]} />
          </svg>
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
              trend === 'up' 
                ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                : 'M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6'
            } />
          </svg>
          <span className="text-xs font-medium">{change}</span>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className="text-3xl font-bold text-gray-900 mt-2">{value}</div>
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  title: string;
  icon: string;
  href: string;
  bgColor: string;
}

function QuickActionCard({ title, icon, href, bgColor }: QuickActionCardProps) {
  const icons = {
    'plus-circle': 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
    'shopping-bag': 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    'chart-pie': 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z',
  };

  return (
    <Link href={href} className={`${bgColor} rounded-xl p-4 flex flex-col items-center justify-center text-white text-center transition-transform duration-300 hover:scale-105 shadow-md`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[icon as keyof typeof icons]} />
      </svg>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
}

// Sample data
const recentOrders = [
  { id: '12345', customer: 'Sarah Johnson', amount: '89.99', status: 'Completed' as StatusType, date: 'May 25, 2023' },
  { id: '12346', customer: 'Michael Brown', amount: '142.50', status: 'Processing' as StatusType, date: 'May 24, 2023' },
  { id: '12347', customer: 'Emily Davis', amount: '74.25', status: 'Pending' as StatusType, date: 'May 24, 2023' },
  { id: '12348', customer: 'Robert Wilson', amount: '215.00', status: 'Completed' as StatusType, date: 'May 23, 2023' },
  { id: '12349', customer: 'Jennifer Lee', amount: '56.75', status: 'Cancelled' as StatusType, date: 'May 23, 2023' },
];

const inventoryAlerts = [
  { product: 'Vitamin D3 Complex', message: 'Only 5 items left in stock', level: 'critical' },
  { product: 'Omega-3 Fish Oil', message: 'Only 12 items left in stock', level: 'warning' },
  { product: 'Zinc Supplements', message: 'Only 8 items left in stock', level: 'warning' },
];

type StatusType = 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
type ActivityType = 'purchase' | 'cancel' | 'account' | 'cart';

const statusColors: Record<StatusType, string> = {
  'Completed': 'bg-green-100 text-green-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-red-100 text-red-800',
};

const activities = [
  { user: 'Jennifer Lee', action: 'cancelled order #12349', time: '2 hours ago', type: 'cancel' as ActivityType },
  { user: 'Robert Wilson', action: 'completed checkout for €215.00', time: '5 hours ago', type: 'purchase' as ActivityType },
  { user: 'Emily Davis', action: 'created a new account', time: '1 day ago', type: 'account' as ActivityType },
  { user: 'Michael Brown', action: 'added 3 items to cart', time: '1 day ago', type: 'cart' as ActivityType },
];

const activityTypeColors: Record<ActivityType, string> = {
  'purchase': 'bg-green-500',
  'cancel': 'bg-red-500',
  'account': 'bg-blue-500',
  'cart': 'bg-yellow-500',
};

const activityIcons: Record<ActivityType, string> = {
  'purchase': 'M5 13l4 4L19 7',
  'cancel': 'M6 18L18 6M6 6l12 12',
  'account': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  'cart': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
}; 