'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: string;
}

interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: number) => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  // Sample initial notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'New order received', message: 'Order #12350 has been placed', time: '2 minutes ago', isRead: false, type: 'order' },
    { id: 2, title: 'Low stock alert', message: 'Paracetamol 500mg is running low on stock', time: '1 hour ago', isRead: false, type: 'stock' },
    { id: 3, title: 'Payment processed', message: 'Payment for order #12348 has been successful', time: '3 hours ago', isRead: true, type: 'payment' },
    { id: 4, title: 'New customer registered', message: 'Richard Anderson has created an account', time: '5 hours ago', isRead: true, type: 'customer' },
    { id: 5, title: 'Order shipped', message: 'Order #12346 has been shipped', time: '1 day ago', isRead: true, type: 'order' },
    { id: 6, title: 'Refund request', message: 'Customer requested refund for order #12342', time: '2 days ago', isRead: true, type: 'payment' },
    { id: 7, title: 'System update', message: 'The system will undergo maintenance on June 15, 2023', time: '3 days ago', isRead: true, type: 'system' },
    { id: 8, title: 'Product review', message: 'New 5-star review for Vitamin C Supplements', time: '4 days ago', isRead: true, type: 'product' },
  ]);

  // Mark a single notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, isRead: true }))
    );
  };
  
  // Delete a notification
  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };
  
  // Add a new notification
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newId = notifications.length > 0 
      ? Math.max(...notifications.map(n => n.id)) + 1 
      : 1;
    
    setNotifications([
      { id: newId, ...notification },
      ...notifications
    ]);
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        markAsRead, 
        markAllAsRead, 
        deleteNotification,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 