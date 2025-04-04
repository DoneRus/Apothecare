'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../data/products';
import { cartAPI } from '../services/api';

type CartItem = {
  id?: number;  // Cart item ID from backend
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  error: string | null;
  itemCount: number;
  totalPrice: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(true);
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
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Add item to cart
  const addItem = async (product: Product, quantity: number) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (cartItemId: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await cartAPI.removeItem(cartItemId);
      setItems(items.filter(item => item.id !== cartItemId));
    } catch (err: any) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
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
    
    setLoading(true);
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
      setLoading(false);
    }
  };

  // Clear cart
  const clearCart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await cartAPI.clearCart();
      setItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

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