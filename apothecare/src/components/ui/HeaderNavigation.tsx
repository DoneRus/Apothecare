'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function HeaderNavigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['products', 'orders', 'profile'];
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    // Observe the home section (top of page)
    const homeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection('home');
        }
      });
    }, { threshold: 0.3 });
    
    if (document.querySelector('main')) {
      homeObserver.observe(document.querySelector('main')!);
    }
    
    // Observe the other sections
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });
    
    return () => {
      homeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  const getLinkClass = (section: string) => {
    return section === activeSection 
      ? "text-primary font-medium transition py-3" 
      : "text-gray-600 font-medium hover:text-primary transition py-3";
  };

  return (
    <nav className="hidden md:flex flex-1 justify-center">
      <ul className="flex space-x-8 items-center">
        <li><Link href="/dashboard" className={getLinkClass('home')}>Home</Link></li>
        <li><Link href="#products" className={getLinkClass('products')}>Products</Link></li>
        <li><Link href="#orders" className={getLinkClass('orders')}>Orders</Link></li>
        <li><Link href="#profile" className={getLinkClass('profile')}>Profile</Link></li>
      </ul>
    </nav>
  );
} 