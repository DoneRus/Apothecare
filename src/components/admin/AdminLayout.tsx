'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNotifications } from '@/contexts/NotificationContext';

type AdminLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  
  // Use the global notifications context
  const { notifications } = useNotifications();

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      // For mobile: Close sidebar when clicking outside (only if in mobile view)
      if (
        window.innerWidth < 768 &&
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) &&
        isSidebarOpen
      ) {
        // Don't close if clicking the toggle button
        const target = event.target as HTMLElement;
        if (target.closest('[data-sidebar-toggle]')) {
          return;
        }
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Close dropdowns when route changes
  useEffect(() => {
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
    // Close sidebar on mobile when changing pages
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/admin', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      badgeCount: 0
    },
    { 
      name: 'Products', 
      href: '/admin/products', 
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      badgeCount: 0
    },
    { 
      name: 'Orders', 
      href: '/admin/orders', 
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
      badgeCount: 3
    },
    { 
      name: 'Customers', 
      href: '/admin/customers', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      badgeCount: 0
    },
    { 
      name: 'Notifications', 
      href: '/admin/notifications', 
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      badgeCount: notifications?.filter(n => !n.isRead).length || 0
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      badgeCount: 0 
    },
  ];

  // Check if there are unread notifications
  const hasUnreadNotifications = notifications?.some(n => !n.isRead) || false;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-primary text-white shadow-md z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <button
              data-sidebar-toggle="true"
              onClick={toggleSidebar}
              className="mr-3 p-1 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/admin" className="text-xl font-bold">ApotheCare Admin</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button 
                className="p-1 rounded-full hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-white/30 relative"
                onClick={toggleNotifications}
                aria-label="Notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {hasUnreadNotifications && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications && notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${notification.isRead ? '' : 'bg-blue-50'}`}
                        >
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">No notifications</div>
                    )}
                  </div>
                  <Link href="/admin/notifications" className="block bg-gray-50 text-center px-4 py-2 text-sm text-primary hover:text-primary-dark">
                    View all notifications
                  </Link>
                </div>
              )}
            </div>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="flex items-center focus:outline-none"
                aria-label="Open user menu"
              >
                <div className="h-8 w-8 rounded-full bg-primary-dark flex items-center justify-center text-sm font-medium">
                  A
                </div>
                <span className="ml-2 hidden md:block">Admin</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`ml-1 h-5 w-5 transform transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Profile Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-600 mt-1">admin@apothecare.com</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Account Settings
                  </a>
                  <a href="/auth/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[5] md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}
        
        {/* Sidebar */}
        <aside 
          ref={sidebarRef}
          className={`bg-white shadow-xl fixed inset-y-0 left-0 z-[9] w-72 pt-16 transition-all duration-300 ease-in-out transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static md:pt-0 md:z-0 border-r border-gray-100`}
        >
          <div className="flex flex-col h-full">
            {/* Admin profile section */}
            <div className="px-6 py-6 border-b border-gray-100 bg-gradient-to-r from-primary/10 to-primary-dark/5">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-lg font-semibold shadow-md">
                  A
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium">Admin User</h3>
                  <p className="text-gray-500 text-xs">admin@apothecare.com</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 ring-2 ring-green-100"></div>
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              <div className="text-xs uppercase text-gray-500 font-semibold px-3 pb-2 pt-4">Main</div>
              {navItems.slice(0, 2).map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === item.href 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className={`p-2 mr-3 rounded-lg ${pathname === item.href ? 'bg-white/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === item.href ? 2.5 : 2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="font-medium">{item.name}</span>
                  {item.badgeCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badgeCount}
                    </span>
                  )}
                </Link>
              ))}
              
              <div className="text-xs uppercase text-gray-500 font-semibold px-3 pb-2 pt-4">Management</div>
              {navItems.slice(2, 4).map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === item.href 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className={`p-2 mr-3 rounded-lg ${pathname === item.href ? 'bg-white/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === item.href ? 2.5 : 2} d={item.icon} />
                    </svg>
                  </div>
                  <span className="font-medium">{item.name}</span>
                  {item.badgeCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badgeCount}
                    </span>
                  )}
                </Link>
              ))}
              
              <div className="text-xs uppercase text-gray-500 font-semibold px-3 pb-2 pt-4">System</div>
              {navItems.slice(4).map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                  className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                    pathname === item.href 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <div className={`p-2 mr-3 rounded-lg ${pathname === item.href ? 'bg-white/20' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={pathname === item.href ? 2.5 : 2} d={item.icon} />
                </svg>
                  </div>
                  <span className="font-medium">{item.name}</span>
                  {item.badgeCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badgeCount}
                    </span>
                )}
              </Link>
            ))}
          </nav>
            
            {/* Footer section */}
            <div className="p-4 border-t border-gray-100">
              <Link 
                href="/auth/login" 
                className="flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
              >
                <div className="p-2 mr-3 rounded-lg bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span className="font-medium">Log Out</span>
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-0' : ''}`}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
} 