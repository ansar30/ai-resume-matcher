import { SignIn } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { Sparkles, FileSearch, ChevronRight, Star, Zap, Shield } from 'lucide-react';

export default function SignInPage() {
  const features = [
    { icon: Zap, text: "AI-Powered Analysis", color: 'var(--accent-warning)' },
    { icon: Shield, text: "ATS Optimization", color: 'var(--accent-success)' },
    { icon: Star, text: "Instant Feedback", color: 'var(--accent-secondary)' },
  ];

  return (
    <div className="content-wrapper" style={{ display: 'flex', minHeight: '100vh', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '90rem', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          {/* Left Side - Branding */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'none' }}
            className="lg:block"
          >
            <div style={{ maxWidth: '32rem' }}>
              {/* Logo */}
              <motion.div 
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="logo-container">
                  <div className="logo-bg"></div>
                  <div className="logo-inner">
                    <FileSearch style={{ width: '2rem', height: '2rem', color: 'white' }} />
                  </div>
                </div>
                <div className="logo-text">
                  Resume Matcher
                  <Sparkles className="logo-sparkle" style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', color: 'var(--text-primary)' }}
              >
                Match Your Resume
                <span className="gradient-text" style={{ display: 'block' }}>Like Never Before</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}
              >
                Build a job-winning resume in minutes with smart AI tools that tailor every line to your dream role.
              </motion.p>

              {/* Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                  >
                    <div style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'rgba(255, 255, 255, 0.05)', 
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <feature.icon style={{ width: '1.25rem', height: '1.25rem', color: feature.color }} />
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Decorative Element */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '3rem', color: 'var(--text-tertiary)' }}
              >
                <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
                <span>Join thousands of successful job seekers</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Sign In Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ width: '100%', maxWidth: '26rem' }}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="glass-card"
                style={{ padding: '2.5rem' }}
              >
                {/* Mobile Logo */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="lg:hidden">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div className="logo-container" style={{ width: '2.5rem', height: '2.5rem' }}>
                      <div className="logo-bg"></div>
                      <div className="logo-inner">
                        <FileSearch style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                      </div>
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Resume Matcher
                      <Sparkles className="logo-sparkle" style={{ width: '1.25rem', height: '1.25rem' }} />
                    </h1>
                  </div>
                </div>

                <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Welcome Back
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', textAlign: 'center' }}>
                  Sign in to continue your journey
                </p>

                <SignIn 
                  path="/sign-in" 
                  routing="path" 
                  signUpFallbackRedirectUrl="/sign-in"
                  appearance={{
                    layout: {
                      socialButtonsPlacement: "bottom",
                      socialButtonsVariant: "iconButton",
                    },
                    elements: {
                      formButtonPrimary: "btn btn-primary",
                      card: "bg-transparent shadow-none",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: "bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300",
                      formFieldInput: "bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-indigo-500",
                      formFieldLabel: "text-gray-300",
                      identityPreviewText: "text-gray-300",
                      identityPreviewEditButton: "text-indigo-400 hover:text-indigo-300",
                      footerActionLink: "text-indigo-400 hover:text-indigo-300",
                      dividerLine: "bg-white/20",
                      dividerText: "text-gray-400",
                    },
                  }}
                />
              </motion.div>

              {/* Additional Info */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-tertiary)', marginTop: '1.5rem' }}
              >
                Protected by enterprise-grade security
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Responsive styles */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .lg\\:block {
            display: block !important;
          }
          .lg\\:hidden {
            display: none !important;
          }
          .content-wrapper > div > div {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
