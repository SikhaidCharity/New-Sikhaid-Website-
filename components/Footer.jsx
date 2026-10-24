'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IMG } from '@/lib/data';

export default function Footer({ withCta = true }) {
  const pathname = usePathname();

  // Hide CTA band on checkout, campaign detail, account and login pages just like data-cta="0" in static HTML
  const noCtaPages = ['/donate', '/campaign', '/account', '/login'];
  const showCta = withCta && !noCtaPages.some((p) => pathname?.startsWith(p));

  return (
    <>
      {showCta && (
        <section className="cta-band">
          <div className="wrap">
            <div className="stack" style={{ gap: '10px', flex: '1 1 480px' }}>
              <h2>Join us in serving India.</h2>
              <p style={{ maxWidth: '56ch' }}>
                Your support helps us respond faster to emergencies and build
                stronger, more resilient communities across India.
              </p>
            </div>
            <div className="stack" style={{ gap: '14px' }}>
              <div className="row">
                <Link className="btn btn-give btn-lg" href="/donate">
                  Support our mission
                </Link>
                <Link className="btn btn-light btn-lg" href="/get-involved#csr">
                  Partner with us
                </Link>
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  gap: '10px',
                  alignItems: 'center',
                  color: '#fff',
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <span>
                  <b>Emergency support 24/7:</b> +91 98513 41234
                </span>
              </span>
            </div>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <div className="wrap">
          <div className="cols">
            <div className="stack" style={{ gap: '16px' }}>
              <Link className="brand" href="/" style={{ color: '#fff' }}>
                <span
                  className="brand-mark"
                  style={{ background: 'var(--saffron)' }}
                >
                  <span style={{ color: 'var(--ink)' }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z" />
                    </svg>
                  </span>
                  <img
                    src={IMG.logo}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </span>
                <span className="brand-name">
                  <b>SikhAid</b>
                  <span style={{ color: 'var(--on-dark)' }}>
                    Charitable Trust
                  </span>
                </span>
              </Link>
              <p style={{ maxWidth: '44ch' }}>
                Serving India with humanitarian aid and disaster relief since
                2020, with compassion, dignity, and 100% transparency during
                times of crisis.
              </p>
              <ul>
                <li>
                  <a href="mailto:help@sikhaid.ngo">help@sikhaid.ngo</a>
                </li>
                <li>
                  <a href="tel:+919851341234">+91 98513 41234</a>
                </li>
                <li>House no. 222, Mangraj Lane, Cuttack, Odisha 753001</li>
              </ul>
              <div className="socials">
                <a
                  href="https://www.instagram.com/sikh_aid"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/17fYSEFjUA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/sikh-aid-charitable-trustt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919851341234"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3>Quick links</h3>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About us</Link>
                </li>
                <li>
                  <Link href="/campaigns">Campaigns</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/press">Press coverage</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3>Get involved</h3>
              <ul>
                <li>
                  <Link href="/donate">Donate now</Link>
                </li>
                <li>
                  <Link href="/donate#monthly">Give monthly</Link>
                </li>
                <li>
                  <Link href="/volunteering">Volunteering</Link>
                </li>
                <li>
                  <Link href="/csr">CSR partnerships</Link>
                </li>
                <li>
                  <Link href="/get-involved#sponsor">Sponsor a program</Link>
                </li>
                <li>
                  <Link href="/account">My account</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3>Legal &amp; trust</h3>
              <ul>
                <li>
                  <Link href="/contact#privacy">Privacy policy</Link>
                </li>
                <li>
                  <Link href="/contact#terms">Terms of service</Link>
                </li>
                <li>
                  <Link href="/contact#refund">Refund policy</Link>
                </li>
                <li>
                  <Link href="/about#compliance">80G certificate</Link>
                </li>
                <li>
                  <Link href="/about#compliance">Annual reports</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="foot-base">
            <span>
              © 2026 SikhAid Charitable Trust · 80G Reg. No. [80G NUMBER] · Trust
              Reg. No. [TRUST NUMBER]
            </span>
            <span className="row" style={{ gap: '8px' }}>
              Secure payments by Razorpay
              <span className="pay-chip">UPI</span>
              <span className="pay-chip">RuPay</span>
              <span className="pay-chip">Visa</span>
              <span className="pay-chip">Mastercard</span>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
