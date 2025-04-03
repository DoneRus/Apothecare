'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';

export default function SettingsPage() {
  // General Settings Form State
  const [generalSettings, setGeneralSettings] = useState({
    pharmacyName: 'ApotheCare Pharmacy',
    email: 'contact@apothecare.com',
    phone: '(555) 123-4567',
    website: 'https://apothecare.com',
    address: '123 Health Street',
    city: 'Medville',
    state: 'CA',
    zip: '90210',
    weekdayOpen: '09:00',
    weekdayClose: '18:00',
    saturdayOpen: '10:00',
    saturdayClose: '15:00'
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    lowStock: true,
    customerRegistration: false,
    marketingUpdates: true,
    browserNotifications: false
  });

  // Form Submit States
  const [generalFormSubmitted, setGeneralFormSubmitted] = useState(false);
  const [notificationsFormSubmitted, setNotificationsFormSubmitted] = useState(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState('general');

  // Handle General Form Input Changes
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
    if (generalFormSubmitted) setGeneralFormSubmitted(false);
  };

  // Handle Notification Toggle Changes
  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    if (notificationsFormSubmitted) setNotificationsFormSubmitted(false);
  };

  // Handle General Form Submit
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('General settings saved:', generalSettings);
    setGeneralFormSubmitted(true);
    
    // In a real application, you would send this data to your API
    // and only show success message upon successful response
    setTimeout(() => {
      setGeneralFormSubmitted(false);
    }, 3000);
  };

  // Handle Notifications Form Submit
  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notification settings saved:', notificationSettings);
    setNotificationsFormSubmitted(true);
    
    setTimeout(() => {
      setNotificationsFormSubmitted(false);
    }, 3000);
  };

  return (
    <AdminLayout
      title="Settings"
      subtitle="Configure your pharmacy settings"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-800">Settings</h3>
              <p className="text-sm text-gray-600 mt-1">Manage your preferences</p>
            </div>
            <nav className="p-2">
              <button 
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-3 py-2 rounded-md font-medium ${
                  activeTab === 'general' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                General
              </button>
              <button 
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-3 py-2 rounded-md font-medium mt-1 ${
                  activeTab === 'account' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 rounded-md font-medium mt-1 ${
                  activeTab === 'notifications' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifications
              </button>
              <button 
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center px-3 py-2 rounded-md font-medium mt-1 ${
                  activeTab === 'billing' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Billing
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center px-3 py-2 rounded-md font-medium mt-1 ${
                  activeTab === 'security' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Security
              </button>
              <button 
                onClick={() => setActiveTab('integrations')}
                className={`w-full flex items-center px-3 py-2 rounded-md font-medium mt-1 ${
                  activeTab === 'integrations' 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                Integrations
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">General Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Basic pharmacy information</p>
              </div>
              
              {generalFormSubmitted && (
                <div className="mx-6 mt-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                  Settings saved successfully!
                </div>
              )}
              
              <form onSubmit={handleGeneralSubmit}>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="pharmacyName">Pharmacy Name</label>
                      <input 
                        id="pharmacyName"
                        name="pharmacyName"
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                        value={generalSettings.pharmacyName}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                        value={generalSettings.email}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                      <input 
                        id="phone"
                        name="phone"
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                        value={generalSettings.phone}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="website">Website</label>
                      <input 
                        id="website"
                        name="website"
                        type="url" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                        value={generalSettings.website}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">Address</label>
                      <input 
                        id="address"
                        name="address"
                        type="text" 
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-2 text-black"
                        value={generalSettings.address}
                        onChange={handleGeneralChange}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input 
                          id="city"
                          name="city"
                          type="text" 
                          placeholder="City" 
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                          value={generalSettings.city}
                          onChange={handleGeneralChange}
                        />
                        <input 
                          id="state"
                          name="state"
                          type="text" 
                          placeholder="State" 
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                          value={generalSettings.state}
                          onChange={handleGeneralChange}
                        />
                        <input 
                          id="zip"
                          name="zip"
                          type="text" 
                          placeholder="ZIP Code" 
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                          value={generalSettings.zip}
                          onChange={handleGeneralChange}
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Monday - Friday</span>
                            <div className="flex space-x-2">
                              <input 
                                id="weekdayOpen"
                                name="weekdayOpen"
                                type="time" 
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-black"
                                value={generalSettings.weekdayOpen}
                                onChange={handleGeneralChange}
                              />
                              <span>-</span>
                              <input 
                                id="weekdayClose"
                                name="weekdayClose"
                                type="time" 
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-black"
                                value={generalSettings.weekdayClose}
                                onChange={handleGeneralChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Saturday</span>
                            <div className="flex space-x-2">
                              <input 
                                id="saturdayOpen"
                                name="saturdayOpen"
                                type="time" 
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-black"
                                value={generalSettings.saturdayOpen}
                                onChange={handleGeneralChange}
                              />
                              <span>-</span>
                              <input 
                                id="saturdayClose"
                                name="saturdayClose"
                                type="time" 
                                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm text-black"
                                value={generalSettings.saturdayClose}
                                onChange={handleGeneralChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-gray-50 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Notification Settings</h3>
                <p className="text-sm text-gray-600 mt-1">Configure how and when you receive notifications</p>
              </div>
              
              {notificationsFormSubmitted && (
                <div className="mx-6 mt-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                  Notification settings saved successfully!
                </div>
              )}
              
              <form onSubmit={handleNotificationsSubmit}>
                <div className="p-6">
                  <h4 className="font-medium text-gray-800 mb-3">Email Notifications</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-700">New Orders</h5>
                        <p className="text-sm text-gray-500">Receive an email when a new order is placed</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationSettings.newOrders}
                          onChange={() => handleNotificationToggle('newOrders')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-700">Low Stock Alerts</h5>
                        <p className="text-sm text-gray-500">Be notified when products are running low</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationSettings.lowStock}
                          onChange={() => handleNotificationToggle('lowStock')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-700">Customer Registration</h5>
                        <p className="text-sm text-gray-500">Get notified when a new customer registers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationSettings.customerRegistration}
                          onChange={() => handleNotificationToggle('customerRegistration')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-700">Marketing Updates</h5>
                        <p className="text-sm text-gray-500">Receive marketing tips and platform updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationSettings.marketingUpdates}
                          onChange={() => handleNotificationToggle('marketingUpdates')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  
                  <hr className="my-6" />
                  
                  <h4 className="font-medium text-gray-800 mb-3">Browser Notifications</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-gray-700">Enable Browser Notifications</h5>
                        <p className="text-sm text-gray-500">Allow notifications to appear on your browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={notificationSettings.browserNotifications}
                          onChange={() => handleNotificationToggle('browserNotifications')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-gray-50 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                  >
                    Save Notification Settings
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Account Settings</h3>
              <p className="text-gray-600">Account settings functionality will be implemented in a future update.</p>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Billing Settings</h3>
              <p className="text-gray-600">Billing settings functionality will be implemented in a future update.</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Security Settings</h3>
              <p className="text-gray-600">Security settings functionality will be implemented in a future update.</p>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Integrations</h3>
              <p className="text-gray-600">Integrations functionality will be implemented in a future update.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
} 