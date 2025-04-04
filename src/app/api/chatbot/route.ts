import { NextResponse } from 'next/server';

// Types for the request and response
type ChatRequest = {
  message: string;
  action?: string; // Optional action parameter for special actions like "connectPharmacist"
};

type ChatResponse = {
  message: string;
  timestamp: string;
  action?: string; // For special response actions
  data?: any; // Additional data for special responses
};

// Function to process messages based on content
function processMessage(message: string): ChatResponse {
  const lowerCaseMessage = message.toLowerCase();
  
  // Check for pharmacist connection request
  if ((lowerCaseMessage.includes('pharmacist') && 
      (lowerCaseMessage.includes('speak') || lowerCaseMessage.includes('talk') || lowerCaseMessage.includes('connect'))) || 
      lowerCaseMessage.includes('live support') || 
      lowerCaseMessage.includes('real person')) {
    return {
      message: "I'll connect you with a pharmacist now. Please wait a moment while I transfer your chat...",
      timestamp: new Date().toISOString(),
      action: "connectPharmacist",
      data: {
        estimatedWaitTime: "2 minutes",
        pharmacistName: "Dr. Sarah Johnson"
      }
    };
  }
  
  // Regular message processing
  let responseMessage = '';
  
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
    responseMessage = 'Hello! How can I assist you with your medications today?';
  } else if (lowerCaseMessage.includes('prescription')) {
    responseMessage = 'To refill a prescription, please navigate to the "Prescriptions" section or provide your prescription ID here.';
  } else if (lowerCaseMessage.includes('delivery')) {
    responseMessage = 'We typically deliver medications within 1-2 business days. For urgent medications, we offer express delivery options.';
  } else if (lowerCaseMessage.includes('pharmacist') || lowerCaseMessage.includes('consult')) {
    responseMessage = 'Our pharmacists are available 24/7. Would you like me to connect you with a pharmacist for a consultation? Just type "connect with pharmacist" if you\'d like to speak to someone directly.';
  } else if (lowerCaseMessage.includes('side effect') || lowerCaseMessage.includes('reaction')) {
    responseMessage = 'If you are experiencing side effects, please consult your doctor immediately. For severe reactions, please call emergency services.';
  } else if (lowerCaseMessage.includes('order') && lowerCaseMessage.includes('status')) {
    responseMessage = 'To check your order status, please go to the "Orders" section or provide your order ID here.';
  } else if (lowerCaseMessage.includes('thanks') || lowerCaseMessage.includes('thank you')) {
    responseMessage = 'You are welcome! Is there anything else I can help you with?';
  } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
    responseMessage = 'Thank you for using ApotheCare! Have a great day.';
  } else {
    responseMessage = 'I am here to help with your healthcare needs. You can ask me about prescriptions, deliveries, consultations with pharmacists, or order status.';
  }
  
  return {
    message: responseMessage,
    timestamp: new Date().toISOString()
  };
}

// POST handler for chat messages
export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    
    // Validate the request
    if (!body.message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    
    // Handle special actions
    if (body.action === "connectPharmacist") {
      // In a real application, this would initiate a connection to a live agent system
      // For this demo, we'll simulate the connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json({
        message: "You've been connected with Dr. Sarah Johnson. How can I help you today?",
        timestamp: new Date().toISOString(),
        action: "pharmacistConnected",
        data: {
          pharmacistId: "ph-12345",
          pharmacistName: "Dr. Sarah Johnson",
          pharmacistSpecialty: "General Pharmacy, Medication Management"
        }
      });
    }
    
    // Process regular messages
    const response = processMessage(body.message);
    
    // Simulate server processing delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Return the response
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your message' },
      { status: 500 }
    );
  }
} 