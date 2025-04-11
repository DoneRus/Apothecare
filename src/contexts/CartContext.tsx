'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../data/products';
import { cartAPI } from '../services/api';

// Define the structure of cart item from API
interface CartItemApiResponse {
  id: number;
  product_id?: number;
  product: {
    id: number;
    name: string;
    category: string;
    description: string;
    price: string;
    sale_price?: string;
    rating: string;
    reviews: number;
    properties: string | null;
    is_new: number | boolean;
    is_featured: number | boolean;
    image_url?: string;
  };
  quantity: number;
}

type CartItem = {
  id: number;
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

  // Calculate derived values
  const totalPrice = items.reduce((total, item) => {
    const price = item.product.sale_price || item.product.price;
    return total + (price * item.quantity);
  }, 0);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const cartItems = await cartAPI.getItems();
        
        // Transform API response to match our CartItem structure
        const transformedItems = cartItems.map((item: CartItemApiResponse) => ({
          id: item.id,
          product: {
            id: item.product.id,
            name: item.product.name,
            category: item.product.category,
            description: item.product.description,
            price: parseFloat(item.product.price),
            sale_price: item.product.sale_price ? parseFloat(item.product.sale_price) : undefined,
            rating: parseFloat(item.product.rating),
            reviews: item.product.reviews,
            properties: typeof item.product.properties === 'string' 
              ? JSON.parse(item.product.properties) 
              : (item.product.properties || {}),
            is_new: Boolean(item.product.is_new),
            is_featured: Boolean(item.product.is_featured),
            image_url: item.product.image_url
          },
          quantity: item.quantity
        }));
        
        setItems(transformedItems);
      } catch (err: unknown) {
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
      const transformedItems = cartItems.map((item: CartItemApiResponse) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
          category: item.product.category,
          description: item.product.description,
          price: parseFloat(item.product.price),
          sale_price: item.product.sale_price ? parseFloat(item.product.sale_price) : undefined,
          rating: parseFloat(item.product.rating),
          reviews: item.product.reviews,
          properties: typeof item.product.properties === 'string' 
            ? JSON.parse(item.product.properties) 
            : (item.product.properties || {}),
          is_new: Boolean(item.product.is_new),
          is_featured: Boolean(item.product.is_featured),
          image_url: item.product.image_url
        },
        quantity: item.quantity
      }));
      
      setItems(transformedItems);
    } catch (err: unknown) {
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
    } catch (err: unknown) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await cartAPI.updateQuantity(cartItemId, quantity);
      
      // Refetch cart after update
      const cartItems = await cartAPI.getItems();
      
      // Transform API response
      const transformedItems = cartItems.map((item: CartItemApiResponse) => ({
        id: item.id,
        product: {
          id: item.product.id,
          name: item.product.name,
          category: item.product.category,
          description: item.product.description,
          price: parseFloat(item.product.price),
          sale_price: item.product.sale_price ? parseFloat(item.product.sale_price) : undefined,
          rating: parseFloat(item.product.rating),
          reviews: item.product.reviews,
          properties: typeof item.product.properties === 'string' 
            ? JSON.parse(item.product.properties) 
            : (item.product.properties || {}),
          is_new: Boolean(item.product.is_new),
          is_featured: Boolean(item.product.is_featured),
          image_url: item.product.image_url
        },
        quantity: item.quantity
      }));
      
      setItems(transformedItems);
    } catch (err: unknown) {
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
      // Call API to clear cart if available
      // await cartAPI.clearCart();
      setItems([]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

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