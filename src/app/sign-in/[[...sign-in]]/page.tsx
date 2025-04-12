import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import LoginImage from '../../../../public/assets/Login page.svg';
import LogoImage from '../../../../public/assets/logo.svg';

export default function SignInPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={LoginImage}
        alt="Login Background"
        fill
        className="object-cover z-0"
        priority
        quality={100}
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex gap-4 lg:gap-16 flex-col md:flex-row w-full h-full items-center justify-center lg:justify-between px-6 md:px-20 bg-black/40">
        {/* Left Text Content */}
        <div className="flex text-white mb-10 gap-4 flex-col">
          <Image
            src={LogoImage}
            alt="Login Background"
            className="z-0"
            priority
            quality={100}
          />
          <h1 className="hidden lg:flex text-3xl lg:text-4xl font-bold max-w-xl mt-10">
            Login into
            your account
          </h1>
          <p className=' hidden lg:flex text-primary-1'>
            Build a job-winning resume in minutes with smart AI tools that tailor every line to your dream role.
          </p>
        </div>


        {/* Right Form Box */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-xl shadow-lg p-6 md:p-10">
            <SignIn path="/sign-in" routing="path" signUpFallbackRedirectUrl="/sign-in" />
          </div>
        </div>
      </div>
    </div>
  );
}
