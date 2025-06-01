// ResumeLibrary.tsx - Resume Management System
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Plus, 
  Download, 
  Edit3, 
  Trash2, 
  Calendar,
  Star,
  Copy,
  Eye,
  Search,
  Clock
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Resume {
  id: string;
  name: string;
  version: string;
  lastModified: string;
  size: string;
}

interface ResumeLibraryProps {
  userId?: string;
}

export default function ResumeLibrary({ userId }: ResumeLibraryProps) {
  const [resumes] = useState<Resume[]>([
    {
      id: "1",
      name: "Software Engineer Resume",
      version: "v2.1",
      lastModified: "2 days ago",
      size: "245 KB"
    },
    {
      id: "2",
      name: "Full Stack Developer Resume",
      version: "v1.0",
      lastModified: "1 week ago",
      size: "312 KB"
    },
    {
      id: "3",
      name: "Senior Developer Resume",
      version: "v3.0",
      lastModified: "2 weeks ago",
      size: "198 KB"
    }
  ]);

  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResumes = resumes.filter(resume =>
    resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.size.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resume.lastModified.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setIsCreating(true);
    // In a real app, this would open a resume builder
    toast.success("Resume builder opening...");
  };

  const handleDuplicate = (resume: Resume) => {
    const newResume: Resume = {
      ...resume,
      id: Date.now().toString(),
      name: `${resume.name} (Copy)`,
      version: resume.version,
      lastModified: resume.lastModified,
      size: resume.size
    };
    toast.success("Resume duplicated successfully!");
  };

  const handleDelete = (id: string) => {
    toast.success("Resume deleted");
  };

  return (
    <div className="resume-library">
      {/* Header */}
      <div className="component-header">
        <h2 className="component-title">Resume Library</h2>
        <p className="component-subtitle">
          Manage and organize all your resume versions in one place
        </p>
      </div>

      {/* Actions Bar */}
      <div className="actions-bar content-block">
        <button className="btn btn-primary">
          <Plus size={16} />
          Upload New Resume
        </button>
        <div className="stats">
          <span className="stat-item">
            <FileText size={16} />
            {resumes.length} Resumes
          </span>
          <span className="stat-item">
            <Clock size={16} />
            Last updated 2 days ago
          </span>
        </div>
      </div>

      {/* Resume Grid */}
      <div className="resume-grid">
        {filteredResumes.map((resume, index) => (
          <motion.div
            key={resume.id}
            className="resume-card section-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="resume-icon">
              <FileText size={48} />
            </div>
            <div className="resume-details">
              <h3 className="resume-name">{resume.name}</h3>
              <div className="resume-meta">
                <span className="meta-item">{resume.version}</span>
                <span className="meta-item">{resume.size}</span>
                <span className="meta-item">{resume.lastModified}</span>
              </div>
            </div>
            <div className="resume-actions">
              <button className="action-btn" title="Download">
                <Download size={16} />
              </button>
              <button className="action-btn" title="Edit">
                <Edit3 size={16} />
              </button>
              <button className="action-btn danger" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .resume-library {
          width: 100%;
        }

        .actions-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
        }

        .stats {
          display: flex;
          gap: 2rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .resume-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .resume-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1.5rem;
          transition: all var(--transition-base);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
          min-height: 280px;
        }

        .resume-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
        }

        .resume-icon {
          color: var(--accent-primary);
          opacity: 0.8;
          margin-bottom: 0.5rem;
        }

        .resume-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .resume-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
          line-height: 1.4;
        }

        .resume-meta {
          display: flex;
          gap: 0.75rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .meta-item {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          padding: 0.375rem 0.625rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-sm);
          font-weight: 500;
        }

        .resume-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          width: 100%;
          justify-content: center;
        }

        .action-btn {
          padding: 0.625rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        .action-btn.danger:hover {
          background: rgba(248, 113, 113, 0.15);
          border-color: rgba(248, 113, 113, 0.4);
          color: #f87171;
        }

        @media (max-width: 768px) {
          .actions-bar {
            flex-direction: column;
            gap: 1.5rem;
            align-items: stretch;
            padding: 1.25rem;
          }

          .stats {
            justify-content: center;
          }

          .resume-grid {
            grid-template-columns: 1fr;
          }

          .resume-card {
            padding: 1.5rem;
            min-height: 240px;
          }
        }

        @media (max-width: 480px) {
          .resume-card {
            padding: 1.25rem;
            gap: 1rem;
          }

          .resume-name {
            font-size: 1.125rem;
          }

          .action-btn {
            width: 2.25rem;
            height: 2.25rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
} 