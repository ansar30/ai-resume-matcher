'use client';

import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'; // Optional for better markdown tables, lists, etc.
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
      <div className="relative bg-white/90 dark:bg-[#111]/80 backdrop-blur-xl border border-blue-100 dark:border-gray-800 rounded-3xl shadow-xl px-6 py-8 transition-all duration-300 hover:shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BadgeCheck className="text-blue-600 dark:text-blue-400" size={24} />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Resume Match Result
            </h3>
          </div>

          {/* Score badge */}
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow">
            Match Score: {score}/10
          </span>
        </div>

        {/* Result Content */}
        <div className="flex flex-col gap-6">
<div
  className="max-h-[400px] overflow-y-auto pr-2 custom-scroll text-sm leading-relaxed text-gray-700 dark:text-gray-300"
  dangerouslySetInnerHTML={{ __html: result }}
/>

        </div>
      </div>
    </motion.div>
  );
}
