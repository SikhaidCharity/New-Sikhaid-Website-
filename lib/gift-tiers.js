// Amount buttons that say what each gift does, for one campaign's donation card. Every other campaign
// keeps the plain amount buttons (DonationCard AMOUNTS, or the amounts set in the admin).
// title: under the amount on the button. line: shown in the box below once that amount is chosen.
export const GIFT_TIERS = {
  'mission-garmahat': {
    intro: '₹800 gives one heavy blanket to someone sleeping out in the cold.',
    suggested: 3000,
    tiers: [
      { amount: 800, title: 'Warm 1 elder', line: 'An elder sleeps warm this winter' },
      { amount: 1600, title: 'Warm 2 elders', line: 'Two elders stop shivering at night' },
      { amount: 3000, title: 'Mother and child', line: 'A mother and child stay warm all winter' },
      { amount: 6000, title: 'Warm a family', line: 'A whole family gets through the winter warm' },
    ],
  },
};

// The campaign's own, or the one it is a test / ad copy of.
export const giftTiersFor = (campaign) => GIFT_TIERS[campaign?.slug] || GIFT_TIERS[campaign?.testOf] || null;
