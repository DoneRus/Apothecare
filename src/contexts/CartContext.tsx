'use client';

import React, { createContext, useState, useContext } from 'react';
import { Product } from '../data/products';

type CartItem = {
  id: number;  // Cart item ID
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (cartItemId: number) => void;
  updateQuantity: (cartItemId: number, quantity: number) => void;
  clearCart: () => void;
  loading: boolean;
  error: string | null;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Mock implementation for development
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add item to cart
  const addItem = (product: Product, quantity: number) => {
    setLoading(true);
    try {
      const existingItemIndex = items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
        setItems(updatedItems);
      } else {
        // Add new item
        const newItem: CartItem = {
          id: Date.now(), // Use timestamp as temporary ID
          product,
          quantity
        };
        setItems([...items, newItem]);
      }
    } catch (err: any) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = (cartItemId: number) => {
    setLoading(true);
    try {
      setItems(items.filter(item => item.id !== cartItemId));
    } catch (err: any) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = (cartItemId: number, quantity: number) => {
    setLoading(true);
    try {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        removeItem(cartItemId);
        return;
      }
      
      const updatedItems = items.map(item => 
        item.id === cartItemId ? { ...item, quantity } : item
      );
      setItems(updatedItems);
    } catch (err: any) {
      console.error('Error updating cart item:', err);
      setError('Failed to update cart item');
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = () => {
    setLoading(true);
    try {
      setItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Calculate derived values
  const totalPrice = items.reduce((total, item) => {
    const price = item.product.sale_price || item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      loading,
      error,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalPrice,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 