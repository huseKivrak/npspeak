'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UserCampaignsPage() {
  const pathname = usePathname();


  return (
    <>
      <h1>campaigns</h1>
    </>
  );
}
