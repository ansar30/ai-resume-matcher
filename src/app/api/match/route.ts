// app/api/match/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { chatWithGroq } from '../../../../lib/groq';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { resumeText, jobDescription } = body;

  if (!resumeText || !jobDescription) {
    return NextResponse.json({ error: 'Missing resume or job description' }, { status: 400 });
  }

  const messages = [
    {
      role: 'system',
      content: 'You are an AI resume matcher. Compare resume and job description and give a match score with explanation.',
    },
    {
      role: 'user',
      content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`,
    },
  ];

  try {
    const result = await chatWithGroq(messages);
    return NextResponse.json({ result });
  } catch (err) {
    console.error('Groq error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
