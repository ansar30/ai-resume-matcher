'use client';

import { UserButton, useUser, useAuth } from '@clerk/nextjs';

export default function AuthNavBar() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        {isSignedIn && (
          <>
            <p className="text-gray-600 hidden sm:block">
              Welcome, <span className="font-semibold">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
            </p>
            <UserButton afterSignOutUrl="/" />
          </>
        )
        }
      </div>
    </nav>
  );
}
