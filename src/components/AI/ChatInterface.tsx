'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      role: 'assistant',
      content: 'Welcome to ApotheCare AI Assistant. How can I help you with your health and wellness needs today?',
      timestamp: new Date(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isWidget) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isWidget]);

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
      inputRef.current?.focus();
    }
  };

  // Apply different styles based on whether this is a widget or a full page
  const containerClasses = isWidget
    ? "flex flex-col h-full"
    : "flex flex-col h-full max-h-[800px] bg-white rounded-xl shadow-md overflow-hidden";

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-primary to-primary-dark border-b border-primary/20">
        <div className="flex items-center">
          <span className="inline-block mr-3 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </span>
          <div>
            <h2 className="font-semibold text-white text-lg leading-tight">ApotheCare AI</h2>
            <p className="text-white/80 text-xs">Your health assistant</p>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent bg-gradient-to-b from-blue-50/50 to-white"
      >
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
          <div className="flex justify-start">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm"
            >
              <div className="flex items-center">
                <span className="flex h-8 w-8 rounded-full bg-primary/10 items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </span>
                <span className="font-medium text-sm text-gray-700">ApotheCare AI</span>
              </div>
              <div className="flex ml-10 mt-2 space-x-1">
                <motion.div 
                  className="h-2 w-2 bg-primary/60 rounded-full"
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                />
                <motion.div 
                  className="h-2 w-2 bg-primary/60 rounded-full"
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", delay: 0.2 }}
                />
                <motion.div 
                  className="h-2 w-2 bg-primary/60 rounded-full"
                  animate={{ scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", delay: 0.4 }}
                />
              </div>
            </motion.div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-3 border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center relative">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 pl-4 pr-10 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm text-gray-800 placeholder-gray-400 text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="absolute right-2 p-2 rounded-full bg-primary text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
} 