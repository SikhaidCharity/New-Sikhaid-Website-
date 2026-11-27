import TestSiteLinks from '@/components/TestSiteLinks';

// The team's test site: the same campaign pages, where a donation can be ₹1 (saved as a test payment).
// Kept out of search results; the main site is not affected.
export const metadata = {
  title: 'Test',
  robots: { index: false, follow: false },
};

export default function TestLayout({ children }) {
  return (
    <>
      <TestSiteLinks />
      {children}
    </>
  );
}
