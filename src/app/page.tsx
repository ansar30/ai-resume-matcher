// app/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import MatchForm from "@/components/MatchForm";
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in'); 
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.firstName} 👋</h1>
      <MatchForm />
    </div>
  );
}
