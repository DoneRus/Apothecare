'use client';

import React, { useState } from 'react';
import { productsAPI } from '@/services/api';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
    productId: number;
    onSuccess?: (imageUrl: string) => void;
    onError?: (error: Error) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ productId, onSuccess, onError }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            return;
        }

        setIsUploading(true);
        try {
            const response = await productsAPI.uploadImage(productId, selectedFile);
            if (response.image_url) {
                onSuccess?.(response.image_url);
                setSelectedFile(null);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            onError?.(error as Error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Upload Product Image</h3>
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="flex-1 p-2 border rounded"
                    disabled={isUploading}
                />
                <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isUploading}
                    className="min-w-[100px]"
                >
                    {isUploading ? 'Uploading...' : 'Upload'}
                </Button>
            </div>
            {selectedFile && (
                <p className="text-sm text-gray-600">
                    Selected file: {selectedFile.name}
                </p>
            )}
        </div>
    );
}; 