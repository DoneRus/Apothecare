'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, loading, error } = useCart();

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#10B981] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            variants={itemVariants}
            className="text-center py-16 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto backdrop-blur-sm bg-white/80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-red-500 mx-auto mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Error Loading Cart</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button variant="primary">
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            variants={itemVariants}
            className="text-center py-16 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto backdrop-blur-sm bg-white/80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-gray-400 mx-auto mb-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some items to your cart to get started!</p>
            <Button variant="primary">
              <Link href="/dashboard">Browse Products</Link>
            </Button>
          </motion.div>
          </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 backdrop-blur-sm bg-white/80"
        >
          <div className="flex justify-between items-center mb-8 border-b pb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
              <p className="text-gray-500">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <Button 
              variant="ghost" 
              onClick={clearCart} 
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              Clear Cart
            </Button>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="flex items-center justify-between border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-6">
                  {item.product.image_url ? (
                    <div className="relative w-24 h-24">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-1">{item.product.description}</p>
                    <p className="text-[#10B981] font-medium">
                      €{((item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}
                    </p>
                    </div>
                  </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      onClick={() => item.id && updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="text-gray-600 hover:text-[#10B981] hover:bg-gray-100 p-2 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                        </svg>
                    </Button>
                    <span className="w-12 text-center font-medium text-gray-700">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      onClick={() => item.id && updateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-600 hover:text-[#10B981] hover:bg-gray-100 p-2 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                    </div>

                  <Button
                    variant="ghost"
                    onClick={() => item.id && removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={itemVariants}
            className="mt-8 border-t pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-gray-600 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-gray-800">€{totalPrice.toFixed(2)}</p>
            </div>
              <div className="flex items-center gap-4">
                <Button variant="secondary" className="w-full md:w-auto">
                  <Link href="/dashboard">Continue Shopping</Link>
                </Button>
                <Button variant="primary" size="lg" className="w-full md:w-auto">
                  <Link href="/checkout" className="flex items-center">
                    Proceed to Checkout
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </Button>
            </div>
            </div>
          </motion.div>
        </motion.div>
            </div>
    </motion.div>
  );
} 