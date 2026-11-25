// "Add one more" offers shown on Continue to Payment, only on the hidden A/B test copies of two campaigns
// (lib/data.js TEST_CAMPAIGNS). Kept in step with the admin's lib/extra-offers.js, which checks and records
// the choice. The Langar Sewa test offers a blanket; the Mission Garmahat test offers langar for 5 people.
export const EXTRA_UNIT_PRICE = 500;
export const EXTRA_MAX_QTY = 20;

export const EXTRA_OFFERS = {
  'langar-sewa-testing-1': {
    offer: 'blanket',
    image: '/assets/offer-blankets.webp',
    imageAlt: 'A SikhAid volunteer covering children sleeping on the street with a blanket',
    title: 'Support Mission Garmahat',
    text: 'Your donation can help an elder stay warm this winter.',
    unit: 'blanket',
    units: 'blankets',
    each: '₹500 per blanket',
    // What the chosen quantity means, in words.
    impact: (qty) => `${qty} ${qty === 1 ? 'blanket' : 'blankets'} for people sleeping in the cold`,
  },
  'mission-garmahat-testing-1': {
    offer: 'langar',
    image: '/assets/offer-langar.webp',
    imageAlt: 'People sitting along a street eating a meal',
    title: 'Support Langar Sewa',
    text: 'Your donation can help a person survive.',
    unit: 'langar',
    units: 'langar',
    each: '₹500 feeds 5 people',
    impact: (qty) => `Langar for ${qty * 5} people`,
  },
};

export const extraOfferFor = (slug) => EXTRA_OFFERS[slug] || null;
