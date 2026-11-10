// A campaign's own Donate colour (Admin → Campaigns → Donate Button & Card Colour).
// Empty means the site's standard look.

const HEX = /^#[0-9a-f]{6}$/i;

const channels = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Dark text on light colours, white text on dark ones.
export const textOn = (hex) => {
  const [r, g, b] = channels(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#121A4A' : '#fff';
};

// The colour mixed towards black by `amount` (0 to 1).
const darker = (hex, amount) =>
  `#${channels(hex).map((c) => Math.round(c * (1 - amount)).toString(16).padStart(2, '0')).join('')}`;

export function donateButtonStyle(color, extra) {
  if (!HEX.test(color || '')) return extra;
  return { ...extra, background: color, borderColor: color, color: textOn(color) };
}

// CSS variables read by the donation card (components/DonationCard.css).
export function donateCardStyle(color) {
  if (!HEX.test(color || '')) return undefined;
  return {
    '--dc-accent': color,
    '--dc-gradient': `linear-gradient(120deg, ${darker(color, 0.35)} 0%, ${color} 100%)`,
    '--dc-on-accent': textOn(color),
  };
}
