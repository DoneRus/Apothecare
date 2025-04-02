'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import { AddToCartAnimation } from './AddToCartAnimation';

type ExpandableProductsSectionProps = {
  featuredProducts: Product[];
  allProducts: Product[];
};

type AnimationItem = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
};

export function ExpandableProductsSection({ featuredProducts, allProducts }: ExpandableProductsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addItem } = useCart();
  const [animations, setAnimations] = useState<AnimationItem[]>([]);
  const cartButtonRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get cart button position
    const cartButton = document.querySelector('.header-cart-button');
    if (!cartButton) return;
    
    const cartRect = cartButton.getBoundingClientRect();
    const buttonRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    // Create animation with start and end coordinates
    const newAnimation: AnimationItem = {
      id: Date.now(),
      startX: buttonRect.left + buttonRect.width / 2,
      startY: buttonRect.top + buttonRect.height / 2,
      endX: cartRect.left + cartRect.width / 2,
      endY: cartRect.top + cartRect.height / 2,
      color: product.propertyColor
    };
    
    setAnimations(prev => [...prev, newAnimation]);
    
    // Add item to cart
    addItem(product);
  };

  const removeAnimation = (id: number) => {
    setAnimations(prev => prev.filter(anim => anim.id !== id));
  };

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'from' | 'to' | 'border') => {
    // Handle special case for primary colors
    if (color.startsWith('primary')) {
      if (color === 'primary') {
        return `${type}-primary`;
      }
      return `${type}-primary-${color.split('-')[1]}`;
    }
    
    // For standard Tailwind colors
    return `${type}-${color}-${type === 'text' || type === 'border' ? '600' : type === 'from' ? '100' : type === 'to' ? '50' : '500'}`;
  };

  const renderProduct = (product: Product) => (
    <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group">
      <div className="relative">
        <div className={`h-48 bg-gradient-to-br ${getColorClasses(product.propertyColor, 'from')} ${getColorClasses(product.propertyColor, 'to')} flex items-center justify-center`}>
          {/* Use a different icon based on product category */}
          {product.category === "Vitamins" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-24 h-24 ${getColorClasses(product.propertyColor, 'text')}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          )}
          {product.category === "Supplements" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-24 h-24 ${getColorClasses(product.propertyColor, 'text')}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {product.category === "Digestive" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-24 h-24 ${getColorClasses(product.propertyColor, 'text')}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
          {product.category === "Sleep Aid" && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-24 h-24 ${getColorClasses(product.propertyColor, 'text')}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
          {!["Vitamins", "Supplements", "Digestive", "Sleep Aid"].includes(product.category) && (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={`w-24 h-24 ${getColorClasses(product.propertyColor, 'text')}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          )}
        </div>
        {product.discount && (
          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold py-1 px-2 rounded">
            {product.discount}
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
            NEW
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={i < product.rating ? 'currentColor' : 'none'}
              stroke={i >= product.rating ? 'currentColor' : 'none'}
              strokeWidth={1.5}
              className="w-4 h-4 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{product.name}</h3>
          <span className={`text-sm ${getColorClasses(product.categoryColor, 'text')} font-medium px-2 py-1 ${product.categoryColor === 'primary' ? 'bg-primary/10' : `bg-${product.categoryColor}-50`} rounded`}>
            {product.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>
        <div className="mt-3 text-sm text-gray-500">
          {product.properties.map((prop, index) => (
            <div key={index} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-4 h-4 mr-1 ${getColorClasses(product.propertyColor, 'text')}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {prop}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            {product.salePrice ? (
              <>
                <span className="text-gray-400 line-through text-sm">€{product.price.toFixed(2)}</span>
                <span className="text-primary font-bold ml-2">€{product.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-primary font-bold">€{product.price.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={(e) => handleAddToCart(product, e)} 
            className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Render all active animations */}
      {animations.map(anim => (
        <AddToCartAnimation
          key={anim.id}
          startX={anim.startX}
          startY={anim.startY}
          endX={anim.endX}
          endY={anim.endY}
          color={anim.color}
          onComplete={() => removeAnimation(anim.id)}
        />
      ))}
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Featured <span className="text-primary">Products</span></h2>
            <p className="text-gray-600 mt-2">Premium healthcare products curated for your needs</p>
          </div>
          <button 
            onClick={toggleExpand} 
            className="text-primary font-medium flex items-center hover:text-primary-dark transition"
          >
            {isExpanded ? 'Show Less' : 'View All Products'}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className={`w-4 h-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(renderProduct)}
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">More <span className="text-primary">Products</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allProducts.map(renderProduct)}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 