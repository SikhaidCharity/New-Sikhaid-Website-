// Runs before every build: fetches the latest website content from the Sikhaid Admin
// (ADMIN_API_URL, e.g. https://sikhaidadminnew.vercel.app) and writes it into lib/.
// If the admin can't be reached, the build carries on with the files already in the repo.
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = (process.env.ADMIN_API_URL || '').replace(/\/$/, '');
const FILES = {
  campaigns: 'lib/campaigns-data.json',
  blogs: 'lib/content/blogs.json',
  celebCards: 'lib/content/celeb-image-cards.json',
  celebBigCards: 'lib/content/celeb-big-cards.json',
  hero: 'lib/content/hero.json',
  home: 'lib/content/home.json',
  site: 'lib/content/site.json',
};

if (!base) {
  console.log('pull-content: ADMIN_API_URL not set, using the content files in the repo.');
  process.exit(0);
}
try {
  const res = await fetch(`${base}/api/public/content`, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const content = await res.json();
  for (const [name, file] of Object.entries(FILES)) {
    const data = content[name];
    const empty = data == null || (Array.isArray(data) ? data.length === 0 : Object.keys(data).length === 0);
    if (empty) continue; // never wipe a section just because the admin returned nothing
    writeFileSync(path.join(root, file), JSON.stringify(data, null, 2) + '\n');
  }
  console.log('pull-content: content updated from', base);
} catch (e) {
  console.warn('pull-content: could not reach the admin, using the content files in the repo.', e.message);
}
