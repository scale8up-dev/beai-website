'use client';

import { usePathname } from 'next/navigation';
import CursorFollower from '@/components/CursorFollower';

export default function SiteOverlays() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return (
    <>
      {/* Grain overlay layer */}
      <div aria-hidden="true" className="grain-overlay" />
      <CursorFollower />
    </>
  );
}
