'use client';

import Link from 'next/link';
import Photo from '@/components/Photo';
import { donateButtonStyle } from '@/lib/donate-color';
import { cardLine } from '@/lib/card-lines';

// A compact campaign card: photo, category, title, one line on what a gift does, and the two buttons.
export default function CampaignCard({ campaign }) {
  const badge = campaign.urgent ? (
    <span className="badge urgent">
      <span className="dot pulse"></span>Emergency
    </span>
  ) : (
    <span className="badge">{campaign.status}</span>
  );

  return (
    <article className="ccard">
      <Link href={`/campaigns/${campaign.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <Photo
          src={campaign.img}
          label={campaign.title}
          tone={campaign.tone}
          alt={campaign.title}
          inner={
            <div className="ph-top">
              {badge}
              <span className="loc">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/>
                  <circle cx="12" cy="10" r="2.5"/>
                </svg>
                {campaign.location}
              </span>
            </div>
          }
        />
      </Link>
      <div className="body">
        <span className="cat">{campaign.category}</span>
        <h3 style={{ fontWeight: 700 }}>
          <Link href={`/campaigns/${campaign.slug}`}>{campaign.title}</Link>
        </h3>
        {cardLine(campaign) && <p className="ccard-line">{cardLine(campaign)}</p>}

        <div className="acts">
          <Link className="btn btn-line" href={`/campaigns/${campaign.slug}`} style={{ fontWeight: 700 }}>
            Know more
          </Link>
          <Link className="btn btn-give" href={`/donate/${campaign.slug}`} style={donateButtonStyle(campaign.donateColor, { fontWeight: 700 }, campaign.donateStyle)}>
            Donate
          </Link>
        </div>
      </div>
    </article>
  );
}
