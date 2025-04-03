'use client';

import React from 'react';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </CartProvider>
  );
} 