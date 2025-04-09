'use client';

import React, { useState, useRef, useEffect } from 'react';
import { llmAPI } from '@/services/api';
import ChatMessage from './ChatMessage';

type ChatInterfaceProps = {
  isWidget?: boolean;
};

export default function ChatInterface({ isWidget = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
  }>>([
    {
      role: 'system',
      content: 'Welcome to ApotheCare AI Assistant. How can I help you with your health and wellness needs today?',
      timestamp: new Date(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: inputMessage.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Format messages for the API (without timestamps)
      const apiMessages = messages.concat(userMessage).map(({ role, content }) => ({
        role,
        content,
      }));
      
      // Call the AI API
      const response = await llmAPI.chat(apiMessages);
      
      // Add AI response
      if (response && response.choices && response.choices[0]?.message) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: response.choices[0].message.content,
            timestamp: new Date(),
          },
        ]);
      } else {
        throw new Error('Invalid response format from AI service');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again later.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Apply different styles based on whether this is a widget or a full page
  const containerClasses = isWidget
    ? "flex flex-col h-full"
    : "flex flex-col h-full max-h-[800px] bg-white rounded-lg shadow-md overflow-hidden";

  const headerClasses = isWidget
    ? "p-3 bg-primary text-white border-b border-primary-dark"
    : "p-4 bg-primary text-white";

  return (
    <div className={containerClasses}>
      <div className={headerClasses}>
        <h2 className={`font-semibold ${isWidget ? 'text-lg' : 'text-xl'}`}>ApotheCare AI Assistant</h2>
        {!isWidget && <p className="text-sm opacity-80">Powered by Mistral AI</p>}
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
            isCompact={isWidget}
          />
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-tl-none px-4 py-3">
              <div className="flex items-center">
                <span className="font-semibold text-sm">ApotheCare AI</span>
              </div>
              <div className="flex mt-2 space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={sendMessage} className="p-3 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 text-sm"
            disabled={isLoading || !inputMessage.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 