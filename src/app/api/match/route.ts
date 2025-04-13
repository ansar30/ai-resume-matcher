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
      content: `
  You are an AI-powered resume matcher. Your task is to return HTML-formatted responses only — **do not return Markdown or plain text**.
  
  Use semantic and professional HTML formatting. Apply spacing with <br>, clear sectioning with <h2>, and subpoints with <ul> and <li>. Keep paragraphs short and skimmable.
  
  Structure like this:
  
  <h2>🔍 Resume Match Summary</h2>
  <p>Match Score:85%</p>
  <p>The resume aligns well with the job requirements, especially in MERN stack and full-stack development.</p>
  
  <h2>📄 ATS Compatibility</h2>
  <p>ATS Score:80%</p>
  <ul classname:"list-disc list-inside space-y-2">
    <li classname:"list-disc list-inside space-y-2">Clear formatting</li>
    <li>Standard section headings used</li>
    <li>Minor optimization needed for keyword density</li>
  </ul>
  
  <h2>✅ Strengths</h2>
  <ul classname:"list-disc list-inside space-y-2">
    <li>Proficiency in React, Node, and MongoDB</li>
    <li>Hands-on experience with REST APIs</li>
    <li>Relevant degree in Computer Science</li>
  </ul>
  
  <h2>⚠️ Weaknesses & Missing Information</h2>
  <ul classname:"list-disc list-inside space-y-2">
    <li>No mention of testing frameworks or DevOps experience</li>
    <li>Limited work history (2 years)</li>
    <li>Lacks metrics-driven achievements</li>
  </ul>
  
  <h2>📌 Recommendations</h2>
  <ul classname:"list-disc list-inside space-y-2">
    <li>Add details on CI/CD or DevOps practices</li>
    <li>Mention personal or open-source projects</li>
    <li>Include certifications or awards</li>
  </ul>
  
  <h2>🌍 Location Insights</h2>
  <p><strong>Chennai, India:</strong> Competitive job market with strong demand for MERN stack and cloud development roles. Trends show a shift toward AI/ML skills.</p>
  
  Use line breaks (<br>) between paragraphs when needed, and avoid cramming content into dense blocks. Use <strong> for keywords and make your response easy to visually parse.
  `
    },
    {
      role: 'user',
      content: `Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}`
    }
  ];
  
  
  // 🧠 Extract Match & ATS Scores from Groq HTML output
function extractMatchScore(html: string): number {
  const match = html.match(/Match Score:\s*(\d{1,3})%/i);
  return match ? Math.min(100, parseInt(match[1], 10)) : 0;
}

function extractAtsScore(html: string): number {
  const match = html.match(/ATS Score:\s*(\d{1,3})%/i);
  return match ? Math.min(100, parseInt(match[1], 10)) : 0;
}

  try {
    const result = await chatWithGroq(messages);

    if(result){
      const matchScore = extractMatchScore(result);
      const atsScore = extractAtsScore(result);
  
      return NextResponse.json({
        result,
        matchScore,
        atsScore
      });
    }

    
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to generate match' }, { status: 500 });
  }
}
