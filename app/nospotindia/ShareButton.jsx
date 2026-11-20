'use client';

import { useState } from 'react';

// Shares the page (phone share sheet), or copies its link where sharing isn't available.
export default function ShareButton({ className = 'ns-btn ns-btn-ghost' }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.origin + window.location.pathname;
    const data = { title: 'No Spot by SikhAid', text: 'Help girls and women manage their periods with dignity.', url };
    try {
      if (navigator.share) return await navigator.share(data);
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button type="button" className={className} onClick={share}>
      {copied ? 'Link copied' : 'Share this page'}
    </button>
  );
}
