'use client';

import MatchForm from '../components/MatchForm';

export default function HomePage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">AI Resume Matcher</h1>
      <MatchForm />
    </main>
  );
}