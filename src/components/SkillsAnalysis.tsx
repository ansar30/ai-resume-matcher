// SkillsAnalysis.tsx - Skills Gap Analysis System
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Book,
  ExternalLink,
  Sparkles,
  Target,
  Zap,
  Award,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-hot-toast";

interface Skill {
  name: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  importance: 'critical' | 'high' | 'medium' | 'low';
  trending: boolean;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
  overallMatch: number;
}

interface SkillsAnalysisProps {
  userId?: string;
}

export default function SkillsAnalysis({ userId }: SkillsAnalysisProps) {
  const [skillCategories] = useState<SkillCategory[]>([
    {
      name: "Programming Languages",
      overallMatch: 85,
      skills: [
        { name: "JavaScript", category: "Programming", currentLevel: 90, requiredLevel: 85, importance: "critical", trending: true },
        { name: "TypeScript", category: "Programming", currentLevel: 85, requiredLevel: 90, importance: "high", trending: true },
        { name: "Python", category: "Programming", currentLevel: 70, requiredLevel: 60, importance: "medium", trending: true },
        { name: "Java", category: "Programming", currentLevel: 40, requiredLevel: 70, importance: "low", trending: false }
      ]
    },
    {
      name: "Frameworks & Libraries",
      overallMatch: 78,
      skills: [
        { name: "React", category: "Frontend", currentLevel: 95, requiredLevel: 90, importance: "critical", trending: true },
        { name: "Next.js", category: "Frontend", currentLevel: 80, requiredLevel: 85, importance: "high", trending: true },
        { name: "Node.js", category: "Backend", currentLevel: 75, requiredLevel: 80, importance: "high", trending: true },
        { name: "GraphQL", category: "API", currentLevel: 60, requiredLevel: 70, importance: "medium", trending: true }
      ]
    },
    {
      name: "Soft Skills",
      overallMatch: 92,
      skills: [
        { name: "Communication", category: "Soft", currentLevel: 95, requiredLevel: 90, importance: "critical", trending: false },
        { name: "Leadership", category: "Soft", currentLevel: 85, requiredLevel: 80, importance: "high", trending: false },
        { name: "Problem Solving", category: "Soft", currentLevel: 90, requiredLevel: 85, importance: "critical", trending: false },
        { name: "Team Collaboration", category: "Soft", currentLevel: 92, requiredLevel: 90, importance: "high", trending: false }
      ]
    }
  ]);

  const getSkillGap = (skill: Skill) => skill.requiredLevel - skill.currentLevel;
  const hasGap = (skill: Skill) => getSkillGap(skill) > 0;

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return '#f43f5e';
      case 'high': return '#fbbf24';
      case 'medium': return '#a855f7';
      case 'low': return '#94a3b8';
      default: return '#e2e8f0';
    }
  };

  const getSkillStatusIcon = (skill: Skill) => {
    const gap = getSkillGap(skill);
    if (gap > 10) return XCircle;
    if (gap > 0) return AlertCircle;
    return CheckCircle;
  };

  const learningResources: Record<string, { title: string; url: string }[]> = {
    "TypeScript": [
      { title: "TypeScript Documentation", url: "https://www.typescriptlang.org/docs/" },
      { title: "TypeScript Deep Dive", url: "https://basarat.gitbook.io/typescript/" }
    ],
    "Java": [
      { title: "Java Programming Masterclass", url: "#" },
      { title: "Spring Boot Tutorial", url: "#" }
    ],
    "GraphQL": [
      { title: "GraphQL Official Tutorial", url: "https://graphql.org/learn/" },
      { title: "Apollo GraphQL Docs", url: "https://www.apollographql.com/docs/" }
    ],
    "Next.js": [
      { title: "Next.js Documentation", url: "https://nextjs.org/docs" },
      { title: "Next.js Learn Course", url: "https://nextjs.org/learn" }
    ],
    "Node.js": [
      { title: "Node.js Official Docs", url: "https://nodejs.org/docs/" },
      { title: "Node.js Best Practices", url: "#" }
    ]
  };

  return (
    <div className="skills-analysis">
      {/* Header */}
      <div className="analysis-header">
        <motion.h2 
          className="analysis-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Skills Gap Analysis
        </motion.h2>
        <motion.p 
          className="analysis-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Identify skill gaps and get personalized recommendations for career growth
        </motion.p>
      </div>

      {/* Overall Score */}
      <motion.div 
        className="overall-score-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="score-card glass-card">
          <div className="score-content">
            <div className="score-text">
              <h3>Overall Skills Match</h3>
              <p>Based on your target job requirements</p>
            </div>
            <div className="score-visual">
              <CircularProgressbar
                value={85}
                text={`85%`}
                styles={buildStyles({
                  pathColor: '#22d3ee',
                  textColor: '#ffffff',
                  trailColor: 'rgba(255, 255, 255, 0.1)',
                  textSize: '24px',
                })}
              />
            </div>
          </div>
          <div className="score-insights">
            <div className="insight-item">
              <Zap size={16} style={{ color: '#22d3ee' }} />
              <span>15 skills mastered</span>
            </div>
            <div className="insight-item">
              <Target size={16} style={{ color: '#fbbf24' }} />
              <span>5 skills to improve</span>
            </div>
            <div className="insight-item">
              <Award size={16} style={{ color: '#a855f7' }} />
              <span>Top 20% in your field</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Categories */}
      {skillCategories.map((category, categoryIndex) => (
        <motion.div
          key={category.name}
          className="skill-category"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + categoryIndex * 0.1 }}
        >
          <div className="category-header">
            <h3 className="category-name">{category.name}</h3>
            <div className="category-score">
              <CircularProgressbar
                value={category.overallMatch}
                text={`${category.overallMatch}%`}
                styles={buildStyles({
                  pathColor: category.overallMatch >= 80 ? '#22d3ee' : '#fbbf24',
                  textColor: '#ffffff',
                  trailColor: 'rgba(255, 255, 255, 0.1)',
                  textSize: '28px',
                  strokeLinecap: 'round',
                })}
              />
            </div>
          </div>

          <div className="skills-grid">
            {category.skills.map((skill, skillIndex) => {
              const gap = getSkillGap(skill);
              const needsImprovement = hasGap(skill);
              const StatusIcon = getSkillStatusIcon(skill);

              return (
                <motion.div
                  key={skill.name}
                  className="skill-card glass-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + skillIndex * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="skill-header">
                    <div className="skill-name-section">
                      <h4 className="skill-name">
                        {skill.name}
                        {skill.trending && (
                          <TrendingUp style={{ width: '1rem', height: '1rem', color: '#fbbf24' }} />
                        )}
                      </h4>
                      <span 
                        className="skill-importance"
                        style={{ 
                          color: getImportanceColor(skill.importance),
                          backgroundColor: `${getImportanceColor(skill.importance)}15`
                        }}
                      >
                        {skill.importance} priority
                      </span>
                    </div>
                    <div className="skill-status">
                      <StatusIcon 
                        size={20} 
                        style={{ 
                          color: needsImprovement 
                            ? (gap > 10 ? '#f43f5e' : '#fbbf24')
                            : '#22d3ee'
                        }} 
                      />
                    </div>
                  </div>

                  <div className="skill-levels">
                    <div className="level-item">
                      <span className="level-label">Current</span>
                      <div className="level-bar-container">
                        <div className="level-bar">
                          <div 
                            className="level-fill current"
                            style={{ width: `${skill.currentLevel}%` }}
                          />
                        </div>
                        <span className="level-value">{skill.currentLevel}%</span>
                      </div>
                    </div>
                    <div className="level-item">
                      <span className="level-label">Required</span>
                      <div className="level-bar-container">
                        <div className="level-bar">
                          <div 
                            className="level-fill required"
                            style={{ width: `${skill.requiredLevel}%` }}
                          />
                        </div>
                        <span className="level-value">{skill.requiredLevel}%</span>
                      </div>
                    </div>
                  </div>

                  {needsImprovement && (
                    <div className="skill-gap-info">
                      <div className="gap-indicator">
                        {gap > 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                        <span className="gap-text">
                          {Math.abs(gap)}% gap to close
                        </span>
                      </div>
                    </div>
                  )}

                  {needsImprovement && learningResources[skill.name] && (
                    <div className="learning-resources">
                      <h5>
                        <Book size={16} />
                        <span>Learning Resources</span>
                      </h5>
                      <div className="resource-links">
                        {learningResources[skill.name].map((resource, idx) => (
                          <a 
                            key={idx}
                            href={resource.url}
                            className="resource-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>{resource.title}</span>
                            <ExternalLink size={14} />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* AI Recommendations */}
      <motion.div
        className="recommendations-section glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{ marginTop: '2rem' }}
      >
        <div className="recommendations-header">
          <div className="rec-icon">
            <Sparkles size={24} />
          </div>
          <h3>AI-Powered Recommendations</h3>
        </div>
        <div className="recommendations-content">
          <div className="rec-summary">
            <p>Based on your skills analysis, here's your personalized learning path:</p>
          </div>
          <div className="rec-grid">
            <div className="rec-item">
              <div className="rec-number">1</div>
              <div className="rec-text">
                <h4>Focus on TypeScript</h4>
                <p>Close the 5% gap to meet high-priority requirements</p>
              </div>
            </div>
            <div className="rec-item">
              <div className="rec-number">2</div>
              <div className="rec-text">
                <h4>Strengthen Java Skills</h4>
                <p>30% improvement needed for broader opportunities</p>
              </div>
            </div>
            <div className="rec-item">
              <div className="rec-number">3</div>
              <div className="rec-text">
                <h4>Learn GraphQL</h4>
                <p>Growing demand with 10% gap to industry standard</p>
              </div>
            </div>
          </div>
          <div className="rec-footer">
            <p className="rec-note">
              <strong>Great news!</strong> Your soft skills are exceptional and place you in the top tier of candidates.
            </p>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        .skills-analysis {
          width: 100%;
          padding: 2rem 0;
        }

        .analysis-header {
          text-align: center;
          margin-bottom: 4rem;
          padding: 0 1rem;
        }

        .analysis-title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .analysis-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 40rem;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Overall Score Section */
        .overall-score-section {
          margin-bottom: 4rem;
          padding: 0 1rem;
        }

        .score-card {
          max-width: 42rem;
          margin: 0 auto;
          padding: 3rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
          border-radius: var(--radius-lg);
        }

        .score-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
        }

        .score-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 2.5rem;
        }

        .score-text h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.75rem;
          line-height: 1.2;
        }

        .score-text p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .score-visual {
          width: 9rem;
          height: 9rem;
          flex-shrink: 0;
          filter: drop-shadow(0 4px 16px rgba(34, 211, 238, 0.3));
        }

        .score-insights {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 2rem;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .insight-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          padding: 0.75rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-full);
          transition: all var(--transition-base);
        }

        .insight-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }

        /* Skill Categories */
        .skill-category {
          margin-bottom: 4rem;
          padding: 0 1rem;
        }

        .skill-category:last-child {
          margin-bottom: 3rem;
        }

        .category-header {
          display: flex;
          margin-top: 2rem;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding: 1.75rem 2rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-lg);
        }

        .category-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .category-score {
          width: 4.5rem;
          height: 4.5rem;
          filter: drop-shadow(0 2px 8px rgba(34, 211, 238, 0.3));
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
          align-items: stretch;
        }

        @media (min-width: 1200px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .skill-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          transition: all var(--transition-base);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
          border-radius: var(--radius-lg);
          height: 100%;
          min-height: 320px;
        }

        .skill-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .skill-name-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skill-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          line-height: 1.3;
        }

        .skill-importance {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-sm);
          display: inline-block;
          width: fit-content;
        }

        .skill-status {
          padding: 0.625rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .skill-levels {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          flex: 1;
        }

        .level-item {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .level-label {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .level-bar-container {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .level-bar {
          flex: 1;
          height: 0.75rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          overflow: hidden;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .level-fill {
          height: 100%;
          border-radius: var(--radius-full);
          transition: width var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .level-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .level-fill.current {
          background: linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%);
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
        }

        .level-fill.required {
          background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
          box-shadow: 0 2px 8px rgba(34, 211, 238, 0.4);
        }

        .level-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
          min-width: 3.5rem;
          text-align: right;
        }

        .skill-gap-info {
          padding: 1.25rem;
          background: rgba(251, 191, 36, 0.08);
          border-radius: var(--radius-md);
          border: 1px solid rgba(251, 191, 36, 0.15);
          backdrop-filter: blur(4px);
          margin-top: 0.75rem;
        }

        .gap-indicator {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          color: #fbbf24;
          font-weight: 500;
        }

        .gap-text {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .learning-resources {
          padding-top: 1.75rem;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .learning-resources h5 {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 1rem;
        }

        .resource-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .resource-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-sm);
          color: var(--accent-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all var(--transition-base);
        }

        .resource-link:hover {
          background: rgba(139, 92, 246, 0.1);
          transform: translateX(4px);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        /* Recommendations Section */
        .recommendations-section {
          padding: 3rem;
          margin: 3rem 1rem 0;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
          border-radius: var(--radius-lg);
        }

        .recommendations-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        .rec-icon {
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, #f472b6 0%, #f97316 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(244, 114, 182, 0.4);
        }

        .recommendations-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .rec-summary {
          margin-bottom: 2.5rem;
        }

        .rec-summary p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 1rem;
        }

        .rec-grid {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-bottom: 2.5rem;
        }

        .rec-item {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all var(--transition-base);
        }

        .rec-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        .rec-number {
          width: 2.5rem;
          height: 2.5rem;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
        }

        .rec-text h4 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }

        .rec-text p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.6;
        }

        .rec-footer {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .rec-note {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.6;
          padding: 1.25rem;
          background: rgba(34, 211, 238, 0.08);
          border: 1px solid rgba(34, 211, 238, 0.15);
          border-radius: var(--radius-md);
        }

        .rec-note strong {
          color: #22d3ee;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        @media (max-width: 768px) {
          .skills-analysis {
            padding: 1rem 0;
          }

          .analysis-header {
            margin-bottom: 3rem;
          }

          .score-card {
            padding: 2.5rem;
          }

          .score-content {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
          }

          .score-visual {
            width: 8rem;
            height: 8rem;
          }

          .score-insights {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
          }

          .skill-category {
            margin-bottom: 3rem;
          }

          .category-header {
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
            text-align: center;
            padding: 1.5rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .skill-card {
            padding: 2rem;
            min-height: 280px;
          }

          .recommendations-section {
            padding: 2.5rem;
            margin: 2rem 1rem 0;
          }
        }

        @media (max-width: 480px) {
          .analysis-title {
            font-size: 1.5rem;
          }

          .analysis-description {
            font-size: 1rem;
          }

          .score-card {
            padding: 2rem;
          }

          .skill-card {
            padding: 1.75rem;
          }

          .skill-name {
            font-size: 1.125rem;
          }

          .level-bar-container {
            gap: 1rem;
          }

          .recommendations-header {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .rec-item {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 