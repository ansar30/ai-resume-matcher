// JobTracker.tsx - Job Application Tracking System
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  DollarSign,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Send,
  Filter,
  Search,
  CheckCircle,
  Building
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Job {
  id: string;
  company: string;
  position: string;
  location: string;
  salary?: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'saved';
  appliedDate: Date;
  deadline?: Date;
  notes: string;
  url?: string;
  lastUpdate: string;
}

interface JobTrackerProps {
  userId?: string;
}

export default function JobTracker({ userId }: JobTrackerProps) {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      company: "Tech Corp",
      position: "Senior Frontend Developer",
      location: "San Francisco, CA",
      salary: "$120k - $160k",
      status: "interview",
      appliedDate: new Date("2024-01-15"),
      deadline: new Date("2024-02-01"),
      notes: "Had initial phone screen, technical interview scheduled",
      url: "https://example.com/job1",
      lastUpdate: "2 days ago"
    },
    {
      id: "2",
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      location: "Remote",
      salary: "$100k - $140k",
      status: "applied",
      appliedDate: new Date("2024-01-18"),
      notes: "Waiting for response",
      url: "https://example.com/job2",
      lastUpdate: "1 week ago"
    },
    {
      id: "3",
      company: "BigTech Inc",
      position: "React Developer",
      location: "New York, NY",
      salary: "$110k - $150k",
      status: "offer",
      appliedDate: new Date("2024-01-10"),
      deadline: new Date("2024-02-15"),
      notes: "Received offer, awaiting response",
      url: "https://example.com/job3",
      lastUpdate: "3 days ago"
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusConfig = {
    saved: { color: '#64748b', icon: Clock, label: 'Saved' },
    applied: { color: '#3b82f6', icon: Send, label: 'Applied' },
    interview: { color: '#a855f7', icon: AlertCircle, label: 'Interview' },
    offer: { color: '#10b981', icon: CheckCircle2, label: 'Offer' },
    rejected: { color: '#ef4444', icon: XCircle, label: 'Rejected' }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddJob = () => {
    toast.success("Add job feature coming soon!");
  };

  const handleEdit = (id: string) => {
    toast.success("Edit feature coming soon!");
  };

  const handleDelete = (id: string) => {
    setJobs(jobs.filter(job => job.id !== id));
    toast.success("Job removed from tracker");
  };

  const handleViewJob = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      toast.error("No URL available for this job");
    }
  };

  return (
    <div className="job-tracker">
      {/* Header */}
      <div className="component-header">
        <h2 className="component-title">Job Application Tracker</h2>
        <p className="component-subtitle">
          Keep track of all your job applications in one place
        </p>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(96, 165, 250, 0.2) 100%)' }}>
            <Send size={24} style={{ color: '#3b82f6' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{jobs.filter(job => job.status === 'applied').length}</span>
            <span className="stat-label">Applied</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(196, 181, 253, 0.2) 100%)' }}>
            <AlertCircle size={24} style={{ color: '#a855f7' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{jobs.filter(job => job.status === 'interview').length}</span>
            <span className="stat-label">Interview</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(52, 211, 153, 0.2) 100%)' }}>
            <CheckCircle2 size={24} style={{ color: '#10b981' }} />
          </div>
          <div className="stat-info">
            <span className="stat-value">{jobs.filter(job => job.status === 'offer').length}</span>
            <span className="stat-label">Offer</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="controls-bar">
        <div className="search-filter-group">
          <div className="search-wrapper">
            <div className="search-container">
              <Search 
                className="search-icon" 
                size={16} 
                style={{ 
                  position: 'absolute',
                  left: '0.625rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}
              />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <div className="filter-buttons">
            <button
              onClick={() => setFilterStatus('all')}
              className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            {Object.entries(statusConfig).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                style={{ 
                  '--filter-color': config.color
                } as React.CSSProperties}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleAddJob} className="add-job-btn">
          <Plus size={20} />
          <span>Add Job</span>
        </button>
      </div>

      {/* Job List */}
      <div className="job-list">
        {filteredJobs.map((job, index) => {
          const config = statusConfig[job.status];
          const StatusIcon = config.icon;
          
          return (
            <motion.div
              key={job.id}
              className="job-item section-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="job-content">
                <div className="job-header">
                  <div className="company-info">
                    <div className="company-icon">
                      <Building size={20} />
                    </div>
                    <div>
                      <h3 className="company-name">{job.company}</h3>
                      <p className="position-name">{job.position}</p>
                    </div>
                  </div>
                  <div className="status-badge" style={{ '--status-color': config.color } as React.CSSProperties}>
                    <StatusIcon size={16} />
                    <span>{config.label}</span>
                  </div>
                </div>

                <div className="job-details">
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>{job.location}</span>
                  </div>
                  {job.salary && (
                    <div className="detail-item">
                      <DollarSign size={14} />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <Calendar size={14} />
                    <span>Applied {job.appliedDate.toLocaleDateString()}</span>
                  </div>
                </div>

                {job.notes && (
                  <p className="job-notes">{job.notes}</p>
                )}

                <div className="job-actions">
                  <button 
                    className="action-btn view"
                    onClick={() => handleViewJob(job.url)}
                    title="View Job"
                  >
                    <ExternalLink size={16} />
                    <span>View</span>
                  </button>
                  <button 
                    className="action-btn edit"
                    onClick={() => handleEdit(job.id)}
                    title="Edit"
                  >
                    <Edit3 size={16} />
                    <span>Edit</span>
                  </button>
                  <button 
                    className="action-btn delete"
                    onClick={() => handleDelete(job.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style jsx>{`
        .job-tracker {
          width: 100%;
        }

        .component-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .component-title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .component-subtitle {
          font-size: 1.125rem;
          color: var(--text-secondary);
          max-width: 40rem;
          margin: 0 auto;
        }

        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all var(--transition-base);
          backdrop-filter: blur(8px);
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.04);
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
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-filter-group {
          display: flex;
          gap: 1rem;
          flex: 1;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-wrapper {
          flex: 1;
          min-width: 200px;
          max-width: 24rem;
        }

        .search-container {
          position: relative;
          width: 100%;
          height: 2.25rem;
          overflow: hidden;
          border-radius: var(--radius-md);
        }

        .search-icon {
          position: absolute !important;
          left: 0.625rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          color: var(--text-tertiary);
          pointer-events: none !important;
          width: 16px;
          height: 16px;
          z-index: 1;
        }

        .search-input {
          width: 100%;
          padding: 0 0.875rem 0 2.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 0.875rem;
          font-family: inherit;
          transition: all var(--transition-base);
          height: 100%;
          line-height: 2.25rem;
          box-sizing: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          margin: 0;
          position: relative;
          z-index: 0;
        }

        .search-input::placeholder {
          color: var(--text-tertiary);
          opacity: 1;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        }

        .filter-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
          font-weight: 500;
          font-size: 0.875rem;
          position: relative;
          overflow: hidden;
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .filter-btn.active {
          background: rgba(var(--filter-color, 139, 92, 246), 0.15);
          border-color: var(--filter-color);
          color: var(--filter-color);
          font-weight: 600;
        }

        .add-job-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all var(--transition-base);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .add-job-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
        }

        .add-job-btn:active {
          transform: translateY(0);
        }

        .job-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .job-item {
          padding: 1.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(8px);
          transition: all var(--transition-base);
        }

        .job-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.1);
        }

        .job-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .company-info {
          display: flex;
          gap: 0.875rem;
          align-items: flex-start;
        }

        .company-icon {
          width: 2.75rem;
          height: 2.75rem;
          background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-secondary);
          flex-shrink: 0;
        }

        .company-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.25rem;
          line-height: 1.3;
        }

        .position-name {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
          font-weight: 500;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.875rem;
          background: rgba(var(--status-color, 139, 92, 246), 0.15);
          border: 1px solid var(--status-color);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--status-color);
          white-space: nowrap;
        }

        .job-details {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .detail-item svg {
          color: var(--text-tertiary);
        }

        .job-notes {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: var(--radius-md);
        }

        .job-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.5rem 1rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .action-btn.view:hover {
          border-color: var(--accent-secondary);
          color: var(--accent-secondary);
        }

        .action-btn.edit:hover {
          border-color: #3b82f6;
          color: #3b82f6;
        }

        .action-btn.delete:hover {
          border-color: #ef4444;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        @media (max-width: 768px) {
          .controls-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .search-filter-group {
            flex-direction: column;
          }

          .search-wrapper {
            max-width: 100%;
          }

          .filter-buttons {
            justify-content: center;
          }

          .add-job-btn {
            width: 100%;
            justify-content: center;
          }

          .stats-overview {
            grid-template-columns: 1fr;
          }

          .job-header {
            flex-direction: column;
            gap: 0.75rem;
          }

          .job-details {
            flex-direction: column;
            gap: 0.5rem;
          }

          .job-actions {
            flex-wrap: wrap;
          }

          .action-btn span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
} 