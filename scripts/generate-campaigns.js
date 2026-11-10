const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../lib/live-campaigns.json'), 'utf8'));

const cleanHtml = (html) => {
  if (!html) return [];
  return html
    .replace(/<hr\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '\"')
    .replace(/&#39;/g, '\'')
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 20);
};

// Campaign metadata overrides & rich enhancements
const META = {
  'nepal-flood-relief-2026': {
    group: 'Emergency',
    type: 'flood',
    urgent: true,
    location: 'Nepal',
    raised: 2265000,
    goal: 3000000,
    donors: 1912,
    days: 18,
    tone: '#34506E',
    quoteAuthor: 'SikhAid Disaster Response Cell',
    quote: 'Your support provides emergency relief to families affected by Nepal’s flash floods including dry ration kits, clean drinking water, ready-to-eat meals, blankets, hygiene essentials, and other life-saving supplies.',
  },
  'bihar-flood-relief-2026': {
    group: 'Emergency',
    type: 'flood',
    urgent: true,
    location: 'Bihar',
    raised: 1840000,
    goal: 2500000,
    donors: 1284,
    days: 12,
    tone: '#3E5872',
    quoteAuthor: 'Bihar Relief Team Coordinator',
    quote: 'Your support can bring immediate relief to flood-affected families in Bihar. Every contribution helps provide dry ration kits, clean drinking water, freshly prepared meals, emergency shelter materials, blankets, hygiene kits, and other essential supplies to communities struggling to recover from the floods.',
  },
  'assam-flood-relief-2026': {
    group: 'Emergency',
    type: 'flood',
    urgent: false,
    location: 'Assam',
    raised: 1410000,
    goal: 2000000,
    donors: 986,
    days: 21,
    tone: '#46607A',
    quoteAuthor: 'Assam Field Volunteer',
    quote: 'Your Support funds dry ration and essential food supplies, clean drinking water, ready-to-eat meals, well purification kits, and rebuilding materials for displaced families returning home.',
  },
  'punjab-floods-2025': {
    group: 'Emergency',
    type: 'flood',
    urgent: true,
    location: 'Punjab',
    raised: 3120000,
    goal: 4000000,
    donors: 2650,
    days: 14,
    tone: '#2B4D6F',
    quoteAuthor: 'Punjab Seva Wing',
    quote: 'When floodwaters devastated Punjab, SikhAid stood shoulder-to-shoulder with our farming communities. We provide hot meals, clear sand-silted fields, and supply free seeds so families can revive their livelihoods with dignity.',
  },
  'langar-sewa': {
    group: 'Hunger',
    type: 'hunger',
    urgent: false,
    location: 'Pan-India',
    raised: 2840000,
    goal: 3500000,
    donors: 2410,
    days: null,
    tone: '#7A4E26',
    quoteAuthor: 'Langar Seva Volunteers',
    quote: 'Your support can help provide freshly cooked, nutritious meals to communities in need. Every contribution helps cover the cost of ingredients, cooking, and distributing Langar at different locations, ensuring that warm meals reach those who need them most.',
  },
  'sikh-aid-health-on-wheels': {
    group: 'Healthcare',
    type: 'health',
    urgent: false,
    location: 'Odisha',
    raised: 920000,
    goal: 1500000,
    donors: 840,
    days: null,
    tone: '#2E6B68',
    quoteAuthor: 'Medical Team Lead, SikhAid',
    quote: 'Healthcare is a fundamental human right. Health on Wheels breaks geographical and financial barriers by bringing trained doctors, diagnostic labs, and free essential medicines directly to tribal hamlets.',
  },
  'no-spot': {
    group: 'Healthcare',
    type: 'health',
    urgent: false,
    location: 'Rural India',
    raised: 680000,
    goal: 1200000,
    donors: 590,
    days: null,
    tone: '#8C3B5E',
    quoteAuthor: 'No Spot Women’s Health Team',
    quote: 'Menstrual hygiene is a matter of health, education, and human dignity. No Spot empowers young girls and women in rural areas by replacing unhygienic alternatives with safe, biodegradable sanitary pads and medical counseling.',
  },
  'dreams-on-field': {
    group: 'Youth',
    type: 'youth',
    urgent: false,
    location: 'Rural India',
    raised: 540000,
    goal: 1000000,
    donors: 430,
    days: null,
    tone: '#3F6B3A',
    quoteAuthor: 'Grassroots Sports Director',
    quote: 'From small fields to big dreams because every young player deserves a chance. Sports instill discipline, confidence, and leadership that lift young minds out of despair.',
  },
  'guru-nanak-dev-ji-chardi-kala-sports-academy': {
    group: 'Youth',
    type: 'youth',
    urgent: false,
    location: 'Punjab',
    raised: 1150000,
    goal: 2000000,
    donors: 920,
    days: null,
    tone: '#1E4D6B',
    quoteAuthor: 'Head Coach, Chardi Kala Academy',
    quote: 'Chardi Kala is a state of eternal optimism and strength. Through martial arts, boxing, and athletics, we channel youth energy away from substance abuse into champions for the state and country.',
  },
  'education-aid': {
    group: 'Youth',
    type: 'youth',
    urgent: false,
    location: 'Odisha & Rural India',
    raised: 760000,
    goal: 1500000,
    donors: 615,
    days: null,
    tone: '#4A5568',
    quoteAuthor: 'Education Aid Program Director',
    quote: 'Education is the greatest equalizer. By providing a rural child with textbooks, stationery, and digital tools, we break cycles of intergenerational poverty and unlock limitless potential.',
  },
  'project-farmer-first': {
    group: 'Community',
    type: 'community',
    urgent: false,
    location: 'Punjab & Haryana',
    raised: 1350000,
    goal: 2200000,
    donors: 1100,
    days: null,
    tone: '#5C6F40',
    quoteAuthor: 'Project Farmer First Coordinator',
    quote: 'The farmer feeds the entire nation, but when crisis strikes, who feeds the farmer? Project Farmer First provides certified seeds, bio-fertilizers, and emergency relief to keep our Annadatas standing tall.',
  },
  'rural-sanitation-drive': {
    group: 'Community',
    type: 'community',
    urgent: false,
    location: 'Odisha',
    raised: 890000,
    goal: 1600000,
    donors: 710,
    days: null,
    tone: '#38736B',
    quoteAuthor: 'Sanitation Mission Lead',
    quote: 'Sanitation is about basic human dignity, privacy, and hygiene — especially for rural women and daughters. Building clean household toilets transforms community health from the ground up.',
  },
  'blanket-distribution': {
    group: 'Emergency',
    type: 'community',
    urgent: false,
    location: 'North India',
    raised: 1240000,
    goal: 1500000,
    donors: 1480,
    days: null,
    tone: '#4A4A6A',
    quoteAuthor: 'Winter Relief Seva Lead',
    quote: 'In the biting cold of North Indian winters, a heavy wool blanket is not just comfort — it is life-saving protection against deadly pneumonia for children and elderly individuals sleeping on pavements.',
  },
  'project-chardikala': {
    group: 'Community',
    type: 'community',
    urgent: false,
    location: 'Punjab',
    raised: 670000,
    goal: 1200000,
    donors: 520,
    days: null,
    tone: '#7B5E28',
    quoteAuthor: 'Chardikala Punjab Mission Lead',
    quote: 'Chardikala represents the eternal, undaunted Sikh spirit. We uplift rural Punjab through vocational skills, sports, anti-substance counseling, and family sustenance so communities flourish anew.',
  },
  'udaan': {
    group: 'Community',
    type: 'community',
    urgent: false,
    location: 'Odisha',
    raised: 420000,
    goal: 800000,
    donors: 340,
    days: null,
    tone: '#8C4358',
    quoteAuthor: 'Project Udaan Mentor',
    quote: 'Udaan gives wings to young girls and marginalized women through vocational tailoring, digital skills, and financial literacy, helping them become confident, self-reliant pillars of their families.',
  },
  'road-safety': {
    group: 'Community',
    type: 'community',
    urgent: false,
    location: 'Pan-India',
    raised: 310000,
    goal: 600000,
    donors: 260,
    days: null,
    tone: '#4A5B73',
    quoteAuthor: 'Road Safety Initiative Team',
    quote: 'Every preventable highway tragedy steals a provider from their family. Our Road Safety initiative installs reflector tapes on rural carts, provides helmets, and trains first-responders.',
  },
  'rath-yatra-seva-2026': {
    group: 'Hunger',
    type: 'hunger',
    urgent: false,
    location: 'Puri, Odisha',
    raised: 2500000,
    goal: 2500000,
    donors: 3200,
    days: null,
    tone: '#8A5A2B',
    quoteAuthor: 'Puri Annapurna Seva Jatha',
    quote: 'Every ₹9 sponsors a clean water bottle, every ₹25 sponsors an ORS pack, every ₹35 sponsors a meal. Serving millions of thirsty, exhausted pilgrims in scorching heat is pure, selfless Seva.',
  },
  'covid-oxygen-sewa': {
    group: 'Healthcare',
    type: 'health',
    urgent: false,
    location: 'Pan-India',
    raised: 5000000,
    goal: 5000000,
    donors: 6200,
    days: null,
    tone: '#5C5030',
    quoteAuthor: 'COVID Emergency Response Unit',
    quote: 'During India’s darkest hours when oxygen was running out, SikhAid operated 24/7 oxygen langars and mobile concentrator banks, saving thousands of precious lives without charging a single rupee.',
  },
  'other-sewa': {
    group: 'Community',
    type: 'community',
    urgent: false,
    location: 'Pan-India',
    raised: 1800000,
    goal: 1800000,
    donors: 1450,
    days: null,
    tone: '#4A5B73',
    quoteAuthor: 'General Seva Wing',
    quote: 'Whenever a human being in our society cries out for help — whether medical emergencies, accident transports, or sudden bereavement — SikhAid answers the call guided by the timeless principle of Sarbat da Bhala.',
  }
};

