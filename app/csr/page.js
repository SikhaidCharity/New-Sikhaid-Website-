'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CSRPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    companySize: 'Select size',
    industry: 'Select industry',
    interests: ['Strategic Philanthropy'],
    budgetRange: 'Select budget range',
    message: '',
  });

  const handleInterestToggle = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / CSR Opportunities
          </nav>
          <h1>Corporate Social Responsibility</h1>
          <p className="lead">
            Partner with SikhAid to create meaningful social impact. Together we transform lives
            and build stronger communities across India.
          </p>
        </div>
      </section>

      {/* PARTNERSHIP MODELS OVERVIEW */}
      <section className="band tight">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">CSR Mandate &amp; Impact</span>
              <h2 className="h-sec">Partnership Models</h2>
              <p className="lead">
                Corporate Social Responsibility (CSR) spends in India are on a steady rise. It shows that more businesses
                are now integrating CSR into their core operations. A collaboration between corporates and NGOs is mutually
                beneficial for both; corporates benefit from the domain expertise and groundwork of NGOs, while NGOs get
                access to a sustainable source of funds and strategic resources.
              </p>
              <p className="lead" style={{ marginTop: '6px' }}>
                The CSR mandate has laid the foundation for collective action to address social issues on a scale by
                contributing to the sustainability of these efforts. Over the years, SikhAid has established a vast network
                of relief programs and a robust system to maintain highest standards of financial transparency and accountability
                in its functioning, making it a credible option for corporates looking to partner with NGOs.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '24px',
              marginTop: '20px',
            }}
          >
            {/* 1. Strategic Philanthropy */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 18px rgba(18, 26, 74, 0.035)',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'var(--saffron-soft)',
                  color: 'var(--saffron-deep)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '24px',
                }}
              >
                🏛️
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Strategic Philanthropy
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                Through funds and in-kind contributions
              </p>
              <a className="more" href="#csr-form" style={{ color: 'var(--indigo)' }}>
                Collaborate now →
              </a>
            </div>

            {/* 2. Cause Marketing Initiatives */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 18px rgba(18, 26, 74, 0.035)',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'var(--indigo-soft)',
                  color: 'var(--indigo)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '24px',
                }}
              >
                📢
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Cause Marketing Initiatives
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                Co-branded campaigns for social impact
              </p>
              <a className="more" href="#csr-form" style={{ color: 'var(--indigo)' }}>
                Collaborate now →
              </a>
            </div>

            {/* 3. Events and Sponsorship */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 18px rgba(18, 26, 74, 0.035)',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#EEF2FF',
                  color: '#4F46E5',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '24px',
                }}
              >
                🎪
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Events and Sponsorship
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                Support our community programs
              </p>
              <a className="more" href="#csr-form" style={{ color: 'var(--indigo)' }}>
                Collaborate now →
              </a>
            </div>

            {/* 4. Innovations and Project Solutions */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 4px 18px rgba(18, 26, 74, 0.035)',
              }}
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#ECFDF5',
                  color: '#059669',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '24px',
                }}
              >
                💡
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Innovations and Project Solutions
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.5, margin: 0, flex: 1 }}>
                For children and communities
              </p>
              <a className="more" href="#csr-form" style={{ color: 'var(--indigo)' }}>
                Collaborate now →
              </a>
            </div>
          </div>

          {/* DELVE DEEPER STRIP */}
          <div
            style={{
              marginTop: '36px',
              background: 'var(--bg-alt)',
              border: '1.5px solid var(--line)',
              borderRadius: '20px',
              padding: '24px 30px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div className="stack" style={{ gap: '4px' }}>
              <b style={{ fontSize: '17px', color: 'var(--ink)' }}>
                Want to delve deeper into our CSR activities and find out how you can contribute towards the betterment of your country?
              </b>
              <span style={{ fontSize: '14.5px', color: 'var(--muted)' }}>
                Reach out to us at <a href="mailto:help@sikhaid.ngo" style={{ color: 'var(--indigo)', fontWeight: 700 }}>help@sikhaid.ngo</a> · Contact Us: <a href="tel:+919851341234" style={{ color: 'var(--indigo)', fontWeight: 700 }}>+91 98513 41234</a>
              </span>
            </div>
            <Link className="btn btn-line" href="/about">
              Find out more about our organisation →
            </Link>
          </div>
        </div>
      </section>

      {/* CSR INQUIRY FORM */}
      <section className="band alt" id="csr-form" aria-labelledby="form-h">
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Partnership Inquiry</span>
              <h2 className="h-sec" id="form-h">Start Your CSR Partnership</h2>
              <p className="lead">
                Let&apos;s discuss how we can create meaningful impact together. Fill out the form below.
              </p>
            </div>
          </div>

          <div
            className="panel"
            style={{
              background: 'var(--bg)',
              border: '1.5px solid var(--line)',
              borderRadius: '24px',
              padding: 'clamp(24px, 5vw, 44px)',
              boxShadow: '0 8px 30px rgba(18, 26, 74, 0.04)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '36px 16px' }}>
                <span style={{ fontSize: '48px' }}>🤝</span>
                <h3 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', marginTop: '12px' }}>
                  Inquiry Received Successfully!
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '12px auto 24px', lineHeight: 1.5 }}>
                  Thank you, <b>{formData.contactPerson}</b> from <b>{formData.companyName}</b>.
                  Our partnership team will contact you within 48 hours.
                </p>
                <div style={{ display: 'inline-flex', gap: '12px' }}>
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit another inquiry
                  </button>
                  <Link className="btn btn-line" href="/about#compliance">
                    View Compliance Documents
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1.5px solid var(--line)', paddingBottom: '10px' }}>
                  Company Information
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                  <label className="field">
                    <span>Company Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </label>

                  <label className="field">
                    <span>Contact Person Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="Enter contact person name"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                  <label className="field">
                    <span>Email *</span>
                    <input
                      type="email"
                      required
                      placeholder="Enter official email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </label>

                  <label className="field">
                    <span>Phone Number *</span>
                    <input
                      type="tel"
                      required
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                  <label className="field">
                    <span>Company Size *</span>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    >
                      <option value="Select size">Select size</option>
                      <option value="1-50 employees">1-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="201-500 employees">201-500 employees</option>
                      <option value="501-1000 employees">501-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </select>
                  </label>

                  <label className="field">
                    <span>Industry *</span>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    >
                      <option value="Select industry">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance & Banking">Finance &amp; Banking</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Education">Education</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1.5px solid var(--line)', paddingBottom: '10px', marginTop: '12px' }}>
                  Partnership Details
                </h3>

                <div>
                  <span style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--ink)', display: 'block', marginBottom: '8px' }}>
                    Partnership Interest * (Select all that apply)
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '10px' }}>
                    {[
                      'Strategic Philanthropy',
                      'Cause Marketing Initiatives',
                      'Events and Sponsorship',
                      'Innovations and Project Solutions',
                    ].map((interest) => (
                      <label
                        key={interest}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '12px 14px',
                          border: '1.5px solid var(--line)',
                          borderRadius: '12px',
                          background: formData.interests.includes(interest) ? 'var(--indigo-soft)' : 'var(--bg)',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'var(--ink)',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                        />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>

                <label className="field">
                  <span>Approximate Budget Range *</span>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  >
                    <option value="Select budget range">Select budget range</option>
                    <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                    <option value="₹1-5 Lakhs">₹1-5 Lakhs</option>
                    <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>
                    <option value="₹10-25 Lakhs">₹10-25 Lakhs</option>
                    <option value="₹25-50 Lakhs">₹25-50 Lakhs</option>
                    <option value="₹50 Lakhs+">₹50 Lakhs+</option>
                  </select>
                </label>

                <label className="field">
                  <span>Message / Requirements *</span>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter your message or CSR project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </label>

                <div style={{ marginTop: '8px' }}>
                  <button className="btn btn-give btn-lg" type="submit" style={{ width: '100%' }}>
                    Submit Inquiry
                  </button>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', marginTop: '10px' }}>
                    Our partnership team will contact you within 48 hours.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* LET'S CREATE IMPACT TOGETHER */}
      <section className="band tight" style={{ textAlign: 'center' }}>
        <div className="wrap stack" style={{ alignItems: 'center', gap: '16px' }}>
          <h2 className="h-sec">Let&apos;s Create Impact Together</h2>
          <p className="lead" style={{ maxWidth: '640px' }}>
            Join leading corporations who trust SikhAid to deliver meaningful social impact aligned with their CSR goals.
          </p>
          <div className="row" style={{ justifyContent: 'center', gap: '14px', marginTop: '8px' }}>
            <Link className="btn btn-dark btn-lg" href="/about">
              Learn About Us
            </Link>
            <Link className="btn btn-line btn-lg" href="/contact">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
