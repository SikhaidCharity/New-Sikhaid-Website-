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
  ],
  community: [
    { amt: 500, what: 'Immediate emergency relief items for one rural family' },
    { amt: 1000, what: 'Essential tools and dry ration kit for a family' },
    { amt: 2500, what: 'Comprehensive family community support kit' },
    { amt: 5000, what: 'Underwrites community drive for an entire hamlet' },
    { amt: 10000, what: 'Sustained monthly assistance program' },
    { amt: 25000, what: 'Full community infrastructure support unit' }
  ]
};

export const CAMPAIGN_IMPACT_TIERS = {
  'nepal-flood-relief-2026': [
    { amt: 500, title: '5 Warm Meals' },
    { amt: 1200, title: '2-Week Ration Kit' },
    { amt: 2500, title: 'Emergency Medical Kit' },
    { amt: 5000, title: 'Family Shelter Kit' },
  ],
  'bihar-flood-relief-2026': [
    { amt: 500, title: '5 Warm Meals' },
    { amt: 1200, title: '2-Week Ration Kit' },
    { amt: 2500, title: 'Emergency Flood Medical Kit' },
    { amt: 5000, title: 'Family Shelter Kit' },
  ],
  'assam-flood-relief-2026': [
    { amt: 500, title: '5 Warm Meals' },
    { amt: 1200, title: '2-Week Ration Kit' },
    { amt: 2500, title: 'Water Purification Kit' },
    { amt: 5000, title: 'Home Rebuilding Kit' },
  ],
  'punjab-floods-2025': [
    { amt: 500, title: '5 Hot Meals' },
    { amt: 1200, title: '2-Week Ration Kit' },
    { amt: 2500, title: 'Silt Removal & Seed Aid' },
    { amt: 5000, title: 'House Rebuilding Kit' },
  ],
  'langar-sewa': [
    { amt: 500, title: 'Supports one person' },
    { amt: 1500, title: 'Supports a family' },
    { amt: 3000, title: 'Supports several families' },
    { amt: 5000, title: 'Sponsors a full day of seva' },
  ],
  'sikh-aid-health-on-wheels': [
    { icon: '💊', amt: 500, title: 'Basic Medicines', desc: 'Life-saving antibiotics, fever medication, and pediatric syrups for 5 patients.' },
    { icon: '🩺', amt: 1200, title: 'Diagnostic Tests', desc: 'Free blood sugar, blood pressure, hemoglobin, and vitals check for 15 villagers.' },
    { icon: '🚐', amt: 2500, title: 'Health on Wheels Run', desc: 'Fuel and operational costs for one full remote village medical visit.' },
    { icon: '🏥', amt: 5000, title: 'Full-Day Medical Camp', desc: 'Doctor consultations, diagnostics, and free pharmacy dispensing for an entire village.' },
  ],
  'no-spot': [
    { icon: '🩸', amt: 500, title: '3-Month Hygiene Pack', desc: 'Certified biodegradable sanitary pads for 3 schoolgirls or rural women.' },
    { icon: '👩', amt: 1200, title: 'Mother & Daughter Kit', desc: 'Year-round feminine hygiene packs, soap, and health counseling guide.' },
    { icon: '📚', amt: 2500, title: 'Awareness Workshop', desc: 'Conducts a menstrual health and stigma-breaking workshop for 50 village girls.' },
    { icon: '🏘️', amt: 5000, title: 'Hamlet-Wide Drive', desc: 'Supplies menstrual hygiene products and health kits for an entire rural settlement.' },
  ],
  'dreams-on-field': [
    { icon: '⚽', amt: 500, title: 'Sports Equipment', desc: 'Footballs, training cones, agility markers, and basic training kit for youth.' },
    { icon: '👟', amt: 1200, title: 'Athletic Shoes', desc: 'Quality running or football shoes for a promising underprivileged young athlete.' },
    { icon: '🏃', amt: 2500, title: 'Monthly Coaching', desc: 'Professional training, fitness coaching, and nutrition guidance for a squad of 10.' },
    { icon: '🏆', amt: 5000, title: 'Tournament Entry & Kit', desc: 'Team match jerseys, tournament registration, and travel support for regional meets.' },
  ],
  'guru-nanak-dev-ji-chardi-kala-sports-academy': [
    { icon: '🥊', amt: 500, title: 'Boxing & Training Gear', desc: 'Handwraps, mouthguards, skipping ropes, and gloves for academy cadets.' },
    { icon: '🥗', amt: 1200, title: 'Athlete Nutrition Pack', desc: 'Monthly protein supplements, milk, and healthy diet for an aspiring athlete.' },
    { icon: '🏋️', amt: 2500, title: 'Sparring Equipment', desc: 'High-grade protective headgear, body shields, and conditioning gear.' },
    { icon: '🏅', amt: 5000, title: 'Championship Sponsorship', desc: 'State tournament registration, lodging, and travel for a team of 4.' },
  ],
  'education-aid': [
    { icon: '🎒', amt: 500, title: 'School Essentials Bag', desc: 'Sturdy school bag, notebooks, pencil box, and geometry set for a child.' },
    { icon: '📚', amt: 1200, title: 'Complete Textbook Set', desc: 'Curriculum-aligned books and study guides for a full academic year.' },
    { icon: '💻', amt: 2500, title: 'Digital Learning Module', desc: 'Educational tablet access and digital learning coursework for rural youth.' },
    { icon: '🏫', amt: 5000, title: 'Annual Scholarship', desc: 'Full school fees, uniform, and after-school tutoring for an underprivileged child.' },
  ],
  'project-farmer-first': [
    { icon: '🌱', amt: 500, title: 'Seed Subsidies', desc: 'Certified wheat or paddy seeds for a smallholder farmer.' },
    { icon: '🚜', amt: 1200, title: 'Bio-Fertilizer Kit', desc: 'Organic manure and micro-nutrient boosters for sustainable crop growth.' },
    { icon: '🌾', amt: 2500, title: 'Tillage & Water Support', desc: 'Subsidizes tractor diesel and borewell irrigation for a drought-affected acre.' },
    { icon: '🤝', amt: 5000, title: 'Farmer Family Sustenance', desc: 'Comprehensive financial relief and grocery support during crop failure.' },
  ],
  'rural-sanitation-drive': [
    { icon: '🧼', amt: 500, title: 'Family Hygiene Pack', desc: 'Antiseptic soaps, cleaning disinfectants, and clean water containers.' },
    { icon: '🚰', amt: 1200, title: 'Sanitary Fixtures', desc: 'Durable ceramic toilet pan, drainage pipes, and overhead flush plumbing.' },
    { icon: '🧱', amt: 2500, title: 'Masonry Materials', desc: 'Bricks, cement, and gravel to construct private, secure toilet walls.' },
    { icon: '🚽', amt: 5000, title: 'Complete Sanitation Unit', desc: 'Constructs a fully functional private household toilet with soak pit.' },
  ],
  'blanket-distribution': [
    { icon: '🧥', amt: 500, title: '2 Heavy Wool Blankets', desc: 'Thick thermal wool blankets to protect homeless people from winter chills.' },
    { icon: '👨‍👩‍👧‍👦', amt: 1200, title: 'Family Winter Pack', desc: 'Woolen shawls, beanies, socks, and 3 heavy thermal blankets for a family.' },
    { icon: '🧤', amt: 2500, title: '10 Thermal Blankets', desc: 'Supplies high-density wool blankets distributed during midnight cold patrols.' },
    { icon: '📍', amt: 5000, title: 'Shelter-Wide Run', desc: 'Equips an entire roadside temporary night shelter with thermal bedrolls.' },
  ],
  'project-chardikala': [
    { icon: '💡', amt: 500, title: 'Skill Learning Materials', desc: 'Training workbooks, toolkits, and materials for youth skill workshops.' },
    { icon: '🤝', amt: 1200, title: 'Counseling & Mentorship', desc: 'Specialized de-addiction and career counseling sessions for rural youth.' },
    { icon: '🌾', amt: 2500, title: 'Family Livelihood Restart', desc: 'Provides micro-enterprise tools or livestock support to a struggling family.' },
    { icon: '🛡️', amt: 5000, title: 'Community Mission Center', desc: 'Funds village-level community development, computer lab, and library operations.' },
  ],
  'udaan': [
    { icon: '🧵', amt: 500, title: 'Tailoring Kit', desc: 'Measuring tapes, shears, thread sets, and practice fabrics for a student.' },
    { icon: '✂️', amt: 1200, title: 'Garment Tools Set', desc: 'Professional pattern drafting equipment and garment finishing tools.' },
    { icon: '💼', amt: 2500, title: 'Certified Course', desc: 'Covers 3 months of professional vocational tailoring and digital sales classes.' },
    { icon: '🪡', amt: 5000, title: 'Sewing Machine Grant', desc: 'Gifts a brand-new commercial sewing machine to empower a woman micro-entrepreneur.' },
  ],
  'road-safety': [
    { icon: '🚜', amt: 500, title: 'Reflector Tapes', desc: 'High-visibility retroreflective strips applied to 5 unlit tractors or carts.' },
    { icon: '🪖', amt: 1200, title: 'ISI Safety Helmet', desc: 'Quality protective two-wheeler helmet for a low-income delivery worker.' },
    { icon: '🚑', amt: 2500, title: 'Highway First-Aid Kit', desc: 'Trauma bandages, neck collars, and tourniquets for village first responders.' },
    { icon: '🚦', amt: 5000, title: 'Highway Safety Drive', desc: 'Fits reflective strips and warning markers across 50 rural vehicles.' },
  ],
  general: [
    { icon: '🍜', amt: 500, title: '5 Hot Meals', desc: 'Nutritious hot langar served immediately to displaced and vulnerable families.' },
    { icon: '📦', amt: 1200, title: '2-Week Ration Kit', desc: 'Atta, rice, dal, cooking oil, and salt to sustain a family through sudden crisis.' },
    { icon: '🩺', amt: 2500, title: 'Emergency Relief Kit', desc: 'Clean drinking water purification, first-aid, ORS, and essential hygiene supplies.' },
    { icon: '🏠', amt: 5000, title: 'Emergency Rapid Response', desc: 'Temporary emergency shelter tarpaulins, bedding, and rapid volunteer mobilization.' },
  ],
  flood: [
    { icon: '🍜', amt: 500, title: '5 Warm Meals', desc: 'Freshly cooked hot langar for families stranded in relief camps.' },
    { icon: '📦', amt: 1200, title: '2-Week Ration Kit', desc: 'Atta, rice, dal, oil, and salt to sustain a family of 4 through crisis.' },
    { icon: '🩺', amt: 2500, title: 'Emergency Medical Kit', desc: 'ORS packets, water purification tablets, fever & antiseptic medicines.' },
    { icon: '🏠', amt: 5000, title: 'Family Shelter Kit', desc: 'Heavy-duty tarpaulin, ground mats, warm blankets, and mosquito nets.' },
  ],
  hunger: [
    { icon: '🍜', amt: 500, title: '5 Warm Meals', desc: 'Freshly cooked hot langar for families stranded in relief camps.' },
    { icon: '📦', amt: 1200, title: '2-Week Ration Kit', desc: 'Atta, rice, dal, oil, and salt to sustain a family of 4 through crisis.' },
    { icon: '🩺', amt: 2500, title: 'Supports Several Families', desc: 'Warm meals and dry ration provisions for struggling families.' },
    { icon: '🏠', amt: 5000, title: 'Full Day of Seva', desc: 'Underwrites community kitchen preparations and fresh distribution.' },
  ],
  health: [
    { icon: '💊', amt: 500, title: 'Basic Medicines', desc: 'Life-saving antibiotics, fever medication and pain relief for 5 patients.' },
    { icon: '🩺', amt: 1200, title: 'Diagnostic Tests', desc: 'Free blood sugar, BP and basic health screening at a rural camp.' },
    { icon: '🚐', amt: 2500, title: 'Health on Wheels Run', desc: 'Fuel and operational costs for one remote village medical visit.' },
    { icon: '🏥', amt: 5000, title: 'Full-Day Medical Camp', desc: 'Doctor consultations and free medicines for an entire hamlet.' },
  ],
  youth: [
    { icon: '⚽', amt: 500, title: 'Sports Equipment', desc: 'Footballs, training cones and basic kit for village youth.' },
    { icon: '👟', amt: 1200, title: 'Athletic Shoes', desc: 'Quality running or football shoes for a promising young athlete.' },
    { icon: '🏃', amt: 2500, title: 'Monthly Coaching', desc: 'Professional training and nutrition guidance for a team of 10.' },
    { icon: '🏆', amt: 5000, title: 'Tournament Entry', desc: 'Sponsors team travel, registration, and gear for district competitions.' },
  ],
  community: [
    { icon: '🤝', amt: 500, title: 'Essential Support', desc: 'Immediate food, water, or material relief for a family in distress.' },
    { icon: '📦', amt: 1200, title: 'Essential Groceries Kit', desc: 'Atta, rice, pulses, and oil to keep a vulnerable family fed.' },
    { icon: '🛠️', amt: 2500, title: 'Livelihood Kit', desc: 'Provides tools, materials, and support to restore self-sufficiency.' },
    { icon: '🏘️', amt: 5000, title: 'Community Project Aid', desc: 'Underwrites clean water, sanitation, or rehabilitation for a village.' },
  ],
};

