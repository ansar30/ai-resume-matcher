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
    <div className="">
      <MatchForm />
    </div>
  );
}
