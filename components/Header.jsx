'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IMG } from '@/lib/data';

const EMERGENCY_ALERTS = [
  {
    id: 'nepal',
    tag: 'Emergency',
    text: 'Nepal flash floods: Thousands need urgent relief.',
    linkText: 'Help Nepal now →',
    linkUrl: '/campaign#nepal-flood-relief-2026',
  },
  {
    id: 'bihar',
    tag: 'Emergency',
    text: 'Bihar flood crisis: Submerged villages need clean water & shelter.',
    linkText: 'Help Bihar now →',
    linkUrl: '/campaign#bihar-flood-relief-2026',
  },
  {
    id: 'assam',
    tag: 'Emergency',
    text: 'Assam floods: Urgent rehabilitation and family kits required.',
    linkText: 'Help Assam now →',
    linkUrl: '/campaign#assam-flood-relief-2026',
  },
  {
    id: 'langar',
    tag: 'Emergency',
    text: 'Ground Langar Sewa: Delivering 2,000+ warm meals daily across relief zones.',
    linkText: 'Support Langar →',
    linkUrl: '/campaign#langar-sewa',
  },
];

export default function Header() {
  const pathname = usePathname();
  const [alertOpen, setAlertOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerGroupRef = useRef(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('sa-alert-hidden') === '1') {
        setAlertOpen(false);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerGroupRef.current) {
        document.documentElement.style.setProperty(
          '--header-height',
          `${headerGroupRef.current.offsetHeight}px`
        );
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [alertOpen, pathname]);

  const closeAlert = () => {
    setAlertOpen(false);
    try {
      sessionStorage.setItem('sa-alert-hidden', '1');
    } catch (e) {}
  };

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  if (pathname?.startsWith('/donate')) {
    return null;
  }

  return (
    <div ref={headerGroupRef} className="site-header-group">
      {alertOpen && (
        <div className="alert-bar" id="alertBar">
          <div className="alert-ticker-container">
            <div className="alert-ticker-track">
              {EMERGENCY_ALERTS.concat(EMERGENCY_ALERTS).map((alert, idx) => (
                <div key={idx} className="alert-ticker-item">
                  <strong>
                    <span className="dot pulse"></span>
                    {alert.tag}
                  </strong>
                  <span className="alert-text">{alert.text}</span>
                  <Link href={alert.linkUrl}>{alert.linkText}</Link>
                  <span className="alert-ticker-dot" aria-hidden="true">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <header className="site-header">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="SikhAid Charitable Trust, home">
            <span className="brand-mark">
              <span style={{ color: 'var(--saffron)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z"/>
                </svg>
              </span>
              <img src={IMG.logo} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </span>
            <span className="brand-name">
              <b>SikhAid</b>
              <span>Charitable Trust</span>
            </span>
          </Link>

          <nav className={`nav ${menuOpen ? 'open' : ''}`} id="mainNav" aria-label="Main">
            <Link href="/about" aria-current={isActive('/about') ? 'page' : undefined} onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/campaigns" aria-current={isActive('/campaigns') ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Campaigns</Link>
            
            <div className="has-menu">
              <Link href="/get-involved" aria-current={isActive('/get-involved') || isActive('/volunteering') || isActive('/csr') ? 'page' : undefined}>Get Involved</Link>
              <div className="menu">
                <Link href="/volunteering" onClick={() => setMenuOpen(false)}>Volunteering</Link>
                <Link href="/csr" onClick={() => setMenuOpen(false)}>CSR partnerships</Link>
                <Link href="/get-involved#sponsor" onClick={() => setMenuOpen(false)}>Sponsor a program</Link>
              </div>
            </div>

            <Link href="/blog" aria-current={isActive('/blog') ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link href="/press" aria-current={isActive('/press') ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Press Coverage</Link>
            <Link href="/contact" aria-current={isActive('/contact') ? 'page' : undefined} onClick={() => setMenuOpen(false)}>Contact</Link>
            
            {/* Mobile-only item: on phone drawer, Login / My Account appears */}
            <div className="nav-divider" />
            <Link
              href="/login"
              className="nav-login-link"
              aria-current={isActive('/login') || isActive('/account') ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21a8 8 0 0 1 16 0"/>
              </svg>
              <span>Login / My Account</span>
            </Link>
          </nav>

          <div className="header-cta">
            {/* PC Icon button: on PC only the icon is visible and works. On phone, accessible via menu */}
            <Link className="icon-btn header-user-icon-btn" href="/login" aria-label="Login / My Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21a8 8 0 0 1 16 0"/>
              </svg>
            </Link>
            <Link className="btn btn-sponsor-header" href="/donate">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z"/>
              </svg>
              Sponsor
            </Link>
            <button
              className="icon-btn menu-toggle"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mainNav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
