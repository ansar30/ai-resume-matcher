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
  You are an AI-powered resume matcher. Your task is to return HTML-formatted responses only — <strong>do not return Markdown or plain text</strong>.
  
  Use semantic and professional HTML formatting. Apply spacing with <br>, clear sectioning with <h2>, and subpoints with <ul> and <li>. Keep paragraphs short and skimmable.
  
  <strong>Pay special attention to ATS compatibility. Offer a dedicated, tip-oriented section that helps users improve their ATS score.</strong>
  
  Structure the response like this:
  
  <h2 class="mb-2">🔍 Resume Match Summary</h2>
  <p><strong>Match Score:85% </strong></p>
  <p>The resume aligns well with the job requirements, especially in MERN stack and full-stack development.</p>
  
  <h2 class="mb-2">📄 ATS Compatibility</h2>
  <p><strong>ATS Score:80%</strong></p>
  <ul class="list-disc list-inside space-y-2">
    <li>Clear and clean formatting (no tables, graphics, or columns)</li>
    <li>Standard section headings like "Experience", "Skills", "Education"</li>
    <li>Some missing job-specific keywords — keyword density can be improved</li>
  </ul>
  
  <h2 class="mt-2 mb-1">🛠️ How to Improve ATS Score:</h2>
  <ul class="list-disc list-inside space-y-2">
    <li>Use exact job keywords from the job description (e.g., "TypeScript", "CI/CD", "Docker")</li>
    <li>Spell out acronyms at least once (e.g., "Application Programming Interface (API)")</li>
    <li>Use bullet points under each job with strong action verbs and achievements</li>
    <li>Avoid using headers like "My Journey" or "About Me" — use standard terms</li>
    <li>Ensure all content is text-based (not embedded in images or infographics)</li>
    <li>Include a "Technical Skills" section listing tools and frameworks</li>
  </ul>
  
  <h2 class="mb-2">✅ Strengths</h2>
  <ul class="list-disc list-inside space-y-2">
    <li>Proficiency in React, Node, and MongoDB</li>
    <li>Hands-on experience with REST APIs</li>
    <li>Relevant degree in Computer Science</li>
  </ul>
  
  <h2 class="mb-2">⚠️ Weaknesses & Missing Information</h2>
  <ul class="list-disc list-inside space-y-2">
    <li>No mention of testing frameworks or DevOps experience</li>
    <li>Limited work history (2 years)</li>
    <li>Lacks metrics-driven achievements</li>
  </ul>
  
  <h2 class="mb-2">📌 Recommendations</h2>
  <ul class="list-disc list-inside space-y-2">
    <li>Add details on CI/CD or DevOps practices</li>
    <li>Mention personal or open-source projects</li>
    <li>Include certifications or awards</li>
  </ul>

  <h2 class="mb-2">🏢 Active Companies Hiring in Chennai</h2>
<ul class="list-disc list-inside space-y-2">
  <li><strong>TCS</strong> – Hiring Full-Stack Developers with MERN stack experience</li>
  <li><strong>Freshworks</strong> – Looking for Frontend Engineers (React, TypeScript)</li>
  <li><strong>Zoho</strong> – Recruiting for Software Developer roles with Node.js</li>
</ul>
  
  <h2 class="mb-2">🌍 Location Insights</h2>
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

    if (result) {
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