export const BREAKDOWN = {
  flood: [['Relief material: food, water, kits, medicine', 72], ['Logistics: boats, trucks, storage', 18], ['Admin, audits and receipts', 10]],
  hunger: [['Fresh ingredients and rations', 78], ['Kitchen operations and gas', 14], ['Admin, audits and receipts', 8]],
  health: [['Medicines and diagnostics', 55], ['Ambulance fuel, upkeep and staff', 35], ['Admin, audits and receipts', 10]],
  youth: [['Equipment and kit', 45], ['Coaching and travel', 45], ['Admin, audits and receipts', 10]],
  community: [['Direct relief & materials', 75], ['Logistics & field execution', 17], ['Admin, audits and receipts', 8]]
};

import campaignsRaw from './campaigns-data.js';

export const allCampaigns = campaignsRaw;
export const campaigns = campaignsRaw.filter((c) => c.status !== 'Completed');
export const completed = campaignsRaw
  .filter((c) => c.status === 'Completed')
  .map((c) => ({
    title: c.title,
    sub: c.subtitle || c.blurb,
    tone: c.tone,
    img: c.img,
    slug: c.slug
  }));

export const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const pct = (c) => Math.min(100, Math.round((c.raised / c.goal) * 100));
export const bySlug = (s) => campaignsRaw.find((c) => c.slug === s);

