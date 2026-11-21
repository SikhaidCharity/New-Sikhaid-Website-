'use client';

// One campaign number that stays live (raised in rupees, or donors), for pages built on the server.
import { fmt } from '@/lib/data';
import { useLiveStats } from '@/lib/live-stats';

export default function LiveNumber({ slug, field = 'raised', initial = 0 }) {
  const live = useLiveStats()?.[slug]?.[field];
  const value = typeof live === 'number' ? live : Number(initial) || 0;
  return field === 'raised' ? fmt(value) : value.toLocaleString('en-IN');
}
