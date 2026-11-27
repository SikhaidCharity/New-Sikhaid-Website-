'use client';

import { useEffect } from 'react';
import CampaignsPage from '../campaigns/page';
import { startTestMode } from '@/lib/test-mode';

// sikhaid.ngo/test: the same campaigns page, but from here on (in this tab) every donation can be ₹1
// and is saved as a test payment. Close the tab to leave test mode.
export default function TestPage() {
  useEffect(() => { startTestMode(); }, []);
  return <CampaignsPage />;
}
