'use client';

import { motion } from 'framer-motion';
import { Target, Award, TrendingUp, AlertCircle, CheckCircle2, Briefcase } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface MatchResultCardProps {
  result: string;
}

export default function MatchResultCard({ result }: MatchResultCardProps) {
  // Extract scores from the result (you may need to adjust this based on your actual result format)
  const matchScoreMatch = result.match(/Match Score:?\s*(\d+)/i);
  const atsScoreMatch = result.match(/ATS Score:?\s*(\d+)/i);
  
  const matchScore = matchScoreMatch ? parseInt(matchScoreMatch[1]) : 0;
  const atsScore = atsScoreMatch ? parseInt(atsScoreMatch[1]) : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#34d399";
    if (score >= 60) return "#fbbf24";
    return "#f87171";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <div className="result-container">
      {/* Score Cards */}
      <div className="score-grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="score-card"
        >
          <div className="score-header">
            <Target size={20} style={{ color: "#c084fc" }} />
            <div>
              <h3 className="score-title">Match Score</h3>
              <p className="score-subtitle">Job Compatibility</p>
            </div>
          </div>
          <div className="score-display">
            <div className="progress-ring">
              <CircularProgressbar
                value={matchScore}
                text={`${matchScore}%`}
                styles={buildStyles({
                  pathColor: getScoreColor(matchScore),
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.15)",
                  textSize: "24px",
                  pathTransition: "stroke-dashoffset 0.5s ease 0s",
                })}
              />
            </div>
            <span className={`score-label ${getScoreLabel(matchScore).toLowerCase()}`}>
              {getScoreLabel(matchScore)}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="score-card"
        >
          <div className="score-header">
            <Award size={20} style={{ color: "#34d399" }} />
            <div>
              <h3 className="score-title">ATS Score</h3>
              <p className="score-subtitle">System Compatibility</p>
            </div>
          </div>
          <div className="score-display">
            <div className="progress-ring">
              <CircularProgressbar
                value={atsScore}
                text={`${atsScore}%`}
                styles={buildStyles({
                  pathColor: getScoreColor(atsScore),
                  textColor: "#fff",
                  trailColor: "rgba(255, 255, 255, 0.15)",
                  textSize: "24px",
                  pathTransition: "stroke-dashoffset 0.5s ease 0s",
                })}
              />
            </div>
            <span className={`score-label ${getScoreLabel(atsScore).toLowerCase()}`}>
              {getScoreLabel(atsScore)}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="analysis-card"
      >
        <div className="analysis-header">
          <Briefcase size={20} />
          <h3 className="analysis-title">Detailed Analysis</h3>
        </div>
        <div 
          className="analysis-content"
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </motion.div>

      <style jsx>{`
        .result-container {
          width: 100%;
        }

        .score-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 640px) {
          .score-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
          }
        }

        .score-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
          transition: all var(--transition-base);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
        }

        .score-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
        }

        .score-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .score-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.125rem;
        }

        .score-subtitle {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .score-display {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .progress-ring {
          width: 5rem;
          height: 5rem;
          flex-shrink: 0;
        }

        .score-label {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .score-label.excellent {
          background: rgba(52, 211, 153, 0.15);
          border-color: rgba(52, 211, 153, 0.4);
          color: #34d399;
        }

        .score-label.good {
          background: rgba(251, 191, 36, 0.15);
          border-color: rgba(251, 191, 36, 0.4);
          color: #fbbf24;
        }

        .score-label.needs-work {
          background: rgba(248, 113, 113, 0.15);
          border-color: rgba(248, 113, 113, 0.4);
          color: #f87171;
        }

        .analysis-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: all var(--transition-base);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
        }

        .analysis-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .analysis-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .analysis-content {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.875rem;
        }

        .analysis-content h1,
        .analysis-content h2,
        .analysis-content h3,
        .analysis-content h4 {
          color: var(--text-primary);
          margin-top: 1.25rem;
          margin-bottom: 0.625rem;
          font-weight: 600;
        }

        .analysis-content h1 { font-size: 1.25rem; }
        .analysis-content h2 { font-size: 1.125rem; }
        .analysis-content h3 { font-size: 1rem; }
        .analysis-content h4 { font-size: 0.875rem; }

        .analysis-content p {
          margin-bottom: 0.75rem;
        }

        .analysis-content ul,
        .analysis-content ol {
          margin-left: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .analysis-content li {
          margin-bottom: 0.375rem;
        }

        .analysis-content strong {
          color: var(--text-primary);
          font-weight: 500;
        }

        .analysis-content code {
          background: rgba(124, 58, 237, 0.1);
          padding: 0.125rem 0.375rem;
          border-radius: var(--radius-sm);
          font-size: 0.813rem;
          color: var(--accent-secondary);
        }

        @media (max-width: 640px) {
          .score-card {
            padding: 1rem;
          }

          .progress-ring {
            width: 4rem;
            height: 4rem;
          }

          .score-title {
            font-size: 0.875rem;
          }

          .analysis-card {
            padding: 1.25rem;
          }

          .analysis-title {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .score-grid {
            gap: 0.75rem;
          }

          .analysis-card {
            padding: 1rem;
          }

          .score-label {
            font-size: 0.75rem;
            padding: 0.2rem 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
