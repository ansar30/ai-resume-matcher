'use client';

import { useState } from 'react';

export default function Home() {
  const [jobDesc, setJobDesc] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [useUpload, setUseUpload] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('jobDescription', jobDesc);

    if (useUpload) {
      const fileInput = document.getElementById('resumeFile') as HTMLInputElement;
      if (!fileInput?.files?.[0]) {
        alert('Please upload a PDF file.');
        setLoading(false);
        return;
      }
      formData.append('resume', fileInput.files[0]);
    } else {
      formData.append('resume', new Blob([resumeText], { type: 'text/plain' }), 'resume.txt');
    }

    try {
      const res = await fetch('/api/match', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.result) setResult(data.result);
    } catch (err) {
      alert('Error matching resume.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Resume Matcher</h1>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${useUpload ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setUseUpload(true)}
          type="button"
        >
          Upload PDF
        </button>
        <button
          className={`px-4 py-2 rounded ${!useUpload ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setUseUpload(false)}
          type="button"
        >
          Paste Text
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {useUpload ? (
          <div>
            <label className="block mb-1 font-medium">Upload Resume (PDF)</label>
            <input
              type="file"
              id="resumeFile"
              accept="application/pdf"
              className="block w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
        ) : (
          <textarea
            className="w-full border p-2 rounded"
            rows={6}
            placeholder="Paste your resume text here"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        )}

        <div>
          <label className="block mb-1 font-medium">Job Description</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={6}
            placeholder="Paste job description here"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Matching...' : 'Match Resume'}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border bg-gray-50 whitespace-pre-wrap rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Match Result</h2>
          {result}
        </div>
      )}
    </main>
  );
}
