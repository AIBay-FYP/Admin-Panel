'use client';
import React from 'react';
import ComplianceMonitoring from '@/app/complianceMonitoring/page';
import ModeratorsPage from '@/app/moderatorPage/page';




export default function Home() {
  return (
    <>
    <div className="flex justify-center w-full py-2 px-2">
            <div className="w-full max-w-3xl">
              {/* <ComplianceMonitoring/> */}
              <ModeratorsPage />
            </div>
          </div>
    </>
  );
}
