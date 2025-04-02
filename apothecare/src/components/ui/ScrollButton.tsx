'use client';

import React from 'react';

interface ScrollButtonProps {
  targetId: string;
  className?: string;
  children: React.ReactNode;
}

export function ScrollButton({ targetId, className, children }: ScrollButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
} 