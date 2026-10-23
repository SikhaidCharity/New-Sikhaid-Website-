'use client';

import React, { useState, useEffect, useRef } from 'react';

// Unified Impact Data with Ground Locations by Name and Historical Timeline Combined
const IMPACT_DATA = {
  relief: {
    id: 'relief',
    name: 'Relief Aid',
    metricTitle: 'GROUND RELIEF MISSIONS & DISASTER RESCUE BY REGION',
    totalHighlight: '250,000+',
    growthBadge: '↗ 2020 → 2025 Lives Impacted',
    timelineMilestones: [
      { year: '2020', count: '35k Lives', note: 'Assam & Bihar flood evacuations' },
      { year: '2021', count: '85k Lives', note: 'Cyclone Yaas & Kosi boats' },
      { year: '2022', count: '140k Lives', note: 'Brahmaputra boat fleet' },
      { year: '2023', count: '195k Lives', note: 'Punjab Sutlej breaches' },
      { year: '2024', count: '230k Lives', note: 'Nepal landslide camps' },
      { year: '2025', count: '250k+ Lives', note: 'Cyclone Dana shelters' },
    ],
    yAxisLabels: ['70k', '50k', '35k', '20k', '0'],
    locationItems: [
      {
        name: 'Assam',
        shortName: 'Assam',
        value: 65000,
        displayVal: '65,000+ Lives',
        unitBadge: 'Flood Boat Operations',
        summary: 'Deployed motorized inflatable rescue boats during Brahmaputra floods, reaching cut-off riverine chars with water purifiers, shelter kits, and emergency baby food.',
        locations: ['Barpeta Riverine Chars', 'Dhemaji Submerged Villages', 'Kaziranga Buffer Corridor', 'Dhubri Border Settlements'],
        capacity: '8 Motorized Rescue Boats · 4 Water Purifying Rigs · 14,000 Dry Ration Kits',
      },
      {
        name: 'Nepal',
        shortName: 'Nepal',
        value: 42000,
        displayVal: '42,000+ Lives',
        unitBadge: 'Alpine Landslide Camps',
        summary: 'Emergency alpine relief camps across earthquake and landslide-affected mountain belts. Provided weather-resistant geodesic tents, fleece blankets, and warm porridge langar.',
        locations: ['Melamchi River Basin', 'Sindhupalchok Foothills', 'Helambu Valley Hamlets', 'Kavre Mountain Belts'],
        capacity: '6 High-Altitude Relief Hubs · 3,500 Thermal Kits · 4 Mountain Medic Units',
      },
      {
        name: 'Bihar',
        shortName: 'Bihar',
        value: 58000,
        displayVal: '58,000+ Lives',
        unitBadge: 'Kosi Boat Ambulances',
        summary: 'Tackled devastating seasonal floods in North Bihar. Operated floating boat clinics, set up cooked community kitchens on high river embankments, and provided anti-venom.',
        locations: ['Supaul Kosi Embankment', 'Saharsa Rural Pockets', 'Madhepura Lowlands', 'Khagaria Confluence Hamlets'],
        capacity: '12 Boat Ambulances · 6 Embankment Kitchens · Anti-Venom Emergency Supply',
      },
      {
        name: 'Odisha',
        shortName: 'Odisha',
        value: 48000,
        displayVal: '48,000+ Lives',
        unitBadge: 'Cyclone Shelters & Rebuilding',
        summary: 'Deployed within hours of Cyclones Fani, Yaas, and Dana landfall. Restored coastal drinking water sources, distributed solar lanterns, and rebuilt fishermen huts with zinc roofing.',
        locations: ['Kendrapara Seaside Hamlets', 'Jagatsinghpur Fishing Villages', 'Puri Coastal Slums', 'Balasore Delta Villages'],
        capacity: '18 Cyclone Relief Shelters · 16,000 Zinc Roofing Sheets · 5 Water Tankers',
      },
      {
        name: 'Punjab',
        shortName: 'Punjab',
        value: 37000,
        displayVal: '37,000+ Lives',
        unitBadge: 'River Breach Dewatering',
        summary: 'Responded to major Sutlej and Ghaggar river embankment breaches. Deployed high-capacity tractor pumps, reinforced bunds with sandbags, and distributed cattle feed.',
        locations: ['Ropar Flood Corridor', 'Firozpur Border Belt', 'Mansa Submerged Farms', 'Anandpur Sahib Lowlands'],
        capacity: '22 Dewatering Tractor Pumps · 45,000 Sandbag Bunds · 600 Quintals Cattle Feed',
      },
    ],
    quickStats: [
      { val: '250,000+', label: 'People Rescued & Sheltered' },
      { val: '19+ States', label: 'Disaster Zones Covered' },
    ],
  },

  education: {
    id: 'education',
    name: 'Education',
    metricTitle: 'STUDENTS EDUCATED, LABS & SCHOOLS BUILT',
    totalHighlight: '28,500+',
    growthBadge: '↗ 2020 → 2025 Lives Impacted',
    timelineMilestones: [
      { year: '2020', count: '3.8k Students', note: 'Emergency digital learning kits' },
      { year: '2021', count: '8.5k Students', note: 'Cuttack & Nuapatna village hubs' },
      { year: '2022', count: '14.2k Students', note: 'Nepal Himalayan school rebuilt' },
      { year: '2023', count: '19.8k Students', note: 'Amritsar Vidya Kendra built' },
      { year: '2024', count: '24.5k Students', note: 'Ludhiana Voc. & Bathinda Lab' },
      { year: '2025', count: '28.5k+ Students', note: '4 schools built & 28.5k students' },
    ],
    yAxisLabels: ['9k', '7k', '5k', '3k', '0'],
    locationItems: [
      {
        name: 'Odisha: Cuttack & 3 Villages',
        shortName: 'Odisha Villages',
        value: 8400,
        displayVal: '8,400+ Students',
        unitBadge: '3 Smart Classrooms Built',
        summary: 'Digital classrooms, libraries, and scholarship hubs built across urban slum pockets and rural weaver blocks in Odisha.',
        locations: [
          'City: Cuttack — Slum Learning Center & Digi-Lab (450+ students)',
          'City: Bhubaneswar — Kalinga Girl Scholarship Hub (620+ students)',
          'Village 1: Nuapatna (Tigiria Block) — Smart Classroom Built (280+ tribal children)',
          'Village 2: Tangi — Rural Science Lab & Coaching Center (310+ students)',
          'Village 3: Choudwar Rural Belt — Mid-Day Nutrition & Learning Hub (380+ students)',
        ],
        capacity: '3 Smart Classrooms Built · 1 Digi-Lab · 8,400 Students Sponsored',
      },
      {
        name: 'Punjab: Amritsar Vidya Kendra',
        shortName: 'Amritsar School',
        value: 6200,
        displayVal: '6,200+ Students',
        unitBadge: 'Sikh Aid Vidya Kendra Built',
        summary: 'Constructed the Sikh Aid Vidya Kendra: an 8-room modern primary school campus built from the ground up in the rural border corridor, providing 100% free education.',
        locations: [
          'Sikh Aid Vidya Kendra Campus Built (8 Modern Classrooms)',
          'Attari Border Agricultural Cluster',
          'Ramdas Border Villages Transport Fleet',
          'Free Uniforms, Books & Digital Tablet Station',
        ],
        capacity: '1 Full Primary School Built · 8 Classrooms · 100% Free Tuition & Transport',
      },
      {
        name: 'Punjab: Ludhiana Vocational Academy',
        shortName: 'Ludhiana Voc.',
        value: 5100,
        displayVal: '5,100+ Youth',
        unitBadge: 'Vocational Academy Built',
        summary: 'Established a certified vocational center with computer and electrical labs for underprivileged youth and factory worker children.',
        locations: [
          'Sikh Aid Vocational & IT Academy (Industrial Corridor)',
          'Migrant Labor Children Weekend Coaching Center',
          'Women Computer Literacy & Coding Lab',
          'Solar Technician Training Center',
        ],
        capacity: '1 Vocational Academy Built · 45 High-Speed Computer Terminals · Job Placements',
      },
      {
        name: 'Punjab: Bathinda STEM Center',
        shortName: 'Bathinda STEM',
        value: 4600,
        displayVal: '4,600+ Girls',
        unitBadge: 'Girls STEM Lab & Buses',
        summary: 'Upgraded Malwa Rural High School with a modern STEM science lab and a dedicated electric bus fleet for girls traveling from 12 peripheral farming hamlets.',
        locations: [
          'Malwa Rural High School STEM Laboratory Upgraded',
          'Dedicated Electric Bus Fleet for 12 Peripheral Villages',
          'Girls Higher Secondary Retention Program',
          'Solar Power Backup System Installed',
        ],
        capacity: '1 High School STEM Lab Upgraded · 3 Electric Rural School Buses',
      },
      {
        name: 'Nepal: Himalayan Community School',
        shortName: 'Nepal School',
        value: 4200,
        displayVal: '4,200+ Children',
        unitBadge: 'Shree Saraswati School Rebuilt',
        summary: 'Rebuilt Shree Saraswati Himalayan Community School after landslide destruction: 8 earthquake-resilient classrooms, solar power, clean RO water, and mid-day meal kitchen.',
        locations: [
          'Shree Saraswati Himalayan Community School Built (8 Classrooms)',
          'Kavrepalanchok Mountain District Hamlets',
          'Melamchi Valley Primary School Network',
          'Mid-Day Meal Alpine Kitchen Unit',
        ],
        capacity: '1 Full 8-Classroom School Complex Rebuilt · Solar RO Drinking Unit',
      },
    ],
    quickStats: [
      { val: '4 Built', label: 'Schools & Wings Built' },
      { val: '28,500+', label: 'Students Sponsored' },
    ],
  },

  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    metricTitle: 'FREE PATIENT VISITS, MOBILE CLINICS & MEDICAL UNITS',
    totalHighlight: '185,000+',
    growthBadge: '↗ 2020 → 2025 Lives Impacted',
    timelineMilestones: [
      { year: '2020', count: '22k Patients', note: 'Emergency pandemic triage' },
      { year: '2021', count: '58k Patients', note: 'First 4 Health on Wheels vans' },
      { year: '2022', count: '98k Patients', note: 'Project No Spot hygiene launch' },
      { year: '2023', count: '135k Patients', note: 'Punjab Unit 1 (Amritsar)' },
      { year: '2024', count: '165k Patients', note: 'Punjab Unit 2 (Bathinda)' },
      { year: '2025', count: '185k+ Patients', note: '14 mobile vans covering 120+ routes' },
    ],
    yAxisLabels: ['60k', '45k', '30k', '15k', '0'],
    locationItems: [
      {
        name: 'Health on Wheels (14 Mobile Vans)',
        shortName: 'Health Vans (14)',
        value: 52000,
        displayVal: '52,000+ Consults',
        unitBadge: '14 Active Mobile Clinic Vans',
        summary: 'Fleet of 14 mobile medical clinic vans equipped with doctors, ECG machines, pathology test kits, and pharmacy, visiting remote villages that have no hospital within 25 km.',
        locations: [
          'Odisha: Cuttack & Kendrapara Rural Belt',
          'Punjab: Amritsar & Malwa Border Villages',
          'Bihar: Kosi River Flood Resettlement Hamlets',
          'Assam: Dhubri & Barpeta River Islands',
        ],
        capacity: '14 Mobile Clinic Vans · 120+ Village Routes Weekly · 380 Free Checkups Daily',
      },
      {
        name: 'Medical Unit 1 — Amritsar (Punjab)',
        shortName: 'Amritsar Unit 1',
        value: 36000,
        displayVal: '36,000+ Patients',
        unitBadge: 'Border Belt Triage Center',
        summary: 'Permanent clinical triage and diagnostic station in rural Amritsar serving 18 border-adjacent farming villages with cardiac monitoring, nebulizers, and free chronic disease medicines.',
        locations: [
          'Attari Border Periphery',
          'Ajnala Rural Corridor',
          'Majitha Agricultural Belt',
          'Ramdas Border Hamlets (18 Villages Total)',
        ],
        capacity: '1 Permanent Diagnostic Hub · 18 Border Villages Covered · 24/7 Oxygen Support',
      },
      {
        name: 'Medical Unit 2 — Bathinda (Punjab)',
        shortName: 'Bathinda Unit 2',
        value: 31000,
        displayVal: '31,000+ Screened',
        unitBadge: 'Malwa Cancer Belt Toxicology',
        summary: 'Specialized screening unit addressing heavy metal pesticide runoff and ground contamination. Provides water toxicology tests, oncology screenings, and dialysis referrals.',
        locations: [
          'Talwandi Sabo Rural Pocket',
          'Maur Mandi Periphery',
          'Rampura Phul Agricultural Belt',
          'Goniana Mandi Villages (22 Villages Total)',
        ],
        capacity: '1 Specialized Screening Clinic · RO Testing Lab · 22 Villages Covered',
      },
      {
        name: 'Odisha Coastal Community Clinics',
        shortName: 'Odisha Clinics',
        value: 34000,
        displayVal: '34,000+ Consults',
        unitBadge: 'Mahanadi & Coastal Dispensaries',
        summary: 'Permanent dispensary and outreach triage posts serving isolated fishing villages, cyclone shelters, and slum clusters with free chronic disease drugs and diagnostics.',
        locations: [
          'Kendrapara Seaside Outposts',
          'Jagatsinghpur Fishing Hamlets',
          'Puri Coastal Slum Dispensary',
          'SCB Medical College Peripheral Outreach Unit',
        ],
        capacity: '4 Ground Dispensaries · 34,000+ Free Patient Consults & Medications',
      },
      {
        name: 'Project No Spot (Women’s Hygiene)',
        shortName: 'Project No Spot',
        value: 32000,
        displayVal: '32,000+ Women',
        unitBadge: 'Menstrual Health & Dignity',
        summary: 'Distributing reusable eco-friendly sanitary kits and installing solar-powered smokeless pad incinerators in government high schools across rural Odisha and Punjab.',
        locations: [
          'Odisha Tribal High Schools (Mayurbhanj & Keonjhar)',
          'Punjab Rural High Schools (Faridkot & Mansa)',
          'Cuttack Slum Communities',
          'Flood Embankment Adolescent Camps',
        ],
        capacity: '85,000+ Hygiene Kits Distributed · 14 School Incinerators Installed',
      },
    ],
    quickStats: [
      { val: '14 Vans', label: 'Health on Wheels Vans' },
      { val: '2 Units', label: 'Punjab Medical Units' },
    ],
  },

  langar: {
    id: 'langar',
    name: 'Langar Sewa',
    metricTitle: 'HOT MEALS DISTRIBUTED ACROSS CITY & VILLAGE CORRIDORS',
    totalHighlight: '1,250,000+',
    growthBadge: '↗ 2020 → 2025 Lives Impacted',
    timelineMilestones: [
      { year: '2020', count: '250k Meals', note: 'Lockdown highway langar kitchens' },
      { year: '2021', count: '520k Meals', note: 'Oxygen camp attendant meals' },
      { year: '2022', count: '780k Meals', note: 'Cuttack central kitchen launched' },
      { year: '2023', count: '980k Meals', note: 'Punjab 8-city mobile food trucks' },
      { year: '2024', count: '1.14M Meals', note: 'Delhi outskirts & Bihar Kosi belt' },
      { year: '2025', count: '1.25M+ Meals', note: '1.25M+ meals across 32 hubs' },
    ],
    yAxisLabels: ['400k', '300k', '200k', '100k', '0'],
    locationItems: [
      {
        name: 'Punjab: Chardikala (8 Cities)',
        shortName: 'Punjab (8 Cities)',
        value: 380000,
        displayVal: '380,000+ Meals',
        unitBadge: 'Chardikala 24/7 Operations',
        summary: 'Operating with radical hospitality and seva across Punjab’s top 8 cities, serving nutritious warm meals to daily-wage workers, hospital visitors, and elderly.',
        locations: [
          '1. Amritsar (Golden Temple outer belt & border checkposts — 3,200+ meals/day)',
          '2. Ludhiana (Industrial Focal Point & railway station — 2,800+ meals/day)',
          '3. Jalandhar (Civil Hospital attendant meals — 2,100+ meals/day)',
          '4. Patiala (Old City settlements & bypass checkpoints — 1,800+ meals/day)',
          '5. Bathinda (Thermal colony labor settlements — 1,650+ meals/day)',
          '6. Mohali / SAS Nagar (Construction worker colonies — 1,500+ meals/day)',
          '7. Gurdaspur (Indo-Pak border farming outposts — 1,400+ meals/day)',
          '8. Hoshiarpur (Kandi foot-hill rural hamlets — 1,250+ meals/day)',
        ],
        capacity: '8 City Langar Kitchens · 12 Mobile Food Trucks · 24/7 Hot Meals',
      },
      {
        name: 'Odisha: Cuttack & 8 Villages',
        shortName: 'Cuttack & 8 Vil.',
        value: 280000,
        displayVal: '280,000+ Meals',
        unitBadge: 'Central Kitchen + 8 Villages',
        summary: 'Mechanized central community kitchen in Cuttack preparing fresh, hot meals daily. Mobile food vans depart twice daily to feed 8 surrounding rural village hamlets.',
        locations: [
          'Cuttack City Central Hub (SCB Medical College & Railway Colony)',
          '1. Choudwar (Industrial slum langar point — 1,400+ meals/day)',
          '2. Jagatpur (Mahanadi riverside settlement — 950+ meals/day)',
          '3. Tangi (Highway intersection labor camp — 850+ meals/day)',
          '4. Salepur (Agrarian rural belt — 1,100+ meals/day)',
          '5. Nischintakoili (Flood-prone rural pocket — 900+ meals/day)',
          '6. Athagarh (Forest edge tribal settlements — 750+ meals/day)',
          '7. Baranga (Suburban cluster — 800+ meals/day)',
          '8. Banki (Remote riverbank hamlets — 1,050+ meals/day)',
        ],
        capacity: '1 Mechanized Roti & Dal Plant · 4 Delivery Vans · 8 Village Distribution Points',
      },
      {
        name: 'Bihar: 6 Outskirts Villages & Cities',
        shortName: 'Bihar (6 Areas)',
        value: 230000,
        displayVal: '230,000+ Meals',
        unitBadge: 'Kosi Basin & Gangetic Belts',
        summary: 'Providing daily nourishment to flood-displaced families, train station porters, and agrarian laborers across 6 key outskirt hubs in Bihar.',
        locations: [
          '1. Patna Outskirts (Danapur riverbed slum settlements)',
          '2. Supaul (Kosi flood embankment camps)',
          '3. Saharsa (Displacement relief centers)',
          '4. Darbhanga (Rural craft & weaving hamlets)',
          '5. Katihar (Interstate railway migrant transit corridor)',
          '6. Bhagalpur (Gangetic Diyara island farming hamlets)',
        ],
        capacity: '6 Distribution Hubs · 230,000+ Hot Meals & Emergency Ration Packs',
      },
      {
        name: 'Delhi: Outskirts Villages',
        shortName: 'Delhi Outskirts',
        value: 190000,
        displayVal: '190,000+ Meals',
        unitBadge: 'Migrant & Resettlement Seva',
        summary: 'Serving hot nutrition to informal settlements, daily-wage brick-kiln laborers, and riverbed farmers on the outer fringes of Delhi NCR.',
        locations: [
          '1. Narela (Industrial migrant worker colonies & night shelters)',
          '2. Bawana (JJ resettlement clusters & factory labor camps)',
          '3. Najafgarh (Outer rural border & brick kiln workers)',
          '4. Burari (Yamuna floodplain riverbed settlements)',
        ],
        capacity: '4 Outskirt Langar Vans · 190,000+ Nutritious Meals Delivered',
      },
      {
        name: 'Nepal: Relief Langar Kitchens',
        shortName: 'Nepal Relief',
        value: 170000,
        displayVal: '170,000+ Meals',
        unitBadge: 'Crisis & Destitute Feeding',
        summary: 'Permanent and crisis relief langar kitchens in Kathmandu Valley and landslide mountain areas serving elderly, sadhus, and displaced villagers.',
        locations: [
          'Kathmandu Valley (Pashupati ghats & destitute feeding points)',
          'Lalitpur Artisans & Migrant Labor Quarters',
          'Bhaktapur Brick Kiln Communities',
          'Kavre Landslide Relief Camp Kitchen',
        ],
        capacity: '2 Dedicated Kitchens · 170,000+ Warm Mountain Meals',
      },
    ],
    quickStats: [
      { val: '1,250,000+', label: 'Hot Meals Served' },
      { val: '32+ Hubs', label: 'City & Village Corridors' },
    ],
  },

  covid: {
    id: 'covid',
    name: 'COVID Relief',
    metricTitle: 'CRISIS SUPPLIES & OXYGEN UNITS DEPLOYED',
    totalHighlight: '150,000+',
    growthBadge: '↗ 2020 → 2024 Lives Impacted',
    timelineMilestones: [
      { year: '2020', count: '25k Families', note: 'Lockdown dry ration kits' },
      { year: '2021', count: '75k Families', note: 'Oxygen langar & cylinders' },
      { year: '2022', count: '110k Families', note: 'Livelihood recovery support' },
      { year: '2023', count: '135k Families', note: 'Healthcare reserve buffer' },
      { year: '2024', count: '150k+ Families', note: '150k+ total families protected' },
    ],
    yAxisLabels: ['50k', '38k', '25k', '13k', '0'],
    locationItems: [
      {
        name: 'Delhi NCR Emergency Hub',
        shortName: 'Delhi Hub',
        value: 48000,
        displayVal: '48,000+ Families',
        unitBadge: 'Oxygen Langar & Rations',
        summary: 'Round-the-clock oxygen refill langar, ICU home-delivered concentrators, and 18,000 dry ration kits to locked-down migrant families.',
        locations: [
          'Gurdwara Rakab Ganj 24/7 Oxygen Refill Station (2,400 Cylinders)',
          'Delhi NCR Home Isolation Delivery (850 Concentrators)',
          'Narela & Bawana Migrant Colonies (18,000 Food Packs)',
          '45-Min Critical Emergency SOS Triage Helpline',
        ],
        capacity: '2,400 Cylinders Refilled · 850 Concentrators · 18,000 Food Packs',
      },
      {
        name: 'Punjab Border & District Belts',
        shortName: 'Punjab SOS',
        value: 36000,
        displayVal: '36,000+ Families',
        unitBadge: 'Civil Hospital Peripheries',
        summary: 'Free doorstep oxygen concentrator loan bank and crisis food kits for daily-wage farming and factory households across Punjab.',
        locations: [
          'Amritsar Civil Hospital Drive-Through Refill Hub (1,800 Cylinders)',
          'Ludhiana Industrial Labor Settlements (950 Concentrators)',
          'Bathinda & Mansa Rural Health Centers',
          'Attari Border Agricultural Hamlets',
        ],
        capacity: '1,800 Oxygen Cylinders · 950 Concentrators · 15,000 Food Packs',
      },
      {
        name: 'Odisha Coastal Slums & Hamlets',
        shortName: 'Odisha Relief',
        value: 28000,
        displayVal: '28,000+ Families',
        unitBadge: 'Coastal Community Protection',
        summary: 'Emergency dry rations, medical kits, and hospital attendant food kitchens across cyclone and pandemic dual-crisis zones.',
        locations: [
          'Cuttack SCB Medical Attendant Meals',
          'Bhubaneswar Urban Slum Clusters',
          'Kendrapara Seaside Cyclone Shelters',
          'Puri Coastal Fishing Hamlets',
        ],
        capacity: '800 Oxygen Units · 12,000 Comprehensive Monthly Ration Packs',
      },
      {
        name: 'Bihar Kosi & Gangetic Belt',
        shortName: 'Bihar Relief',
        value: 22000,
        displayVal: '22,000+ Families',
        unitBadge: 'Remote Rural Health Reserve',
        summary: 'Reaching isolated river island and embankment communities cut off from district hospitals with fever clinics and oximeters.',
        locations: [
          'Supaul & Saharsa Flood Camps',
          'Patna Danapur Riverbank Settlements',
          'Katihar Railway Transit Migrant Labor',
          'Bhagalpur Diyara Island Hamlets',
        ],
        capacity: '6 Mobile Health Boats · 22,000+ Emergency Ration & Medicine Kits',
      },
      {
        name: 'Himalayan Mountain Outposts',
        shortName: 'Himalayan Outposts',
        value: 16000,
        displayVal: '16,000+ Families',
        unitBadge: 'High-Altitude Dispensaries',
        summary: 'Emergency delivery of oxygen concentrators, pulse oximeters, and high-protein food supplies to mountain villages in Nepal and Uttarakhand.',
        locations: [
          'Kavre Mountain District Hamlets (Nepal)',
          'Melamchi Valley Outposts',
          'Uttarakhand Remote Hill Dispensaries',
          'Helambu Alpine Relief Hubs',
        ],
        capacity: '200 High-Flow Concentrators · 16,000 Thermal Food Packs',
      },
    ],
    quickStats: [
      { val: '50,000+', label: 'Ration Kits Delivered' },
      { val: '7,000+', label: 'Oxygen Units Deployed' },
    ],
  },
};

