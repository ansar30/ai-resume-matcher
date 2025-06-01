"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileSearch,
  FileText,
  Briefcase,
  BarChart3,
  Brain,
  TrendingUp,
  Menu,
  X,
  ChevronRight,
  User,
  LogOut,
  Settings,
  Home,
  Sparkles,
  Grid3x3
} from "lucide-react";
import { Toaster } from "react-hot-toast";
import AuthNavBar from "./AuthNavbar";
import MatchForm from "./MatchForm";
import ResumeLibrary from "./ResumeLibrary";
import JobTracker from "./JobTracker";
import SkillsAnalysis from "./SkillsAnalysis";
import InterviewPrep from "./InterviewPrep";
import IndustryInsights from "./IndustryInsights";

interface UserData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
}

interface DashboardProps {
  user: UserData;
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeSection, setActiveSection] = useState("matcher");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { 
      id: "matcher", 
      label: "Resume Matcher", 
      icon: FileSearch, 
      color: "#7c3aed",
      description: "Match your resume with jobs"
    },
    { 
      id: "library", 
      label: "My Resumes", 
      icon: FileText, 
      color: "#a855f7",
      description: "Manage your resume versions"
    },
    { 
      id: "tracker", 
      label: "Job Tracker", 
      icon: Briefcase, 
      color: "#22d3ee",
      description: "Track your applications"
    },
    { 
      id: "skills", 
      label: "Skills Analysis", 
      icon: BarChart3, 
      color: "#fbbf24",
      description: "Analyze your skill gaps"
    },
    { 
      id: "interview", 
      label: "Interview Prep", 
      icon: Brain, 
      color: "#c084fc",
      description: "Practice interview questions"
    },
    { 
      id: "insights", 
      label: "Industry Insights", 
      icon: TrendingUp, 
      color: "#f43f5e",
      description: "Market trends & salaries"
    },
  ];

  const getCurrentSection = () => {
    return navItems.find(item => item.id === activeSection);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "matcher":
        return <MatchForm />;
      case "library":
        return <ResumeLibrary userId={user?.id} />;
      case "tracker":
        return <JobTracker userId={user?.id} />;
      case "skills":
        return <SkillsAnalysis userId={user?.id} />;
      case "interview":
        return <InterviewPrep />;
      case "insights":
        return <IndustryInsights />;
      default:
        return <MatchForm />;
    }
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(17, 7, 34, 0.9)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            backdropFilter: 'blur(20px)',
            padding: '12px 16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: {
              primary: '#22d3ee',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f43f5e',
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      <div className="dashboard-layout">
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Enhanced Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            {/* Logo Section */}
            <div className="sidebar-logo">
              <div className="logo-icon">
                <Sparkles size={20} />
              </div>
              <span className="logo-text">AI Resume</span>
            </div>

            {/* User Profile Section */}
            <div className="user-profile">
              <div className="user-avatar">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : <User size={18} />}
              </div>
              <div className="user-info">
                <h3 className="user-name">{user?.firstName || 'User'} {user?.lastName || ''}</h3>
                <p className="user-email">{user?.email}</p>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="sidebar-nav">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                  >
                    <div className="nav-icon" style={{ color: item.color }}>
                      <item.icon size={18} />
                    </div>
                    <span className="nav-label">{item.label}</span>
                    {isActive && (
                      <motion.div 
                        className="active-indicator"
                        layoutId="active-nav"
                        style={{ background: item.color }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="sidebar-footer">
              <button className="footer-btn">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button className="footer-btn danger">
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Content Header */}
          <div className="content-header">
            <div className="breadcrumb">
              <Home size={14} />
              <ChevronRight size={14} />
              <span style={{ color: getCurrentSection()?.color }}>
                {getCurrentSection()?.label}
              </span>
            </div>
            
            <h1 className="content-title">
              {getCurrentSection()?.label}
            </h1>
            
            <p className="content-description">
              {getCurrentSection()?.description}
            </p>
          </div>

          {/* Page Content */}
          <div className="content-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
          position: relative;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1000;
          padding: 0.5rem;
          background: rgba(17, 7, 34, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          cursor: pointer;
          color: var(--text-primary);
          transition: all var(--transition-base);
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* Enhanced Sidebar */
        .sidebar {
          width: 240px;
          height: 100vh;
          position: sticky;
          top: 0;
          background: rgba(20, 10, 40, 0.95);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
          z-index: 999;
        }

        .sidebar-content {
          padding: 1rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Logo Section */
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }

        .logo-icon {
          width: 2rem;
          height: 2rem;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 8px rgba(124, 58, 237, 0.3);
        }

        .logo-text {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* User Profile Enhanced */
        .user-profile {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 0.75rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all var(--transition-base);
        }

        .user-profile:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .user-avatar {
          width: 2.25rem;
          height: 2.25rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .user-info {
          flex: 1;
          min-width: 0;
        }

        .user-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Navigation Enhanced */
        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.5rem 0;
        }

        .nav-item {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.15s ease;
          color: var(--text-secondary);
          text-align: left;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .nav-item:last-child {
          margin-bottom: 0;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-primary);
        }

        .nav-item.active {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
        }

        .active-indicator {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          border-radius: 0 3px 3px 0;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 1.25rem;
          height: 1.25rem;
        }

        .nav-label {
          font-weight: 450;
          line-height: 1.2;
        }

        /* Sidebar Footer Enhanced */
        .sidebar-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .footer-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.5rem 0.75rem;
          background: transparent;
          border: none;
          border-radius: var(--radius-md);
          color: var(--text-tertiary);
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: left;
          font-size: 0.813rem;
        }

        .footer-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
        }

        .footer-btn.danger:hover {
          background: rgba(244, 63, 94, 0.1);
          color: #f43f5e;
        }

        /* Main Content Enhanced */
        .main-content {
          flex: 1;
          overflow-y: auto;
          background: var(--bg-primary);
        }

        .content-header {
          background: rgba(20, 10, 40, 0.6);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1rem 1.5rem;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          margin-bottom: 0.5rem;
        }

        .content-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 0.25rem;
        }

        .content-description {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }

        .content-wrapper {
          padding: 2rem;
          max-width: 80rem;
          margin: 0 auto;
        }

        .content-section {
          animation: fadeInUp 0.3s ease-out;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }

          .sidebar {
            position: fixed;
            transform: translateX(-100%);
            height: 100vh;
            box-shadow: 2px 0 16px rgba(0, 0, 0, 0.3);
          }

          .sidebar.open {
            transform: translateX(0);
          }

          .sidebar-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(2px);
            z-index: 998;
          }

          .content-header {
            padding: 0.75rem 1rem;
          }

          .content-wrapper {
            padding: 1.5rem;
          }

          .content-title {
            font-size: 1.25rem;
          }

          .sidebar-nav {
            gap: 0.5rem;
          }

          .nav-item {
            padding: 0.625rem 0.875rem;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 220px;
          }

          .content-wrapper {
            padding: 1rem;
          }

          .nav-item {
            padding: 0.5rem 0.75rem;
            font-size: 0.813rem;
          }

          .nav-icon {
            width: 1rem;
            height: 1rem;
          }
        }

        /* Scrollbar Styles */
        .sidebar::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
        }

        .sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </>
  );
} 