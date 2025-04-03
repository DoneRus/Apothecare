'use client';

import dynamic from 'next/dynamic';

// Import Chatbot component with dynamic import to avoid hydration errors
const Chatbot = dynamic(() => import('./Chatbot'), { ssr: false });

export default function ChatbotWrapper() {
  return <Chatbot />;
} 