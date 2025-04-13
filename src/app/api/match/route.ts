// app/api/match/route.ts
import { NextRequest, NextResponse } from 'next/server';
// @ts-expect-error: pdf-parse has no type definitions for direct import from 'pdf-parse/lib/pdf-parse.js'
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

import { chatWithGroq } from '../../../../lib/groq';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('resume') as File | null;
  const jobDescription = formData.get('jobDescription') as string | null;

  if (!file || !jobDescription) {
    return NextResponse.json({ error: 'Missing file or job description' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Explicitly type the result from pdfParse
  const pdfData: { text: string } = await pdfParse(buffer);
  const resumeText = pdfData.text;

  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are an AI resume matcher. Compare resume and job description and give a match score with explanation. Give the ATS friendly format score as well in percentage, Improvement tips for the ATS friendly resume',
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
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate match' }, { status: 500 });
  }
}
