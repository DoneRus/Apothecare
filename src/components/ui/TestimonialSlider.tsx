'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
};

type TestimonialSliderProps = {
  testimonials: Testimonial[];
};

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Calculate width
  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  // Update width on window resize
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate items per view based on viewport width
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2; // md
      return 1; // sm
    }
    return 3; // Default for SSR
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (carouselRef.current) {
        const itemsPerView = getItemsPerView();
        const cardWidth = carouselRef.current.scrollWidth / testimonials.length;
        const newIndex = (currentIndex + 1) % (testimonials.length - itemsPerView + 1);
        
        setCurrentIndex(newIndex);
        controls.start({ 
          x: -cardWidth * newIndex,
          transition: { type: "spring", stiffness: 100, damping: 20 }
        });
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, controls, testimonials.length]);

  const handleDragStart = () => {
    setIsPaused(true);
  };

  const handleDragEnd = () => {
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Extra padding at the top to prevent cut-off */}
      <div className="pt-4"></div>
      
      <motion.div
        ref={carouselRef}
        className="cursor-grab overflow-visible"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex"
          animate={controls}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id} 
              className="min-w-[280px] md:min-w-[330px] lg:min-w-[400px] px-4"
            >
              <div className="bg-white rounded-xl shadow-md p-6 h-full relative">
                <div className="absolute -top-4 left-6 bg-primary text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                </div>
                
                <div className="flex items-center gap-1 mb-4 pt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-600 italic mb-6 line-clamp-4">"{testimonial.content}"</p>
                
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <div className="flex justify-center mt-8 text-sm text-gray-500 items-center">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
          {isPaused ? "Drag to explore more testimonials" : "Auto-scrolling, drag to pause"}
        </div>
      </div>
    </div>
  );
} 