export function getFeaturedCampaignStory(camp) {
  if (!camp) return [];

  // 1. Curated real details matching live reference & high urgency
  if (camp.slug === 'langar-sewa') {
    return [
      'Across communities, many families and individuals struggle to access fresh, nutritious meals every day. Langar Sewa brings people together to prepare and distribute freshly cooked food at different locations, ensuring that no one goes hungry and that those in need receive a warm, wholesome meal with dignity.',
      'Your support can help provide freshly cooked, nutritious meals to communities in need. Every contribution helps cover the cost of ingredients, cooking, and distributing Langar at different locations, ensuring that warm meals reach those who need them most.'
    ];
  }
  if (camp.slug === 'bihar-flood-relief-2026') {
    return [
      'Bihar is facing a devastating flood disaster. Relentless monsoon rains and overflowing rivers have submerged villages, destroyed homes, washed away roads, and left entire communities isolated. Thousands of families have been displaced, struggling without access to food, clean drinking water, shelter, and essential medical care.',
      'SikhAid Charitable Trust is on the ground in Bihar, reaching flood-affected families with emergency dry ration kits, freshly cooked langar meals, water purification tablets, and mobile healthcare. Your support delivers life-saving relief directly into the hands of those fighting to survive.'
    ];
  }
  if (camp.slug === 'nepal-flood-relief-2026') {
    return [
      'Catastrophic flash floods and landslides in Nepal have claimed hundreds of lives, submerged hillside settlements, and marooned thousands of families. Displaced survivors are stranded without shelter, dry rations, clean drinking water, or essential medical supplies.',
      'SikhAid emergency relief teams are actively distributing hot meals, family survival kits, safe drinking water, and emergency medical aid across the hardest-hit districts. Every rupee directly funds life-saving relief on the frontlines.'
    ];
  }
  if (camp.slug === 'assam-flood-relief-2026') {
    return [
      'Severe monsoon flooding across Assam has inundated thousands of villages, displacing over 2 million residents. Families are living on high embankments and temporary highway camps with no electricity, clean water, or regular food supply.',
      'SikhAid volunteers are deployed with motorized rescue boats distributing emergency ration packs, clean water bottles, and operating mobile medical camps for stranded villagers. Your contribution keeps our rescue and feeding runs moving.'
    ];
  }
  if (camp.slug === 'sikh-aid-health-on-wheels') {
    return [
      'In remote rural pockets and tribal villages, the nearest primary health center is often dozens of kilometers away. Preventable conditions like dehydration, fever, infections, and chronic illnesses go untreated due to lack of doctors and diagnostic tools.',
      'Health on Wheels brings a fully equipped mobile medical clinic directly to village doorsteps, providing free doctor consultations, on-spot vital tests, and essential medicines. Your gift keeps the mobile clinic running and saves lives.'
    ];
  }

  // 2. Fallback: filter out header-like strings or duplicate titles
  const titleLower = (camp.title || '').toLowerCase();
  const subLower = (camp.subtitle || '').toLowerCase();

  const isHeaderLike = (str) => {
    if (!str || str.length < 35) return true;
    const lower = str.toLowerCase();
    if (lower === titleLower || lower === subLower) return true;
    if (lower.startsWith('our mission') || lower.startsWith('our relief') || lower.startsWith('why your support')) return true;
    return false;
  };

  const rawStory = Array.isArray(camp.story) ? camp.story : (camp.blurb || '').split('\n\n');
  const validParas = rawStory
    .map((s) => s.trim())
    .filter((s) => !isHeaderLike(s) && !s.startsWith('*') && !s.includes(': '));

  if (validParas.length >= 2) return validParas.slice(0, 2);
  if (validParas.length === 1 && camp.quote) return [validParas[0], camp.quote];
  if (camp.blurb) {
    const parts = camp.blurb.split('\n\n').filter((p) => p.trim().length > 30);
    if (parts.length >= 2) return parts.slice(0, 2);
    if (camp.quote) return [camp.blurb, camp.quote];
    return [camp.blurb];
  }

  return ['Support our on-ground humanitarian relief mission providing immediate assistance to vulnerable communities.'];
}