const campaigns = raw.map((c) => {
  const m = META[c.slug] || {};
  const story = cleanHtml(c.fullDescription);
  if (story.length === 0 && c.shortDescription) {
    story.push(c.shortDescription);
  }

  const quote = m.quote || (c.donateMessage ? c.donateMessage.trim() : (c.shortDescription || 'Your seva can transform lives today.'));
  let type = m.type || 'community';
  if (!m.type) {
    const cat = (c.category || '').toLowerCase();
    if (cat.includes('flood') || cat.includes('emergency')) type = 'flood';
    else if (cat.includes('hunger') || cat.includes('seva') || cat.includes('langar')) type = 'hunger';
    else if (cat.includes('health') || cat.includes('medic')) type = 'health';
    else if (cat.includes('youth') || cat.includes('sport') || cat.includes('education')) type = 'youth';
  }

  let group = m.group || 'Community';
  if (!m.group) {
    if (type === 'flood') group = 'Emergency';
    else if (type === 'hunger') group = 'Hunger';
    else if (type === 'health') group = 'Healthcare';
    else if (type === 'youth') group = 'Youth';
  }

  return {
    slug: c.slug,
    title: c.title,
    short: c.title.split(' ')[0],
    subtitle: c.subtitle || `${c.title}: Your Seva Can Help Someone Today`,
    tagText: m.urgent ? 'Featured Urgent Campaign' : `${c.category || 'Humanitarian'} Mission`,
    type,
    group,
    category: c.category || 'Humanitarian Aid',
    location: m.location || 'India',
    status: c.status === 'completed' ? 'Completed' : (m.urgent ? 'Active emergency' : 'Ongoing'),
    urgent: Boolean(m.urgent),
    blurb: c.shortDescription || (story[0] || c.title),
    story: story.length > 0 ? story : [c.shortDescription || c.title],
    quote,
    quoteAuthor: m.quoteAuthor || 'SikhAid Seva Team',
    raised: m.raised || 500000,
    goal: m.goal || 1000000,
    donors: m.donors || 420,
    days: m.days !== undefined ? m.days : null,
    tone: m.tone || '#3E5872',
    img: c.image || 'https://i.ibb.co/B20Q7cBV/Hero1.jpg'
  };
});

console.log('Successfully prepared', campaigns.length, 'campaigns');
fs.writeFileSync(path.join(__dirname, '../lib/campaigns-data.json'), JSON.stringify(campaigns, null, 2));
