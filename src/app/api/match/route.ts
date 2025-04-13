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
<table class="table-auto border-collapse border border-gray-300 w-full text-left text-sm">
  <thead class="bg-gray-100">
    <tr>
      <th class="border border-gray-300 px-2 py-1">Detected Issue</th>
      <th class="border border-gray-300 px-2 py-1">Action to Improve ATS Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-2 py-1">Missing job-specific keywords</td>
      <td class="border border-gray-300 px-2 py-1">Scan the job description and mirror relevant terms exactly (e.g., “CI/CD”, “Docker”, “Agile”)</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">Non-standard section headings</td>
      <td class="border border-gray-300 px-2 py-1">Use universal labels: “Work Experience”, “Skills”, “Education”, “Projects”</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">Weak or generic bullet points</td>
      <td class="border border-gray-300 px-2 py-1">Use action verbs + measurable results (e.g., “Increased API performance by 30%”)</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">Acronyms without explanations</td>
      <td class="border border-gray-300 px-2 py-1">Spell out once: “Application Programming Interface (API)” — improves clarity for ATS parsing</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">Lack of structured keyword section</td>
      <td class="border border-gray-300 px-2 py-1">Add a “Technical Skills” or “Core Competencies” section with keyword-rich content</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-2 py-1">Unparseable content (graphics, tables)</td>
      <td class="border border-gray-300 px-2 py-1">Use plain text — avoid columns, images, tables, or fancy designs</td>
    </tr>
  </tbody>
</table>

  
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
