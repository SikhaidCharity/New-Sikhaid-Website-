import Link from 'next/link';
import Photo from '@/components/Photo';
import { fmt, pct } from '@/lib/data';

export default function CampaignCard({ campaign }) {
  const p = pct(campaign);
  const badge = campaign.urgent ? (
    <span className="badge urgent">
      <span className="dot pulse"></span>Emergency
    </span>
  ) : (
    <span className="badge">{campaign.status}</span>
  );
  const meta = campaign.days ? `${campaign.days} days left` : 'Ongoing';

  return (
    <article className="ccard">
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
      <div className="body">
        <span className="cat">{campaign.category}</span>
        <h3>
          <Link href={`/campaigns/${campaign.slug}`}>{campaign.title}</Link>
        </h3>

        <div className="ccard-stats">
          <div className="progress" role="img" aria-label={`${p}% of goal raised`}>
            <i style={{ width: `${p}%` }}></i>
          </div>
          <div className="money">
            <span>
              <b className="num">{fmt(campaign.raised)}</b>
              <span className="goal-sub"> raised of {fmt(campaign.goal)}</span>
            </span>
            <span className="ccard-pct">{p}%</span>
          </div>
          <div className="meta">
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {campaign.donors.toLocaleString('en-IN')} donors
            </span>
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              {meta}
            </span>
          </div>
        </div>

        <div className="acts">
          <Link className="btn btn-line" href={`/campaigns/${campaign.slug}`}>
            Know more
          </Link>
          <Link className="btn btn-give" href={`/donate/${campaign.slug}`}>
            Donate
          </Link>
        </div>
      </div>
    </article>
  );
}
