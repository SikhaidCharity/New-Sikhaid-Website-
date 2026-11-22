// One line under the title on each campaign card: what a gift does. A line set in the admin
// (Campaign → Card line) replaces the standard one.
export const CARD_LINES = {
  'mission-garmahat': 'Your support can give a blanket to the needy.',
  'langar-sewa': 'Your support can help us provide langar every day.',
  'no-spot': 'Your support can help us provide hygiene products to women.',
  'guru-nanak-dev-ji-chardi-kala-sports-academy': 'Your support can give children in Punjab free sports training.',
  'education-aid': 'Your support can help a child keep learning.',
  'nepal-flood-relief-2026': 'Your support can bring food and relief to flood-hit families in Nepal.',
  'bihar-flood-relief-2026': 'Your support can bring food and relief to flood-hit families in Bihar.',
  'assam-flood-relief-2026': 'Your support can bring food and relief to flood-hit families in Assam.',
  'punjab-floods-2025': 'Your support can help flood-hit families in Punjab rebuild.',
  'dreams-on-field': 'Your support can give rural youth the gear and coaching to play.',
  'rural-sanitation-drive': 'Your support can help build safe washrooms in villages.',
  udaan: 'Your support can help women learn skills and stand on their own.',
  'road-safety': 'Your support can help keep people safe on foggy roads.',
  'sikh-aid-health-on-wheels': 'Your support can bring free healthcare to villages.',
  'project-farmer-first': 'Your support can help small farmers through hard seasons.',
  'project-chardikala': 'Your support can help communities in Punjab rise in Chardi Kala.',
  'rath-yatra-seva-2026': 'Your support gave water and meals to pilgrims in Puri.',
  'covid-oxygen-sewa': 'Your support gave oxygen and rations to families during COVID.',
  'other-sewa': 'Your support can help us serve wherever help is needed.',
};

export const cardLine = (campaign) => (campaign?.cardLine || '').trim() || CARD_LINES[campaign?.slug] || '';
