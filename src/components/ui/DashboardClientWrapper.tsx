'use client';

import React from 'react';
import { ChatbotButton } from './ChatbotButton';
import { ChatbotWidget } from './ChatbotWidget';

export function DashboardClientWrapper() {
  return (
    <>
      <ChatbotButton />
      <ChatbotWidget />
    </>
  );
} 