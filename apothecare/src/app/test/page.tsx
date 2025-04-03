'use client';

import { useState } from 'react';
import axios from 'axios';

export default function TestPage() {
  const [testResponse, setTestResponse] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const testAPI = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/test');
      setTestResponse(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      setTestResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testChatbot = async () => {
    if (!chatMessage.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post('/api/chatbot', { message: chatMessage });
      setChatbotResponse(JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      console.error('Error testing chatbot:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        setChatbotResponse(`Error (${error.response.status}): ${JSON.stringify(error.response.data, null, 2)}`);
      } else {
        setChatbotResponse(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="mb-8 p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Test API Endpoint</h2>
        <button 
          onClick={testAPI}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Test /api/test
        </button>
        
        {testResponse && (
          <pre className="mt-4 p-3 bg-gray-100 rounded overflow-auto max-h-60">
            {testResponse}
          </pre>
        )}
      </div>
      
      <div className="p-4 border rounded">
        <h2 className="text-xl font-semibold mb-4">Test Chatbot API</h2>
        
        <div className="mb-4">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Enter a message for the chatbot"
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button 
          onClick={testChatbot}
          disabled={loading || !chatMessage.trim()}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          Test Chatbot
        </button>
        
        {chatbotResponse && (
          <pre className="mt-4 p-3 bg-gray-100 rounded overflow-auto max-h-60">
            {chatbotResponse}
          </pre>
        )}
      </div>
    </div>
  );
} 