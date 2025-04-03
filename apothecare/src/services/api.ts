// API base URL - local XAMPP server
const API_BASE_URL = 'http://localhost/php-backend';

// Generic fetch function with error handling
async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Products API
export const productsAPI = {
  // Get all products
  getAll: async () => {
    return fetchFromAPI('products.php');
  },
  
  // Get featured products
  getFeatured: async () => {
    const products = await fetchFromAPI('products.php');
    return products.filter((product: any) => product.is_featured);
  },
  
  // Add a new product
  add: async (product: any) => {
    return fetchFromAPI('products.php', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }
};

// Testimonials API
export const testimonialsAPI = {
  // Get all testimonials
  getAll: async () => {
    return fetchFromAPI('testimonials.php');
  },
  
  // Add a new testimonial
  add: async (testimonial: any) => {
    return fetchFromAPI('testimonials.php', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    });
  }
};

// Cart API
export const cartAPI = {
  // Get cart items
  getItems: async () => {
    return fetchFromAPI('cart.php');
  },
  
  // Add item to cart
  addItem: async (productId: number, quantity: number) => {
    return fetchFromAPI('cart.php', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity }),
    });
  },
  
  // Remove item from cart
  removeItem: async (cartId: number) => {
    return fetchFromAPI('cart.php', {
      method: 'DELETE',
      body: JSON.stringify({ cart_id: cartId }),
    });
  },
  
  // Clear cart
  clearCart: async () => {
    return fetchFromAPI('cart.php', {
      method: 'DELETE',
      body: JSON.stringify({ clear_cart: true }),
    });
  }
};

// Setup API for database initialization
export const setupAPI = {
  // Initialize the database
  initDatabase: async () => {
    return fetchFromAPI('setup.php');
  }
}; 