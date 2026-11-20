// Google Tag Manager for a page. SikhAid's container (GTM-WN3VPN86, the same one the live site uses)
// loads the Meta Pixel (PageView) and the Google Ads tags, and fires Meta "Purchase" when the page
// pushes { event: 'purchase', donation_value } to the dataLayer.
// Set NEXT_PUBLIC_GTM_ID to use a different container.
import Script from 'next/script';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-WN3VPN86';

export default function Gtm() {
  if (!/^GTM-[A-Z0-9]+$/.test(GTM_ID)) return null;
  return (
    <>
      <Script id={`gtm-${GTM_ID}`} strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
