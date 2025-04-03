'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';

export function HeaderCartButton() {
  const { itemCount } = useCart();
  const [bump, setBump] = useState(false);
  
  // Add animation effect when item count changes
  useEffect(() => {
    if (itemCount === 0) return;
    setBump(true);
    
    const timer = setTimeout(() => {
      setBump(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    };
  }, [itemCount]);
  
  return (
    <Link href="/cart">
      <div className="relative header-cart-button">
        <div className={`transition-transform duration-300 ${bump ? 'scale-110' : 'scale-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600 hover:text-primary cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount <= 99 ? itemCount : '99+'}
          </span>
        )}
      </div>
    </Link>
  );
} 