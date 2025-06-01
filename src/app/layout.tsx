// app/layout.tsx or wherever your root layout is
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'; // or wherever your CSS file is
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Resume Matcher - Optimize Your Resume with AI',
  description: 'Match your resume with job descriptions using advanced AI technology. Get instant feedback and improve your chances of landing your dream job.',
  keywords: 'resume, AI, job matching, career, ATS optimization',
  authors: [{ name: 'AI Resume Matcher Team' }],
  openGraph: {
    title: 'AI Resume Matcher',
    description: 'Optimize your resume with AI-powered analysis',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider 
      appearance={{
        variables: {
          colorPrimary: '#7c3aed',
          colorBackground: '#030014',
          colorInputBackground: 'rgba(255, 255, 255, 0.05)',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#e2e8f0',
          borderRadius: '1rem',
        },
        elements: {
          rootBox: {
            background: 'transparent',
          },
          formButtonPrimary: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#ffffff',
            '&:hover': {
              background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            },
          },
          card: {
            background: 'rgba(17, 7, 34, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          },
          formFieldInput: {
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#ffffff',
            '&:focus': {
              borderColor: '#7c3aed',
              boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
            },
          },
          footerActionLink: {
            color: '#a855f7',
            '&:hover': {
              color: '#c084fc',
            },
          },
          headerTitle: {
            color: '#ffffff',
          },
          headerSubtitle: {
            color: '#e2e8f0',
          },
        },
      }}
    >
      <html lang="en">
        <body>
          <div className="modern-bg">
            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>
          </div>
          <div className="page-container">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
