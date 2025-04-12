import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '', // Make sure your .env file has this key
});

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: {
    message: {
      content: string | null;
    };
  }[];
}


export async function chatWithGroq(messages: Message[]): Promise<string | null> {
  const response: GroqResponse = await groq.chat.completions.create({
    model: 'meta-llama/llama-4-scout-17b-16e-instruct',
    messages,
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
  });

  return response.choices[0].message.content;
}
