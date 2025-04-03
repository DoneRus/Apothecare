'use client';

import Image from 'next/image';
import { ReactNode } from 'react';
import Link from 'next/link';

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="w-full md:w-1/2 bg-primary flex flex-col justify-center items-center p-8 text-white">
        <div className="max-w-md text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start mb-8">
            <span className="text-3xl font-bold">ApotheCare</span>
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">Your Health, Our Priority</h1>
          <p className="text-xl opacity-80 mb-8">
            Welcome to ApotheCare, your trusted online pharmacy for all your healthcare needs.
          </p>
          
          <div className="flex justify-center md:justify-start space-x-4">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm">Secure Ordering</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm">Fast Delivery</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm">Expert Support</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth Form */}
      <div className="w-full md:w-1/2 bg-gray-50 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
} 