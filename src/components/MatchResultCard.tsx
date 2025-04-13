'use client';

import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import 'react-circular-progressbar/dist/styles.css';

export default function MatchResultCard({
  result,
  score,
}: {
  result: string;
  score: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full mt-10"
    >
      <div className="relative bg-white/80 dark:bg-[#111]/80 backdrop-blur-lg border border-blue-100 dark:border-gray-700 rounded-3xl shadow-xl px-6 py-8 transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BadgeCheck className="text-blue-600 dark:text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Resume Match Result
            </h3>
          </div>

          {/* Score badge */}
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold shadow-md">
            Score: {score}/10
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Result Text */}
          <div className="flex-1 max-h-72 overflow-y-auto pr-1 custom-scroll text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {/* Use ReactMarkdown to render Markdown content */}
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
