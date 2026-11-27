'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// On the test site (sikhaid.ngo/test…), links to campaigns stay on the test site: /campaigns → /test and
// /campaigns/<slug> → /test/campaigns/<slug>. Everything else (About, Contact…) goes to the main site.
const toTest = (href) => {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  const path = url.pathname.replace(/\/$/, '');
  let next = null;
  if (path === '/campaigns' || path === '/test') next = '/test';
  else if (/^\/(test\/)?campaigns\/[^/]+$/.test(path)) next = path.startsWith('/test') ? path : `/test${path}`;
  return next ? `${next}${url.search}${url.hash}` : null;
};

export default function TestSiteLinks() {
  const router = useRouter();
  useEffect(() => {
    // Show the test address on hover / in a new tab too.
    const relabel = () => {
      document.querySelectorAll('a[href]').forEach((a) => {
        const next = toTest(a.getAttribute('href'));
        if (next && a.getAttribute('href') !== next) a.setAttribute('href', next);
      });
    };
    relabel();
    const observer = new MutationObserver(() => requestAnimationFrame(relabel));
    observer.observe(document.body, { childList: true, subtree: true });

    // Next's <Link> navigates to its own address, so open the test one instead (before Link sees the click).
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href]');
      if (!link || link.target === '_blank') return;
      const next = toTest(link.getAttribute('href'));
      if (!next) return;
      e.preventDefault();
      e.stopPropagation();
      router.push(next);
    };
    document.addEventListener('click', onClick, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick, true);
    };
  }, [router]);
  return null;
}
