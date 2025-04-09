'use client';

import React from 'react';
import { motion } from 'framer-motion';

type ChatMessageProps = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  isCompact?: boolean;
};

export default function ChatMessage({ role, content, timestamp, isCompact = false }: ChatMessageProps) {
  // Format the timestamp if it exists
  const formattedTime = timestamp ? 
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp) : '';

  // Apply different styles based on the role
  const isUser = role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30,
        mass: 1
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
        </div>
      )}

      <div className={`
        ${isCompact ? 'max-w-[90%]' : 'max-w-[75%]'}
        ${isUser 
          ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-tr-none shadow-sm shadow-primary/10' 
          : 'bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none shadow-sm'}
        ${isCompact ? 'px-3 py-2' : 'px-4 py-3'}
      `}>
        <div className="flex items-center mb-1">
          {isUser ? (
            <span className={`font-medium ${isCompact ? 'text-xs' : 'text-sm'} text-white/90`}>
              You
            </span>
          ) : (
            <span className={`font-medium ${isCompact ? 'text-xs' : 'text-sm'} text-gray-800`}>
              ApotheCare AI
            </span>
          )}
          
          {timestamp && (
            <span className={`ml-2 ${isCompact ? 'text-[10px]' : 'text-xs'} ${isUser ? 'text-white/70' : 'text-gray-500'}`}>
              {formattedTime}
            </span>
          )}
        </div>
        
        <div className={`${isCompact ? 'text-xs' : 'text-sm'} whitespace-pre-wrap ${isUser ? 'text-white/90' : 'text-gray-700'}`}>
          {content}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 ml-2 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>
      )}
    </motion.div>
  );
} 