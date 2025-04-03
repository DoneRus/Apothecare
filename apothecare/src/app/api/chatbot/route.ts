import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
// Note: You need to add your API key to the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { reply: "OpenAI API key is not configured. Please check server environment variables." },
        { status: 200 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful pharmacy assistant for ApotheCare, an online pharmacy service. Provide concise answers about medications, health advice, and the services ApotheCare offers. Keep responses brief and focused on healthcare topics.'
        },
        { role: 'user', content: message }
      ],
    });

    return NextResponse.json({ 
      reply: response.choices[0].message.content || "I'm sorry, I couldn't process your request."
    });
  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { reply: "Sorry, I encountered an error while processing your request." },
      { status: 500 }
    );
  }
} 