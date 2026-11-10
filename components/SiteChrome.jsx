// Public header, footer and donation card around every page.
export default function SiteChrome({ header, footer, donationCard, children }) {
  return (
    <>
      {header}
      {children}
      {footer}
      {donationCard}
    </>
  );
}
