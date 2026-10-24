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
    impactStats: [
      { label: 'Relief Camps Set Up', value: '14+', icon: '⛺' },
      { label: 'Meals Served', value: '36,500+', icon: '🍜' },
      { label: 'Families Reached', value: '2,940+', icon: '👨‍👩‍👧‍👦' },
      { label: 'Relief Kits Delivered', value: '1,750+', icon: '📦' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Choose any amount to sponsor emergency flash flood relief supplies, clean water purification, and hot meals.' },
      { step: 2, title: 'Fund Allocated', description: 'Funds are directly deployed to mobilize relief convoys, procure grain, and source waterproof shelter material.' },
      { step: 3, title: 'Field Seva', description: 'Our volunteer teams navigate landslide zones and flooded valleys to reach cut-off mountain villages.' },
      { step: 4, title: 'Impact Report', description: 'Direct field video updates, distribution logs, and audited fund utilization receipts sent to every donor.' }
    ]
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
    impactStats: [
      { label: 'Food Packets Distributed', value: '400+ Daily', icon: '🍱' },
      { label: 'Emergency Lights Distributed', value: '500+', icon: '🔦' },
      { label: 'Families Rescued & Fed', value: '3,450+', icon: '🛟' },
      { label: 'Submerged Panchayats Served', value: '9', icon: '📍' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Select an amount to sponsor hot langar, water purification, or emergency family shelter kits.' },
      { step: 2, title: 'Fund Allocated', description: 'Procurement of local rations and rescue supplies within hours of flood alerts.' },
      { step: 3, title: 'Field Seva', description: 'Motorized rescue boats and volunteer sevadars bring rations directly to marooned embankments.' },
      { step: 4, title: 'Impact Report', description: 'Real-time GPS distribution logs, photos of deliveries, and 100% tax receipt emailed to you.' }
    ]
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
    impactStats: [
      { label: 'People Helped', value: '2,000+', icon: '👥' },
      { label: 'Water Bottles Supplied', value: '43,000+', icon: '💧' },
      { label: 'Medical Recoveries', value: '300+', icon: '🩺' },
      { label: 'Life Jackets Deployed', value: '230+', icon: '🦺' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Contribute towards long-term rehabilitation, drinking water purification, and rebuilding kits.' },
      { step: 2, title: 'Fund Allocated', description: 'Directed to local tin-sheet roofing, water chlorine purification, and food stocks.' },
      { step: 3, title: 'Field Seva', description: 'Our teams work with village panchayats to rebuild huts and decontaminate drinking wells.' },
      { step: 4, title: 'Impact Report', description: 'Comprehensive rehabilitation progress reports and utilization audits provided.' }
    ]
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
    impactStats: [
      { label: 'Houses Rebuilt', value: '15+', icon: '🛟' },
      { label: 'Houses Repaired', value: '50+', icon: '⛺' },
      { label: 'Khets Cleared of Silt', value: '7,000+ Acre', icon: '📦' },
      { label: 'Seeds & DAP Distributed', value: '1,000+ Acre', icon: '👥' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor housing repair materials, farmer seed subsidies, or hot community langar.' },
      { step: 2, title: 'Fund Allocated', description: '100% deployed to purchase brick, mortar, tractors for silt removal, and certified seeds.' },
      { step: 3, title: 'Field Seva', description: 'SikhAid sevadars work directly in flood-hit villages across Ludhiana, Ropar, Jalandhar, and Ferozepur.' },
      { step: 4, title: 'Impact Report', description: 'Verified video logs of rebuilt houses, green fields, and full financial transparency.' }
    ]
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
    impactStats: [
      { label: 'Locations Served', value: '30+', icon: '📍' },
      { label: 'Community Kitchens', value: '10+', icon: '🍛' },
      { label: 'Meals Served Daily', value: '400+', icon: '🍱' },
      { label: 'Lives Impacted', value: '5,000+', icon: '👱🏻' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Choose any amount to support Langar Sewa and help sponsor freshly cooked meals served with dignity.' },
      { step: 2, title: 'Fund Allocated', description: 'Funds purchase wholesale wheat flour, lentils, fresh vegetables, cooking oil, and clean water.' },
      { step: 3, title: 'Langar Sewa', description: 'Community kitchens prepare hygienic meals and distribute them across hospitals, shelters, and roadsides.' },
      { step: 4, title: 'Impact Report', description: 'Photos, videos, and counts of souls fed shared with every donor post-distribution.' }
    ]
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
    impactStats: [
      { label: 'Village Medical Runs', value: '120+', icon: '🚐' },
      { label: 'Free Consultations', value: '18,500+', icon: '🩺' },
      { label: 'Free Medicines Dispensed', value: '50,000+', icon: '💊' },
      { label: 'Diagnostic Tests Done', value: '8,200+', icon: '🩸' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor ambulance fuel, doctor stipends, and life-saving chronic and emergency medicines.' },
      { step: 2, title: 'Fund Allocated', description: 'Procurement of quality generic pharmaceuticals, testing strips, and medical equipment.' },
      { step: 3, title: 'Mobile Seva', description: 'Our fully equipped ambulance travels deep into remote hamlets without local healthcare access.' },
      { step: 4, title: 'Impact Report', description: 'Detailed camp logs, diagnostic screening reports, and patient recovery stories.' }
    ]
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
    impactStats: [
      { label: 'Sanitary Pads Distributed', value: '1 Lakh+', icon: '🩸' },
      { label: 'Women Beneficiaries', value: '25,000+', icon: '👩' },
      { label: 'Awareness Workshops', value: '150+', icon: '📚' },
      { label: 'Communities Reached', value: '50+', icon: '🏘️' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor biodegradable sanitary pad kits and menstrual health workshops for rural women.' },
      { step: 2, title: 'Fund Allocated', description: 'Direct procurement of certified hygienic pads and educational materials.' },
      { step: 3, title: 'Community Distribution', description: 'Female volunteer educators conduct safe, dignified awareness workshops and hand out kits.' },
      { step: 4, title: 'Impact Report', description: 'School retention stats, community health data, and verified beneficiary stories.' }
    ]
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
    impactStats: [
      { label: 'Youth Athletes Engaged', value: '1,500+', icon: '⚽' },
      { label: 'Village Tournaments Held', value: '24+', icon: '🏃' },
      { label: 'Sports Kits Distributed', value: '800+', icon: '👟' },
      { label: 'Village Grounds Developed', value: '12+', icon: '🏟️' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor footballs, training cones, athletic footwear, and team uniforms for rural youth.' },
      { step: 2, title: 'Fund Allocated', description: 'Direct purchase of high-durability sporting goods and coaching provisions.' },
      { step: 3, title: 'Grassroots Camps', description: 'Certified physical trainers conduct structured after-school coaching and weekend leagues.' },
      { step: 4, title: 'Impact Report', description: 'Athlete performance tracking, tournament photo galleries, and scouting achievements.' }
    ]
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
    impactStats: [
      { label: 'Academy Cadets', value: '350+', icon: '🥊' },
      { label: 'State & National Medals', value: '42+', icon: '🏅' },
      { label: 'Equipped Training Centers', value: '3', icon: '🏋️' },
      { label: '100% Subsidized Nutrition', value: 'Active', icon: '🥗' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Underwrite training scholarships, athletic nutrition, and tournament travel for budding athletes.' },
      { step: 2, title: 'Fund Allocated', description: 'Allocated to certified coaching, protein supplements, safety gear, and gymnasium upkeep.' },
      { step: 3, title: 'Elite Training', description: 'Cadets undergo rigorous morning and evening physical conditioning and tactical coaching.' },
      { step: 4, title: 'Impact Report', description: 'Championship medal tallies, tournament results, and athlete transformation updates.' }
    ]
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
    impactStats: [
      { label: 'Students Supported', value: '4,500+', icon: '📚' },
      { label: 'School Kits Distributed', value: '3,000+', icon: '🎒' },
      { label: 'Digital Classrooms Set Up', value: '15+', icon: '💻' },
      { label: 'Rural Partner Schools', value: '25+', icon: '🏫' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor a child’s school kit, annual textbook sets, digital tablets, or merit scholarships.' },
      { step: 2, title: 'Fund Allocated', description: '100% of educational funds purchase quality textbooks, notebooks, school bags, and learning software.' },
      { step: 3, title: 'Direct Distribution', description: 'Volunteer sevadars partner with rural government schools to personally distribute supplies.' },
      { step: 4, title: 'Impact Report', description: 'Student progress report cards, attendance gains, and personalized handwritten donor thank-yous.' }
    ]
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
    impactStats: [
      { label: 'Farmers Assisted', value: '1,200+', icon: '🌾' },
      { label: 'Villages Covered', value: '50+', icon: '🚜' },
      { label: 'Seeds Distributed', value: '10,000+ Kg', icon: '🌱' },
      { label: 'Soil Health Tests', value: '300+', icon: '💧' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor seed kits, tractor tillage assistance, or emergency farm debt relief packages.' },
      { step: 2, title: 'Fund Allocated', description: 'Direct procurement of certified high-yield seed stocks and agricultural inputs without middle-men.' },
      { step: 3, title: 'Field Distribution', description: 'On-ground handover to verified marginal farmers and women-led smallholdings.' },
      { step: 4, title: 'Impact Report', description: 'Harvest reports, seasonal yield data, and photographic proof of cultivated farmland.' }
    ]
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
    impactStats: [
      { label: 'Household Toilets Built', value: '250+', icon: '🚽' },
      { label: 'Villages Covered', value: '40+', icon: '🏘️' },
      { label: 'Clean Water Connections', value: '100%', icon: '💧' },
      { label: 'Families Trained in Hygiene', value: '5,000+', icon: '🧼' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Fund masonry materials, sanitary fixtures, plumbing lines, and septic soak pits.' },
      { step: 2, title: 'Fund Allocated', description: 'Materials sourced locally to support village artisans and guarantee high construction standards.' },
      { step: 3, title: 'Community Construction', description: 'Village youth and local masons build resilient, private sanitation blocks for each family.' },
      { step: 4, title: 'Impact Report', description: 'Geo-tagged photographic evidence of completed toilets and water connectivity logs.' }
    ]
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
    impactStats: [
      { label: 'Blankets Distributed', value: '15,000+', icon: '🧥' },
      { label: 'Families Benefited', value: '8,000+', icon: '👨‍👩‍👧‍👦' },
      { label: 'Distribution Centers', value: '75+', icon: '📍' },
      { label: 'Volunteer Hours', value: '2,400+', icon: '⏰' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Choose any amount to sponsor thick wool blankets and warm winter clothing for those in open air.' },
      { step: 2, title: 'Fund Allocated', description: 'Bulk procurement of high-density thermal blankets directly from manufacturing mills.' },
      { step: 3, title: 'Night Drives', description: 'Volunteers conduct midnight distribution drives outside hospitals, railway stations, and slum clusters.' },
      { step: 4, title: 'Impact Report', description: 'Night drive videos, distribution location rosters, and donor receipts emailed immediately.' }
    ]
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
    impactStats: [
      { label: 'Village Communities', value: '80+', icon: '🌾' },
      { label: 'Lives Touched', value: '12,000+', icon: '🤝' },
      { label: 'Skill Workshops', value: '45+', icon: '💡' },
      { label: 'Rehab Counseling Centers', value: '12+', icon: '🛡️' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Support community rehabilitation programs, vocational workshops, and youth counseling.' },
      { step: 2, title: 'Fund Allocated', description: 'Deployed for skill trainers, learning materials, community center infrastructure, and logistics.' },
      { step: 3, title: 'Field Action', description: 'Grassroots teams conduct de-addiction awareness, computer literacy, and elderly assistance.' },
      { step: 4, title: 'Impact Report', description: 'Youth employment data, counseling logs, and verified village community testimonials.' }
    ]
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
    impactStats: [
      { label: 'Women Trained', value: '650+', icon: '👩' },
      { label: 'Sewing Machines Donated', value: '200+', icon: '🧵' },
      { label: 'Micro-Enterprises Started', value: '85+', icon: '💼' },
      { label: 'Average Income Growth', value: '3.2x', icon: '📈' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor a commercial sewing machine, cloth materials, or a 3-month certified tailoring course.' },
      { step: 2, title: 'Fund Allocated', description: 'Purchasing top-brand sewing machinery, haberdashery tools, and hiring master trainers.' },
      { step: 3, title: 'Skill Center', description: 'Women attend daily practical classes and learn product design, garment stitching, and accounting.' },
      { step: 4, title: 'Impact Report', description: 'Graduation ceremonies, sample product catalogues, and individual earning reports.' }
    ]
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
    impactStats: [
      { label: 'Vehicles Fitted with Reflectors', value: '12,000+', icon: '🚜' },
      { label: 'Helmets Distributed', value: '1,500+', icon: '🪖' },
      { label: 'First Responder Trainings', value: '40+', icon: '🚑' },
      { label: 'Accident Drop in Zones', value: '28%', icon: '📉' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Sponsor high-grade retroreflective tapes, safety helmets, and first-aid kits.' },
      { step: 2, title: 'Fund Allocated', description: 'Procurement of highway safety materials and traffic police liaison drives.' },
      { step: 3, title: 'Night Patrols', description: 'Volunteers paste luminous reflective tape on unlit tractor-trolleys, animal carts, and bicycles.' },
      { step: 4, title: 'Impact Report', description: 'Photographic records of covered vehicles and highway safety incident statistics.' }
    ]
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
    impactStats: [
      { label: 'Water Bottles Distributed', value: '2,00,000+', icon: '💧' },
      { label: 'ORS Packs Handed Out', value: '50,000+', icon: '🥤' },
      { label: 'Packed Meals Served', value: '50,000+', icon: '🍱' },
      { label: 'Devotees Served', value: '3,00,000+', icon: '🙏' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Fund water tankers, chilled bottled water, ORS electrolyte sachets, and langar rations.' },
      { step: 2, title: 'Fund Allocated', description: 'Pre-event bulk purchasing with local cold-storage and logistics providers.' },
      { step: 3, title: 'Grand Seva', description: 'Hundreds of SikhAid volunteers distribute water and food continuously along the Grand Road.' },
      { step: 4, title: 'Impact Report', description: 'Full event documentary, pilgrim testimonials, and complete financial audit published.' }
    ]
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
    impactStats: [
      { label: 'Ration Kits Delivered', value: '50,000+', icon: '📦' },
      { label: 'Oxygen Cylinders Refilled', value: '5,000+', icon: '🫁' },
      { label: 'Survival Rate', value: '92%', icon: '✅' },
      { label: 'Concentrators Deployed', value: '2,000+', icon: '🏥' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Funded medical-grade oxygen cylinders, concentrators, and dry food ration boxes.' },
      { step: 2, title: 'Fund Allocated', description: 'Rapid industrial gas procurement and airlifting of medical devices.' },
      { step: 3, title: 'Oxygen Langar', description: 'Volunteer drive-through oxygen points provided life support to gasping patients.' },
      { step: 4, title: 'Impact Report', description: 'Complete ledger of all cylinders, concentrators, and recovery counts.' }
    ]
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
    impactStats: [
      { label: 'Students Supported', value: '3,500+', icon: '🎓' },
      { label: 'Medical Camps Held', value: '120+', icon: '🏥' },
      { label: 'Emergency Transports', value: '850+', icon: '🚑' },
      { label: 'Blood Units Donated', value: '2,200+', icon: '🩸' }
    ],
    howItWorks: [
      { step: 1, title: 'You Donate', description: 'Unrestricted seva funds go directly to urgent humanitarian appeals and hospital cases.' },
      { step: 2, title: 'Fund Allocated', description: 'Assessed on spot by case managers for immediate hospital bill clearance or grocery delivery.' },
      { step: 3, title: 'Immediate Handover', description: 'Volunteer visits family and directly fulfills the emergency need.' },
      { step: 4, title: 'Impact Report', description: 'Verified utilization receipts and family welfare follow-up shared with donors.' }
    ]
  }
};

const campaigns = raw.map((c) => {
  const m = META[c.slug] || {};
  const story = cleanHtml(c.fullDescription);
  if (story.length === 0 && c.shortDescription) {
    story.push(c.shortDescription);
  }

  const quote = m.quote || (c.donateMessage ? c.donateMessage.trim() : (c.shortDescription || 'Your seva can transform lives today.'));
  const impactStats = (m.impactStats && m.impactStats.length >= 4) ? m.impactStats : ((c.impactStats && c.impactStats.length > 0) ? c.impactStats : (m.impactStats || [
    { label: 'Locations Served', value: '25+', icon: '📍' },
    { label: 'Families Assisted', value: '1,500+', icon: '👨‍👩‍👧‍👦' },
    { label: 'Volunteers Mobilized', value: '150+', icon: '🙋🏻‍♂️' },
    { label: 'Lives Impacted', value: '5,000+', icon: '❤️' }
  ]));

  const howItWorks = (c.howItWorks && c.howItWorks.length > 0) ? c.howItWorks : (m.howItWorks || [
    { step: 1, title: 'You Donate', description: `Choose any amount to support ${c.title} and help sponsor essential relief and seva supplies.` },
    { step: 2, title: 'Fund Allocated', description: '100% of funds are allocated to purchasing verified relief materials and on-ground logistics.' },
    { step: 3, title: 'Field Seva', description: 'SikhAid volunteers deliver aid, services, and supplies directly to beneficiaries on the ground.' },
    { step: 4, title: 'Impact Report', description: 'Photos, videos, and detailed fund-utilization reports are emailed to every donor.' }
  ]);

  const metrics = impactStats.map(s => [s.value, s.label]);

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
    impactStats,
    howItWorks,
    metrics,
    raised: m.raised || 500000,
    goal: m.goal || 1000000,
    donors: m.donors || 420,
    days: m.days !== undefined ? m.days : null,
    tone: m.tone || '#3E5872',
    img: c.image || 'https://i.ibb.co/B20Q7cBV/Hero1.jpg'
  };
});

console.log('Successfully prepared', campaigns.length, 'campaigns');
const content = `// Generated campaigns dataset from live sikhaid.ngo data
export const campaignsRaw = ${JSON.stringify(campaigns, null, 2)};
export default campaignsRaw;
`;
fs.writeFileSync(path.join(__dirname, '../lib/campaigns-data.js'), content);
fs.writeFileSync(path.join(__dirname, '../lib/campaigns-data.json'), JSON.stringify(campaigns, null, 2));
