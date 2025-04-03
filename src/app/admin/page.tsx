'use client';

import React, { useEffect, useState } from 'react';
import { productsAPI } from '@/services/api';
import { ImageUploader } from '@/components/admin/ImageUploader';
import AdminLayout from '@/components/admin/AdminLayout';

interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    sale_price?: number;
    rating: number;
    reviews: number;
    properties: Record<string, any>;
    is_new: boolean;
    is_featured: boolean;
    image_url?: string;
}

export default function AdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await productsAPI.getAll();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUploadSuccess = (productId: number, imageUrl: string) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, image_url: imageUrl }
                    : product
            )
        );
    };

    const handleImageUploadError = (error: Error) => {
        setError(`Failed to upload image: ${error.message}`);
    };

    if (loading) {
        return <div className="p-4">Loading products...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <AdminLayout 
            title="Product Management" 
            subtitle="Welcome to the ApotheCare admin panel"
        >
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Product Management</h1>
                <div className="grid gap-6">
                    {products.map(product => (
                        <div key={product.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-semibold">{product.name}</h2>
                                    <p className="text-gray-600">{product.category}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">€{product.price.toFixed(2)}</p>
                                    {product.sale_price && (
                                        <p className="text-red-500">Sale: €{product.sale_price.toFixed(2)}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-700">{product.description}</p>
                                    <div className="mt-2">
                                        <span className="text-sm text-gray-600">
                                            Rating: {product.rating} ({product.reviews} reviews)
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    {product.image_url ? (
                                        <div className="relative aspect-square w-full">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-gray-100 aspect-square w-full rounded-lg flex items-center justify-center">
                                            <span className="text-gray-400">No image</span>
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <ImageUploader
                                            productId={product.id}
                                            onSuccess={(imageUrl) => handleImageUploadSuccess(product.id, imageUrl)}
                                            onError={handleImageUploadError}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

// Components and sample data
type StatusType = 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
type ActivityType = 'purchase' | 'cancel' | 'account' | 'cart';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className={`flex items-center mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
              trend === 'up' 
                ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                : 'M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6'
            } />
          </svg>
          {change}
        </div>
      </div>
    </div>
  );
}

// Sample data
const recentOrders = [
  { id: '12345', customer: 'Sarah Johnson', amount: '89.99', status: 'Completed' as StatusType, date: 'May 25, 2023' },
  { id: '12346', customer: 'Michael Brown', amount: '142.50', status: 'Processing' as StatusType, date: 'May 24, 2023' },
  { id: '12347', customer: 'Emily Davis', amount: '74.25', status: 'Pending' as StatusType, date: 'May 24, 2023' },
  { id: '12348', customer: 'Robert Wilson', amount: '215.00', status: 'Completed' as StatusType, date: 'May 23, 2023' },
  { id: '12349', customer: 'Jennifer Lee', amount: '56.75', status: 'Cancelled' as StatusType, date: 'May 23, 2023' },
];

const statusColors: Record<StatusType, string> = {
  'Completed': 'bg-green-100 text-green-800',
  'Processing': 'bg-blue-100 text-blue-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-red-100 text-red-800',
};

const activities = [
  { user: 'Jennifer Lee', action: 'cancelled order #12349', time: '2 hours ago', type: 'cancel' as ActivityType },
  { user: 'Robert Wilson', action: 'completed checkout for $215.00', time: '5 hours ago', type: 'purchase' as ActivityType },
  { user: 'Emily Davis', action: 'created a new account', time: '1 day ago', type: 'account' as ActivityType },
  { user: 'Michael Brown', action: 'added 3 items to cart', time: '1 day ago', type: 'cart' as ActivityType },
];

const activityTypeColors: Record<ActivityType, string> = {
  'purchase': 'bg-green-500',
  'cancel': 'bg-red-500',
  'account': 'bg-blue-500',
  'cart': 'bg-yellow-500',
};

const activityIcons: Record<ActivityType, string> = {
  'purchase': 'M5 13l4 4L19 7',
  'cancel': 'M6 18L18 6M6 6l12 12',
  'account': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  'cart': 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
}; 