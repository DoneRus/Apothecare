'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { setupAPI } from '../../services/api';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [setupDetails, setSetupDetails] = useState<string[]>([]);

  const handleSetup = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await setupAPI.initDatabase();
      setSuccess(true);
      setSetupDetails(result.details || []);
    } catch (err: any) {
      setError(err.message || 'Failed to initialize database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 mx-auto">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ApotheCare Database Setup
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Initialize the local MySQL database for the application
          </p>
        </div>

        <div className="rounded-md bg-white shadow-sm p-6">
          {!loading && !success ? (
            <div className="text-center">
              <p className="mb-4 text-gray-700">
                This will create the necessary database and tables for the ApotheCare application.
                Any existing database with the same name will be used.
              </p>
              <button
                onClick={handleSetup}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Initialize Database
              </button>
            </div>
          ) : loading ? (
            <div className="text-center">
              <p className="text-gray-700">Setting up database...</p>
            </div>
          ) : success ? (
            <div className="space-y-4">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Setup completed successfully</h3>
                  </div>
                </div>
              </div>
              
              {setupDetails.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2">Setup Details:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    {setupDetails.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="text-center mt-6">
                <Link 
                  href="/dashboard" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          ) : null}
          
          {error && (
            <div className="rounded-md bg-red-50 p-4 mt-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Setup failed</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 