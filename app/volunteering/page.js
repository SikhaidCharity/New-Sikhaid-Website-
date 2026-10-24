'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VolunteeringPage() {
  const [selectedArea, setSelectedArea] = useState('Online Volunteering');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: 'Male',
    address: '',
    area: 'Online Volunteering',
    duration: '3-6 months',
    experience: '1 year',
    startDate: '',
    about: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSelectArea = (areaName) => {
    setSelectedArea(areaName);
    setFormData((prev) => ({ ...prev, area: areaName }));
    const formEl = document.getElementById('volunteer-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / Volunteering Opportunities
          </nav>
          <h1>Why Volunteer with SikhAid?</h1>
          <p className="lead">
            Join a passionate community dedicated to serving humanity. Your skills, time,
            and compassion can create lasting change.
          </p>
        </div>
      </section>

      {/* VOLUNTEER OPPORTUNITIES */}
      <section className="band tight">
        <div className="wrap">
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Volunteer Opportunities</span>
              <h2 className="h-sec">Choose an area that matches your skills and passion</h2>
              <p className="lead">
                Every contribution makes a difference. Pick an opportunity below to start your registration.
              </p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '24px',
              marginTop: '16px',
            }}
          >
            {/* 1. Online Volunteering */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
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
                💻
              </div>
              <h3 style={{ fontSize: '21px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Online Volunteering
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                Support our mission remotely through virtual coordination, administrative tasks, and digital assistance.
              </p>
              <button
                className="btn btn-give"
                type="button"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => handleSelectArea('Online Volunteering')}
              >
                Register Now
              </button>
            </div>

            {/* 2. Blogging */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
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
                ✍️
              </div>
              <h3 style={{ fontSize: '21px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Blogging
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                Share impactful stories, document our relief efforts, and create compelling content that inspires action.
              </p>
              <button
                className="btn btn-give"
                type="button"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => handleSelectArea('Blogging')}
              >
                Register Now
              </button>
            </div>

            {/* 3. Social Media */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
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
                📱
              </div>
              <h3 style={{ fontSize: '21px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Social Media
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                Manage our social presence, engage communities, and amplify our message across digital platforms.
              </p>
              <button
                className="btn btn-give"
                type="button"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => handleSelectArea('Social Media')}
              >
                Register Now
              </button>
            </div>

            {/* 4. Online Fundraising */}
            <div
              className="panel"
              style={{
                background: 'var(--bg)',
                border: '1.5px solid var(--line)',
                borderRadius: '22px',
                padding: '32px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
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
                🤝
              </div>
              <h3 style={{ fontSize: '21px', fontWeight: 700, color: 'var(--ink)', margin: 0 }}>
                Online Fundraising
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.55, margin: 0, flex: 1 }}>
                Drive donation campaigns, reach out to potential donors, and help us expand our impact through digital fundraising.
              </p>
              <button
                className="btn btn-give"
                type="button"
                style={{ width: '100%', marginTop: '10px' }}
                onClick={() => handleSelectArea('Online Fundraising')}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM SECTION */}
      <section className="band alt" id="volunteer-form" aria-labelledby="form-h">
        <div className="wrap" style={{ maxWidth: '820px' }}>
          <div className="sec-head">
            <div className="stack">
              <span className="eyebrow">Get Started</span>
              <h2 className="h-sec" id="form-h">Volunteer Registration</h2>
              <p className="lead">
                Fill out the form below and our team will get in touch with you shortly.
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
                <span style={{ fontSize: '48px' }}>🎉</span>
                <h3 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--ink)', marginTop: '12px' }}>
                  Thank you for registering to volunteer!
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '480px', margin: '12px auto 24px', lineHeight: 1.5 }}>
                  We have received your application for <b>{formData.area}</b>.
                  The SikhAid volunteer team will review your details and reach out to you within 48 hours.
                </p>
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1.5px solid var(--line)', paddingBottom: '10px' }}>
                  Personal Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                  <label className="field">
                    <span>Full Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaspreet Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </label>

                  <label className="field">
                    <span>Email *</span>
                    <input
                      type="email"
                      required
                      placeholder="e.g. jaspreet@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                  <label className="field">
                    <span>Mobile Number *</span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="Enter 10-digit mobile number without spaces or dashes"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <small style={{ color: 'var(--muted)', fontSize: '12px' }}>Enter 10-digit mobile number without spaces or dashes</small>
                  </label>

                  <label className="field">
                    <span>Gender *</span>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', minHeight: '48px' }}>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', color: 'var(--ink)' }}>
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === 'Male'}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        />
                        Male
                      </label>
                      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '15px', color: 'var(--ink)' }}>
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === 'Female'}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        />
                        Female
                      </label>
                    </div>
                  </label>
                </div>

                <label className="field">
                  <span>Address *</span>
                  <input
                    type="text"
                    required
                    placeholder="Enter full address and city"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </label>

                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1.5px solid var(--line)', paddingBottom: '10px', marginTop: '12px' }}>
                  Volunteering Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                  <label className="field">
                    <span>Selected Area of Interest *</span>
                    <select
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    >
                      <option value="Online Volunteering">Online Volunteering</option>
                      <option value="Blogging">Blogging</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Online Fundraising">Online Fundraising</option>
                    </select>
                  </label>

                  <label className="field">
                    <span>Duration (Months) *</span>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    >
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="12+ months">12+ months</option>
                    </select>
                  </label>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                  <label className="field">
                    <span>Experience (Years)</span>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    >
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3+ years">3+ years</option>
                    </select>
                  </label>

                  <label className="field">
                    <span>Available Start Date *</span>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </label>
                </div>

                <label className="field">
                  <span>About Yourself *</span>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about yourself, your skills, or any previous volunteer experiences..."
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  />
                </label>

                <div style={{ marginTop: '8px' }}>
                  <button className="btn btn-give btn-lg" type="submit" style={{ width: '100%' }}>
                    Submit
                  </button>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', marginTop: '10px' }}>
                    * The SikhAid team will reach out to you soon.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* READY TO MAKE AN IMPACT */}
      <section className="band tight" style={{ textAlign: 'center' }}>
        <div className="wrap stack" style={{ alignItems: 'center', gap: '16px' }}>
          <h2 className="h-sec">Ready to Make an Impact?</h2>
          <p className="lead" style={{ maxWidth: '640px' }}>
            Join hundreds of volunteers who are changing lives every day. Your journey of seva starts here.
          </p>
          <div className="row" style={{ justifyContent: 'center', marginTop: '8px' }}>
            <a className="btn btn-dark btn-lg" href="#volunteer-form">
              Register Now
            </a>
            <Link className="btn btn-line btn-lg" href="/campaigns">
              Explore Active Campaigns
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
