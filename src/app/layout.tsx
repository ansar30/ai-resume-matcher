// app/layout.tsx or wherever your root layout is
import AuthNavBar from '@/components/AuthNavbar';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css'; // or wherever your CSS file is


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50">
          <main className="">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
