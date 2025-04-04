'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddToCartAnimation } from './AddToCartAnimation';
import { useCart } from '../../contexts/CartContext';
import { productsAPI } from '../../services/api';
import { Product } from '../../data/products';

type ExpandableProductsSectionProps = {
  featuredProducts?: Product[];
  allProducts?: Product[];
};

export function ExpandableProductsSection({ 
  featuredProducts: initialFeaturedProducts, 
  allProducts: initialAllProducts 
}: ExpandableProductsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatingProduct, setAnimatingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(initialFeaturedProducts || []);
  const [allProducts, setAllProducts] = useState<Product[]>(initialAllProducts || []);
  const [loadingProducts, setLoadingProducts] = useState<Record<number, boolean>>({});
  
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [featured, all] = await Promise.all([
          productsAPI.getFeatured(),
          productsAPI.getAll()
        ]);
        
        setFeaturedProducts(featured);
        setAllProducts(all);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
        
        // Fallback to initial products if available
        if (initialFeaturedProducts?.length) setFeaturedProducts(initialFeaturedProducts);
        if (initialAllProducts?.length) setAllProducts(initialAllProducts);
      }
    };

    // Always fetch products to ensure latest data from the database
    fetchProducts();
  }, [initialFeaturedProducts, initialAllProducts]);
  
  // Function to handle adding product to cart
  const handleAddToCart = async (product: Product) => {
    try {
      // Set loading state for this specific product
      setLoadingProducts(prev => ({ ...prev, [product.id]: true }));
      
      setAnimatingProduct(product);
      await addItem(product, 1);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // You might want to show an error toast here
    } finally {
      // Clear loading state for this specific product
      setTimeout(() => {
        setLoadingProducts(prev => ({ ...prev, [product.id]: false }));
      }, 500); // Small delay to ensure animation completes
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getColorClasses = (product: Product) => {
    const isOnSale = !!product.sale_price;
    
    return {
      bgClass: isOnSale ? 'bg-red-50' : 'bg-gray-50',
      textClass: isOnSale ? 'text-red-600' : 'text-gray-900',
      buttonClass: 'bg-[#10B981] text-white',
      hoverClass: 'hover:bg-[#059669]'
    };
  };

  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'vitamins':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
        );
      case 'supplements':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
          </svg>
        );
      case 'digestive':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
          </svg>
        );
      case 'sleep aid':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured <span className="text-primary">Products</span></h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              High-quality health supplements formulated with premium ingredients.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="bg-gray-100 rounded-xl p-6 h-80">
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-24 bg-gray-200 rounded mb-6"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || (!featuredProducts.length && !allProducts.length)) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured <span className="text-primary">Products</span></h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              High-quality health supplements formulated with premium ingredients.
            </p>
          </div>
          <div className="text-center py-10">
            <p className="text-gray-500">
              {error || "No products available at the moment."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Determine products to display based on expanded state
  const displayProducts = isExpanded
    ? [...featuredProducts, ...allProducts.filter(p => !featuredProducts.some(fp => fp.id === p.id))]
    : featuredProducts;

  return (
    <div className="relative">
      {/* Add to cart animation */}
      {animatingProduct && (
        <AddToCartAnimation 
          product={animatingProduct} 
          onComplete={() => setAnimatingProduct(null)}
        />
      )}
      
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured <span className="text-primary">Products</span></h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              High-quality health supplements formulated with premium ingredients.
            </p>
          </div>
          
          <AnimatePresence initial={false}>
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {displayProducts.map(product => {
                const { bgClass, textClass, buttonClass, hoverClass } = getColorClasses(product);
                
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`${bgClass} rounded-xl shadow-md overflow-hidden flex flex-col`}
                  >
                    {/* Product Image */}
                    {product.image_url && (
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          <span className={`p-1.5 rounded-full ${textClass} bg-white/80`}>
                            {getCategoryIcon(product.category)}
                          </span>
                          <span className="text-sm font-medium text-gray-600">
                            {product.category}
                          </span>
                        </div>
                        
                        {/* New label */}
                        {product.is_new && (
                          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">{product.description}</p>
                      
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            {product.sale_price ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-800">${product.sale_price.toFixed(2)}</span>
                                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-gray-800">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                        
                        <button 
                          disabled={loadingProducts[product.id]}
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2 rounded-lg ${buttonClass} ${hoverClass} transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed w-full`}
                        >
                          {loadingProducts[product.id] ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                              </svg>
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          
          {/* Expand/Collapse Button - only show if we have additional products */}
          {allProducts.length > 6 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={toggleExpanded}
                className="flex items-center space-x-2 px-5 py-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 text-gray-700 font-medium"
              >
                <span>{isExpanded ? 'Show Less' : 'Show More Products'}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 