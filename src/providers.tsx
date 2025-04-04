'use client';

import React from 'react';
import { CartProvider } from './contexts/CartContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { ChatbotProvider } from './contexts/ChatbotContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      <NotificationProvider>
        <ChatbotProvider>
          {children}
        </ChatbotProvider>
      </NotificationProvider>
    </CartProvider>
  );
} 