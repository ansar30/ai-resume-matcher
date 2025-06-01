// IndustryInsights.tsx - Industry Trends & Insights System
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp,
  BriefcaseIcon,
  DollarSign,
  MapPin,
  Users,
  Zap,
  BarChart3,
  Globe,
  BookOpen,
  ExternalLink,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from "lucide-react";
import { toast } from "react-hot-toast";

interface TrendData {
  id: string;
  title: string;
  category: string;
  change: number;
  timeframe: string;
  description: string;
  source: string;
  date: Date;
}

interface SalaryData {
  role: string;
  level: string;
  location: string;
  min: number;
  max: number;
  median: number;
  growth: number;
}

interface SkillDemand {
  skill: string;
  category: string;
  demand: 'very-high' | 'high' | 'medium' | 'low';
  growth: number;
  jobs: number;
}

export default function IndustryInsights() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const categories = [
    { id: 'all', label: 'All Industries', icon: Globe },
    { id: 'tech', label: 'Technology', icon: Zap },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'healthcare', label: 'Healthcare', icon: Users }
  ];

  const trends: TrendData[] = [
    {
      id: '1',
      title: 'AI/ML Engineering Demand Surges',
      category: 'tech',
      change: 45,
      timeframe: '6 months',
      description: 'Companies are rapidly hiring AI specialists as adoption accelerates',
      source: 'Industry Report 2024',
      date: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Remote Work Stabilizes',
      category: 'all',
      change: -5,
      timeframe: '3 months',
      description: 'Remote job postings plateau after post-pandemic surge',
      source: 'Remote Work Study',
      date: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'Cybersecurity Roles Critical',
      category: 'tech',
      change: 32,
      timeframe: '1 year',
      description: 'Security expertise becomes essential across all industries',
      source: 'Security Trends Report',
      date: new Date('2024-01-18')
    }
  ];

  const salaryData: SalaryData[] = [
    {
      role: 'Software Engineer',
      level: 'Senior',
      location: 'San Francisco',
      min: 150000,
      max: 250000,
      median: 185000,
      growth: 8.5
    },
    {
      role: 'Product Manager',
      level: 'Senior',
      location: 'New York',
      min: 140000,
      max: 220000,
      median: 175000,
      growth: 6.2
    },
    {
      role: 'Data Scientist',
      level: 'Mid-level',
      location: 'Remote',
      min: 100000,
      max: 160000,
      median: 130000,
      growth: 12.3
    }
  ];

  const skillsInDemand: SkillDemand[] = [
    { skill: 'React/Next.js', category: 'Frontend', demand: 'very-high', growth: 25, jobs: 15420 },
    { skill: 'Python/AI', category: 'Backend', demand: 'very-high', growth: 42, jobs: 22150 },
    { skill: 'Cloud (AWS/GCP)', category: 'DevOps', demand: 'high', growth: 18, jobs: 18900 },
    { skill: 'TypeScript', category: 'Languages', demand: 'high', growth: 35, jobs: 12300 },
    { skill: 'Kubernetes', category: 'DevOps', demand: 'medium', growth: 15, jobs: 8500 }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'very-high': return '#22d3ee';
      case 'high': return '#a855f7';
      case 'medium': return '#fbbf24';
      case 'low': return '#94a3b8';
      default: return '#e2e8f0';
    }
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredTrends = trends.filter(trend => 
    selectedCategory === 'all' || trend.category === selectedCategory
  );

  return (
    <div className="industry-insights">
      {/* Header */}
      <div className="insights-header">
        <motion.h2 
          className="insights-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Industry Insights & Trends
        </motion.h2>
        <motion.p 
          className="insights-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Stay ahead with real-time job market trends and salary insights
        </motion.p>
      </div>

      {/* Quick Stats */}
      <motion.div 
        className="quick-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="stat-card glass-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <TrendingUp size={24} />
            </div>
            <div className="stat-info">
              <h3>+18%</h3>
              <p>Tech Job Growth</p>
            </div>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <DollarSign size={24} />
            </div>
            <div className="stat-info">
              <h3>$125K</h3>
              <p>Avg Tech Salary</p>
            </div>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
              <BriefcaseIcon size={24} />
            </div>
            <div className="stat-info">
              <h3>2.3M</h3>
              <p>Open Positions</p>
            </div>
          </div>
        </div>
        <div className="stat-card glass-card">
          <div className="stat-content">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>68%</h3>
              <p>Remote Available</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        className="category-filter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
          >
            <cat.icon size={18} />
            <span>{cat.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Market Trends */}
      <motion.div 
        className="trends-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="section-title">Market Trends</h3>
        <div className="trends-grid">
          {filteredTrends.map((trend, index) => (
            <motion.div
              key={trend.id}
              className="trend-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="trend-header">
                <h4 className="trend-title">{trend.title}</h4>
                <div 
                  className={`trend-change ${trend.change >= 0 ? 'positive' : 'negative'}`}
                >
                  {trend.change >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  <span>{Math.abs(trend.change)}%</span>
                </div>
              </div>
              <p className="trend-description">{trend.description}</p>
              <div className="trend-meta">
                <span className="trend-source">{trend.source}</span>
                <span className="trend-date">
                  <Calendar size={14} />
                  {trend.date.toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Salary Insights */}
      <motion.div 
        className="salary-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="section-title">Salary Insights</h3>
        <div className="salary-grid">
          {salaryData.map((data, index) => (
            <motion.div
              key={index}
              className="salary-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="salary-header">
                <div>
                  <h4 className="salary-role">{data.role}</h4>
                  <p className="salary-level">{data.level} • {data.location}</p>
                </div>
                <div className="salary-growth">
                  <ArrowUpRight size={16} />
                  <span>{data.growth}%</span>
                </div>
              </div>
              <div className="salary-range">
                <div className="range-bar">
                  <div 
                    className="range-fill"
                    style={{
                      left: '0%',
                      width: '100%',
                      background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)'
                    }}
                  />
                  <div 
                    className="median-marker"
                    style={{
                      left: `${((data.median - data.min) / (data.max - data.min)) * 100}%`
                    }}
                  />
                </div>
                <div className="salary-values">
                  <span>{formatSalary(data.min)}</span>
                  <span className="median">{formatSalary(data.median)}</span>
                  <span>{formatSalary(data.max)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills in Demand */}
      <motion.div 
        className="skills-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="section-title">Skills in High Demand</h3>
        <div className="skills-list">
          {skillsInDemand.map((skill, index) => (
            <motion.div
              key={skill.skill}
              className="skill-item glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="skill-info">
                <h4 className="skill-name">{skill.skill}</h4>
                <span className="skill-category">{skill.category}</span>
              </div>
              <div className="skill-stats">
                <div 
                  className="demand-badge"
                  style={{ background: getDemandColor(skill.demand) }}
                >
                  {skill.demand.replace('-', ' ')}
                </div>
                <div className="skill-growth">
                  <TrendingUp size={16} />
                  <span>+{skill.growth}%</span>
                </div>
                <div className="job-count">
                  <BriefcaseIcon size={16} />
                  <span>{skill.jobs.toLocaleString()} jobs</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Resources */}
      <motion.div 
        className="resources-section glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="resources-header">
          <BookOpen size={24} />
          <h3>Industry Reports & Resources</h3>
        </div>
        <div className="resources-grid">
          <a href="#" className="resource-link">
            <span>2024 Tech Salary Report</span>
            <ExternalLink size={16} />
          </a>
          <a href="#" className="resource-link">
            <span>Remote Work Trends Analysis</span>
            <ExternalLink size={16} />
          </a>
          <a href="#" className="resource-link">
            <span>AI Jobs Market Overview</span>
            <ExternalLink size={16} />
          </a>
          <a href="#" className="resource-link">
            <span>Skills Gap Analysis 2024</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>

      <style jsx>{`
        .industry-insights {
          width: 100%;
        }

        .insights-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .insights-title {
          font-size: clamp(1.75rem, 3vw, 2rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .insights-description {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 40rem;
          margin: 0 auto;
        }

        /* Quick Stats */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          padding: 1.25rem;
        }

        .stat-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 3rem;
          height: 3rem;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .stat-info h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          line-height: 1;
        }

        .stat-info p {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        /* Category Filter */
        .category-filter {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-weight: 500;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .filter-btn.active {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }

        /* Market Trends */
        .trends-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .trends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1rem;
        }

        .trend-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .trend-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .trend-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          flex: 1;
        }

        .trend-change {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .trend-change.positive {
          color: #22d3ee;
        }

        .trend-change.negative {
          color: #f43f5e;
        }

        .trend-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        .trend-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        .trend-date {
          display: flex;
          align-items: center;
          gap: 0.375rem;
        }

        /* Salary Insights */
        .salary-section {
          margin-bottom: 3rem;
        }

        .salary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1rem;
        }

        .salary-card {
          padding: 1.5rem;
        }

        .salary-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .salary-role {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.25rem;
        }

        .salary-level {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .salary-growth {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #22d3ee;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .salary-range {
          position: relative;
        }

        .range-bar {
          position: relative;
          height: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          margin-bottom: 1rem;
          overflow: hidden;
        }

        .range-fill {
          position: absolute;
          height: 100%;
          border-radius: var(--radius-full);
        }

        .median-marker {
          position: absolute;
          top: -0.25rem;
          width: 1rem;
          height: 1rem;
          background: white;
          border: 2px solid #4facfe;
          border-radius: 50%;
          transform: translateX(-50%);
        }

        .salary-values {
          display: flex;
          justify-content: space-between;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .salary-values .median {
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Skills in Demand */
        .skills-section {
          margin-bottom: 3rem;
        }

        .skills-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skill-item {
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .skill-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .skill-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .skill-category {
          padding: 0.25rem 0.75rem;
          background: rgba(124, 58, 237, 0.1);
          color: var(--accent-primary);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 500;
        }

        .skill-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .demand-badge {
          padding: 0.375rem 0.75rem;
          border-radius: var(--radius-full);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .skill-growth {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #22d3ee;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .job-count {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: var(--text-tertiary);
          font-size: 0.875rem;
        }

        /* Resources */
        .resources-section {
          padding: 2rem;
        }

        .resources-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .resources-header h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
        }

        .resource-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
          color: var(--accent-primary);
          text-decoration: none;
          font-size: 0.875rem;
          transition: all var(--transition-base);
        }

        .resource-link:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateX(4px);
          border-color: var(--accent-primary);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .quick-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .trends-grid,
          .salary-grid {
            grid-template-columns: 1fr;
          }

          .skill-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .skill-stats {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 480px) {
          .insights-title {
            font-size: 1.5rem;
          }

          .insights-description {
            font-size: 1rem;
          }

          .quick-stats {
            grid-template-columns: 1fr;
          }

          .trend-card {
            padding: 1rem;
          }

          .skill-name {
            font-size: 1rem;
          }

          .resources-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 