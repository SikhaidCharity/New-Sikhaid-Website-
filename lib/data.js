export const SITE = 'https://www.sikhaid.ngo';
const ibb = (path) => SITE + '/api/img?src=' + encodeURIComponent('https://i.ibb.co/' + path);

export const IMG = {
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

export const TIERS = {
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

export const BREAKDOWN = {
  flood: [['Relief material: food, water, kits, medicine', 72], ['Logistics: boats, trucks, storage', 18], ['Admin, audits and receipts', 10]],
  hunger: [['Fresh ingredients and rations', 78], ['Kitchen operations and gas', 14], ['Admin, audits and receipts', 8]],
  health: [['Medicines and diagnostics', 55], ['Ambulance fuel, upkeep and staff', 35], ['Admin, audits and receipts', 10]],
  youth: [['Equipment and kit', 45], ['Coaching and travel', 45], ['Admin, audits and receipts', 10]]
};

export const campaigns = [
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

export const completed = [
  { title: 'Ratha Yatra Seva 2025', sub: 'Puri, Odisha · water, ORS and meals for pilgrims', tone: '#8A5A2B', img: IMG.ratha4 },
  { title: 'COVID Oxygen Sewa', sub: 'Oxygen support and ration kits during the pandemic', tone: '#5C5030', img: IMG.ration },
  { title: 'Winter Blanket Distribution', sub: 'Blankets for families facing harsh winters', tone: '#4A4A6A', img: IMG.blanket }
];

export const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const pct = (c) => Math.min(100, Math.round((c.raised / c.goal) * 100));
export const bySlug = (s) => campaigns.find((c) => c.slug === s);
