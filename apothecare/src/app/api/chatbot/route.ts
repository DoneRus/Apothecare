import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Debug: Log environment variable availability at server startup
console.log('🔑 API Key defined:', typeof process.env.OPENAI_API_KEY === 'string');
console.log('🔑 API Key length:', process.env.OPENAI_API_KEY?.length || 0);

// Initialize OpenAI client with better error handling
let openai: OpenAI | undefined;
try {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log('✅ OpenAI client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize OpenAI client:', error);
  openai = undefined;
}

export async function POST(request: Request) {
  console.log('📥 Received request to /api/chatbot');
  
  try {
    // Parse the request body
    const body = await request.json();
    console.log('📝 Request body:', body);
    
    const { message } = body;

    // Validate message
    if (!message) {
      console.log('❌ No message provided');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Check API key
    if (!process.env.OPENAI_API_KEY) {
      console.log('❌ OpenAI API key not configured');
      return NextResponse.json(
        { reply: "OpenAI API key is not configured. Please check server environment variables." },
        { status: 200 }
      );
    }

    // Check if OpenAI client was initialized
    if (!openai) {
      console.log('❌ OpenAI client not initialized');
      return NextResponse.json(
        { reply: "Failed to initialize OpenAI client. Please check server logs." },
        { status: 500 }
      );
    }

    console.log('🤖 Sending request to OpenAI');
    try {
      // Use gpt-3.5-turbo instead of gpt-4 (more widely available)
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful pharmacy assistant for ApotheCare, an online pharmacy service. Provide concise answers about medications, health advice, and the services ApotheCare offers. Keep responses brief and focused on healthcare topics.'
          },
          { role: 'user', content: message }
        ],
        // Shorter response for testing
        max_tokens: 150
      });

      console.log('✅ Received response from OpenAI');
      return NextResponse.json({ 
        reply: response.choices[0].message.content || "I'm sorry, I couldn't process your request."
      });
    } catch (openaiError: any) {
      console.error('❌ OpenAI API error:', openaiError);
      return NextResponse.json(
        { reply: `Error from OpenAI: ${openaiError.message || 'Unknown error'}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ General error in chatbot API:', error);
    return NextResponse.json(
      { reply: "Sorry, I encountered an error while processing your request." },
      { status: 500 }
    );
  }
} 