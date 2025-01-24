import React from 'react';
import ComplianceMonitoring from '@/app/complianceMonitoring/page';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Login from './sign-in/[[...sign-in]]/page';




export default async function Home() {

  return (
    <>
    <div className="flex justify-center w-full py-2 px-2">
            <div className="w-full max-w-3xl">
            <SignedIn>
            <ComplianceMonitoring/>
            </SignedIn>
            <SignedOut>
            <Login/>
            </SignedOut>
            </div>
          </div>
    </>
  );
}
