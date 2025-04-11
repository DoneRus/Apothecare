'use client';

import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  discountPrice?: number;
  badge?: string;
  rating?: number;
  reviews?: number;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  discountPrice,
  badge,
  rating = 5,
  reviews = 0,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        {badge && (
          <div className="absolute top-4 right-4">
            <div className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
              {badge}
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-500">({reviews} reviews)</span>
        </div>
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-primary transition-colors duration-300">{name}</h3>
        <p className="text-gray-600 mb-4">Advanced formula with essential vitamins and minerals for optimal health support.</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
            {discountPrice && (
              <span className="text-sm text-gray-500 line-through">${discountPrice.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2"
          >
            Add to Cart
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 