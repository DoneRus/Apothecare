import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

// This would typically come from a database or API
const products = [
  {
    id: 1,
    name: 'Pain Relief Tablets',
    description: 'Fast-acting pain relief for headaches and minor aches',
    longDescription: 'These tablets provide effective, fast-acting relief from headaches, muscle aches, and minor pain. The non-drowsy formula allows you to continue with your day while getting the relief you need. Each tablet provides up to 8 hours of relief.',
    price: 9.99,
    category: 'Pain Relief',
    dosage: 'Adults and children 12 years and over: Take 1-2 tablets every 8 hours as needed. Do not exceed 6 tablets in 24 hours.',
    ingredients: ['Acetaminophen', 'Microcrystalline cellulose', 'Starch', 'Magnesium stearate'],
    warnings: ['Do not use with other products containing acetaminophen', 'Consult a doctor if symptoms persist for more than 7 days', 'Keep out of reach of children'],
    stock: 45,
    reviews: [
      { id: 1, rating: 5, user: 'John D.', comment: 'Works quickly and effectively!', date: '2023-12-15' },
      { id: 2, rating: 4, user: 'Sarah M.', comment: 'Good pain relief, but I needed to take 2 for it to work.', date: '2023-11-28' }
    ]
  },
  {
    id: 2,
    name: 'Cold & Flu Syrup',
    description: 'Relieves symptoms of cold and flu',
    longDescription: 'This syrup helps relieve multiple cold and flu symptoms including cough, congestion, sore throat, and fever. The pleasant honey lemon flavor makes it easy to take, even when feeling under the weather.',
    price: 12.99,
    category: 'Cold & Flu',
    dosage: 'Adults and children 12 years and over: 30ml every 4-6 hours. Do not exceed 4 doses in 24 hours.',
    ingredients: ['Dextromethorphan', 'Phenylephrine', 'Acetaminophen', 'Natural honey flavor', 'Purified water'],
    warnings: ['Do not use if you have high blood pressure or heart disease', 'May cause drowsiness', 'Do not use with other cold medications'],
    stock: 27,
    reviews: [
      { id: 1, rating: 5, user: 'Maria L.', comment: 'Helped me recover quickly from a bad cold!', date: '2024-01-05' },
      { id: 2, rating: 4, user: 'Robert K.', comment: 'Works well but the flavor is a bit strong.', date: '2023-12-18' }
    ]
  },
  // Other products data would be here
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    return {
      title: 'Product Not Found | ApotheCare',
    };
  }
  
  return {
    title: `${product.name} | ApotheCare`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-2xl font-bold">ApotheCare</Link>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link href="/dashboard" className="hover:text-primary-light transition">Home</Link></li>
              <li><Link href="/products" className="hover:text-primary-light transition">Products</Link></li>
              <li><Link href="/orders" className="hover:text-primary-light transition">Orders</Link></li>
              <li><Link href="/profile" className="hover:text-primary-light transition">Profile</Link></li>
              <li><Link href="/auth/login" className="hover:text-primary-light transition">Sign Out</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/products" className="text-primary hover:underline flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">{product.category}</span>
              </div>
              
              <div className="mt-4">
                <p className="text-3xl font-bold text-primary">€{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">Includes VAT</p>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-700">{product.longDescription}</p>
              </div>
              
              <div className="mt-6 flex items-center">
                <span className={`mr-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                </span>
                <span className="text-sm text-gray-500">{product.stock} items available</span>
              </div>
              
              <div className="mt-8 flex space-x-3">
                <div className="flex items-center border rounded-md">
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                  <input type="text" className="w-12 border-none text-center focus:ring-0" value="1" readOnly />
                  <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                </div>
                <button className="flex-grow bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Information Tabs */}
          <div className="px-6 py-8 border-t">
            <div className="border-b">
              <div className="flex space-x-8">
                <button className="border-b-2 border-primary text-primary font-medium pb-4">Product Details</button>
                <button className="text-gray-500 hover:text-gray-700 font-medium pb-4">Dosage</button>
                <button className="text-gray-500 hover:text-gray-700 font-medium pb-4">Warnings</button>
                <button className="text-gray-500 hover:text-gray-700 font-medium pb-4">Reviews</button>
              </div>
            </div>
            
            <div className="py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ingredients</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Dosage Information</h3>
              <p className="text-gray-600">{product.dosage}</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-4">Warnings</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {product.warnings.map((warning, index) => (
                  <li key={index} className="text-red-600">{warning}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Reviews Section */}
          <div className="px-6 py-8 border-t">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>
            
            <div className="space-y-6">
              {product.reviews.map(review => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900">{review.user}</span>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="mt-2 text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition">
                Write a Review
              </button>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-primary font-bold">€{relatedProduct.price.toFixed(2)}</span>
                      <Link href={`/products/${relatedProduct.id}`} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-200 transition">
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ApotheCare</h3>
              <p className="text-gray-400 text-sm">Your trusted online pharmacy for all your healthcare needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
                <li><Link href="#services" className="hover:text-white transition">Services</Link></li>
                <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="#shipping" className="hover:text-white transition">Shipping</Link></li>
                <li><Link href="#returns" className="hover:text-white transition">Returns</Link></li>
                <li><Link href="#privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: info@apothecare.com</li>
                <li>Phone: +31 123 456 789</li>
                <li>Address: Amsterdam, Netherlands</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ApotheCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 