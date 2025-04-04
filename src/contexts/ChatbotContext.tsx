'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our messages
export interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'bot' | 'pharmacist';
  timestamp: Date;
  metadata?: any; // For additional message data
}

// Define the type for our context
interface ChatbotContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (content: string) => void;
  isTyping: boolean;
  isConnectingToPharmacist: boolean;
  connectedPharmacist: PharmacistInfo | null;
  connectToPharmacist: () => void;
  endPharmacistChat: () => void;
}

// Pharmacist information type
interface PharmacistInfo {
  id: string;
  name: string;
  specialty: string;
}

// Create the context with a default undefined value
const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

// Sample initial messages
const initialMessages: ChatMessage[] = [
  {
    id: 1,
    content: 'Hello! How can I help you with your healthcare needs today?',
    sender: 'bot',
    timestamp: new Date(),
  },
];

// Create the provider component
export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isConnectingToPharmacist, setIsConnectingToPharmacist] = useState(false);
  const [connectedPharmacist, setConnectedPharmacist] = useState<PharmacistInfo | null>(null);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);
  const toggleChat = () => setIsOpen(!isOpen);

  // Function to connect to a pharmacist
  const connectToPharmacist = async () => {
    if (isConnectingToPharmacist || connectedPharmacist) return;
    
    setIsConnectingToPharmacist(true);
    
    // Add a message indicating we're connecting
    const connectingMessage: ChatMessage = {
      id: messages.length + 1,
      content: "Connecting you with a pharmacist. Please wait a moment...",
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, connectingMessage]);
    
    try {
      // Call the API endpoint with the connectPharmacist action
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: "Connect with pharmacist", 
          action: "connectPharmacist" 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to connect with pharmacist');
      }
      
      const data = await response.json();
      
      if (data.action === "pharmacistConnected" && data.data) {
        // Save the pharmacist information
        setConnectedPharmacist({
          id: data.data.pharmacistId,
          name: data.data.pharmacistName,
          specialty: data.data.pharmacistSpecialty
        });
        
        // Add a message from the pharmacist
        const pharmacistMessage: ChatMessage = {
          id: messages.length + 2,
          content: data.message,
          sender: 'pharmacist',
          timestamp: new Date(data.timestamp),
          metadata: {
            pharmacistName: data.data.pharmacistName,
            pharmacistId: data.data.pharmacistId
          }
        };
        
        setMessages(prev => [...prev, pharmacistMessage]);
      }
    } catch (error) {
      console.error('Error connecting to pharmacist:', error);
      
      // Add an error message
      const errorMessage: ChatMessage = {
        id: messages.length + 2,
        content: 'Sorry, I was unable to connect you with a pharmacist at this time. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsConnectingToPharmacist(false);
    }
  };
  
  // Function to end the pharmacist chat
  const endPharmacistChat = () => {
    if (!connectedPharmacist) return;
    
    // Add a message indicating the chat has ended
    const endChatMessage: ChatMessage = {
      id: messages.length + 1,
      content: `Your consultation with ${connectedPharmacist.name} has ended. Is there anything else I can help you with?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, endChatMessage]);
    setConnectedPharmacist(null);
  };

  // Function to get bot responses from the API
  const getBotResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      // If connected to a pharmacist, handle differently
      if (connectedPharmacist) {
        // In a real app, this would send the message to the live pharmacist
        // For this demo, we'll simulate the pharmacist's response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const pharmacistResponse: ChatMessage = {
          id: messages.length + 2,
          content: getSimulatedPharmacistResponse(userMessage),
          sender: 'pharmacist',
          timestamp: new Date(),
          metadata: {
            pharmacistName: connectedPharmacist.name,
            pharmacistId: connectedPharmacist.id
          }
        };
        
        setMessages(prev => [...prev, pharmacistResponse]);
        setIsTyping(false);
        return;
      }
      
      // Regular bot response for non-pharmacist chats
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from chatbot API');
      }
      
      const data = await response.json();
      
      // Check if the bot wants to initiate a pharmacist connection
      if (data.action === "connectPharmacist") {
        // Add the bot message first
        const botMessage: ChatMessage = {
          id: messages.length + 2,
          content: data.message,
          sender: 'bot',
          timestamp: new Date(data.timestamp),
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Then connect to the pharmacist
        await connectToPharmacist();
      } else {
        // Regular bot message
        const newMessage: ChatMessage = {
          id: messages.length + 2,
          content: data.message,
          sender: 'bot',
          timestamp: new Date(data.timestamp),
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      // Fallback response in case of API failure
      const fallbackMessage: ChatMessage = {
        id: messages.length + 2,
        content: 'Sorry, I encountered an issue processing your request. Please try again later.',
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to simulate pharmacist responses
  const getSimulatedPharmacistResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('thank')) {
      // End the chat when the user says goodbye
      setTimeout(() => endPharmacistChat(), 1000);
      return "You're welcome! I'm glad I could help. Is there anything else you'd like to know before we end the consultation?";
    } else if (lowerCaseMessage.includes('side effect')) {
      return "That's a common concern. Side effects can vary between individuals. Would you like me to explain the most common side effects for this medication and how to manage them?";
    } else if (lowerCaseMessage.includes('dosage') || lowerCaseMessage.includes('dose')) {
      return "Regarding your dosage question, it's important to follow your doctor's prescription exactly. However, I can provide some general information about typical dosing schedules and what to do if you miss a dose.";
    } else if (lowerCaseMessage.includes('interaction') || lowerCaseMessage.includes('mix with')) {
      return "Drug interactions are important to consider. Could you tell me what other medications or supplements you're currently taking so I can provide specific advice?";
    } else if (lowerCaseMessage.includes('alternative') || lowerCaseMessage.includes('instead of')) {
      return "There may be alternatives available. The best option depends on your specific condition, medical history, and other factors. I'd be happy to discuss some potential options, but any change should be approved by your doctor.";
    } else {
      return "Thank you for your question. Let me provide some professional guidance on that. What specific concerns do you have about your medication or treatment?";
    }
  };

  // Function to send a message
  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Get bot response from API
    getBotResponse(content);
  };

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        isOpen,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        isTyping,
        isConnectingToPharmacist,
        connectedPharmacist,
        connectToPharmacist,
        endPharmacistChat
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

// Create a hook to use the context
export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
} 