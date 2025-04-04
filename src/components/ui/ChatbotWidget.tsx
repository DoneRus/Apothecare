'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useChatbot, ChatMessage } from '@/contexts/ChatbotContext';
import { cn } from '@/lib/utils';

export function ChatbotWidget() {
  const { 
    isOpen, 
    messages, 
    sendMessage, 
    closeChat, 
    isTyping, 
    connectedPharmacist, 
    isConnectingToPharmacist,
    endPharmacistChat,
    connectToPharmacist
  } = useChatbot();
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to render a message bubble
  const renderMessage = (message: ChatMessage) => {
    const isUser = message.sender === 'user';
    const isPharmacist = message.sender === 'pharmacist';
    const isBot = message.sender === 'bot';
    
    return (
      <div 
        key={message.id}
        className={cn(
          "flex mb-4",
          isUser ? "justify-end" : "justify-start"
        )}
      >
        {(isBot || isPharmacist) && (
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0",
            isBot ? "bg-primary" : "bg-green-600"
          )}>
            {isBot ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-5 h-5 text-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        )}
        
        <div className={cn(
          "rounded-2xl px-4 py-2 max-w-[80%] break-words",
          isUser 
            ? "bg-primary text-white" 
            : isPharmacist
              ? "bg-green-100 border border-green-300 text-gray-800"
              : "bg-gray-100 text-gray-800"
        )}>
          {isPharmacist && message.metadata && (
            <div className="text-xs font-semibold text-green-700 mb-1">
              {message.metadata.pharmacistName}
            </div>
          )}
          <div>{message.content}</div>
          <div className={cn(
            "text-xs mt-1 text-right",
            isUser 
              ? "text-primary-light" 
              : isPharmacist
                ? "text-green-600"
                : "text-gray-500"
          )}>
            {formatTime(message.timestamp)}
          </div>
        </div>
        
        {isUser && (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-2 flex-shrink-0">
            <span className="text-xs font-medium text-gray-600">You</span>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col transition-all duration-300 animate-slideUp">
      {/* Header */}
      <div className={cn(
        "px-4 py-3 rounded-t-lg flex items-center justify-between",
        connectedPharmacist ? "bg-green-600 text-white" : "bg-primary text-white"
      )}>
        <div className="flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6 mr-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
          <div>
            <h3 className="font-medium">
              {connectedPharmacist 
                ? `Chat with ${connectedPharmacist.name}` 
                : 'ApotheCare Assistant'
              }
            </h3>
            {connectedPharmacist && (
              <p className="text-xs text-white/80">{connectedPharmacist.specialty}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {connectedPharmacist && (
            <button
              onClick={endPharmacistChat}
              className="text-white/80 hover:text-white transition"
              aria-label="End pharmacist chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          )}
          <button 
            onClick={closeChat}
            className="text-white/80 hover:text-white transition"
            aria-label="Close chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto max-h-[400px] min-h-[300px]">
        {messages.map(renderMessage)}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center mr-2 flex-shrink-0",
              connectedPharmacist ? "bg-green-600" : "bg-primary"
            )}>
              {connectedPharmacist ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-5 h-5 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-5 h-5 text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              )}
            </div>
            <div className={cn(
              "rounded-2xl px-4 py-2",
              connectedPharmacist ? "bg-green-100 border border-green-300" : "bg-gray-100"
            )}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Connecting to pharmacist indicator */}
        {isConnectingToPharmacist && (
          <div className="flex items-center justify-center py-2 px-4 bg-green-50 rounded-lg border border-green-200 my-2">
            <svg className="animate-spin h-4 w-4 text-green-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-green-700">Connecting to a pharmacist...</span>
          </div>
        )}
        
        {/* Pharmacist connect button - only shown when not already connected or connecting */}
        {!connectedPharmacist && !isConnectingToPharmacist && (
          <div className="flex justify-center my-2">
            <button
              onClick={connectToPharmacist}
              className="flex items-center bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              Connect with a Pharmacist
            </button>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={connectedPharmacist 
              ? `Ask ${connectedPharmacist.name} a question...` 
              : "Type your message..."
            }
            className={cn(
              "flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:border-transparent",
              connectedPharmacist 
                ? "border-green-300 focus:ring-green-500" 
                : "border-gray-300 focus:ring-primary"
            )}
          />
          <button
            type="submit"
            className={cn(
              "px-4 py-2 rounded-r-md transition",
              connectedPharmacist
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-primary hover:bg-primary-dark text-white"
            )}
            disabled={inputValue.trim() === ''}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
} 