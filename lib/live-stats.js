'use client';

// Live campaign totals from the Sikhaid Admin (admin: lib/campaign-stats.js): each campaign's starting
// totals plus every payment received since. Fetched once per page visit; until it arrives (or if the
// admin can't be reached) the page shows the totals it was built with.
import { useEffect, useState } from 'react';
import { ADMIN_API } from './forms';

let request = null;
let latest = null;

function fetchStats() {
  if (!request) {
    request = fetch(`${ADMIN_API}/api/public/campaign-stats`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        latest = data?.campaigns || null;
        return latest;
      })
      .catch(() => null);
  }
  return request;
}

export function useLiveStats() {
  const [stats, setStats] = useState(latest);
  useEffect(() => {
    let current = true;
    fetchStats().then((data) => current && data && setStats(data));
    return () => {
      current = false;
    };
  }, []);
  return stats;
}

// The campaign with its live raised / donors, when known.
export const withLive = (campaign, stats) => {
  const live = campaign && stats?.[campaign.slug];
  return live ? { ...campaign, raised: live.raised, donors: live.donors } : campaign;
};

// One campaign, kept live.
export function useLiveCampaign(campaign) {
  return withLive(campaign, useLiveStats());
}

// How full a campaign's bar is (0–100). There are no targets, so each bar is measured against the active
// campaign that has raised the most. A square-root scale lifts smaller campaigns so their bars stay
// clearly visible while keeping the same order; every payment makes the bar grow. Never shown as a number.
export function raisedShare(campaign, stats, all) {
  const raisedOf = (c) => Number(withLive(c, stats)?.raised) || 0;
  const active = all.filter((c) => c.status !== 'Completed');
  const top = Math.max(1, ...(active.length ? active : all).map(raisedOf));
  const share = Math.sqrt(Math.min(1, raisedOf(campaign) / top)) * 100;
  return share > 0 ? Math.max(12, Math.min(100, share)) : 0;
}
