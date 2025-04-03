'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../data/products';

interface AddToCartAnimationProps {
  product: Product;
  onComplete?: () => void;
}

export function AddToCartAnimation({ product, onComplete }: AddToCartAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 2000); // Show for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-50 flex items-center space-x-3 min-w-[300px]"
      >
        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {product.image_url && (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-grow">
          <p className="font-medium text-gray-900 truncate">{product.name}</p>
          <p className="text-sm text-gray-500">Added to cart</p>
        </div>
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 