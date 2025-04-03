// API Configuration
const API_BASE_URL = 'http://localhost/apothecare/php-backend';

// Generic fetch function with error handling
async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            ...options,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        const data = await response.json();
        
        // Check for API-level errors
        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw new Error('Unable to connect to the server. Please check if the PHP backend is running and accessible.');
        }
        throw error;
    }
}

// Products API
export const productsAPI = {
    getAll: async () => {
        try {
            const products = await fetchFromAPI('products.php');
            return products.map((product: any) => ({
                ...product,
                price: parseFloat(product.price),
                sale_price: product.sale_price ? parseFloat(product.sale_price) : undefined,
                rating: parseFloat(product.rating),
                reviews: parseInt(product.reviews),
                properties: product.properties ? JSON.parse(product.properties) : {},
                is_new: Boolean(product.is_new),
                is_featured: Boolean(product.is_featured)
            }));
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getFeatured: async () => {
        try {
            const products = await fetchFromAPI('products.php');
            return products
                .filter((product: any) => product.is_featured)
                .map((product: any) => ({
                    ...product,
                    price: parseFloat(product.price),
                    sale_price: product.sale_price ? parseFloat(product.sale_price) : undefined,
                    rating: parseFloat(product.rating),
                    reviews: parseInt(product.reviews),
                    properties: product.properties ? JSON.parse(product.properties) : {},
                    is_new: Boolean(product.is_new),
                    is_featured: Boolean(product.is_featured)
                }));
        } catch (error) {
            console.error('Error fetching featured products:', error);
            throw error;
        }
    },

    add: async (product: any) => {
        return fetchFromAPI('products.php', {
            method: 'POST',
            body: JSON.stringify(product)
        });
    },

    uploadImage: async (productId: number, imageFile: File) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('product_id', productId.toString());

            const response = await fetch(`${API_BASE_URL}/upload.php`, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }
};

// Testimonials API
export const testimonialsAPI = {
    getAll: async () => {
        try {
            return fetchFromAPI('testimonials.php');
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            throw error;
        }
    }
};

// Cart API
export const cartAPI = {
    getItems: async () => {
        try {
            const items = await fetchFromAPI('cart.php');
            return items.map((item: any) => ({
                id: item.id,
                quantity: item.quantity,
                product: {
                    ...item.product,
                    price: parseFloat(item.product.price),
                    sale_price: item.product.sale_price ? parseFloat(item.product.sale_price) : undefined,
                    rating: parseFloat(item.product.rating),
                    reviews: parseInt(item.product.reviews),
                    properties: item.product.properties ? JSON.parse(item.product.properties) : {},
                    is_new: Boolean(item.product.is_new),
                    is_featured: Boolean(item.product.is_featured)
                }
            }));
        } catch (error) {
            console.error('Error fetching cart items:', error);
            throw error;
        }
    },

    addItem: async (productId: number, quantity: number) => {
        try {
            return fetchFromAPI('cart.php', {
                method: 'POST',
                body: JSON.stringify({ product_id: productId, quantity })
            });
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    },

    removeItem: async (cartId: number) => {
        try {
            return fetchFromAPI(`cart.php?id=${cartId}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error removing item from cart:', error);
            throw error;
        }
    },

    updateQuantity: async (cartId: number, quantity: number) => {
        try {
            return fetchFromAPI(`cart.php?id=${cartId}`, {
                method: 'PUT',
                body: JSON.stringify({ quantity })
            });
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
            throw error;
        }
    },

    clearCart: async () => {
        try {
            return fetchFromAPI('cart.php', {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error clearing cart:', error);
            throw error;
        }
    }
};

// Setup API for database initialization
export const setupAPI = {
    initDatabase: async () => {
        return fetchFromAPI('setup.php');
    }
}; 