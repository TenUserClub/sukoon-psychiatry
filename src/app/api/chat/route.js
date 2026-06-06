import { NextResponse } from 'next/server';

/**
 * POST /api/chat
 * Mock chatbot endpoint. Accepts a messages array and returns a canned assistant response.
 * This will be replaced with a real AI/LLM integration in the future.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'messages array is required' },
        { status: 400 }
      );
    }

    // Extract the last user message for context
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');

    return NextResponse.json({
      role: 'assistant',
      content: `Thank you for your message${lastUserMessage ? ': "' + lastUserMessage.content.slice(0, 60) + '..."' : ''}. Our AI chatbot is currently under development. For immediate assistance, please use our WhatsApp chat or call the clinic directly. We are here to help!`,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
