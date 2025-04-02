import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ScrollButton } from '../../components/ui/ScrollButton';
import { ExpandableProductsSection } from '../../components/ui/ExpandableProductsSection';
import { featuredProducts, allProducts } from '../../data/products';
import { HeaderNavigation } from '../../components/ui/HeaderNavigation';
import { HeaderCartButton } from '../../components/ui/HeaderCartButton';

export const metadata: Metadata = {
  title: 'Dashboard | ApotheCare',
  description: 'Your trusted online pharmacy for all healthcare needs',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9 text-primary">
              <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
              <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">ApotheCare</span>
          </div>
          
          <HeaderNavigation />
          
          <div className="flex items-center space-x-4">
            <HeaderCartButton />
            <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-medium flex items-center justify-center">
              JD
            </div>
            <Link href="/auth/login" className="text-gray-600 text-sm hover:text-primary transition">Sign Out</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-32 min-h-[100vh] flex items-center">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                  Your Health,<br />
                  <span className="text-primary">Our Priority</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  ApotheCare delivers prescription medications and healthcare products right to your door, with expert pharmacist support available 24/7.
                </p>
                <div className="flex flex-wrap gap-4">
                  <ScrollButton 
                    targetId="products" 
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition shadow-md hover:shadow-lg inline-block"
                  >
                    Browse Products
                  </ScrollButton>
                  <button className="border border-primary text-primary hover:bg-primary/5 px-6 py-3 rounded-md font-medium transition">
                    View Prescriptions
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">100%</div>
                    <div className="text-sm text-gray-600">Authentic</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">Fast</div>
                    <div className="text-sm text-gray-600">Delivery</div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative h-[450px] w-full">
                <div className="absolute top-0 right-0 w-full h-full bg-primary/10 rounded-2xl -z-10"></div>
                <div className="absolute top-6 right-6 w-full h-full bg-primary/5 rounded-2xl -z-20"></div>
                <div className="relative h-full w-full flex items-center justify-center bg-white rounded-xl shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/10 to-primary/20"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-40 h-40 text-primary/30">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Our <span className="text-primary">Services</span></h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                We provide comprehensive healthcare solutions to help you stay healthy and manage your medications effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-primary">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Prescription Delivery</h3>
                <p className="text-gray-600">Easy online refills and timely delivery of your prescription medications right to your doorstep.</p>
                <button className="mt-4 text-primary font-medium flex items-center hover:text-primary-dark transition">
                  Manage Prescriptions
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-primary">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Medication Management</h3>
                <p className="text-gray-600">Track your medications, get reminders, and access your complete medication history.</p>
                <button className="mt-4 text-primary font-medium flex items-center hover:text-primary-dark transition">
                  View History
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-primary">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                </div>
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Pharmacist Consultation</h3>
                <p className="text-gray-600">Connect with licensed pharmacists for personalized advice and medication counseling.</p>
                <button className="mt-4 text-primary font-medium flex items-center hover:text-primary-dark transition">
                  Start Chat
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="products" className="py-16 bg-gray-50">
          <ExpandableProductsSection featuredProducts={featuredProducts} allProducts={allProducts} />
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">What Our Customers <span className="text-primary">Say</span></h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Thousands of people trust ApotheCare for their healthcare needs. Read what they have to say about our service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 rounded-xl p-6 relative">
                <div className="absolute -top-4 left-6 bg-primary text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 mb-4 pt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"I've been using ApotheCare for over a year now, and it has completely changed how I manage my medications. The automatic refills and reminders ensure I never miss a dose."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">Emma Thompson</h4>
                    <p className="text-gray-500 text-sm">Loyal Customer</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-gray-50 rounded-xl p-6 relative">
                <div className="absolute -top-4 left-6 bg-primary text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 mb-4 pt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"The pharmacist consultation feature is incredible. I had questions about potential drug interactions, and received professional advice within minutes. Very impressed!"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">Marcus Johnson</h4>
                    <p className="text-gray-500 text-sm">New Customer</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-gray-50 rounded-xl p-6 relative">
                <div className="absolute -top-4 left-6 bg-primary text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 mb-4 pt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"ApotheCare delivers my monthly prescriptions right to my door, saving me time and stress. The app makes it easy to track everything, and their customer service is excellent."</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-800">Sophia Patel</h4>
                    <p className="text-gray-500 text-sm">Satisfied Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Orders Section (Empty placeholder) */}
        <section id="orders" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Your <span className="text-primary">Orders</span></h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Track and manage your medication orders and prescriptions all in one place.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 text-gray-300 mx-auto mb-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No orders yet</h3>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here.</p>
              <Link href="#products" className="text-primary font-medium hover:text-primary-dark transition">
                Browse Products
              </Link>
            </div>
          </div>
        </section>

        {/* Profile Section (Empty placeholder) */}
        <section id="profile" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Your <span className="text-primary">Profile</span></h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                Manage your personal information, health details, and account settings.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl shadow-md p-12 max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center text-primary text-3xl font-bold">
                  JD
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">John Doe</h3>
                  <p className="text-gray-500 mb-4">john.doe@example.com</p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                      </svg>
                      <span>Member since: Jan 2023</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span>Total orders: 0</span>
                    </div>
                  </div>
                  <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to simplify your healthcare?</h2>
                <p className="text-primary-light text-lg max-w-lg">
                  Download our mobile app to manage your prescriptions, track deliveries, and chat with pharmacists on the go.
                </p>
              </div>
              <div className="lg:w-1/2 flex flex-col md:flex-row gap-4 justify-center lg:justify-end">
                <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5675 12.0084C17.5129 9.30184 19.7937 8.15123 19.8727 8.10203C18.6117 6.05263 16.6177 5.78283 15.8917 5.76263C14.2827 5.61923 12.7327 6.74043 11.9177 6.74043C11.0857 6.74043 9.81173 5.78083 8.44073 5.80943C6.66973 5.83763 5.00973 6.96063 4.07873 8.70943C2.14973 12.2808 3.57273 17.5178 5.40573 20.1706C6.32073 21.4664 7.41673 22.9226 8.86073 22.864C10.2647 22.801 10.7937 21.953 12.4837 21.953C14.1557 21.953 14.6557 22.864 16.1347 22.829C17.6577 22.801 18.6027 21.5106 19.4867 20.2002C20.5407 18.7058 20.9737 17.2448 20.9917 17.1764C20.9557 17.1646 17.6277 15.8812 17.5675 12.0084Z" />
                    <path d="M14.7993 3.95261C15.5593 2.99621 16.0653 1.69941 15.9233 0.384613C14.8053 0.432213 13.4213 1.15321 12.6273 2.08761C11.9233 2.90361 11.3173 4.24601 11.4773 5.52001C12.7273 5.61161 14.0153 4.89541 14.7993 3.95261Z" />
                  </svg>
                  App Store
                </button>
                <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.3055 8.08331C17.1915 8.16979 14.3665 9.838 14.3665 13.0949V13.1338C14.3665 16.9314 18.0055 18.37 18.039 18.3839C18.0249 18.4331 17.5235 20.1272 16.3155 21.858C15.2405 23.3625 14.1305 24.857 12.4085 24.857C10.6865 24.857 10.2355 23.8771 8.25854 23.8771C6.35254 23.8771 5.65654 24.8865 4.01054 24.8865C2.36454 24.8865 1.20254 23.4355 0.0585375 21.8975C-1.23146 20.1486 -1.57146 16.9603 -0.219463 14.7589C0.436537 13.652 1.48154 12.7983 2.69954 12.7886C3.94354 12.7789 4.42854 13.6954 6.05954 13.6954C7.69054 13.6954 8.09654 12.7886 9.53354 12.7886C10.9705 12.7886 11.7615 13.6423 12.9345 13.6423C13.5215 13.6423 14.6605 13.4263 15.5315 12.7594C15.6065 12.7106 15.6925 12.7106 15.7175 12.7983C16.4625 14.0966 17.2635 15.0272 17.3055 8.08331Z" />
                    <path d="M12.0995 1.11877C12.9145 0.0922806 14.143 -0.380322 15.0285 -0.44681C15.1425 0.656077 14.761 1.79369 13.983 2.74538C13.205 3.69706 12.0605 4.18038 11.053 4.1025C10.925 3.02537 11.3605 2.14526 12.0995 1.11877Z" />
                  </svg>
                  Play Store
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary-light">
                  <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
                  <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
                </svg>
                <span className="text-2xl font-bold">ApotheCare</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Your trusted online pharmacy for all your healthcare needs. We deliver prescription medications and healthcare products right to your door.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-light transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-light transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.016 10.016 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-light transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="#about" className="hover:text-primary-light transition">About Us</Link></li>
                <li><Link href="#products" className="hover:text-primary-light transition">Products</Link></li>
                <li><Link href="#services" className="hover:text-primary-light transition">Services</Link></li>
                <li><Link href="#blog" className="hover:text-primary-light transition">Health Blog</Link></li>
                <li><Link href="#contact" className="hover:text-primary-light transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link href="#faq" className="hover:text-primary-light transition">FAQ</Link></li>
                <li><Link href="#shipping" className="hover:text-primary-light transition">Shipping & Delivery</Link></li>
                <li><Link href="#returns" className="hover:text-primary-light transition">Returns & Refunds</Link></li>
                <li><Link href="#privacy" className="hover:text-primary-light transition">Privacy Policy</Link></li>
                <li><Link href="#terms" className="hover:text-primary-light transition">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-light shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>info@apothecare.com</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-light shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>+31 123 456 789</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-primary-light shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>Amsterdam, Netherlands</span>
                </li>
                <li className="pt-2">
                  <form className="flex">
                    <input type="email" placeholder="Subscribe to our newsletter" className="bg-gray-800 text-sm rounded-l-md border-0 focus:ring-1 focus:ring-primary-light px-3 py-2 w-full" />
                    <button className="bg-primary hover:bg-primary-dark text-white px-3 py-2 rounded-r-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} ApotheCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 