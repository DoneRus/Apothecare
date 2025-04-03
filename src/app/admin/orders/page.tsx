'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';

type OrderStatus = 'Completed' | 'Processing' | 'Pending' | 'Cancelled' | 'Refunded' | 'All';
type PaymentMethod = 'Credit Card' | 'PayPal' | 'Bank Transfer' | 'Cash on Delivery' | 'All';

type OrderStatusDisplay = Exclude<OrderStatus, 'All'>;
type PaymentMethodDisplay = Exclude<PaymentMethod, 'All'>;

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: OrderStatusDisplay;
  paymentMethod: PaymentMethodDisplay;
  items: number;
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('All');
  const [paymentFilter, setPaymentFilter] = useState<PaymentMethod>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [viewingOrderDetails, setViewingOrderDetails] = useState<Order | null>(null);

  // Filter orders based on search query and filters
  const filteredOrders = orders.filter((order) => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    // Payment method filter
    const matchesPayment = paymentFilter === 'All' || order.paymentMethod === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // View order details
  const handleViewOrder = (order: Order) => {
    setViewingOrderDetails(order);
  };

  // Download order invoice
  const handleDownloadInvoice = (orderId: string) => {
    alert(`Downloading invoice for order #${orderId}`);
  };

  return (
    <AdminLayout
      title="Orders"
      subtitle="Manage customer orders"
    >
      {/* Order Details Modal */}
      {viewingOrderDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Order #{viewingOrderDetails.id}</h3>
              <button onClick={() => setViewingOrderDetails(null)} className="text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{viewingOrderDetails.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium">{viewingOrderDetails.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">${viewingOrderDetails.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">{viewingOrderDetails.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  statusColors[viewingOrderDetails.status]
                }`}>
                  {viewingOrderDetails.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Items</p>
                <p className="font-medium">{viewingOrderDetails.items}</p>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">This is a placeholder for order items.</p>
                <p className="text-sm text-gray-500">In a real application, this would show a list of items in the order.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button 
                onClick={() => handleDownloadInvoice(viewingOrderDetails.id)}
                className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
              >
                Download Invoice
              </button>
              <button 
                onClick={() => setViewingOrderDetails(null)}
                className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-dark"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              />
              <div className="absolute left-3 top-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <select 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
          
          <div>
            <select 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as PaymentMethod)}
            >
              <option value="All">All Payment Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {filteredOrders.length > 0 ? indexOfFirstOrder + 1 : 0} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => alert('Exporting orders...')}
              className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50"
            >
              Export
            </button>
            <button 
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('All');
                setPaymentFilter('All');
              }}
              className="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-dark"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.date}
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
                    {order.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-500 hover:text-blue-700"
                        title="View Order"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="text-gray-500 hover:text-gray-700"
                        title="Download Invoice"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredOrders.length > 0 ? (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredOrders.length > 0 ? indexOfFirstOrder + 1 : 0}</span> to <span className="font-medium">{Math.min(indexOfLastOrder, filteredOrders.length)}</span> of{' '}
                  <span className="font-medium">{filteredOrders.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Generate page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                    // Logic to show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = idx + 1;
                    } else if (currentPage <= 3) {
                      pageNum = idx + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + idx;
                    } else {
                      pageNum = currentPage - 2 + idx;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border ${
                          currentPage === pageNum
                            ? 'border-primary bg-primary text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        } text-sm font-medium`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages || totalPages === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            No orders found matching your filters.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

// Sample data
const orders: Order[] = [
  { id: '12345', customer: 'Sarah Johnson', date: 'May 25, 2023', amount: '89.99', status: 'Completed', paymentMethod: 'Credit Card', items: 3 },
  { id: '12346', customer: 'Michael Brown', date: 'May 24, 2023', amount: '142.50', status: 'Processing', paymentMethod: 'PayPal', items: 5 },
  { id: '12347', customer: 'Emily Davis', date: 'May 24, 2023', amount: '74.25', status: 'Pending', paymentMethod: 'Bank Transfer', items: 2 },
  { id: '12348', customer: 'Robert Wilson', date: 'May 23, 2023', amount: '215.00', status: 'Completed', paymentMethod: 'Credit Card', items: 7 },
  { id: '12349', customer: 'Jennifer Lee', date: 'May 23, 2023', amount: '56.75', status: 'Cancelled', paymentMethod: 'Credit Card', items: 2 },
  { id: '12350', customer: 'James Martinez', date: 'May 22, 2023', amount: '128.30', status: 'Completed', paymentMethod: 'PayPal', items: 4 },
  { id: '12351', customer: 'Patricia Thompson', date: 'May 22, 2023', amount: '67.40', status: 'Refunded', paymentMethod: 'Credit Card', items: 1 },
  { id: '12352', customer: 'William Garcia', date: 'May 21, 2023', amount: '93.85', status: 'Processing', paymentMethod: 'Cash on Delivery', items: 3 },
  { id: '12353', customer: 'Elizabeth Rodriguez', date: 'May 21, 2023', amount: '157.20', status: 'Completed', paymentMethod: 'Credit Card', items: 6 },
  { id: '12354', customer: 'Richard Anderson', date: 'May 20, 2023', amount: '42.99', status: 'Pending', paymentMethod: 'Bank Transfer', items: 1 },
];

const statusColors: Record<OrderStatusDisplay, string> = {
  'Completed': 'bg-green-100 text-green-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-red-100 text-red-800',
  'Refunded': 'bg-purple-100 text-purple-800'
}; 