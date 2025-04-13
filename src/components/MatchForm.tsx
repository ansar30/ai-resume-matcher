// MatchForm.tsx (Updated UI)
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, BadgeCheck } from 'lucide-react';
import 'react-circular-progressbar/dist/styles.css';
import { Toaster, toast } from 'react-hot-toast';
import AuthNavBar from './AuthNavbar';

export default function MatchForm() {
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
        toast.error('Please upload a PDF file.');
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
      toast.error('Error matching resume.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function extractScore(result: string | null): number {
    if (!result) return 0;

    const percentageMatch = result.match(/Match Score:\s*(\d{1,3})%/i);
    if (percentageMatch) {
      return Math.min(100, parseInt(percentageMatch[1], 10));
    }

    const outOfTenMatch = result.match(/Match Score:\s*(\d{1,2})\s*\/\s*10/i);
    if (outOfTenMatch) {
      const score = parseInt(outOfTenMatch[1], 10);
      return Math.min(100, Math.round((score / 10) * 100));
    }

    return 0;
  }


  useEffect(() => {
    const score = extractScore(result);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= score) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [result]);

  function MatchResultCard({ result, score }: { result: string; score: number }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full mt-10"
      >
        <div className="relative bg-white/80 dark:bg-[#111]/80 backdrop-blur-lg border border-blue-100 dark:border-gray-700 rounded-3xl shadow-xl px-6 py-8 transition-all duration-300 hover:shadow-2xl">

          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <BadgeCheck className="text-blue-600 dark:text-blue-400" size={24} />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Resume Match Result
              </h3>
            </div>

            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-md">
              Score: {score}%
            </span>
          </div>


          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 mb-4"></div>

          {/* Content */}
          <div className="max-h-72 overflow-y-auto pr-1 custom-scroll text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            <div className="flex items-start gap-2">
              <p>{result}</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4D55CC] to-[#7A73D1]">
      <Toaster position="top-center" />
      <AuthNavBar />

      <main className="max-w-4xl mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#F5EFFF] p-6 rounded-2xl shadow-xl ring-1 ring-gray-200 backdrop-blur-sm"
        >
          <div className="relative flex justify-center mb-8">
            <div className="flex border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setUseUpload(true)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${useUpload ? 'bg-[#4D55CC] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Upload size={16} /> Upload PDF
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUseUpload(false)}
                className={`px-6 py-2 text-sm font-medium transition-all duration-300 ${!useUpload ? 'bg-[#4D55CC] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} /> Paste Text
                </div>
              </button>
            </div>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">
            {useUpload ? (
              <div>
                <label className="block mb-2 font-medium text-gray-700">Upload Resume (PDF)</label>
                <input
                  type="file"
                  id="resumeFile"
                  accept="application/pdf"
                  className="block cursor-pointer w-full border border-gray-300 rounded-xl px-3 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            ) : (
              <div>
                <label className="block mb-2 font-medium text-gray-700">Resume Text</label>
                <textarea
                  className="custom-scroll w-full border border-gray-300 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner placeholder-gray-400"
                  rows={6}
                  placeholder="Paste your resume text here"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block mb-2 font-medium text-gray-700">Job Description</label>
              <textarea
                className="w-full custom-scroll border border-gray-300 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner placeholder-gray-400"
                rows={6}
                placeholder="Paste job description here"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-[#4D55CC] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
              disabled={loading}
            >
              {loading ? 'Matching...' : 'Match Resume'}
            </button>
          </form>

          {result && (
            <MatchResultCard result={result} score={extractScore(result)} />
          )}



        </motion.div>
      </main>
    </div>
  );
}
