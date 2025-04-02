'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AddToCartAnimationProps = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  onComplete: () => void;
};

export function AddToCartAnimation({ 
  startX, 
  startY, 
  endX, 
  endY, 
  color, 
  onComplete 
}: AddToCartAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Calculate distance for trajectory
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  useEffect(() => {
    // Auto-remove component after animation completes
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 800); // Animation duration
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed z-50 w-6 h-6 rounded-full ${color === 'primary' ? 'bg-primary' : `bg-${color}-500`}`}
          style={{ left: startX, top: startY }}
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{
            x: deltaX,
            y: deltaY,
            scale: 0.2,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            duration: 0.8,
          }}
        />
      )}
    </AnimatePresence>
  );
} 