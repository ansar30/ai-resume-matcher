import axios from 'axios';

const deepSeekClient = axios.create({
  baseURL: 'https://api.deepseek.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
  },
});

export const callDeepSeek = async (message: string[]) => {
  const response = await deepSeekClient.post('/chat/completions', {
    model: 'deepseek-chat', // or 'deepseek-coder'
    messages: [
        { role: 'user', content: 'Need to know about new AI' }
      ]
  });

  return response.data.choices[0].message.content;
};