export default function ImpactDashboard() {
  const [activeTab, setActiveTab] = useState('relief');
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [animKey, setAnimKey] = useState(0);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeCategory = IMPACT_DATA[activeTab] || IMPACT_DATA.relief;
  const selectedLocation = activeCategory.locationItems[activeLocationIndex] || activeCategory.locationItems[0];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActiveLocationIndex(0);
    setHoveredNode(null);
    setAnimKey((prev) => prev + 1);
  };

  // SVG Chart Geometry
  // padLeft is widened to 70px to provide a generous, clean margin for Y-axis text
  // Bars are distributed into distinct centered slots so bar 0 NEVER overlaps Y-axis text!
  const svgWidth = 660;
  const svgHeight = 260;
  const padLeft = 70;
  const padRight = 36;
  const padTop = 40;
  const padBottom = 46;
  const plotWidth = svgWidth - padLeft - padRight; // 554px
  const plotHeight = svgHeight - padTop - padBottom; // 174px

  const dataList = activeCategory.locationItems;
  const maxValue = Math.max(...dataList.map((d) => d.value)) * 1.18;

  // Node coordinates with slot-based centering (guarantees zero overlap with Y-axis)
  const slotWidth = plotWidth / dataList.length;
  const nodeCoords = dataList.map((item, idx) => {
    const x = padLeft + (idx + 0.5) * slotWidth;
    const y = padTop + plotHeight - (item.value / maxValue) * plotHeight;
    return {
      x,
      y,
      ...item,
      index: idx,
    };
  });

  // Smooth spline path
  let curvePath = '';
  if (nodeCoords.length > 0) {
    curvePath = `M ${nodeCoords[0].x} ${nodeCoords[0].y}`;
    for (let i = 0; i < nodeCoords.length - 1; i++) {
      const p0 = nodeCoords[i === 0 ? 0 : i - 1];
      const p1 = nodeCoords[i];
      const p2 = nodeCoords[i + 1];
      const p3 = nodeCoords[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      curvePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
  }

  // Area fill below spline
  const areaPath = nodeCoords.length > 0
    ? `${curvePath} L ${nodeCoords[nodeCoords.length - 1].x} ${padTop + plotHeight} L ${nodeCoords[0].x} ${padTop + plotHeight} Z`
    : '';

  return (
    <section className="impact-section-wrap" ref={sectionRef} aria-labelledby="imp-dashboard-h">
      <div className="impact-inner-wrap">
        {/* Section Header - Bold & Center Aligned */}
        <div className="impact-header-block">
          <span className="impact-eyebrow">TOTAL LIVES IMPACTED</span>
          <h2 className="impact-main-heading" id="imp-dashboard-h">
            Over 575,000+ lives impacted since 2020, across every domain we serve
          </h2>
          <div className="impact-big-counter">575,000+</div>
          <p className="impact-sub-lead">
            Transparent, ground-verified humanitarian relief, free healthcare, schools built, and 24/7 langar sewa across India and Nepal.
          </p>
        </div>

        {/* Category Filter Pills (Reference Image 3 / 5) */}
        <div className="impact-pill-bar" role="tablist" aria-label="Impact domain tabs">
          {Object.values(IMPACT_DATA).map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabChange(cat.id)}
                className={`impact-pill-btn ${isActive ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* ONE UNIFIED DETAILED IMPACT CARD (All graphs follow Image 5 reference) */}
        <div className="impact-dashboard-single-card" key={`dash-card-${animKey}`}>
          {/* Top Info Bar: Category Title */}
          <div className="dash-top-bar">
            <div className="dash-metric-title-group">
              <span className="dash-metric-badge">{activeCategory.name} Field Network</span>
              <h3 className="dash-metric-title">{activeCategory.metricTitle}</h3>
            </div>
          </div>

          {/* Main 2-Column Grid: Left Graph with Names, Right Location Inspector */}
          <div className="dash-content-grid">
            {/* LEFT COLUMN: Interactive Graph with Location Names & Smooth Loading Animation */}
            <div className="dash-graph-col">
              <div className="graph-subhead-row">
                <div className="graph-active-label">
                  <span className="graph-counter-num anim-counter-num">{activeCategory.totalHighlight}</span>
                  <span className="graph-counter-sub">
                    Direct ground beneficiaries across active field locations
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    className="graph-replay-btn"
                    onClick={() => setAnimKey((k) => k + 1)}
                    title="Replay graph animation"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19"/>
                    </svg>
                    <span>Replay</span>
                  </button>
                  <div className="graph-growth-pill">
                    <span className="growth-indicator-dot"></span>
                    {activeCategory.growthBadge}
                  </div>
                </div>
              </div>

              {/* Interactive SVG Canvas with Sequenced Rising Bars & Connecting Line */}
              <div className="chart-svg-container" key={`chart-svg-${activeTab}-${animKey}-${hasEnteredView}`}>
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className={`impact-svg-canvas ${hasEnteredView ? 'is-animated' : ''}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id={`chartGrad-${activeTab}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F6A21A" stopOpacity="0.32" />
                      <stop offset="65%" stopColor="#F6A21A" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#F6A21A" stopOpacity="0.0" />
                    </linearGradient>

                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F6A21A" />
                      <stop offset="100%" stopColor="#FDE68A" stopOpacity="0.3" />
                    </linearGradient>

                    <linearGradient id="barGradActive" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="100%" stopColor="#F6A21A" stopOpacity="0.55" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Dashed Guidelines & Clean Non-Overlapping Y-Axis Labels */}
                  {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = padTop + plotHeight * ratio;
                    const label = activeCategory.yAxisLabels[idx] || '';
                    return (
                      <g key={`grid-${idx}`} className="chart-grid-row">
                        <line
                          x1={padLeft - 8}
                          y1={y}
                          x2={svgWidth - padRight}
                          y2={y}
                          stroke="#EAEFF8"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                        <text
                          x={padLeft - 16}
                          y={y + 4}
                          textAnchor="end"
                          className="chart-axis-text"
                        >
                          {label}
                        </text>
                      </g>
                    );
                  })}

                  {/* 1. Vertical Location Column Bars: Rise up first (0.05s to 0.6s) */}
                  {nodeCoords.map((node, i) => {
                    const isSelected = activeLocationIndex === i;
                    const isHovered = hoveredNode && hoveredNode.name === node.name;
                    const barWidth = 38;
                    const barHeight = Math.max(30, (padTop + plotHeight) - node.y);
                    const barX = node.x - barWidth / 2;

                    return (
                      <g
                        key={`bar-${i}`}
                        className="chart-bar-group"
                        onClick={() => {
                          setActiveLocationIndex(i);
                          setHoveredNode(node);
                        }}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Hit area */}
                        <rect
                          x={barX - 10}
                          y={padTop}
                          width={barWidth + 20}
                          height={plotHeight}
                          fill="transparent"
                        />

                        {/* Animated Gradient Vertical Bar */}
                        <rect
                          x={barX}
                          y={node.y}
                          width={barWidth}
                          height={barHeight}
                          rx={barWidth / 2}
                          fill={isSelected || isHovered ? 'url(#barGradActive)' : 'url(#barGrad)'}
                          opacity={isSelected || isHovered ? 1 : 0.82}
                          stroke={isSelected ? '#EA580C' : 'transparent'}
                          strokeWidth="2.5"
                          className="chart-pill-bar anim-chart-bar"
                          style={{
                            animationDelay: `${0.05 + i * 0.1}s`,
                          }}
                        />

                        {/* Value above bar floats up as the connecting line reaches it */}
                        <text
                          x={node.x}
                          y={node.y - 12}
                          textAnchor="middle"
                          className={`bar-val-text anim-bar-val ${isSelected || isHovered ? 'active' : ''}`}
                          style={{ animationDelay: `${0.7 + i * 0.18}s` }}
                        >
                          {node.displayVal}
                        </text>

                        {/* Location Name Label under bar */}
                        <text
                          x={node.x}
                          y={padTop + plotHeight + 24}
                          textAnchor="middle"
                          className={`chart-name-label anim-name-label ${isSelected || isHovered ? 'active' : ''}`}
                          style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                        >
                          {node.shortName || node.name}
                        </text>
                      </g>
                    );
                  })}

                  {/* 2. Gradient Area Fill: Fades in underneath connecting line */}
                  {areaPath && (
                    <path
                      d={areaPath}
                      fill={`url(#chartGrad-${activeTab})`}
                      className="chart-area-path anim-area-path"
                    />
                  )}

                  {/* 3. Spline Connecting Curve: Draws across connecting all bars AFTER they rise */}
                  {curvePath && (
                    <path
                      d={curvePath}
                      pathLength="1000"
                      fill="none"
                      stroke="#F6A21A"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="chart-line-path anim-line-path"
                    />
                  )}

                  {/* 4. Steady Nodes: Pop on apex of each bar as the connecting line reaches it */}
                  {nodeCoords.map((node, i) => {
                    const isSelected = activeLocationIndex === i;
                    const isHovered = hoveredNode && hoveredNode.name === node.name;

                    return (
                      <g
                        key={`node-${i}`}
                        className="chart-node-group"
                        onClick={() => {
                          setActiveLocationIndex(i);
                          setHoveredNode(node);
                        }}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle cx={node.x} cy={node.y} r="20" fill="transparent" />

                        {/* Pop-in Node circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected || isHovered ? 6.5 : 5}
                          fill="#FFFFFF"
                          stroke={isSelected ? '#EA580C' : '#F6A21A'}
                          strokeWidth={isSelected ? '3.5' : '2.8'}
                          className="chart-node-circle anim-node-circle"
                          style={{
                            animationDelay: `${0.65 + i * 0.18}s`,
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Tooltip on bar hover */}
                {hoveredNode && (
                  <div
                    className="chart-floating-tooltip"
                    style={{
                      left: `${(hoveredNode.x / svgWidth) * 100}%`,
                      top: `${(hoveredNode.y / svgHeight) * 100}%`,
                    }}
                  >
                    <div className="tooltip-year-badge">{hoveredNode.unitBadge}</div>
                    <div className="tooltip-main-val">{hoveredNode.displayVal}</div>
                    <div className="tooltip-desc-text">{hoveredNode.summary}</div>
                  </div>
                )}
              </div>

              {/* Location Selector Chips directly under Graph */}
              <div className="dash-location-strip">
                <span className="strip-title">Click location to view details:</span>
                <div className="strip-chips-scroll">
                  {activeCategory.locationItems.map((loc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveLocationIndex(idx);
                        setHoveredNode(nodeCoords[idx]);
                      }}
                      className={`strip-chip-btn ${activeLocationIndex === idx ? 'active' : ''}`}
                    >
                      <span className="chip-dot"></span>
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Active Location & Villages Inspector (Image 5 Reference) */}
            <div className="dash-inspector-col">
              {selectedLocation && (
                <div className="inspector-card">
                  <div className="inspector-card-header">
                    <div className="inspector-top-row">
                      <span className="inspector-badge">{selectedLocation.unitBadge}</span>
                      <span className="inspector-live-count">{selectedLocation.displayVal}</span>
                    </div>
                    <h4 className="inspector-title">{selectedLocation.name}</h4>
                    <p className="inspector-summary">{selectedLocation.summary}</p>
                  </div>

                  {/* Specific Villages & Cities Mentioned by Name */}
                  <div className="inspector-villages-block">
                    <h5 className="villages-title">Key Cities, Villages & Units Served:</h5>
                    <div className="inspector-chips-grid">
                      {selectedLocation.locations.map((locName, lIdx) => (
                        <div key={lIdx} className="village-name-chip">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          <span>{locName}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deployment Capacity */}
                  <div className="inspector-capacity-box">
                    <span className="capacity-label">Deployment Capacity:</span>
                    <span className="capacity-val">{selectedLocation.capacity}</span>
                  </div>
                </div>
              )}

              {/* 2 Quick Summary Stats */}
              <div className="dash-quick-stats-row">
                {activeCategory.quickStats.map((qs, qIdx) => (
                  <div key={qIdx} className="dash-mini-stat-card">
                    <div className="mini-stat-num">{qs.val}</div>
                    <div className="mini-stat-label">{qs.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
