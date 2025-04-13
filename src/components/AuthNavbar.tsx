// AuthNavBar.tsx
'use client';

import { UserButton, useUser, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import LogoImage from '../../public/assets/logo.svg';

export default function AuthNavBar() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-[#4D55CC] backdrop-blur-md bg-opacity-90 shadow-sm sticky top-0 z-50 border-b border-gray-200">

      {isSignedIn && (
        <>
        <div className="flex items-center gap-4">
          <Image
            src={LogoImage}
            alt="Login Background"
            className="z-0"
            priority
            quality={100}
          />
          </div>
          <div className='flex gap-4 justify-center items-center'>
          <p className="text-white hidden sm:block">
            Welcome, <span className="font-semibold">{user?.firstName || user?.emailAddresses[0]?.emailAddress}</span>
          </p>
          <UserButton afterSignOutUrl="/" />
        </div>
        </>
      )}
    </nav>

  );
}
