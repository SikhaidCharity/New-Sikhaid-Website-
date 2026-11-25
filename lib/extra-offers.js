// "Add one more" offers shown on Continue to Payment, only on the hidden A/B test copies of two campaigns
// (lib/data.js TEST_CAMPAIGNS). Kept in step with the admin's lib/extra-offers.js, which checks and records
// the choice. The Langar Sewa test offers a blanket; the Mission Garmahat test offers langar for 8 people.
export const EXTRA_UNIT_PRICE = 800;
export const EXTRA_MAX_QTY = 20;

export const EXTRA_OFFERS = {
  'langar-sewa-testing-1': {
    offer: 'blanket',
    emoji: '🧣',
    title: 'Add warmth this winter?',
    text: 'One blanket keeps someone warm through the cold nights.',
    unit: 'blanket',
    units: 'blankets',
    each: '₹800 per blanket',
    // What the chosen quantity means, in words.
    impact: (qty) => `${qty} ${qty === 1 ? 'blanket' : 'blankets'} for people sleeping in the cold`,
  },
  'mission-garmahat-testing-1': {
    offer: 'langar',
    emoji: '🍲',
    title: 'Add a hot meal too?',
    text: 'Langar for 8 people: a warm, fresh meal served with love.',
    unit: 'langar',
    units: 'langar',
    each: '₹800 feeds 8 people',
    impact: (qty) => `Langar for ${qty * 8} people`,
  },
};

export const extraOfferFor = (slug) => EXTRA_OFFERS[slug] || null;
