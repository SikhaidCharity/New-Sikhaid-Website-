/* SikhAid Charitable Trust — shared site script
   ------------------------------------------------------------------
   HOW TO UPDATE CONTENT
   • Campaigns live in SA.campaigns below. Raised / goal / donors / updates are
     SAMPLE figures for the design — connect them to your database before launch.
   • Photos point to the images already on www.sikhaid.ngo. If an image can't load,
     a coloured block with a caption is shown instead, so nothing ever looks broken.
   ------------------------------------------------------------------ */
(function () {
  const SITE = 'https://www.sikhaid.ngo';
  const ibb = (path) => SITE + '/api/img?src=' + encodeURIComponent('https://i.ibb.co/' + path);

  const IMG = {
    logo: SITE + '/sikhaidLogo.webp',
    assam1: ibb('zWXc5WPS/IMG-1877.webp'), assam2: ibb('ymN4S1Yq/IMG-2200.webp'), assam3: ibb('Kg1fJyy/IMG-2224.webp'),
    assam4: ibb('qVMnqg1/IMG-1864.webp'), assam5: ibb('84sqmnyk/IMG-1807.webp'), assam6: ibb('twFzLXhg/DSC-3910.webp'),
    assam7: ibb('LdmSnCnT/DSC-3829.webp'), assam8: ibb('2YKbjxLM/DSC-3891.webp'),
    food: SITE + '/gallery/gallery-151-community-food.webp', langar: SITE + '/gallery/gallery-147-langar-meals.webp',
    fooddist: SITE + '/gallery/gallery-148-food-distribution.webp', pads: SITE + '/gallery/gallery-153-sanitary-pads.webp',
    hygiene: SITE + '/gallery/gallery-154-hygiene-workshop.webp', ration: SITE + '/gallery/gallery-164-ration-kits.webp',
    blanket: SITE + '/campaigns-bg/mission-blanket.webp', health: SITE + '/campaigns-bg/impact-healthcare.webp',
    ratha1: SITE + '/annapurna-seva/ratha-yatra-hero-1.webp', ratha4: SITE + '/annapurna-seva/ratha-yatra-hero-4.webp',
    ratha6: SITE + '/annapurna-seva/ratha-yatra-hero-6.webp',
    merch1: SITE + '/merch-1.jpeg', merch2: SITE + '/merch-2.jpeg',
    badshah: 'https://i.ibb.co/SXznFG7r/IMG-20251116-193328-125.webp',
    jaspreet: SITE + '/personalities/jaspreet-singh.webp', banita: SITE + '/personalities/banita-sandhu.webp'
  };

  const TIERS = {
    flood: [
      { amt: 500, what: 'Clean drinking water for one family for a week' },
      { amt: 1000, what: 'A dry-ration kit: rice, atta, dal, oil and salt for a family' },
      { amt: 2500, what: 'A complete family relief kit: rations, tarpaulin, mosquito net, ORS and hygiene items' },
      { amt: 5000, what: 'Medicines and supplies for a one-day village medical camp' },
      { amt: 10000, what: 'Hot langar meals for an entire relief camp for one day' },
      { amt: 25000, what: 'A boat run carrying supplies to villages cut off by water' }
    ],
    hunger: [
      { amt: 500, what: '20 freshly cooked langar meals' },
      { amt: 1000, what: '40 meals served with dignity' },
      { amt: 2500, what: 'One full day of langar at a community kitchen point' },
      { amt: 5000, what: 'Monthly ration support for two families' },
      { amt: 10000, what: 'A week of meals for a homeless shelter' },
      { amt: 25000, what: 'Kitchen equipment for a new langar point' }
    ],
    health: [
      { amt: 500, what: 'Basic medicines for 5 patients' },
      { amt: 1000, what: 'Fuel for one Health on Wheels village visit' },
      { amt: 2500, what: 'Diagnostic tests for a village health camp' },
      { amt: 5000, what: 'One full day of free medical camp in a remote village' },
      { amt: 10000, what: 'A month of medicines for chronic patients on our route' },
      { amt: 25000, what: 'Equipment upgrade for the ambulance' }
    ],
    youth: [
      { amt: 500, what: 'A football and training cones for a village team' },
      { amt: 1000, what: 'Sports shoes for one young athlete' },
      { amt: 2500, what: 'A month of coaching for a group of 10' },
      { amt: 5000, what: 'Team jerseys and kit for a squad' },
      { amt: 10000, what: 'A district-level tournament entry and travel' },
      { amt: 25000, what: 'A season of structured training for a whole village' }
    ]
  };

  const BREAKDOWN = {
    flood: [['Relief material: food, water, kits, medicine', 72], ['Logistics: boats, trucks, storage', 18], ['Admin, audits and receipts', 10]],
    hunger: [['Fresh ingredients and rations', 78], ['Kitchen operations and gas', 14], ['Admin, audits and receipts', 8]],
    health: [['Medicines and diagnostics', 55], ['Ambulance fuel, upkeep and staff', 35], ['Admin, audits and receipts', 10]],
    youth: [['Equipment and kit', 45], ['Coaching and travel', 45], ['Admin, audits and receipts', 10]]
  };

  const campaigns = [
    { slug: 'nepal-flood-relief-2026', title: 'Nepal Flood Relief 2026', short: 'Nepal', type: 'flood', group: 'Emergency', category: 'Flood relief', location: 'Nepal', status: 'Active emergency', urgent: true,
      blurb: 'Flash floods and landslides have washed away homes, roads and bridges. Entire communities are cut off.',
      story: ['Nepal is facing a devastating flash flood disaster. Torrential rainfall has triggered powerful floods and landslides across affected regions, washing away homes, roads, and bridges.', 'Thousands of families are stranded, entire communities have been cut off, and urgent access to food, shelter, clean water, and medical aid is needed.', 'SikhAid teams are moving relief material into the worst-hit districts and will stay on through rehabilitation.'],
      raised: 2265000, goal: 3000000, donors: 1912, days: 18, tone: '#34506E', img: IMG.assam6,
      metrics: [['2,940', 'Families reached'], ['36,500', 'Meals served'], ['1,750', 'Relief kits delivered'], ['7', 'Districts covered']] },
    { slug: 'bihar-flood-relief-2026', title: 'Bihar Flood Relief 2026', short: 'Bihar', type: 'flood', group: 'Emergency', category: 'Flood relief', location: 'Bihar', status: 'Active emergency', urgent: true,
      blurb: 'Villages submerged, homes destroyed. Families stranded without food, clean water, shelter or medical care.',
      story: ['Bihar is facing a devastating flood crisis. Relentless rainfall and overflowing rivers have submerged villages, destroyed homes, and cut off entire communities.', 'Thousands of families are stranded without access to food, clean drinking water, shelter, or essential medical care.', 'In this difficult hour, we stand with Bihar. Together, we can bring hope, relief, and lifesaving support to those who need it most.'],
      raised: 1840000, goal: 2500000, donors: 1284, days: 12, tone: '#3E5872', img: IMG.assam2,
      metrics: [['3,450', 'Families reached'], ['41,000', 'Meals served'], ['2,180', 'Relief kits delivered'], ['9', 'Districts covered']] },
    { slug: 'assam-flood-relief-2026', title: 'Assam Flood Relief 2026', short: 'Assam', type: 'flood', group: 'Emergency', category: 'Flood relief', location: 'Assam', status: 'Rehabilitation phase', urgent: false,
      blurb: 'Thousands displaced and livelihoods disrupted. We are distributing relief and helping families rebuild.',
      story: ['Assam is facing a devastating flood crisis, with relentless rainfall and overflowing rivers affecting communities across the state.', 'Thousands of families have been displaced, homes have been damaged, livelihoods have been disrupted, and access to basic necessities has become increasingly difficult.', 'Our teams delivered immediate relief and are now helping families rebuild homes and restart their livelihoods.'],
      raised: 1410000, goal: 2000000, donors: 986, days: 21, tone: '#46607A', img: IMG.assam1,
      metrics: [['2,100', 'Families reached'], ['28,000', 'Meals served'], ['1,320', 'Relief kits delivered'], ['6', 'Districts covered']] },
    { slug: 'langar-sewa', title: 'Langar Sewa', short: 'Langar', type: 'hunger', group: 'Hunger', category: 'Hunger', location: 'Pan-India', status: 'Ongoing', urgent: false,
      blurb: 'Freshly cooked, nutritious meals served with dignity so that no one in our communities goes hungry.',
      story: ['Across communities, many families and individuals struggle to access fresh, nutritious meals every day.', 'Langar Sewa brings people together to prepare and distribute freshly cooked food at different locations, ensuring that no one goes hungry and that those in need receive a warm, wholesome meal with dignity.'],
      raised: 620000, goal: 1000000, donors: 640, days: null, tone: '#7A4E26', img: IMG.food,
      metrics: [['2,000+', 'Meals a day'], ['300+', 'Volunteers'], ['[N]', 'Langar points'], ['365', 'Days a year']] },
    { slug: 'sikh-aid-health-on-wheels', title: 'Sikh Aid Health on Wheels', short: 'Health on Wheels', type: 'health', group: 'Healthcare', category: 'Healthcare', location: 'Odisha', status: 'Ongoing', urgent: false,
      blurb: 'A fully equipped ambulance bringing free medical care to remote villages, without the burden of travel or cost.',
      story: ['Sikh Aid Health on Wheels is a mobile healthcare initiative designed to bring free medical services directly to rural and underserved communities.', 'Through a fully equipped ambulance, this campaign ensures that people in remote villages, especially in Odisha, receive timely medical attention without the burden of travel or cost.'],
      raised: 485000, goal: 1200000, donors: 402, days: null, tone: '#2E6B68', img: IMG.health,
      metrics: [['[N]', 'Patients treated'], ['[N]', 'Villages visited'], ['[N]', 'Camps held'], ['Free', 'For every patient']] },
    { slug: 'dreams-on-field', title: 'Dreams On Field', short: 'Dreams On Field', type: 'youth', group: 'Youth', category: 'Youth empowerment', location: 'Rural India', status: 'Ongoing', urgent: false,
      blurb: 'Structured sports programs, equipment and coaching that give rural youth a field to dream on.',
      story: ['Sikhaid Dreams on Field is a grassroots sports development initiative aimed at empowering rural youth through structured sports programs, access to equipment, and professional guidance.'],
      raised: 210000, goal: 500000, donors: 215, days: null, tone: '#3F6B3A', img: null,
      metrics: [['[N]', 'Young athletes'], ['[N]', 'Villages'], ['[N]', 'Coaches'], ['[N]', 'Tournaments']] }
  ];

  const completed = [
    { title: 'Ratha Yatra Seva 2025', sub: 'Puri, Odisha · water, ORS and meals for pilgrims', tone: '#8A5A2B', img: IMG.ratha4 },
    { title: 'COVID Oxygen Sewa', sub: 'Oxygen support and ration kits during the pandemic', tone: '#5C5030', img: IMG.ration },
    { title: 'Winter Blanket Distribution', sub: 'Blankets for families facing harsh winters', tone: '#4A4A6A', img: IMG.blanket }
  ];

  const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const pct = (c) => Math.min(100, Math.round((c.raised / c.goal) * 100));
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));

  const ICON = {
    pin: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    people: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/></svg>',
    clock: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    heart: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6.3 5.4 5.4 0 0 1 21.3 12C19 16.6 12 21 12 21z"/></svg>',
    phone: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
    user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    lock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    plus: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  };

  function photo(src, label, tone, extraClass, alt, inner) {
    return '<div class="ph ' + (extraClass || '') + '" style="--tone:' + (tone || '#3E5872') + '" data-label="' + esc(label || 'Photo') + '">' +
      (src ? '<img src="' + esc(src) + '" alt="' + esc(alt || label || '') + '" loading="lazy" data-fb>' : '') + (inner || '') + '</div>';
  }

  function card(c) {
    const p = pct(c);
    const badge = c.urgent ? '<span class="badge urgent"><span class="dot pulse"></span>Emergency</span>' : '<span class="badge">' + esc(c.status) + '</span>';
    const meta = c.days ? c.days + ' days left' : 'Ongoing';
    return '<article class="ccard">' +
      photo(c.img, c.title, c.tone, '', c.title, '<div class="ph-top">' + badge + '<span class="loc">' + ICON.pin + esc(c.location) + '</span></div>') +
      '<div class="body">' +
      '<span class="cat">' + esc(c.category) + '</span>' +
      '<h3><a href="campaign.html#' + c.slug + '">' + esc(c.title) + '</a></h3>' +
      '<p>' + esc(c.blurb) + '</p>' +
      '<div class="stack" style="gap:8px;margin-top:auto">' +
      '<div class="progress" role="img" aria-label="' + p + '% of goal raised"><i style="width:' + p + '%"></i></div>' +
      '<div class="money"><span><b class="num">' + fmt(c.raised) + '</b> raised of ' + fmt(c.goal) + '</span><strong style="color:var(--indigo)">' + p + '%</strong></div>' +
      '<div class="meta"><span>' + ICON.people + c.donors.toLocaleString('en-IN') + ' donors</span><span>' + ICON.clock + meta + '</span></div>' +
      '</div>' +
      '<div class="acts"><a class="btn btn-line" href="campaign.html#' + c.slug + '">Know more</a><a class="btn btn-give" href="donate.html#' + c.slug + '">Donate</a></div>' +
      '</div></article>';
  }

  function fallbackImages(root) {
    (root || document).querySelectorAll('img[data-fb]').forEach((img) => {
      if (img.dataset.fbBound) return;
      img.dataset.fbBound = '1';
      const kill = () => img.remove();
      if (img.complete && img.naturalWidth === 0 && img.src) kill();
      else img.addEventListener('error', kill, { once: true });
    });
  }

  let toastTimer;
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function header(page) {
    const L = (href, label, key) => '<a href="' + href + '"' + (page === key ? ' aria-current="page"' : '') + '>' + label + '</a>';
    return '' +
      '<div class="alert-bar" id="alertBar"><div class="wrap">' +
      '<strong><span class="dot pulse"></span>Emergency</strong>' +
      '<span>Nepal flash floods: Thousands need urgent relief.</span>' +
      '<a href="campaign.html#nepal-flood-relief-2026">Help Nepal now →</a>' +
      '<button class="x" type="button" aria-label="Dismiss emergency alert" id="alertX">×</button></div></div>' +
      '<div class="util-bar"><div class="wrap"><div class="row">' +
      '<span style="display:inline-flex;gap:8px;align-items:center">' + ICON.phone + ' 24/7 helpline <a href="tel:+919851341234">+91 98513 41234</a></span>' +
      '<span style="display:inline-flex;gap:8px;align-items:center">' + ICON.mail + ' <a href="mailto:help@sikhaid.ngo">help@sikhaid.ngo</a></span>' +
      '</div><span>Registered under 80G · 50% tax exemption on donations</span></div></div>' +
      '<header class="site-header"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="SikhAid Charitable Trust, home"><span class="brand-mark"><span style="color:var(--saffron)">' + ICON.heart + '</span><img src="' + IMG.logo + '" alt="" data-fb></span>' +
      '<span class="brand-name"><b>SikhAid</b><span>Charitable Trust</span></span></a>' +
      '<nav class="nav" id="mainNav" aria-label="Main">' +
      L('index.html', 'Home', 'home') + L('about.html', 'About', 'about') + L('campaigns.html', 'Campaigns', 'campaigns') +
      '<div class="has-menu">' + L('get-involved.html', 'Get Involved', 'involved') +
      '<div class="menu"><a href="get-involved.html#volunteer">Volunteering</a><a href="get-involved.html#csr">CSR partnerships</a><a href="get-involved.html#sponsor">Sponsor a program</a></div></div>' +
      L('blog.html', 'Blog', 'blog') + L('blog.html#press', 'Press', 'press') + L('contact.html', 'Contact', 'contact') +
      '</nav>' +
      '<div class="header-cta"><a class="icon-btn hide-sm" href="' + (page === 'account' ? 'account.html' : 'login.html') + '" aria-label="My account">' + ICON.user + '</a>' +
      '<a class="btn btn-give" href="donate.html">' + ICON.heart + 'Donate</a>' +
      '<button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav" id="menuBtn">' + ICON.menu + '</button></div>' +
      '</div></header>';
  }

  function footer(withCta) {
    return (withCta ? '<section class="cta-band"><div class="wrap">' +
      '<div class="stack" style="gap:10px;flex:1 1 480px"><h2>Join us in serving India.</h2><p style="max-width:56ch">Your support helps us respond faster to emergencies and build stronger, more resilient communities across India.</p></div>' +
      '<div class="stack" style="gap:14px"><div class="row"><a class="btn btn-give btn-lg" href="donate.html">Support our mission</a><a class="btn btn-light btn-lg" href="get-involved.html#csr">Partner with us</a></div>' +
      '<span style="display:inline-flex;gap:10px;align-items:center;color:#fff">' + ICON.phone + '<span><b>Emergency support 24/7:</b> +91 98513 41234</span></span></div>' +
      '</div></section>' : '') +
      '<footer class="site-footer"><div class="wrap"><div class="cols">' +
      '<div class="stack" style="gap:16px"><a class="brand" href="index.html" style="color:#fff"><span class="brand-mark" style="background:var(--saffron)"><span style="color:var(--ink)">' + ICON.heart + '</span><img src="' + IMG.logo + '" alt="" data-fb></span><span class="brand-name"><b>SikhAid</b><span style="color:var(--on-dark)">Charitable Trust</span></span></a>' +
      '<p style="max-width:44ch">Serving India with humanitarian aid and disaster relief since 2020, with compassion, dignity, and 100% transparency during times of crisis.</p>' +
      '<ul><li><a href="mailto:help@sikhaid.ngo">help@sikhaid.ngo</a></li><li><a href="tel:+919851341234">+91 98513 41234</a></li><li>House no. 222, Mangraj Lane, Cuttack, Odisha 753001</li></ul>' +
      '<div class="socials">' +
      '<a href="https://www.instagram.com/sikh_aid" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>' +
      '<a href="https://www.facebook.com/share/17fYSEFjUA/" aria-label="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>' +
      '<a href="https://www.linkedin.com/company/sikh-aid-charitable-trustt/" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>' +
      '<a href="https://wa.me/919851341234" aria-label="WhatsApp"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg></a>' +
      '</div></div>' +
      '<div><h3>Quick links</h3><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About us</a></li><li><a href="campaigns.html">Campaigns</a></li><li><a href="blog.html">Blog</a></li><li><a href="blog.html#press">Press coverage</a></li></ul></div>' +
      '<div><h3>Get involved</h3><ul><li><a href="donate.html">Donate now</a></li><li><a href="donate.html#monthly">Give monthly</a></li><li><a href="get-involved.html#volunteer">Volunteering</a></li><li><a href="get-involved.html#csr">CSR partnerships</a></li><li><a href="get-involved.html#sponsor">Sponsor</a></li><li><a href="login.html">My account</a></li></ul></div>' +
      '<div><h3>Legal &amp; trust</h3><ul><li><a href="contact.html#privacy">Privacy policy</a></li><li><a href="contact.html#terms">Terms of service</a></li><li><a href="contact.html#refund">Refund policy</a></li><li><a href="about.html#compliance">80G certificate</a></li><li><a href="about.html#compliance">Annual reports</a></li></ul></div>' +
      '</div><div class="foot-base"><span>© 2026 SikhAid Charitable Trust · 80G Reg. No. [80G NUMBER] · Trust Reg. No. [TRUST NUMBER]</span>' +
      '<span class="row" style="gap:8px">Secure payments by Razorpay <span class="pay-chip">UPI</span><span class="pay-chip">RuPay</span><span class="pay-chip">Visa</span><span class="pay-chip">Mastercard</span></span></div></div></footer>';
  }

  function initShell() {
    const page = document.body.dataset.page || (document.querySelector('meta[name="sa-page"]') || {}).content || '';
    const h = document.getElementById('site-header');
    const f = document.getElementById('site-footer');
    if (h) h.outerHTML = header(page);
    if (f) f.outerHTML = footer(f.dataset.cta !== '0');
    try { if (sessionStorage.getItem('sa-alert-hidden') === '1') document.getElementById('alertBar')?.setAttribute('hidden', ''); } catch (e) {}
    document.getElementById('alertX')?.addEventListener('click', () => {
      document.getElementById('alertBar').hidden = true;
      try { sessionStorage.setItem('sa-alert-hidden', '1'); } catch (e) {}
    });
    const btn = document.getElementById('menuBtn'), nav = document.getElementById('mainNav');
    btn?.addEventListener('click', () => { const o = nav.classList.toggle('open'); btn.setAttribute('aria-expanded', String(o)); });
    document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => {
      const text = b.dataset.copy;
      const done = () => toast('Copied: ' + text);
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done).catch(() => toast(text));
      else toast(text);
    }));
    document.querySelectorAll('.faq-item button').forEach(wireFaq);
    fallbackImages();
  }

  function wireFaq(b) {
    if (b.dataset.wired) return; b.dataset.wired = '1';
    b.addEventListener('click', () => {
      const open = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', String(!open));
      document.getElementById(b.getAttribute('aria-controls')).hidden = open;
    });
  }

  function wireScroller(scroller, prev, next) {
    const step = () => Math.max(300, scroller.clientWidth * 0.8);
    prev?.addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
    next?.addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));
  }

  window.SA = { IMG, TIERS, BREAKDOWN, campaigns, completed, fmt, pct, esc, ICON, photo, card, fallbackImages, toast, wireFaq, wireScroller,
    bySlug: (s) => campaigns.find((c) => c.slug === s) };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initShell);
  else initShell();
})();
