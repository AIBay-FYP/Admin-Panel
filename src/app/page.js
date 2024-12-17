'use client';
import React from 'react';
import ComplianceServices from '../components/ComplianceServices';
import ComplianceSearches from '../components/complianceSearches';
import ComplianceMonitoring from '@/app/complianceMonitoring/page';
import DocumentVerification from './documentVerification/page';
import ModeratorPage from '@/app/practice/page';

export default function Home() {
  return (
    <>
    <div className="flex justify-center w-full py-2 px-2">
            <div className="w-full max-w-3xl">
              {/* <ComplianceMonitoring/> */}
              <ModeratorPage/>
            </div>
          </div>
    </>
  );
}
