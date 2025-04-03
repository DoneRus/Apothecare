'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';

export default function AdminDashboard() {
  // State for interactive elements
  const [dateRange, setDateRange] = useState('today');

  // This would be fetched from an API in a real application
  const salesData = {
    today: { orders: '1,284', revenue: '$42,389', products: '584', customers: '3,942' },
    week: { orders: '5,367', revenue: '$168,945', products: '612', customers: '4,281' },
    month: { orders: '18,902', revenue: '$531,478', products: '643', customers: '5,164' },
    year: { orders: '156,729', revenue: '$4,218,397', products: '721', customers: '8,376' }
  };

  const data = salesData[dateRange as keyof typeof salesData];

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Welcome to the ApotheCare admin panel"
    >
      {/* Date Range Selector */}
      <div className="mb-6 flex justify-end">
        <div className="inline-flex bg-white rounded-md shadow-sm">
          <button 
            onClick={() => setDateRange('today')} 
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'today' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'} rounded-l-md`}
          >
            Today
          </button>
          <button 
            onClick={() => setDateRange('week')} 
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'week' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'} border-l border-gray-200`}
          >
            This Week
          </button>
          <button 
            onClick={() => setDateRange('month')} 
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'month' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'} border-l border-gray-200`}
          >
            This Month
          </button>
          <button 
            onClick={() => setDateRange('year')} 
            className={`px-4 py-2 text-sm font-medium ${dateRange === 'year' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-50'} border-l border-gray-200 rounded-r-md`}
          >
            This Year
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Orders" 
          value={data.orders} 
          change="+12.5%" 
          trend="up" 
          icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
        <StatCard 
          title="Revenue" 
          value={data.revenue} 
          change="+8.2%" 
          trend="up" 
          icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <StatCard 
          title="Products" 
          value={data.products} 
          change="+3.1%" 
          trend="up" 
          icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
        <StatCard 
          title="Customers" 
          value={data.customers} 
          change="+5.4%" 
          trend="up" 
          icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Recent Orders</h3>
            <button 
              onClick={() => window.location.href = '/admin/orders'} 
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => alert(`View details for order #${order.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        statusColors[order.status]
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Customer Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
          </div>
          
          <div className="p-6">
            <div className="flow-root">
              <ul className="-mb-8">
                {activities.map((activity, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== activities.length - 1 ? (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            activityTypeColors[activity.type]
                          }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activityIcons[activity.type]} />
                            </svg>
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 pt-1.5">
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            {' '}{activity.action}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

// Components and sample data
type StatusType = 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
type ActivityType = 'purchase' | 'cancel' | 'account' | 'cart';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`flex items-center mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
              trend === 'up' 
                ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                : 'M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6'
            } />
          </svg>
          {change}
        </div>
      </div>
    </div>
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

const statusColors: Record<StatusType, string> = {
  'Completed': 'bg-green-100 text-green-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-red-100 text-red-800',
};

const activities = [
  { user: 'Jennifer Lee', action: 'cancelled order #12349', time: '2 hours ago', type: 'cancel' as ActivityType },
  { user: 'Robert Wilson', action: 'completed checkout for $215.00', time: '5 hours ago', type: 'purchase' as ActivityType },
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