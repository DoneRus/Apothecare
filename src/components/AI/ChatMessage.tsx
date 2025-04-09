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
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div className={`
        rounded-lg px-3 py-2 max-w-[85%] 
        ${isUser ? 'bg-primary text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}
        ${isCompact ? 'text-sm' : ''}
      `}>
        <div className="flex items-center mb-1">
          <span className={`font-semibold ${isCompact ? 'text-xs' : 'text-sm'}`}>
            {isUser ? 'You' : 'ApotheCare AI'}
          </span>
          {timestamp && (
            <span className={`opacity-70 ml-2 ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
              {formattedTime}
            </span>
          )}
        </div>
        <div className={`whitespace-pre-wrap ${isCompact ? 'text-xs' : 'text-sm'}`}>
          {content}
        </div>
      </div>
    </motion.div>
  );
} 