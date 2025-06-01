// MatchForm.tsx - Modern Professional UI
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Briefcase, 
  ChevronRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Award,
  Zap,
  FileCheck,
  X,
  Type
} from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import MatchResultCard from "./MatchResultCard";

export default function MatchForm() {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'paste'>('file');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setResumeFile(acceptedFiles[0]);
      toast.success("Resume uploaded successfully!", {
        icon: <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem' }} />,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobDescription || (!resumeFile && !resumeText)) {
      toast.error("Please provide both resume and job description", {
        icon: <AlertCircle style={{ width: '1.25rem', height: '1.25rem' }} />,
      });
      return;
    }

    setIsLoading(true);
    setMatchResult(null);

    const formData = new FormData();
    if (resumeFile) {
      formData.append("resume", resumeFile);
    } else {
      formData.append("resumeText", resumeText);
    }
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setMatchResult(data.analysis);
      toast.success("Analysis complete!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#22d3ee";
    if (score >= 60) return "#a855f7";
    if (score >= 40) return "#fbbf24";
    return "#f43f5e";
  };

  return (
    <div className="match-form-container">
      <form onSubmit={handleSubmit} className="match-form">
        <div className="form-sections">
          {/* Resume Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">
                <FileText size={18} />
              </div>
              <h3 className="section-title">Your Resume</h3>
            </div>
            
            <div className="upload-toggle">
              <button
                type="button"
                className={`toggle-option ${uploadMethod === 'file' ? 'active' : ''}`}
                onClick={() => setUploadMethod('file')}
              >
                <Upload size={14} />
                Upload File
              </button>
              <button
                type="button"
                className={`toggle-option ${uploadMethod === 'paste' ? 'active' : ''}`}
                onClick={() => setUploadMethod('paste')}
              >
                <Type size={14} />
                Paste Text
              </button>
            </div>

            {uploadMethod === 'file' ? (
              <div className="file-upload-wrapper">
                <div
                  {...getRootProps()}
                  className={`file-upload-area ${isDragActive ? 'dragging' : ''} ${resumeFile ? 'has-file' : ''}`}
                >
                  <input {...getInputProps()} />
                  {resumeFile ? (
                    <div className="file-info">
                      <FileCheck size={24} className="file-icon success" />
                      <p className="file-name">{resumeFile.name}</p>
                      <p className="file-size">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <Upload size={32} className="upload-icon" />
                      <p className="upload-text">Drop your resume here or click to browse</p>
                      <p className="upload-hint">PDF, DOC, DOCX, or TXT (max 5MB)</p>
                    </div>
                  )}
                </div>
                {resumeFile && (
                  <button
                    type="button"
                    onClick={() => setResumeFile(null)}
                    className="remove-file-btn"
                  >
                    <X size={14} />
                    Remove file
                  </button>
                )}
              </div>
            ) : (
              <div className="text-input-wrapper">
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="text-input"
                  rows={10}
                />
                <div className="char-count">
                  {resumeText.length} characters
                </div>
              </div>
            )}
          </div>

          {/* Job Description Section */}
          <div className="form-section">
            <div className="section-header">
              <div className="section-icon">
                <Briefcase size={18} />
              </div>
              <h3 className="section-title">Job Description</h3>
            </div>
            
            <div className="text-input-wrapper">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="text-input"
                rows={10}
                required
              />
              <div className="char-count">
                {jobDescription.length} characters
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            disabled={isLoading || (!resumeFile && !resumeText) || !jobDescription}
            className="submit-btn"
          >
            {isLoading ? (
              <>
                <Loader2 className="btn-icon spinning" size={16} />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles size={16} className="btn-icon" />
                Analyze Match
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {isLoading && (
        <div className="loading-state">
          <div className="loading-card">
            <Loader2 className="loading-spinner" size={32} />
            <h3>Analyzing your resume...</h3>
            <p>This usually takes 10-15 seconds</p>
          </div>
        </div>
      )}

      {matchResult && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="results-section"
        >
          <MatchResultCard result={matchResult} />
        </motion.div>
      )}

      <style jsx>{`
        .match-form-container {
          width: 100%;
          max-width: 72rem;
          margin: 0 auto;
        }

        .match-form {
          margin-bottom: 2rem;
        }

        .form-sections {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-sections {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        .form-section {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: all var(--transition-base);
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.1);
        }

        .form-section:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
          transform: translateY(-1px);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .section-icon {
          width: 2rem;
          height: 2rem;
          background: var(--gradient-1);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .upload-toggle {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding: 0.25rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
        }

        .toggle-option {
          flex: 1;
          padding: 0.5rem 0.75rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          color: var(--text-tertiary);
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
        }

        .toggle-option:hover {
          color: var(--text-secondary);
        }

        .toggle-option.active {
          background: var(--accent-primary);
          color: white;
        }

        .file-upload-wrapper {
          position: relative;
        }

        .file-upload-area {
          border: 2px dashed rgba(139, 92, 246, 0.4);
          border-radius: var(--radius-md);
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all var(--transition-base);
          background: rgba(139, 92, 246, 0.05);
        }

        .file-upload-area:hover {
          border-color: rgba(139, 92, 246, 0.6);
          background: rgba(139, 92, 246, 0.08);
        }

        .file-upload-area.dragging {
          border-color: var(--accent-primary);
          background: rgba(139, 92, 246, 0.12);
        }

        .file-upload-area.has-file {
          border-color: var(--accent-success);
          background: rgba(52, 211, 153, 0.08);
        }

        .upload-prompt {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .upload-icon {
          color: var(--accent-primary);
          opacity: 0.6;
        }

        .upload-text {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin: 0;
        }

        .upload-hint {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.375rem;
        }

        .file-icon {
          color: var(--accent-success);
        }

        .file-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
        }

        .file-size {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .remove-file-btn {
          margin-top: 0.75rem;
          padding: 0.375rem 0.75rem;
          background: rgba(244, 63, 94, 0.1);
          border: 1px solid rgba(244, 63, 94, 0.2);
          border-radius: var(--radius-sm);
          color: #f43f5e;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
        }

        .remove-file-btn:hover {
          background: rgba(244, 63, 94, 0.15);
          border-color: rgba(244, 63, 94, 0.3);
        }

        .text-input-wrapper {
          position: relative;
        }

        .text-input {
          width: 100%;
          min-height: 10rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          line-height: 1.5;
          resize: vertical;
          transition: all var(--transition-base);
        }

        .text-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          background: rgba(255, 255, 255, 0.06);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
        }

        .text-input::placeholder {
          color: var(--text-muted);
        }

        .char-count {
          position: absolute;
          bottom: 0.5rem;
          right: 0.75rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          pointer-events: none;
        }

        .form-actions {
          display: flex;
          justify-content: center;
        }

        .submit-btn {
          padding: 0.75rem 2rem;
          background: var(--gradient-1);
          border: none;
          border-radius: var(--radius-md);
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-base);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(139, 92, 246, 0.5);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-icon {
          flex-shrink: 0;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-state {
          margin-top: 3rem;
          display: flex;
          justify-content: center;
        }

        .loading-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
        }

        .loading-spinner {
          color: var(--accent-primary);
          animation: spin 1s linear infinite;
        }

        .loading-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .loading-card p {
          font-size: 0.875rem;
          color: var(--text-tertiary);
          margin: 0;
        }

        .results-section {
          margin-top: 3rem;
        }

        @media (max-width: 768px) {
          .form-section {
            padding: 1.25rem;
          }

          .section-title {
            font-size: 1rem;
          }

          .file-upload-area {
            padding: 1.5rem 1rem;
          }

          .submit-btn {
            padding: 0.625rem 1.5rem;
            font-size: 0.813rem;
          }
        }

        @media (max-width: 480px) {
          .form-sections {
            gap: 1rem;
          }

          .form-section {
            padding: 1rem;
          }

          .upload-toggle {
            flex-direction: column;
          }

          .toggle-option {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
