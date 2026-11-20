'use client';

import { useEffect } from 'react';

const LIVE_DONATE = 'https://www.sikhaid.ngo/donate/no-spot';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];

// On this page every Donate link leads to the live site's No Spot donation page (real payments),
// including the site header's Donate button. The ad's tracking tags (?utm_source=… and the Meta /
// Google click ids) go along, so the donation there is credited to the right ad.
function liveTarget(href) {
  const url = new URL(href, window.location.href);
  const sameSiteDonate = url.origin === window.location.origin && /^\/donate(\/|$)/.test(url.pathname) && !/thank-you/.test(url.pathname);
  if (!sameSiteDonate && !url.href.startsWith(LIVE_DONATE)) return null;
  const target = new URL(sameSiteDonate ? LIVE_DONATE : url.href);
  if (sameSiteDonate && (url.hash === '#monthly' || url.searchParams.get('monthly'))) target.searchParams.set('type', 'monthly');
  const here = new URLSearchParams(window.location.search);
  UTM_KEYS.forEach((k) => here.get(k) && target.searchParams.set(k, here.get(k)));
  return target.toString();
}

export default function KeepUtm() {
  useEffect(() => {
    // Show the real address on hover / long-press.
    document.querySelectorAll('a[href]').forEach((a) => {
      const target = liveTarget(a.getAttribute('href'));
      if (target) a.href = target;
    });
    // Take over the click before the site's own donation card or page links can.
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href]');
      const target = link && liveTarget(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      window.location.href = target;
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);
  return null;
}
