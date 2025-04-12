'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [resume, setResume] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/match', {
        resumeText: resume,
        jobDescription: jobDesc,
      });

      setResult(res.data.result);
    } catch (err) {
      alert('Error matching resume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">AI Resume Matcher</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border p-2"
          rows={6}
          placeholder="Paste Resume Text"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2"
          rows={6}
          placeholder="Paste Job Description"
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Matching...' : 'Match Resume'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border bg-gray-50 whitespace-pre-wrap">
          {result}
        </div>
      )}
    </main>
  );
}
