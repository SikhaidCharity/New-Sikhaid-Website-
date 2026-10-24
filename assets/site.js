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
  {
    "slug": "education-aid",
    "title": "Education Aid",
    "short": "Education",
    "subtitle": "Bridging the education gap in rural communities",
    "tagText": "Education Mission",
    "type": "youth",
    "group": "Youth",
    "category": "Education",
    "location": "Odisha & Rural India",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Education Aid is an initiative by sikhaid to ensure that every child and youth in India has access to quality education, digital learning, and skill development opportunities. The project focuses on bridging learning gaps in rural and tribal areas by supporting underprivileged students with educational materials, digital tools, scholarships, and community learning programs. Through partnerships with schools, teachers, and local communities, Sikhaid aims to create a brighter and more equitable future—where education becomes a tool for empowerment, not privilege.",
    "story": [
      "Education Aid is a flagship initiative dedicated to transforming education in the rural and tribal regions of Odisha. The project aims to bridge the learning gap by providing access to quality education, digital tools, and skill-based learning for children and youth who are often left behind. Through school support programs, community learning centers, and digital literacy drives, Sikhaid empowers students to dream beyond barriers and build a brighter future. The initiative not only focuses on classroom learning but also nurtures life skills, values, and confidence—creating self-reliant, informed, and capable rural citizens.",
      "Improve access to quality education in rural and tribal communities",
      "Provide educational aid, books, and learning materials to underprivileged children",
      "Promote digital and vocational education for rural youth",
      "Empower girls through inclusive and equitable learning opportunities",
      "Strengthen community participation in education"
    ],
    "quote": "Education is the greatest equalizer. By providing a rural child with textbooks, stationery, and digital tools, we break cycles of intergenerational poverty and unlock limitless potential.",
    "quoteAuthor": "Education Aid Program Director",
    "impactStats": [
      {
        "label": "Students Supported",
        "value": "4,500+",
        "icon": "📚"
      },
      {
        "label": "School Kits Distributed",
        "value": "3,000+",
        "icon": "🎒"
      },
      {
        "label": "Digital Classrooms Set Up",
        "value": "15+",
        "icon": "💻"
      },
      {
        "label": "Rural Partner Schools",
        "value": "25+",
        "icon": "🏫"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Sponsor a child’s school kit, annual textbook sets, digital tablets, or merit scholarships."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "100% of educational funds purchase quality textbooks, notebooks, school bags, and learning software."
      },
      {
        "step": 3,
        "title": "Direct Distribution",
        "description": "Volunteer sevadars partner with rural government schools to personally distribute supplies."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Student progress report cards, attendance gains, and personalized handwritten donor thank-yous."
      }
    ],
    "metrics": [
      [
        "4,500+",
        "Students Supported"
      ],
      [
        "3,000+",
        "School Kits Distributed"
      ],
      [
        "15+",
        "Digital Classrooms Set Up"
      ],
      [
        "25+",
        "Rural Partner Schools"
      ]
    ],
    "raised": 760000,
    "goal": 1500000,
    "donors": 615,
    "days": null,
    "tone": "#4A5568",
    "img": "https://incred.com/uploads/2020/03/23101529/el8-2048x1367.jpg"
  },
  {
    "slug": "dreams-on-field",
    "title": "Dreams On Field",
    "short": "Dreams",
    "subtitle": "Turning Rural Potential into Sporting Excellence",
    "tagText": "Youth Empowerment Program Mission",
    "type": "youth",
    "group": "Youth",
    "category": "Youth Empowerment Program",
    "location": "Rural India",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Sikhaid Dreams on Field is a grassroots sports development initiative aimed at empowering rural youth through structured sports programs, access to equipment, and professional guidance.",
    "story": [
      "Sikhaid Dreams on Field is a grassroots sports initiative aimed at empowering rural youth by providing access to sports, training, and opportunities. Across villages, countless young individuals have the talent and passion to excel but lack the resources and exposure needed to move forward.",
      "Through this campaign, Sikhaid works to identify, support, and nurture this hidden potential, helping youth build confidence, discipline, and a pathway towards a better future through sports.",
      "To create a world where every young individual, regardless of background, gets the opportunity to play, grow, and succeed through sports.",
      "We believe that real change starts at the grassroots level. Our approach focuses on building a sustainable sports ecosystem in rural communities:",
      "Bringing organized sports activities to villages",
      "Providing access to basic sports equipment",
      "Offering training and mentorship",
      "Creating platforms for talent recognition and growth",
      "Organize village-level sports camps and tournaments",
      "Distribute sports kits and essential equipment",
      "Conduct training sessions and fitness workshops",
      "Identify talented players and support their development",
      "Connect youth with larger competitive opportunities",
      "Rural youth aged 10–25 years",
      "School students and aspiring athletes",
      "Communities with limited access to sports infrastructure",
      "Sports is more than just a game it builds discipline, confidence, teamwork, and leadership. However, in many rural areas, lack of infrastructure and resources prevents youth from even stepping onto the field.",
      "Sikhaid Dreams on Field aims to break this barrier by ensuring that talent is not limited by geography or financial constraints.",
      "Engage 1,000+ youth in sports activities",
      "Conduct multiple village-level tournaments and camps",
      "Identify and mentor emerging rural talent",
      "Promote a culture of fitness and positive growth",
      "Sponsor sports kits for a village",
      "Support training and grassroots tournaments",
      "Partner with us to develop sports infrastructure",
      "Sponsor large-scale events and talent programs",
      "Contribute as coaches, mentors, or organizers",
      "Help in community outreach and event execution",
      "Be a Part of the Change",
      "Every child deserves a chance to play and dream.",
      "Sikhaid Dreams on Field is not just a campaign  it’s a movement to build confidence, create opportunities, and shape future champions.",
      "“From small fields to big dreams because every player deserves a chance.”"
    ],
    "quote": "From small fields to big dreams because every young player deserves a chance. Sports instill discipline, confidence, and leadership that lift young minds out of despair.",
    "quoteAuthor": "Grassroots Sports Director",
    "impactStats": [
      {
        "label": "Youth Athletes Engaged",
        "value": "1,500+",
        "icon": "⚽"
      },
      {
        "label": "Village Tournaments Held",
        "value": "24+",
        "icon": "🏃"
      },
      {
        "label": "Sports Kits Distributed",
        "value": "800+",
        "icon": "👟"
      },
      {
        "label": "Village Grounds Developed",
        "value": "12+",
        "icon": "🏟️"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Sponsor footballs, training cones, athletic footwear, and team uniforms for rural youth."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Direct purchase of high-durability sporting goods and coaching provisions."
      },
      {
        "step": 3,
        "title": "Grassroots Camps",
        "description": "Certified physical trainers conduct structured after-school coaching and weekend leagues."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Athlete performance tracking, tournament photo galleries, and scouting achievements."
      }
    ],
    "metrics": [
      [
        "1,500+",
        "Youth Athletes Engaged"
      ],
      [
        "24+",
        "Village Tournaments Held"
      ],
      [
        "800+",
        "Sports Kits Distributed"
      ],
      [
        "12+",
        "Village Grounds Developed"
      ]
    ],
    "raised": 540000,
    "goal": 1000000,
    "donors": 430,
    "days": null,
    "tone": "#3F6B3A",
    "img": "https://adamfletcher.net/wp-content/uploads/2020/04/f6d34-youthempowerment.jpg"
  },
  {
    "slug": "punjab-floods-2025",
    "title": "Punjab Floods 2025",
    "short": "Punjab",
    "subtitle": "Swift Emergency Response to Natural Disaster",
    "tagText": "Featured Urgent Campaign",
    "type": "flood",
    "group": "Emergency",
    "category": "Emergency Response",
    "location": "Punjab",
    "status": "Active emergency",
    "urgent": true,
    "blurb": "When devastating floods hit Punjab in August 2025, SikhAid mobilized within hours to provide emergency relief to affected families.",
    "story": [
      "When devastating floods swept through Punjab, SikhAid was among the first to respond. Entire villages were underwater — homes destroyed, crops lost, and families left stranded. Guided by Seva, our mission is simple: to bring relief, restore hope, and rebuild lives.",
      "Phase 1: Emergency Relief",
      "Our volunteers reached flooded areas across Ludhiana, Ropar, Jalandhar, and Ferozepur, providing:",
      "🍛 Langar meals and ration kits for stranded families",
      "💧 Clean drinking water, blankets, and hygiene packs",
      "🩺 Mobile medical camps for the sick and injured",
      "Each day, thousands received warmth, care, and the assurance that they were not alone.",
      "Phase 2: Recovery & Rehabilitation",
      "We’re supporting farmers with essential tools and seeds to revive their livelihoods.",
      "Phase 3: Rebuilding Lives",
      "Our next mission is to rebuild homes, schools, and community spaces — creating safer, stronger foundations for the future. Together with local partners, we aim to help Punjab rise again."
    ],
    "quote": "When floodwaters devastated Punjab, SikhAid stood shoulder-to-shoulder with our farming communities. We provide hot meals, clear sand-silted fields, and supply free seeds so families can revive their livelihoods with dignity.",
    "quoteAuthor": "Punjab Seva Wing",
    "impactStats": [
      {
        "label": "Houses Rebuilt",
        "value": "15+",
        "icon": "🛟"
      },
      {
        "label": "Houses Repaired",
        "value": "50+",
        "icon": "⛺"
      },
      {
        "label": "Khets Cleared of Silt",
        "value": "7,000+ Acre",
        "icon": "📦"
      },
      {
        "label": "Seeds & DAP Distributed",
        "value": "1,000+ Acre",
        "icon": "👥"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "Rapid Mobilization",
        "description": "Deploy emergency response teams within hours of disaster alert to assess situation and begin rescue operations."
      },
      {
        "step": 2,
        "title": "Emergency Rescue",
        "description": "Conduct boat and vehicle rescues to evacuate families from flooded areas to safety."
      },
      {
        "step": 3,
        "title": "Relief Distribution",
        "description": "Set up temporary shelters and distribute food, water, medicines, and essential supplies to displaced families."
      },
      {
        "step": 4,
        "title": "Rehabilitation Support",
        "description": "Provide long-term support for rebuilding homes, livelihoods, and community infrastructure."
      }
    ],
    "metrics": [
      [
        "15+",
        "Houses Rebuilt"
      ],
      [
        "50+",
        "Houses Repaired"
      ],
      [
        "7,000+ Acre",
        "Khets Cleared of Silt"
      ],
      [
        "1,000+ Acre",
        "Seeds & DAP Distributed"
      ]
    ],
    "raised": 3120000,
    "goal": 4000000,
    "donors": 2650,
    "days": 14,
    "tone": "#2B4D6F",
    "img": "https://i.ibb.co/B20Q7cBV/Hero1.jpg"
  },
  {
    "slug": "rural-sanitation-drive",
    "title": "Rural Sanitation Drive",
    "short": "Rural",
    "subtitle": "Building Hygiene, Restoring Dignity",
    "tagText": "Rural Development Initiatives Mission",
    "type": "community",
    "group": "Community",
    "category": "Rural Development Initiatives",
    "location": "Odisha",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Sikhaid Rural Sanitation Drive  is an initiative by Sikhaid Charitable Trust focused on improving hygiene and living conditions in rural communities by building safe washrooms, promoting sanitation awareness, and ensuring access to clean and dignified facilities for families in need.\n",
    "story": [
      "Sikhaid rural sanitation drive  is an initiative focused on improving sanitation and hygiene standards in rural communities by building access to safe washrooms and promoting healthy practices.",
      "In many villages, the lack of proper sanitation facilities leads to serious health risks, safety concerns especially for women— and a loss of dignity. This campaign works to create sustainable sanitation solutions that transform everyday living conditions.",
      "To ensure that every individual has access to safe, clean, and dignified sanitation facilities, regardless of where they live.",
      "We combine infrastructure development with awareness and community participation:",
      "Constructing clean and safe washrooms in villages",
      "Promoting hygiene awareness and behavioral change",
      "Ensuring long-term usability through community involvement",
      "Build household and community washrooms",
      "Install basic water and sanitation systems",
      "Conduct hygiene awareness sessions (handwashing, menstrual hygiene, cleanliness)",
      "Provide sanitation kits to families in need",
      "Train local communities for maintenance and upkeep",
      "Rural families without access to toilets",
      "Women and girls facing safety and hygiene challenges",
      "Children vulnerable to sanitation-related diseases",
      "Underserved communities in remote villages",
      "Lack of sanitation is directly linked to diseases, poor health, and safety risks. Open defecation and inadequate hygiene facilities can lead to infections, water contamination, and loss of dignity.",
      "Sikhaid rural sanitation drive  aims to address these issues by ensuring clean, safe, and accessible sanitation for all, improving both health outcomes and quality of life.",
      "Construct 100+ washrooms in rural areas",
      "Improve hygiene practices across communities",
      "Reduce sanitation-related health risks",
      "Empower women with safe and private facilities",
      "Sponsor the construction of a washroom",
      "Support hygiene kits for families",
      "Fund large-scale sanitation infrastructure projects",
      "Partner in hygiene awareness programs",
      "Participate in awareness drives",
      "Support on-ground implementation",
      "Be a Part of the Change",
      "Access to sanitation is not a luxury it’s a basic human need.",
      "Sikhaid rural sanitation drive is a step towards cleaner villages, healthier lives, and restored dignity.",
      "“Clean surroundings, healthy communities, brighter futures.”"
    ],
    "quote": "Sanitation is about basic human dignity, privacy, and hygiene — especially for rural women and daughters. Building clean household toilets transforms community health from the ground up.",
    "quoteAuthor": "Sanitation Mission Lead",
    "impactStats": [
      {
        "label": "Household Toilets Built",
        "value": "250+",
        "icon": "🚽"
      },
      {
        "label": "Villages Covered",
        "value": "40+",
        "icon": "🏘️"
      },
      {
        "label": "Clean Water Connections",
        "value": "100%",
        "icon": "💧"
      },
      {
        "label": "Families Trained in Hygiene",
        "value": "5,000+",
        "icon": "🧼"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Fund masonry materials, sanitary fixtures, plumbing lines, and septic soak pits."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Materials sourced locally to support village artisans and guarantee high construction standards."
      },
      {
        "step": 3,
        "title": "Community Construction",
        "description": "Village youth and local masons build resilient, private sanitation blocks for each family."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Geo-tagged photographic evidence of completed toilets and water connectivity logs."
      }
    ],
    "metrics": [
      [
        "250+",
        "Household Toilets Built"
      ],
      [
        "40+",
        "Villages Covered"
      ],
      [
        "100%",
        "Clean Water Connections"
      ],
      [
        "5,000+",
        "Families Trained in Hygiene"
      ]
    ],
    "raised": 890000,
    "goal": 1600000,
    "donors": 710,
    "days": null,
    "tone": "#38736B",
    "img": "https://cf-images.assettype.com/down-to-earth%2Fimport%2Flibrary%2Flarge%2F2018-03-28%2F0.15608900_1522239934_toilets---vikas-choudhary.jpg?w=1024&auto=format%2Ccompress&fit=max"
  },
  {
    "slug": "bihar-flood-relief-2026",
    "title": "BIHAR FLOOD RELIEF 2026",
    "short": "BIHAR",
    "subtitle": "Bihar Will Not Suffer in Silence",
    "tagText": "Featured Urgent Campaign",
    "type": "flood",
    "group": "Emergency",
    "category": "Flood Relief",
    "location": "Bihar",
    "status": "Active emergency",
    "urgent": true,
    "blurb": "Bihar is facing a devastating flood crisis. Relentless rainfall and overflowing rivers have submerged villages, destroyed homes, and cut off entire communities. Thousands of families are stranded without access to food, clean drinking water, shelter, or essential medical care.\n\nIn this difficult hour, we stand with Bihar. Together, we can bring hope, relief, and lifesaving support to those who need it most.",
    "story": [
      "BIHAR FLOOD RELIEF MISSION 2026",
      "Bihar Will Not Suffer in Silence",
      "Bihar is facing a devastating flood disaster. Relentless monsoon rains and overflowing rivers have submerged villages, destroyed homes, washed away roads, and left entire communities isolated. Thousands of families have been displaced, with children, women, and the elderly struggling without access to food, clean drinking water, shelter, and essential medical care.",
      "In moments like these, humanity must come together.",
      "SikhAid Charitable Trust is on the ground, reaching flood-affected families with emergency relief and ensuring that hope reaches even the most remote communities.",
      "Our Mission: From Emergency Relief to Recovery",
      "Our mission is simple: to stand beside every family when they need help the most.",
      "Through the Bihar Flood Relief Mission 2026, we are providing immediate humanitarian assistance while supporting communities as they recover, rebuild, and restore their dignity.",
      "Our Relief Priorities",
      "Food Security: Dry ration kits, essential groceries, and ready-to-eat meals",
      "Clean Drinking Water: Safe drinking water, ORS, and hydration support",
      "Hygiene & Sanitation: Hygiene kits, soaps, sanitary products, and personal care essentials",
      "Medical Aid: First-aid supplies, essential medicines, and emergency healthcare support",
      "Shelter & Warmth: Blankets, tarpaulins, bedding, and temporary shelter materials",
      "Support for Vulnerable Families: Dedicated assistance for children, women, the elderly, and stranded households",
      "Rehabilitation: Helping families rebuild homes, livelihoods, and resilient communities",
      "Why Your Support Matters",
      "Floods can take away everything a family owns in a single night. A child needs a warm meal, a mother needs clean water, an elderly person needs medicine, and thousands of displaced families need shelter and hope.",
      "Your support helps SikhAid deliver life-saving relief directly to those who need it most.",
      "Where Your Donation Goes",
      "Food-Dry ration kits, nutritious meals, and emergency food parcels",
      "Water-Purified drinking water and hydration essentials",
      "Health-Essential medicines, first-aid, and emergency medical support",
      "Hygiene-Sanitation kits and personal hygiene supplies",
      "Shelter-Blankets, tarpaulins, bedding, and temporary shelter materials",
      "Recovery-Community rehabilitation and livelihood restoration",
      "One Family. One Meal. One Bottle of Water. One Act of Humanity.",
      "Floodwaters may isolate communities, but compassion can reach every doorstep.",
      "Stand with us. Help us provide food, water, shelter, medical aid, and hope to families affected by the Bihar Floods.",
      "SikhAid Charitable Trust",
      "Serving Humanity. Saving Lives. Spreading Hope."
    ],
    "quote": "Your support can bring immediate relief to flood-affected families in Bihar. Every contribution helps provide dry ration kits, clean drinking water, freshly prepared meals, emergency shelter materials, blankets, hygiene kits, and other essential supplies to communities struggling to recover from the floods.",
    "quoteAuthor": "Bihar Relief Team Coordinator",
    "impactStats": [
      {
        "label": "Food Packets Distributed",
        "value": "400+ Daily",
        "icon": "🍱"
      },
      {
        "label": "Emergency Lights Distributed",
        "value": "500+",
        "icon": "🔦"
      },
      {
        "label": "Families Rescued & Fed",
        "value": "3,450+",
        "icon": "🛟"
      },
      {
        "label": "Submerged Panchayats Served",
        "value": "9",
        "icon": "📍"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Choose any amount or sponsor essential relief items including clean water, ORS, ready-to-eat meals, dry ration, and emergency relief kits."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Our volunteer network is delivering emergency relief supplies across flood-affected communities in Nepal"
      },
      {
        "step": 3,
        "title": "Seva at Bihar",
        "description": "Our volunteer network is delivering emergency relief supplies across flood-affected communities in Nepal"
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Photos, videos, and counts of devotees served are shared with every donor post-event."
      }
    ],
    "metrics": [
      [
        "400+ Daily",
        "Food Packets Distributed"
      ],
      [
        "500+",
        "Emergency Lights Distributed"
      ],
      [
        "3,450+",
        "Families Rescued & Fed"
      ],
      [
        "9",
        "Submerged Panchayats Served"
      ]
    ],
    "raised": 1840000,
    "goal": 2500000,
    "donors": 1284,
    "days": 12,
    "tone": "#3E5872",
    "img": "https://i.ibb.co/N2XnqzfF/849796-65687-siwzzsrvzy-1503382223.jpg"
  },
  {
    "slug": "udaan",
    "title": "Udaan",
    "short": "Udaan",
    "subtitle": "Her wings. Her world. Her Udaan.",
    "tagText": "Women Empowerment Mission",
    "type": "community",
    "group": "Community",
    "category": "Women Empowerment",
    "location": "Odisha",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Project Udaan is an initiative by Sewa Sikhaid dedicated to empowering women through skill development, education, and self-reliance. The project aims to provide women—especially from rural and underserved communities—with practical training, financial literacy, and emotional support to help them achieve economic independence and personal growth.\nThrough community workshops, mentorship, and entrepreneurship support, Udaan helps women gain confidence, discover their potential, and take flight toward a life of dignity, equality, and opportunity.\nUdaan stands for freedom — the freedom to dream, to learn, and to lead.",
    "story": [
      "Project Udaan by Sikhaid NGO is a women empowerment initiative that helps women—especially from rural and underserved communities—gain the skills, confidence, and opportunities to become self-reliant. Through training in livelihood skills, digital and financial literacy, entrepreneurship, and personal development, Udaan enables women to achieve economic independence and social dignity.",
      "The project embodies its name, Udaan — a flight toward freedom, growth, and a brighter future for every woman."
    ],
    "quote": "Udaan gives wings to young girls and marginalized women through vocational tailoring, digital skills, and financial literacy, helping them become confident, self-reliant pillars of their families.",
    "quoteAuthor": "Project Udaan Mentor",
    "impactStats": [
      {
        "label": "Women Trained",
        "value": "650+",
        "icon": "👩"
      },
      {
        "label": "Sewing Machines Donated",
        "value": "200+",
        "icon": "🧵"
      },
      {
        "label": "Micro-Enterprises Started",
        "value": "85+",
        "icon": "💼"
      },
      {
        "label": "Average Income Growth",
        "value": "3.2x",
        "icon": "📈"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Sponsor a commercial sewing machine, cloth materials, or a 3-month certified tailoring course."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Purchasing top-brand sewing machinery, haberdashery tools, and hiring master trainers."
      },
      {
        "step": 3,
        "title": "Skill Center",
        "description": "Women attend daily practical classes and learn product design, garment stitching, and accounting."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Graduation ceremonies, sample product catalogues, and individual earning reports."
      }
    ],
    "metrics": [
      [
        "650+",
        "Women Trained"
      ],
      [
        "200+",
        "Sewing Machines Donated"
      ],
      [
        "85+",
        "Micro-Enterprises Started"
      ],
      [
        "3.2x",
        "Average Income Growth"
      ]
    ],
    "raised": 420000,
    "goal": 800000,
    "donors": 340,
    "days": null,
    "tone": "#8C4358",
    "img": "/sikhaidLogo.png"
  },
  {
    "slug": "nepal-flood-relief-2026",
    "title": "NEPAL FLOOD RELIEF 2026",
    "short": "NEPAL",
    "subtitle": "Together for Nepal",
    "tagText": "Featured Urgent Campaign",
    "type": "flood",
    "group": "Emergency",
    "category": "Flood Relief",
    "location": "Nepal",
    "status": "Active emergency",
    "urgent": true,
    "blurb": "Nepal is facing a devastating flash flood disaster. Torrential rainfall has triggered powerful floods and landslides across affected regions, washing away homes, roads, and bridges. Thousands of families are stranded, entire communities have been cut off, and urgent access to food, shelter, clean water, and medical aid is needed.",
    "story": [
      "NEPAL FLASH FLOOD RELIEF MISSION 2026",
      "Nepal is facing a devastating flash flood disaster. Torrential rainfall has triggered severe flooding and landslides, destroying homes, roads, and bridges across affected regions. Thousands of families are stranded, entire communities have been cut off, and access to food, clean water, shelter, and medical care has become critically limited.",
      "In moments like these, humanitarian support cannot wait.",
      "SikhAid Charitable Trust is stepping forward to support families affected by the Nepal Flash Floods. Our team is reaching impacted communities with emergency relief supplies and humanitarian assistance, prioritizing those who need immediate support.",
      "Our Mission: From Emergency Relief to Recovery",
      "Our mission is simple: to stand beside people when they need help the most.",
      "Through the Nepal Flash Flood Relief Mission 2026, we aim to provide immediate humanitarian assistance while supporting communities as they recover and rebuild with dignity.",
      "Food Security: Dry rations, essential groceries, and ready-to-eat meals",
      "Clean Drinking Water: Potable water distribution, ORS, and hydration solutions",
      "Hygiene & Sanitation: Hygiene kits, soaps, and sanitary essentials for displaced families",
      "Medical Aid: Emergency first-aid supplies and essential life-saving medicines",
      "Shelter & Warmth: Blankets, tarpaulins, and emergency shelter kits",
      "Vulnerable Group Support: Dedicated assistance for stranded families, children, and the elderly",
      "Rehabilitation: Long-term community recovery and rebuilding initiatives",
      "Why Your Support Matters",
      "Flash floods can alter the course of a family’s life within hours. A child may need a warm meal, a displaced family requires safe drinking water, an elderly individual needs urgent medical attention, and isolated communities require immediate essentials to survive.",
      "Your support helps us reach them. Every contribution directly enables SikhAid to deliver life-saving aid on the ground.",
      "Where Your Donation Goes",
      "Emergency food parcels, nutritional kits, and dry ration provisions.",
      "Safe, purified drinking water supplies and oral rehydration solutions.",
      "Essential medicines, basic first-aid treatment, and mobile clinic coordination.",
      "Comprehensive sanitation and personal care packages for displaced persons.",
      "Emergency bedding, thermal blankets, tarpaulins, and basic household items.",
      "Rehabilitation support to help families reconstruct their homes and livelihoods.",
      "Corporate & CSR Partnerships",
      "SikhAid Charitable Trust collaborates with corporate partners, institutions, and CSR bodies to scale relief operations and reach remote locations. Organizations can partner through:",
      "CSR Grant Funding: Direct allocation toward disaster response funds",
      "In-Kind Donations: Bulk supplies of food, clothing, and hygiene products",
      "Logistics & Supply Chain Support: Transportation, warehousing, and freight assistance",
      "Medical Provisions: First-aid kits, pharmaceuticals, and medical supplies",
      "Volunteer Deployment: Employee engagement and relief distribution assistance",
      "One Family. One Meal. One Bottle of Water. One Act of Humanity.",
      "Flash floods may take away homes, but together, we can restore hope. Your generosity can provide immediate sustenance, clean drinking water, protective shelter, and dignity to those who have lost everything.",
      "Donate Today. Help Us Reach More Families.",
      "SikhAid Charitable Trust",
      "Serving Humanity. Saving Lives. Spreading Hope."
    ],
    "quote": "Your support provides emergency relief to families affected by Nepal’s flash floods including dry ration kits, clean drinking water, ready-to-eat meals, blankets, hygiene essentials, and other life-saving supplies.",
    "quoteAuthor": "SikhAid Disaster Response Cell",
    "impactStats": [
      {
        "label": "Relief Camps Set Up",
        "value": "14+",
        "icon": "⛺"
      },
      {
        "label": "Meals Served",
        "value": "36,500+",
        "icon": "🍜"
      },
      {
        "label": "Families Reached",
        "value": "2,940+",
        "icon": "👨‍👩‍👧‍👦"
      },
      {
        "label": "Relief Kits Delivered",
        "value": "1,750+",
        "icon": "📦"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Choose any amount or sponsor essential relief items including clean water, ORS, ready-to-eat meals, dry ration, and emergency relief kits."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Every rupee is mapped to a tangible item."
      },
      {
        "step": 3,
        "title": "Seva at Nepal",
        "description": "Our volunteer network is delivering emergency relief supplies across flood-affected communities in Nepal"
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Photos, videos, and counts of devotees served are shared with every donor post-event."
      }
    ],
    "metrics": [
      [
        "14+",
        "Relief Camps Set Up"
      ],
      [
        "36,500+",
        "Meals Served"
      ],
      [
        "2,940+",
        "Families Reached"
      ],
      [
        "1,750+",
        "Relief Kits Delivered"
      ]
    ],
    "raised": 2265000,
    "goal": 3000000,
    "donors": 1912,
    "days": 18,
    "tone": "#34506E",
    "img": "https://firebasestorage.googleapis.com/v0/b/sikhaidlandingpage.firebasestorage.app/o/Nepal-flash-floods-image.webp?alt=media&token=9d9c43a3-2ca2-49b0-8125-3c7ed52fa044"
  },
  {
    "slug": "assam-flood-relief-2026",
    "title": "ASSAM FLOOD RELIEF 2026",
    "short": "ASSAM",
    "subtitle": "Assam Needs Us Now.",
    "tagText": "Flood Relief Mission",
    "type": "flood",
    "group": "Emergency",
    "category": "Flood Relief",
    "location": "Assam",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Assam is facing a devastating flood crisis, with relentless rainfall and overflowing rivers affecting communities across the state. Thousands of families have been displaced, homes have been damaged, livelihoods have been disrupted, and access to basic necessities has become increasingly difficult.",
    "story": [
      "Assam is facing a devastating flood crisis, with relentless rainfall and overflowing rivers affecting communities across the state. Thousands of families have been displaced, homes have been damaged, livelihoods have been disrupted, and access to basic necessities has become increasingly difficult.",
      "In times like these, humanitarian support cannot wait.",
      "SikhAid Charitable Trust is stepping forward to support flood-affected families in Assam.",
      "Our team is preparing to reach affected communities with essential relief supplies and humanitarian assistance, focusing on families who need immediate support.",
      "From Relief to Recovery",
      "Our mission is simple: to stand beside people when they need help the most.",
      "Through our Assam Flood Relief Mission 2026, we aim to provide immediate humanitarian assistance to flood-affected families and support communities through the difficult days ahead.",
      "Our relief efforts will focus on:",
      "* 🍚 Dry ration and essential food supplies",
      "* 💧 Clean drinking water",
      "* 🥫 Ready-to-eat food",
      "* 🧃 ORS and hydration support",
      "* 🧼 Hygiene and sanitation kits",
      "* 🏥 Essential health and medical support",
      "* 🏠 Basic household necessities",
      "* 👨‍👩‍👧‍👦 Support for displaced and vulnerable families",
      "* 🌱 Long-term recovery and rehabilitation",
      "WHY YOUR SUPPORT MATTERS",
      "When floods destroy homes and disrupt livelihoods, families often lose access to the most basic necessities.",
      "A family may need food for the day.",
      "A child may need clean drinking water.",
      "An elderly person may need essential medicines.",
      "A displaced family may need basic hygiene supplies.",
      "Your support can help us reach them.",
      "Every contribution, big or small, can help SikhAid deliver relief to communities affected by the floods.",
      "WHERE YOUR DONATION GOES",
      "Your contribution will help support:",
      "Emergency food and dry ration for families facing shortages.",
      "Safe drinking water and hydration support for affected communities.",
      "ORS, essential health supplies and medical assistance where required.",
      "Sanitation and hygiene kits for displaced families.",
      "Basic household and emergency necessities.",
      "Support for families and communities as they begin rebuilding their lives.",
      "You Can Be Someone’s Hope Today.",
      "A disaster can change a family’s life in a matter of hours.",
      "But your support can help them get through the next day.",
      "You can help put food on a family’s table.",
      "You can help provide clean water to someone in need.",
      "You can help a displaced family receive essential supplies.",
      "Together, we can stand with Assam.",
      "CORPORATE & CSR PARTNERSHIPS",
      "Partner With Us to Create Greater Impact",
      "Businesses and CSR partners can play a crucial role in emergency response and humanitarian relief.",
      "SikhAid welcomes partnerships with organisations that want to support Assam’s flood-affected communities through:",
      "* Food and essential supplies",
      "* Transportation and distribution support",
      "EVERY CONTRIBUTION COUNTS",
      "One Family. One Meal. One Bottle of Water. One Act of Humanity.",
      "Floods may take away homes and livelihoods.",
      "But together, we can help restore hope.",
      "DONATE TODAY. HELP US REACH MORE FAMILIES.",
      "SikhAid Charitable Trust",
      "Serving Humanity. Saving Lives. Spreading Hope."
    ],
    "quote": "Your Support funds dry ration and essential food supplies, clean drinking water, ready-to-eat meals, well purification kits, and rebuilding materials for displaced families returning home.",
    "quoteAuthor": "Assam Field Volunteer",
    "impactStats": [
      {
        "label": "People Helped",
        "value": "2,000+",
        "icon": "👥"
      },
      {
        "label": "Water Bottles Supplied",
        "value": "43,000+",
        "icon": "💧"
      },
      {
        "label": "Medical Recoveries",
        "value": "300+",
        "icon": "🩺"
      },
      {
        "label": "Life Jackets Deployed",
        "value": "230+",
        "icon": "🦺"
      }
    ],
    "howItWorks": [
      {
        "description": "Choose any amount or sponsor a specific item water, ORS, Meals, Ready-to-Eat food.",
        "step": 1,
        "title": "You Donate"
      },
      {
        "description": "Every rupee is mapped to a tangible item.",
        "step": 2,
        "title": "Fund Allocated"
      },
      {
        "title": "Seva at Assam",
        "step": 3,
        "description": "Our volunteer network distributes supplies along the Assam flood route during the festival."
      },
      {
        "title": "Impact Report",
        "step": 4,
        "description": "Photos, videos, and counts of devotees served are shared with every donor post-event."
      }
    ],
    "metrics": [
      [
        "2,000+",
        "People Helped"
      ],
      [
        "43,000+",
        "Water Bottles Supplied"
      ],
      [
        "300+",
        "Medical Recoveries"
      ],
      [
        "230+",
        "Life Jackets Deployed"
      ]
    ],
    "raised": 1410000,
    "goal": 2000000,
    "donors": 986,
    "days": 21,
    "tone": "#46607A",
    "img": "https://i.ibb.co/h1CgrFcx/DSC-3853.webp"
  },
  {
    "slug": "guru-nanak-dev-ji-chardi-kala-sports-academy",
    "title": "Guru Nanak Dev Ji Chardi Kala Sports Academy",
    "short": "Guru",
    "subtitle": "A Premium Multi-Sport Destination for Punjab's Next Champions",
    "tagText": "Sports Mission",
    "type": "youth",
    "group": "Youth",
    "category": "Sports",
    "location": "Punjab",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Guru Nanak Dev Ji Chardi Kala Sports Academy is a dedicated initiative to empower underprivileged children of Punjab through completely free professional sports training. Located near Dera Baba Nanak, the academy aims to identify and nurture raw talent, providing access to coaching, equipment, and opportunities without any financial burden.\n\nThis is more than a sports academy, it is a mission to build confidence, discipline, and future athletes who can represent India.",
    "story": [
      "Guru Nanak Dev Ji Chardi Kala Sports Academy is a transformative charitable initiative dedicated to empowering underprivileged youth across Punjab by providing completely free access to world-class sports training, infrastructure, and mentorship. Built near Dera Baba Nanak, the academy is designed as a centralized, multi-sport ecosystem offering professional coaching in disciplines such as cricket, football, basketball, athletics, shooting, badminton, and strength training. At its core, the academy addresses a critical gap in Punjab’s current landscape ,where lack of structured facilities, financial constraints, and rising social challenges like drug abuse limit the potential of young talent. By removing all financial barriers and ensuring zero fees for training, equipment, and development programs, SikhAid is creating an inclusive platform where talent is nurtured purely on merit, discipline, and dedication.",
      "Beyond sports, this initiative is a movement for social transformation and nation-building. The academy will engage 800–900 youth across nearby villages, offering them a structured pathway toward personal growth, competitive excellence, and a purpose-driven life. Through consistent training, mentorship from experienced coaches and community elders, and exposure to district, state, and national-level opportunities, young athletes will develop not only physical strength but also confidence, resilience, leadership, and strong life values. By channeling energy into sports and positive engagement, the academy actively works to prevent drug abuse, strengthen mental well-being, and build future role models who uplift their communities. SikhAid Free Sports Academy is not just creating athletes, it is shaping disciplined individuals, empowered youth, and future champions who will proudly represent India."
    ],
    "quote": "Chardi Kala is a state of eternal optimism and strength. Through martial arts, boxing, and athletics, we channel youth energy away from substance abuse into champions for the state and country.",
    "quoteAuthor": "Head Coach, Chardi Kala Academy",
    "impactStats": [
      {
        "label": "Academy Cadets",
        "value": "350+",
        "icon": "🥊"
      },
      {
        "label": "State & National Medals",
        "value": "42+",
        "icon": "🏅"
      },
      {
        "label": "Equipped Training Centers",
        "value": "3",
        "icon": "🏋️"
      },
      {
        "label": "100% Subsidized Nutrition",
        "value": "Active",
        "icon": "🥗"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "Build the Foundation",
        "description": "Finalize land development, ground leveling, and basic infrastructure such as boundary fencing, lighting, and safety measures. This creates a secure and professional environment where training can begin."
      },
      {
        "step": 2,
        "title": "Set Up Infrastructure & Equipment",
        "description": "Install sports facilities including cricket nets, football ground, running track, gym setup, and shooting range. Procure high-quality sports equipment to ensure athletes receive professional-level training conditions."
      },
      {
        "step": 3,
        "title": "Appoint Coaches & Start Training",
        "description": "Hire qualified coaches for each sport and begin structured training programs. Implement fitness routines, regular practice schedules, and mentorship to build discipline and skill development among athletes."
      },
      {
        "step": 4,
        "title": "Talent Development & Competitive Exposure",
        "description": "Identify promising athletes and provide them with advanced training and exposure to district, state, and national-level competitions. Track performance, build career pathways, and develop future champions."
      }
    ],
    "metrics": [
      [
        "350+",
        "Academy Cadets"
      ],
      [
        "42+",
        "State & National Medals"
      ],
      [
        "3",
        "Equipped Training Centers"
      ],
      [
        "Active",
        "100% Subsidized Nutrition"
      ]
    ],
    "raised": 1150000,
    "goal": 2000000,
    "donors": 920,
    "days": null,
    "tone": "#1E4D6B",
    "img": "https://i.ibb.co/HLx9CLTS/mobile-new.png"
  },
  {
    "slug": "blanket-distribution",
    "title": "Blanket Distribution",
    "short": "Blanket",
    "subtitle": "Shielding Vulnerable Families from Winter's Harsh Embrace",
    "tagText": "Winter Relief Mission",
    "type": "community",
    "group": "Emergency",
    "category": "Winter Relief",
    "location": "North India",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Winter relief campaign providing high-quality blankets to impoverished families, elderly, and homeless individuals across India.",
    "story": [
      "Each winter, SikhAid launches its Blanket Seva campaign to shield the most vulnerable - impoverished families, the elderly, and the homeless - from the biting cold. Through carefully organized distribution drives, high-quality blankets are delivered across urban slums and remote villages.",
      "This annual campaign ensures no one is left to face harsh nights without protection. These initiatives not only bring warmth but also foster solidarity and compassion, reminding communities that seva never sleeps, even in the coldest months.",
      "Our teams work tirelessly during winter months, conducting door-to-door distributions in slums, organizing community distribution points, and ensuring that the most vulnerable populations receive adequate winter protection when they need it most."
    ],
    "quote": "In the biting cold of North Indian winters, a heavy wool blanket is not just comfort — it is life-saving protection against deadly pneumonia for children and elderly individuals sleeping on pavements.",
    "quoteAuthor": "Winter Relief Seva Lead",
    "impactStats": [
      {
        "label": "Blankets Distributed",
        "value": "15,000+",
        "icon": "🧥"
      },
      {
        "label": "Families Benefited",
        "value": "8,000+",
        "icon": "👨‍👩‍👧‍👦"
      },
      {
        "label": "Distribution Centers",
        "value": "75+",
        "icon": "📍"
      },
      {
        "label": "Volunteer Hours",
        "value": "2,400+",
        "icon": "⏰"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "Need Assessment",
        "description": "Survey vulnerable communities to identify families and individuals most in need of winter protection."
      },
      {
        "step": 2,
        "title": "Quality Procurement",
        "description": "Source high-quality, warm blankets that provide adequate protection against harsh winter conditions."
      },
      {
        "step": 3,
        "title": "Strategic Distribution",
        "description": "Organize distribution drives in urban slums, remote villages, and areas with high homeless populations."
      },
      {
        "step": 4,
        "title": "Follow-up Care",
        "description": "Monitor the well-being of beneficiaries and provide additional support where needed during winter months."
      }
    ],
    "metrics": [
      [
        "15,000+",
        "Blankets Distributed"
      ],
      [
        "8,000+",
        "Families Benefited"
      ],
      [
        "75+",
        "Distribution Centers"
      ],
      [
        "2,400+",
        "Volunteer Hours"
      ]
    ],
    "raised": 1240000,
    "goal": 1500000,
    "donors": 1480,
    "days": null,
    "tone": "#4A4A6A",
    "img": "https://i.ibb.co/zWNmNZhN/Blanket-Main.png"
  },
  {
    "slug": "road-safety",
    "title": "Road Safety",
    "short": "Road",
    "subtitle": "Visibility Saves Lives.",
    "tagText": "Community Service Mission",
    "type": "community",
    "group": "Community",
    "category": "Community Service",
    "location": "Pan-India",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "This winter, as fog limits visibility, we’re helping keep roads safer with 3M reflective stickers and cycle lights for those who travel and work through the mist.",
    "story": [
      "During the winter months, dense fog frequently blankets North India, drastically reducing visibility and making travel extremely dangerous. To improve road safety in these conditions, our foundation distributes 3M high-reflective radium stickers to truck and auto drivers. These stickers significantly increase vehicle visibility at night and in fog, helping prevent accidents. In addition, each winter, we also provide cycle safety lights to daily wage earners, ensuring they can travel safely even in the thickest fog."
    ],
    "quote": "Every preventable highway tragedy steals a provider from their family. Our Road Safety initiative installs reflector tapes on rural carts, provides helmets, and trains first-responders.",
    "quoteAuthor": "Road Safety Initiative Team",
    "impactStats": [
      {
        "label": "Vehicles Fitted with Reflectors",
        "value": "12,000+",
        "icon": "🚜"
      },
      {
        "label": "Helmets Distributed",
        "value": "1,500+",
        "icon": "🪖"
      },
      {
        "label": "First Responder Trainings",
        "value": "40+",
        "icon": "🚑"
      },
      {
        "label": "Accident Drop in Zones",
        "value": "28%",
        "icon": "📉"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Sponsor high-grade retroreflective tapes, safety helmets, and first-aid kits."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Procurement of highway safety materials and traffic police liaison drives."
      },
      {
        "step": 3,
        "title": "Night Patrols",
        "description": "Volunteers paste luminous reflective tape on unlit tractor-trolleys, animal carts, and bicycles."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Photographic records of covered vehicles and highway safety incident statistics."
      }
    ],
    "metrics": [
      [
        "12,000+",
        "Vehicles Fitted with Reflectors"
      ],
      [
        "1,500+",
        "Helmets Distributed"
      ],
      [
        "40+",
        "First Responder Trainings"
      ],
      [
        "28%",
        "Accident Drop in Zones"
      ]
    ],
    "raised": 310000,
    "goal": 600000,
    "donors": 260,
    "days": null,
    "tone": "#4A5B73",
    "img": "/sikhaidLogo.png"
  },
  {
    "slug": "langar-sewa",
    "title": "Langar Sewa",
    "short": "Langar",
    "subtitle": "Langar Seva: Your Seva Can Feed Someone Today",
    "tagText": "Hunger Mission",
    "type": "hunger",
    "group": "Hunger",
    "category": "Hunger",
    "location": "Pan-India",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Across communities, many families and individuals struggle to access fresh, nutritious meals every day. Langar Sewa brings people together to prepare and distribute freshly cooked food at different locations, ensuring that no one goes hungry and that those in need receive a warm, wholesome meal with dignity.",
    "story": [
      "Langar for All. Sewa for All",
      "Langar is one of the most beautiful traditions of Sikhi. It is the practice of serving free meals to everyone, regardless of religion, caste, background, or status.",
      "For generations, Sikhs have opened their doors and kitchens to anyone who is hungry. No questions asked. No discrimination. Just Seva.",
      "Sikh Aid continues this tradition by preparing and serving Langar to people facing hunger, poverty, displacement, and difficult circumstances.",
      "For someone who is struggling, a hot, freshly prepared meal can mean more than just food. It can bring comfort, dignity, and hope.",
      "Your contribution helps Sikh Aid prepare Langar and reach communities that need support.",
      "Everyone sits together.",
      "Everyone is served equally.",
      "Whether it is a family struggling to make ends meet, a community affected by disaster, or someone simply looking for their next meal, Langar is there to serve.",
      "This is the spirit of Sikhi.",
      "Your contribution can help provide:",
      "* Freshly prepared Langar",
      "* Nutritious meals to communities in need",
      "* Food during disaster relief",
      "* Meals for vulnerable families and individuals",
      "You don’t have to do something extraordinary to make a difference.",
      "Sometimes, Seva begins with something as simple as helping put a meal in someone’s hands.",
      "Support Langar Seva today and help keep this timeless tradition alive.",
      "WAHEGURU JI KA KHALSA"
    ],
    "quote": "Your support can help provide freshly cooked, nutritious meals to communities in need. Every contribution helps cover the cost of ingredients, cooking, and distributing Langar at different locations, ensuring that warm meals reach those who need them most.",
    "quoteAuthor": "Langar Seva Volunteers",
    "impactStats": [
      {
        "label": "Locations Served",
        "value": "30+",
        "icon": "📍"
      },
      {
        "label": "Community Kitchens",
        "value": "10+",
        "icon": "🍛"
      },
      {
        "label": "Meals Served Daily",
        "value": "400+",
        "icon": "🍱"
      },
      {
        "label": "Lives Impacted",
        "value": "5,000+",
        "icon": "👱🏻"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Choose any amount to support Langar Sewa and help sponsor freshly cooked meals that are prepared and served to communities in need."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Funds are allocated towards purchasing essential ingredients, cooking freshly prepared meals, and serving Langar directly to communities in need."
      },
      {
        "step": 3,
        "title": "Langar Sewa",
        "description": "Freshly cooked meals are prepared and distributed across different locations, ensuring nutritious food reaches communities and individuals in need."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Photos, videos, and counts of devotees served are shared with every donor post-event."
      }
    ],
    "metrics": [
      [
        "30+",
        "Locations Served"
      ],
      [
        "10+",
        "Community Kitchens"
      ],
      [
        "400+",
        "Meals Served Daily"
      ],
      [
        "5,000+",
        "Lives Impacted"
      ]
    ],
    "raised": 2840000,
    "goal": 3500000,
    "donors": 2410,
    "days": null,
    "tone": "#7A4E26",
    "img": "https://i.ibb.co/3yK1BL5V/Communal-Kitchen-Roti-Making-Tradition.webp"
  },
  {
    "slug": "sikh-aid-health-on-wheels",
    "title": "Sikh Aid Health on Wheels",
    "short": "Sikh",
    "subtitle": "Bringing Free Healthcare to Every Doorstep",
    "tagText": "Healthcare Initiatives Mission",
    "type": "health",
    "group": "Healthcare",
    "category": "Healthcare Initiatives",
    "location": "Odisha",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Sikh Aid Health on Wheels is a mobile healthcare initiative designed to bring free medical services directly to rural and underserved communities. Through a fully equipped ambulance, this campaign ensures that people in remote villages especially in Odisha receive timely medical attention without the burden of travel or cost.",
    "story": [
      "SikhAid Health on Wheels is a flagship healthcare initiative focused on delivering free, accessible, and reliable medical services to rural and underserved communities. In many parts of Odisha, access to even basic healthcare remains a challenge due to distance, cost, and lack of infrastructure.",
      "Through this campaign, Sikhaid deploys a fully equipped mobile ambulance clinic that travels to remote villages, ensuring that no individual is deprived of essential medical care.",
      "We take healthcare beyond hospitals and bring it directly to the communities in need.",
      "A mobile ambulance clinic visits villages on a scheduled basis",
      "A trained medical team provides on-the-spot consultation",
      "Patients receive free checkups, basic diagnosis, and medicines",
      "Critical cases are identified early and referred to nearby hospitals",
      "General health checkups",
      "Blood pressure and blood sugar testing",
      "Basic medical consultation",
      "Distribution of free medicines",
      "First aid and primary care support",
      "Health awareness sessions on hygiene, nutrition, and prevention",
      "This initiative is dedicated to:",
      "Families in remote and rural villages",
      "Elderly individuals with limited mobility",
      "Women and children with restricted access to care",
      "Farmers and daily wage workers",
      "For many families, accessing healthcare means traveling long distances, losing daily wages, and bearing additional expenses. As a result, minor health issues often go untreated and develop into serious conditions.",
      "Sikhaid Health on Wheels addresses this gap by ensuring timely intervention, early diagnosis, and continuous support, ultimately improving the overall health and well-being of entire communities.",
      "Reach thousands of beneficiaries across rural Odisha",
      "Provide consistent and preventive healthcare services",
      "Reduce the number of untreated illnesses",
      "Strengthen community awareness and trust in healthcare",
      "Your contribution helps us expand our reach and serve more communities.",
      "Sponsor a day of ambulance operations",
      "Support medical supplies and medicines",
      "Partner with us through CSR initiatives",
      "Volunteer with our on-ground team",
      "Every contribution directly impacts lives and helps bring healthcare closer to those who need it the most.",
      "Together, we can ensure that no life is lost due to lack of access to basic healthcare.",
      "Sikh Aid Health on Wheels is not just a campaign it’s a step towards a healthier, more equitable future."
    ],
    "quote": "Healthcare is a fundamental human right. Health on Wheels breaks geographical and financial barriers by bringing trained doctors, diagnostic labs, and free essential medicines directly to tribal hamlets.",
    "quoteAuthor": "Medical Team Lead, SikhAid",
    "impactStats": [
      {
        "label": "Village Medical Runs",
        "value": "120+",
        "icon": "🚐"
      },
      {
        "label": "Free Consultations",
        "value": "18,500+",
        "icon": "🩺"
      },
      {
        "label": "Free Medicines Dispensed",
        "value": "50,000+",
        "icon": "💊"
      },
      {
        "label": "Diagnostic Tests Done",
        "value": "8,200+",
        "icon": "🩸"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Sponsor ambulance fuel, doctor stipends, and life-saving chronic and emergency medicines."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Procurement of quality generic pharmaceuticals, testing strips, and medical equipment."
      },
      {
        "step": 3,
        "title": "Mobile Seva",
        "description": "Our fully equipped ambulance travels deep into remote hamlets without local healthcare access."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Detailed camp logs, diagnostic screening reports, and patient recovery stories."
      }
    ],
    "metrics": [
      [
        "120+",
        "Village Medical Runs"
      ],
      [
        "18,500+",
        "Free Consultations"
      ],
      [
        "50,000+",
        "Free Medicines Dispensed"
      ],
      [
        "8,200+",
        "Diagnostic Tests Done"
      ]
    ],
    "raised": 920000,
    "goal": 1500000,
    "donors": 840,
    "days": null,
    "tone": "#2E6B68",
    "img": "https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/wi/art/5b9b68ada4849.jpeg"
  },
  {
    "slug": "project-farmer-first",
    "title": "Project Farmer First",
    "short": "Project",
    "subtitle": "Supporting Farmers, Sustaining Lives",
    "tagText": "Farmer Welfare Programs Mission",
    "type": "community",
    "group": "Community",
    "category": "Farmer Welfare Programs",
    "location": "Punjab & Haryana",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "SikhAid Farmer First  is an initiative by Sikhaid Charitable Trust focused on supporting small and marginal farmers in rural Odisha through essential resources, flood relief, and sustainable farming support. The campaign aims to help farmers rebuild their livelihoods, improve productivity, and ensure long-term stability with dignity.\n",
    "story": [
      "Sikh Aid Farmer First is a dedicated initiative focused on supporting small and marginal farmers in rural Odisha. Farmers face continuous challenges such as floods, unpredictable weather, rising costs, and limited access to resources.",
      "This campaign is designed to provide direct relief, essential farming support, and long-term solutions so that farmers can rebuild their lives and sustain their livelihoods with dignity.",
      "To ensure that every farmer has the support, stability, and resources needed to thrive, not just survive.",
      "We work at the grassroots level to deliver immediate support and sustainable solutions:",
      "Identifying farmers most affected by floods and financial distress",
      "Providing essential farming inputs and daily necessities",
      "Supporting recovery and rebuilding efforts",
      "Promoting sustainable and resilient farming practices",
      "Distribution of seeds, fertilizers, and farming tools",
      "Support for rebuilding homes and storage units damaged in floods",
      "Providing ration and emergency financial assistance",
      "Introducing low-cost, sustainable farming techniques",
      "Connecting farmers with local support systems and guidance",
      "Small and marginal farmers",
      "Flood-affected farming families",
      "Rural households dependent on agriculture",
      "Agricultural daily wage workers",
      "Farmers are the backbone of our country, yet many struggle to recover from natural disasters and financial hardships. In Odisha, recurring floods and climate challenges make farming uncertain.",
      "Sikhaid Farmer First ensures that those who feed the nation are not left behind, providing them with the support they need to stand strong again.",
      "Support 500+ farming families in the initial phase",
      "Provide essential resources to improve productivity",
      "Help families rebuild and regain stability",
      "Promote long-term agricultural resilience",
      "Sponsor a farming kit for a family",
      "Support ration and emergency relief",
      "Fund large-scale farmer support programs",
      "Partner in sustainable agriculture initiatives",
      "Assist in on-ground distribution and surveys",
      "Support awareness and training programs",
      "Be a Part of the Change",
      "Your support can help a farmer rebuild not just crops, but their future.",
      "Sikhaid Farmer First is a commitment to stand with those who sustain us all.",
      "“When farmers rise, the nation thrives.”"
    ],
    "quote": "The farmer feeds the entire nation, but when crisis strikes, who feeds the farmer? Project Farmer First provides certified seeds, bio-fertilizers, and emergency relief to keep our Annadatas standing tall.",
    "quoteAuthor": "Project Farmer First Coordinator",
    "impactStats": [
      {
        "label": "Farmers Assisted",
        "value": "1,200+",
        "icon": "🌾"
      },
      {
        "label": "Villages Covered",
        "value": "50+",
        "icon": "🚜"
      },
      {
        "label": "Seeds Distributed",
        "value": "10,000+ Kg",
        "icon": "🌱"
      },
      {
        "label": "Soil Health Tests",
        "value": "300+",
        "icon": "💧"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Sponsor seed kits, tractor tillage assistance, or emergency farm debt relief packages."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Direct procurement of certified high-yield seed stocks and agricultural inputs without middle-men."
      },
      {
        "step": 3,
        "title": "Field Distribution",
        "description": "On-ground handover to verified marginal farmers and women-led smallholdings."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Harvest reports, seasonal yield data, and photographic proof of cultivated farmland."
      }
    ],
    "metrics": [
      [
        "1,200+",
        "Farmers Assisted"
      ],
      [
        "50+",
        "Villages Covered"
      ],
      [
        "10,000+ Kg",
        "Seeds Distributed"
      ],
      [
        "300+",
        "Soil Health Tests"
      ]
    ],
    "raised": 1350000,
    "goal": 2200000,
    "donors": 1100,
    "days": null,
    "tone": "#5C6F40",
    "img": "https://www.tribuneindia.com/sortd-service/imaginary/v22-01/jpg/large/high?url=dGhldHJpYnVuZS1zb3J0ZC1wcm8tcHJvZC1zb3J0ZC9tZWRpYWZlZmM1MTIwLTMzYjItMTFmMS05ZGQ1LWQzMjE0NmQ0Njk2MC5qcGc="
  },
  {
    "slug": "no-spot",
    "title": "No Spot",
    "short": "No",
    "subtitle": "Championing Dignity and Hygiene for Women",
    "tagText": "Women's Health Mission",
    "type": "health",
    "group": "Healthcare",
    "category": "Women's Health",
    "location": "Rural India",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Women's sanitation initiative promoting menstrual health, hygiene awareness, and dignity for underserved women across India.",
    "story": [
      "The No Spot women's sanitation initiative by SikhAid champions dignity and hygiene for underserved women across India. With a focus on menstrual health, access to sanitation, and hygiene awareness, this project has impacted communities in both urban slums of Pune and remote villages in Odisha. Activities include onsite sanitation drives, portable toilet installations, and monthly distribution of over 1 lakh sanitary pads and essential toiletries. Through regular workshops and awareness sessions, SikhAid empowers women with knowledge, resources, and a safe space for addressing menstrual health. This initiative fights the stigma around menstruation with quiet strength and steady seva, ensuring that no woman has to compromise her dignity due to lack of access to basic sanitary facilities."
    ],
    "quote": "Menstrual hygiene is a matter of health, education, and human dignity. No Spot empowers young girls and women in rural areas by replacing unhygienic alternatives with safe, biodegradable sanitary pads and medical counseling.",
    "quoteAuthor": "No Spot Women’s Health Team",
    "impactStats": [
      {
        "label": "Sanitary Pads Distributed",
        "value": "1 Lakh+",
        "icon": "🩸"
      },
      {
        "label": "Women Beneficiaries",
        "value": "25,000+",
        "icon": "👩"
      },
      {
        "label": "Awareness Workshops",
        "value": "150+",
        "icon": "📚"
      },
      {
        "label": "Communities Reached",
        "value": "50+",
        "icon": "🏘️"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "Community Assessment",
        "description": "Identify underserved communities with limited access to menstrual hygiene facilities and products."
      },
      {
        "step": 2,
        "title": "Infrastructure Development",
        "description": "Install portable toilets and sanitation facilities in strategic locations for maximum accessibility."
      },
      {
        "step": 3,
        "title": "Distribution & Education",
        "description": "Distribute sanitary pads, toiletries, and conduct awareness sessions on menstrual health and hygiene."
      },
      {
        "step": 4,
        "title": "Ongoing Support",
        "description": "Provide continuous support through regular visits, maintenance of facilities, and educational workshops."
      }
    ],
    "metrics": [
      [
        "1 Lakh+",
        "Sanitary Pads Distributed"
      ],
      [
        "25,000+",
        "Women Beneficiaries"
      ],
      [
        "150+",
        "Awareness Workshops"
      ],
      [
        "50+",
        "Communities Reached"
      ]
    ],
    "raised": 680000,
    "goal": 1200000,
    "donors": 590,
    "days": null,
    "tone": "#8C3B5E",
    "img": "https://i.ibb.co/7dVCJV2p/No-Spot-Main.png"
  },
  {
    "slug": "project-chardikala",
    "title": "Project Chardikala",
    "short": "Project",
    "subtitle": "Serving Humanity in High Spirits.",
    "tagText": "Chardikala Punjab Mission Mission",
    "type": "community",
    "group": "Community",
    "category": "Chardikala Punjab Mission",
    "location": "Punjab",
    "status": "Ongoing",
    "urgent": false,
    "blurb": "Project Chardikala by SikhAid is a Punjab-based initiative dedicated to uplifting communities through healthcare, women’s empowerment, sustainable livelihoods, and farmer support. Guided by the spirit of Chardi Kala ever-rising optimism and selfless service we strive to build a healthier, stronger, and more resilient Punjab",
    "story": [
      "Project Chardikala is a flagship initiative of SikhAid dedicated to uplifting and empowering the people of Punjabthrough holistic community development. Rooted in the Sikh principles of Seva (selfless service) and Chardi Kala (ever-rising spirit and optimism), the project focuses on four key pillars — Healthcare, Women Empowerment, Livelihood, and Farmers’ Welfare.",
      "Through these pillars, SikhAid aims to create sustainable change, strengthen rural communities, and ensure every individual in Punjab has the opportunity to live with dignity, health, and hope.",
      "To build a resilient, healthy, and empowered Punjab where communities thrive in the spirit of Chardi Kala — with optimism, compassion, and collective progress.",
      "To uplift marginalized communities in Punjab through accessible healthcare, empowerment of women, sustainable livelihoods, and support for farmers, guided by the principles of Seva and Sarbat da Bhala (welfare of all)."
    ],
    "quote": "Chardikala represents the eternal, undaunted Sikh spirit. We uplift rural Punjab through vocational skills, sports, anti-substance counseling, and family sustenance so communities flourish anew.",
    "quoteAuthor": "Chardikala Punjab Mission Lead",
    "impactStats": [
      {
        "label": "Village Communities",
        "value": "80+",
        "icon": "🌾"
      },
      {
        "label": "Lives Touched",
        "value": "12,000+",
        "icon": "🤝"
      },
      {
        "label": "Skill Workshops",
        "value": "45+",
        "icon": "💡"
      },
      {
        "label": "Rehab Counseling Centers",
        "value": "12+",
        "icon": "🛡️"
      }
    ],
    "howItWorks": [
      {
        "step": 1,
        "title": "You Donate",
        "description": "Support community rehabilitation programs, vocational workshops, and youth counseling."
      },
      {
        "step": 2,
        "title": "Fund Allocated",
        "description": "Deployed for skill trainers, learning materials, community center infrastructure, and logistics."
      },
      {
        "step": 3,
        "title": "Field Action",
        "description": "Grassroots teams conduct de-addiction awareness, computer literacy, and elderly assistance."
      },
      {
        "step": 4,
        "title": "Impact Report",
        "description": "Youth employment data, counseling logs, and verified village community testimonials."
      }
    ],
    "metrics": [
      [
        "80+",
        "Village Communities"
      ],
      [
        "12,000+",
        "Lives Touched"
      ],
      [
        "45+",
        "Skill Workshops"
      ],
      [
        "12+",
        "Rehab Counseling Centers"
      ]
    ],
    "raised": 670000,
    "goal": 1200000,
    "donors": 520,
    "days": null,
    "tone": "#7B5E28",
    "img": "https://i.ibb.co/93cBtgnH/CHARDIKALA-LOGO-7-01.jpg"
  }
];

  const completed = [
  {
    "title": "Rath Yatra Seva 2026",
    "sub": "Serving Humanity During the World's Largest Spiritual Gathering",
    "tone": "#8A5A2B",
    "img": "https://i.ibb.co/rR52qRhx/Chat-GPT-Image-Jun-5-2026-09-28-48-PM.webp",
    "slug": "rath-yatra-seva-2026"
  },
  {
    "title": "COVID Oxygen Sewa",
    "sub": "Breathing Life into Hope During the Pandemic",
    "tone": "#5C5030",
    "img": "https://i.ibb.co/n8bLzJWC/Oxygen-Main.png",
    "slug": "covid-oxygen-sewa"
  },
  {
    "title": "Other Sewa",
    "sub": "Diverse Initiatives Touching Lives Across Communities",
    "tone": "#4A5B73",
    "img": "https://i.ibb.co/F4YZrjZR/174.png",
    "slug": "other-sewa"
  }
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
      '<a href="campaign.html#nepal-flood-relief-2026">Help Nepal now →</a></div></div>' +
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
      '<div class="menu"><a href="volunteering.html">Volunteering</a><a href="csr.html">CSR partnerships</a><a href="get-involved.html#sponsor">Sponsor a program</a></div></div>' +
      L('blog.html', 'Blog', 'blog') + L('press.html', 'Press', 'press') + L('contact.html', 'Contact', 'contact') +
      '</nav>' +
      '<div class="header-cta"><a class="icon-btn hide-sm" href="' + (page === 'account' ? 'account.html' : 'login.html') + '" aria-label="My account">' + ICON.user + '</a>' +
      '<a class="btn btn-give" href="donate.html">' + ICON.heart + 'Donate</a>' +
      '<button class="icon-btn menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mainNav" id="menuBtn">' + ICON.menu + '</button></div>' +
      '</div></header>';
  }

  function footer(withCta) {
    return (withCta ? '<section class="cta-band"><div class="wrap">' +
      '<div class="stack" style="gap:10px;flex:1 1 480px"><h2>Join us in serving India.</h2><p style="max-width:56ch">Your support helps us respond faster to emergencies and build stronger, more resilient communities across India.</p></div>' +
      '<div class="stack" style="gap:14px"><div class="row"><a class="btn btn-give btn-lg" href="donate.html">Support our mission</a><a class="btn btn-light btn-lg" href="csr.html">Partner with us</a></div>' +
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
      '<div><h3>Quick links</h3><ul><li><a href="index.html">Home</a></li><li><a href="about.html">About us</a></li><li><a href="campaigns.html">Campaigns</a></li><li><a href="blog.html">Blog</a></li><li><a href="press.html">Press coverage</a></li></ul></div>' +
      '<div><h3>Get involved</h3><ul><li><a href="donate.html">Donate now</a></li><li><a href="donate.html#monthly">Give monthly</a></li><li><a href="volunteering.html">Volunteering</a></li><li><a href="csr.html">CSR partnerships</a></li><li><a href="get-involved.html#sponsor">Sponsor</a></li><li><a href="login.html">My account</a></li></ul></div>' +
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
