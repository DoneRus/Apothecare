'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { productsAPI } from '@/services/api';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  onSuccess: (product: Product) => void;
}

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: '',
    description: '',
    price: 0,
    sale_price: undefined,
    rating: 0,
    reviews: 0,
    is_new: false,
    is_featured: false,
    properties: {}
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Populate form with product data if editing
  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
      });
      
      if (product.image_url) {
        setImagePreview(product.image_url);
      }
    }
  }, [product]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData({
        ...formData,
        [name]: parseFloat(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePropertyChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      properties: {
        ...formData.properties,
        [key]: value
      }
    });
  };
  
  const handleAddProperty = () => {
    setFormData({
      ...formData,
      properties: {
        ...formData.properties,
        ['new_key']: ''
      }
    });
  };
  
  const handleRemoveProperty = (key: string) => {
    const newProperties = { ...formData.properties };
    delete newProperties[key];
    
    setFormData({
      ...formData,
      properties: newProperties
    });
  };
  
  const handlePropertyKeyChange = (oldKey: string, newKey: string) => {
    const value = formData.properties?.[oldKey] || '';
    const newProperties = { ...formData.properties };
    
    delete newProperties[oldKey];
    
    setFormData({
      ...formData,
      properties: {
        ...newProperties,
        [newKey]: value
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Create a copy of formData with price fields converted to numbers
      const formDataToSubmit = {
        ...formData,
        price: parseFloat(formData.price.toString()),
        sale_price: formData.sale_price ? parseFloat(formData.sale_price.toString()) : null,
        rating: parseFloat(formData.rating.toString()),
        reviews: parseInt(formData.reviews.toString(), 10)
      };
      
      let result;
      if (product?.id) {
        // Update existing product
        result = await productsAPI.update(product.id, formDataToSubmit);
      } else {
        // Create new product
        result = await productsAPI.add(formDataToSubmit);
      }
      
      // Handle image upload if a new image was selected
      if (selectedImage && result?.product?.id) {
        await productsAPI.uploadImage(result.product.id, selectedImage);
        
        // Fetch the updated product with the image URL
        const updatedProduct = await productsAPI.getById(result.product.id);
        onSuccess(updatedProduct);
      } else {
        onSuccess(result.product);
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Category & Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category*
            </label>
            <input
              type="text"
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price* (€)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Sale Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sale Price (€)
            </label>
            <input
              type="number"
              name="sale_price"
              value={formData.sale_price || ''}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Rating & Reviews */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating || 0}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reviews
            </label>
            <input
              type="number"
              name="reviews"
              value={formData.reviews || 0}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Description */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* Checkboxes */}
          <div className="col-span-full">
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="is_new" 
                  checked={formData.is_new || false} 
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Mark as New</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  name="is_featured" 
                  checked={formData.is_featured || false} 
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Featured Product</span>
              </label>
            </div>
          </div>
          
          {/* Image Upload */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <div className="mt-1 flex items-center">
              {imagePreview ? (
                <div className="relative mr-3">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="h-32 w-32 object-cover rounded-md" 
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <div className="ml-4">
                <div className="relative bg-primary hover:bg-primary-dark py-2 px-3 rounded-md shadow-sm text-sm font-medium text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary cursor-pointer">
                  <span>Upload Image</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG or WEBP up to 5MB
                </p>
              </div>
            </div>
          </div>
          
          {/* Properties */}
          <div className="col-span-full">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Properties
              </label>
              <Button
                type="button"
                onClick={handleAddProperty}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Add Property
              </Button>
            </div>
            
            {formData.properties && Object.keys(formData.properties).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(formData.properties).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => handlePropertyKeyChange(key, e.target.value)}
                      placeholder="Key"
                      className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={value as string}
                      onChange={(e) => handlePropertyChange(key, e.target.value)}
                      placeholder="Value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProperty(key)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No properties added yet
              </p>
            )}
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Product'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
} 