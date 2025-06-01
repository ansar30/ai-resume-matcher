// AuthNavBar.tsx
'use client';

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthNavBar() {
  return (
    <nav className="auth-navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <div className="logo-icon">
            <Sparkles size={18} />
          </div>
          <span className="logo-text">AI Resume Matcher</span>
        </Link>
        
        <div className="navbar-actions">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "avatar-box",
                userButtonPopoverCard: "user-popover",
                userButtonPopoverActionButton: "popover-action"
              }
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .auth-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3.5rem;
          background: rgba(20, 10, 40, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          z-index: var(--z-sticky);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
        }

        .navbar-container {
          max-width: 80rem;
          height: 100%;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          text-decoration: none;
          transition: all var(--transition-base);
        }

        .navbar-logo:hover {
          transform: translateY(-1px);
        }

        .logo-icon {
          width: 1.875rem;
          height: 1.875rem;
          background: var(--gradient-1);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
        }

        .logo-text {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
        }

        :global(.avatar-box) {
          width: 2rem;
          height: 2rem;
        }

        :global(.user-popover) {
          background: rgba(30, 15, 60, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        :global(.popover-action) {
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 1rem;
          }

          .logo-text {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </nav>
  );
}
