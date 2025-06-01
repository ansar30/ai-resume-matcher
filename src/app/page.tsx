// app/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import Dashboard from "@/components/Dashboard";
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in'); 
  }

  // Extract only the plain data we need
  const userData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
  };

  return <Dashboard user={userData} />;
}
