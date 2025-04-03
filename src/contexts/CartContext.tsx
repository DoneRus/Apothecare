'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../data/products';
import { cartAPI } from '../services/api';

type CartItem = {
  id?: number;  // Cart item ID from backend
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  itemCount: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate derived values
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const cartItems = await cartAPI.getItems();
        
        // Transform API response to match our CartItem structure
        const transformedItems = cartItems.map((item: any) => ({
          id: item.id,
          product: {
            id: item.product_id,
            name: item.name,
            category: item.category,
            description: item.description,
            price: parseFloat(item.price),
            rating: parseFloat(item.rating),
            reviews: item.reviews,
            properties: item.properties ? JSON.parse(item.properties) : {},
            is_new: Boolean(item.is_new),
          },
          quantity: item.quantity
        }));
        
        setItems(transformedItems);
      } catch (err: any) {
        console.error('Error fetching cart:', err);
        setError('Failed to load cart items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Add item to cart
  const addItem = async (product: Product, quantity: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await cartAPI.addItem(product.id, quantity);
      
      // Refetch cart after adding item
      const cartItems = await cartAPI.getItems();
      
      // Transform API response
      const transformedItems = cartItems.map((item: any) => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.name,
          category: item.category,
          description: item.description,
          price: parseFloat(item.price),
          rating: parseFloat(item.rating),
          reviews: item.reviews,
          properties: item.properties ? JSON.parse(item.properties) : {},
          is_new: Boolean(item.is_new),
        },
        quantity: item.quantity
      }));
      
      setItems(transformedItems);
    } catch (err: any) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await cartAPI.removeItem(cartItemId);
      setItems(items.filter(item => item.id !== cartItemId));
    } catch (err: any) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart');
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    // Find the item
    const item = items.find(item => item.id === cartItemId);
    if (!item) return;
    
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      await removeItem(cartItemId);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Remove and re-add with new quantity (since our API doesn't have a direct update endpoint)
      await cartAPI.removeItem(cartItemId);
      await cartAPI.addItem(item.product.id, quantity);
      
      // Refetch cart after update
      const cartItems = await cartAPI.getItems();
      
      // Transform API response
      const transformedItems = cartItems.map((item: any) => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.name,
          category: item.category,
          description: item.description,
          price: parseFloat(item.price),
          rating: parseFloat(item.rating),
          reviews: item.reviews,
          properties: item.properties ? JSON.parse(item.properties) : {},
          is_new: Boolean(item.is_new),
        },
        quantity: item.quantity
      }));
      
      setItems(transformedItems);
    } catch (err: any) {
      console.error('Error updating cart item:', err);
      setError('Failed to update cart item');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await cartAPI.clearCart();
      setItems([]);
    } catch (err: any) {
      console.error('Error clearing cart:', err);
      setError('Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isLoading,
        error,
        itemCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 