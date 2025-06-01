// InterviewPrep.tsx - Interview Preparation System
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain,
  MessageSquare,
  Video,
  Clock,
  ChevronRight,
  Star,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Target,
  Sparkles,
  Book,
  Users,
  TrendingUp
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Question {
  id: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  hint?: string;
  sampleAnswer: string;
  tips: string[];
}

interface MockInterview {
  id: string;
  company: string;
  position: string;
  duration: number;
  questions: Question[];
  completed: boolean;
  score?: number;
}

export default function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const categories = [
    { id: 'all', label: 'All Questions', icon: Brain, color: '#7c3aed' },
    { id: 'behavioral', label: 'Behavioral', icon: Users, color: '#a855f7' },
    { id: 'technical', label: 'Technical', icon: Target, color: '#22d3ee' },
    { id: 'situational', label: 'Situational', icon: MessageSquare, color: '#fbbf24' },
  ];

  const questions: Question[] = [
    {
      id: '1',
      category: 'behavioral',
      difficulty: 'medium',
      question: "Tell me about a time when you had to work with a difficult team member.",
      hint: "Use the STAR method: Situation, Task, Action, Result",
      sampleAnswer: "In my previous role, I worked with a team member who...",
      tips: [
        "Be specific about the situation",
        "Focus on your actions, not the other person's faults",
        "Highlight the positive outcome",
        "Show emotional intelligence"
      ]
    },
    {
      id: '2',
      category: 'technical',
      difficulty: 'hard',
      question: "Explain the difference between REST and GraphQL APIs.",
      hint: "Compare architecture, data fetching, and use cases",
      sampleAnswer: "REST and GraphQL are both API architectures, but they differ in...",
      tips: [
        "Start with a high-level overview",
        "Use real-world examples",
        "Mention pros and cons of each",
        "Relate to your experience"
      ]
    },
    {
      id: '3',
      category: 'situational',
      difficulty: 'easy',
      question: "How would you prioritize multiple urgent tasks?",
      hint: "Discuss your prioritization framework",
      sampleAnswer: "When faced with multiple urgent tasks, I would first...",
      tips: [
        "Mention specific prioritization methods",
        "Consider stakeholder impact",
        "Show communication skills",
        "Be realistic about timelines"
      ]
    }
  ];

  const mockInterviews: MockInterview[] = [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Frontend Developer',
      duration: 45,
      questions: questions.slice(0, 5),
      completed: false
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Engineer',
      duration: 30,
      questions: questions.slice(1, 4),
      completed: true,
      score: 85
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#22d3ee';
      case 'medium': return '#fbbf24';
      case 'hard': return '#f43f5e';
      default: return '#94a3b8';
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  const handleStartRecording = () => {
    setIsRecording(true);
    toast.success("Recording started - practice your answer!");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    toast.success("Recording stopped - review your answer");
  };

  return (
    <div className="interview-prep">
      {/* Header */}
      <div className="prep-header">
        <motion.h2 
          className="prep-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Interview Preparation
        </motion.h2>
        <motion.p 
          className="prep-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Practice common interview questions and ace your next interview
        </motion.p>
      </div>

      {/* Quick Stats */}
      <motion.div 
        className="prep-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="stat-card glass-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <Brain size={24} />
          </div>
          <div className="stat-info">
            <h3>150+</h3>
            <p>Practice Questions</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Video size={24} />
          </div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Mock Interviews</p>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>85%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </motion.div>

      {/* Category Filters */}
      <motion.div 
        className="category-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            style={{
              borderColor: selectedCategory === category.id ? category.color : 'transparent',
              color: selectedCategory === category.id ? category.color : 'var(--text-secondary)',
              backgroundColor: selectedCategory === category.id ? `${category.color}20` : 'transparent'
            }}
          >
            <category.icon size={18} />
            <span>{category.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Difficulty Filter */}
      <motion.div 
        className="difficulty-filters"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="filter-label">Difficulty:</span>
        {['all', 'easy', 'medium', 'hard'].map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`difficulty-btn ${selectedDifficulty === diff ? 'active' : ''}`}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Questions List */}
      <motion.div 
        className="questions-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="section-title">Practice Questions</h3>
        <div className="questions-grid">
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              className="question-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="question-header">
                <div className="question-meta">
                  <span className="question-category">{question.category}</span>
                  <span 
                    className="question-difficulty"
                    style={{ color: getDifficultyColor(question.difficulty) }}
                  >
                    {question.difficulty}
                  </span>
                </div>
                <button className="practice-btn">
                  <Play size={16} />
                  Practice
                </button>
              </div>

              <h4 className="question-text">{question.question}</h4>

              {question.hint && (
                <div className="question-hint">
                  <AlertCircle size={16} />
                  <span>{question.hint}</span>
                </div>
              )}

              <div className="question-actions">
                <button className="action-btn">
                  <Book size={16} />
                  <span>View Tips</span>
                </button>
                <button className="action-btn">
                  <MessageSquare size={16} />
                  <span>Sample Answer</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mock Interviews */}
      <motion.div 
        className="mock-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="section-title">Mock Interviews</h3>
        <div className="mock-grid">
          {mockInterviews.map((interview, index) => (
            <motion.div
              key={interview.id}
              className="mock-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="mock-header">
                <div className="mock-info">
                  <h4>{interview.company}</h4>
                  <p>{interview.position}</p>
                </div>
                {interview.completed ? (
                  <div className="mock-score">
                    <CheckCircle size={20} style={{ color: '#22d3ee' }} />
                    <span>{interview.score}%</span>
                  </div>
                ) : (
                  <div className="mock-duration">
                    <Clock size={20} />
                    <span>{interview.duration} min</span>
                  </div>
                )}
              </div>

              <div className="mock-stats">
                <span>{interview.questions.length} questions</span>
                <span>•</span>
                <span>{interview.completed ? 'Completed' : 'Not started'}</span>
              </div>

              <button className="btn btn-primary mock-btn">
                {interview.completed ? (
                  <>
                    <RotateCcw size={18} />
                    <span>Retake</span>
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    <span>Start Interview</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Practice Recorder */}
      <motion.div 
        className="recorder-section glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="recorder-header">
          <div className="rec-icon">
            <Video size={24} />
          </div>
          <h3>Practice Recorder</h3>
        </div>
        <p className="recorder-desc">
          Record yourself answering questions to improve your delivery
        </p>
        <div className="recorder-controls">
          {!isRecording ? (
            <button 
              className="record-btn"
              onClick={handleStartRecording}
            >
              <div className="record-icon" />
              <span>Start Recording</span>
            </button>
          ) : (
            <>
              <button 
                className="stop-btn"
                onClick={handleStopRecording}
              >
                <Pause size={20} />
                <span>Stop</span>
              </button>
              <div className="recording-time">
                <div className="recording-pulse" />
                <span>Recording: {recordingTime}s</span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      <style jsx>{`
        .interview-prep {
          width: 100%;
          padding: 0 1rem;
        }

        .prep-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .prep-title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .prep-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 40rem;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Stats */
        .prep-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
          padding: 0 0.5rem;
        }

        .stat-card {
          padding: 2.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
          transition: all var(--transition-base);
          border-radius: var(--radius-lg);
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
        }

        .stat-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .stat-info h3 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1;
        }

        .stat-info p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0.25rem 0 0;
        }

        /* Category Filters */
        .category-filters {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-lg);
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 2px solid transparent;
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all var(--transition-base);
          font-weight: 600;
          font-size: 0.875rem;
        }

        .category-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-1px);
        }

        .category-btn.active {
          /* Styles handled via inline styles */
        }

        /* Difficulty Filters */
        .difficulty-filters {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-md);
        }

        .filter-label {
          font-weight: 600;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-right: 0.5rem;
        }

        .difficulty-btn {
          padding: 0.625rem 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-size: 0.875rem;
          font-weight: 500;
        }

        .difficulty-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }

        .difficulty-btn.active {
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          color: white;
          border-color: transparent;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
        }

        /* Questions Section */
        .questions-section {
          margin-bottom: 4.5rem;
        }

        .section-title {
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .questions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
          padding: 0 0.5rem;
        }

        .question-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          transition: all var(--transition-base);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
          border-radius: var(--radius-lg);
          height: 100%;
        }

        .question-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.25rem;
        }

        .question-meta {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .question-category {
          padding: 0.5rem 1rem;
          background: rgba(139, 92, 246, 0.15);
          color: var(--accent-secondary);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .question-difficulty {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .practice-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          cursor: pointer;
          transition: all var(--transition-base);
          font-size: 0.875rem;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
          white-space: nowrap;
        }

        .practice-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }

        .question-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.7;
        }

        .question-hint {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.15);
          border-radius: var(--radius-md);
          color: #fbbf24;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.5;
        }

        .question-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-size: 0.875rem;
          font-weight: 500;
          flex: 1;
          justify-content: center;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
          color: var(--text-primary);
          transform: translateY(-1px);
        }

        /* Mock Interviews */
        .mock-section {
          margin-bottom: 4.5rem;
        }

        .mock-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
          padding: 0 0.5rem;
        }

        .mock-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          transition: all var(--transition-base);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
          border-radius: var(--radius-lg);
          height: 100%;
        }

        .mock-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
        }

        .mock-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1.25rem;
        }

        .mock-info h4 {
          font-size: 1.375rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.5rem;
        }

        .mock-info p {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .mock-score {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          color: #22d3ee;
          font-weight: 700;
          font-size: 1.125rem;
        }

        .mock-duration {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          color: var(--text-tertiary);
          font-size: 0.9375rem;
        }

        .mock-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.9375rem;
          color: var(--text-tertiary);
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-md);
          justify-content: center;
        }

        .mock-btn {
          width: 100%;
          margin-top: auto;
          padding: 1rem;
          font-size: 0.9375rem;
          font-weight: 600;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          cursor: pointer;
          transition: all var(--transition-base);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.625rem;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .mock-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        /* Recorder Section */
        .recorder-section {
          padding: 3rem;
          text-align: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.15);
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
        }

        .recorder-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .rec-icon {
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 16px rgba(244, 114, 182, 0.4);
        }

        .recorder-header h3 {
          font-size: 1.625rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
        }

        .recorder-desc {
          color: var(--text-secondary);
          margin: 0 0 2.5rem;
          font-size: 1.0625rem;
          line-height: 1.6;
          max-width: 32rem;
          margin-left: auto;
          margin-right: auto;
        }

        .recorder-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
        }

        .record-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.375rem 3rem;
          background: rgba(244, 63, 94, 0.1);
          border: 2px solid #f43f5e;
          border-radius: var(--radius-full);
          color: #f43f5e;
          cursor: pointer;
          transition: all var(--transition-base);
          font-weight: 700;
          font-size: 1.0625rem;
        }

        .record-btn:hover {
          background: rgba(244, 63, 94, 0.15);
          transform: scale(1.05);
          box-shadow: 0 4px 16px rgba(244, 63, 94, 0.3);
        }

        .record-icon {
          width: 1.625rem;
          height: 1.625rem;
          background: #f43f5e;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(244, 63, 94, 0.5);
        }

        .stop-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-weight: 600;
          font-size: 0.9375rem;
        }

        .stop-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .recording-time {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #f43f5e;
          font-weight: 600;
          font-size: 0.9375rem;
        }

        .recording-pulse {
          width: 1rem;
          height: 1rem;
          background: #f43f5e;
          border-radius: 50%;
          animation: pulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.2);
        }

        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.5);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(244, 63, 94, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(244, 63, 94, 0);
          }
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .questions-grid {
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 1.75rem;
          }

          .mock-grid {
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.75rem;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .interview-prep {
            padding: 0 0.75rem;
          }

          .prep-header {
            margin-bottom: 3rem;
          }

          .prep-stats {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            margin-bottom: 3rem;
          }

          .stat-card {
            padding: 2rem;
          }

          .questions-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0;
          }

          .question-card {
            padding: 2rem;
          }

          .mock-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 0;
          }

          .mock-card {
            padding: 2rem;
          }

          .category-filters {
            justify-content: center;
            padding: 1rem;
            gap: 1rem;
          }

          .category-btn {
            padding: 0.75rem 1.5rem;
          }

          .difficulty-filters {
            margin-bottom: 3rem;
          }

          .recorder-section {
            padding: 2.5rem 1.5rem;
          }

          .questions-section,
          .mock-section {
            margin-bottom: 3.5rem;
          }

          .section-title {
            font-size: 1.5rem;
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 480px) {
          .prep-title {
            font-size: 1.5rem;
          }

          .prep-description {
            font-size: 1rem;
          }

          .stat-card {
            padding: 1.75rem;
            gap: 1.25rem;
          }

          .question-card {
            padding: 1.75rem;
            gap: 1.25rem;
          }

          .question-text {
            font-size: 1.0625rem;
          }

          .question-actions {
            flex-direction: column;
            gap: 0.75rem;
          }

          .action-btn {
            width: 100%;
          }

          .mock-card {
            padding: 1.75rem;
          }

          .category-btn {
            padding: 0.625rem 1.25rem;
            font-size: 0.8125rem;
          }

          .recorder-section {
            padding: 2rem 1.25rem;
          }

          .recorder-header {
            flex-direction: column;
            gap: 1rem;
          }

          .record-btn {
            padding: 1.125rem 2.5rem;
            font-size: 1rem;
          }

          .difficulty-filters {
            padding: 0.875rem;
          }

          .difficulty-btn {
            padding: 0.5rem 1.25rem;
            font-size: 0.8125rem;
          }
        }
      `}</style>
    </div>
  );
} 