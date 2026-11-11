// A campaign's own Donate colour and style (Admin → Campaigns → Donate Button & Card Colour).
// Colour: empty means the standard blue. Style: 'solid' (default) or 'gradient'.

const HEX = /^#[0-9a-f]{6}$/i;
export const STANDARD_COLOR = '#1650A8';
const STANDARD_GRADIENT = 'linear-gradient(120deg, #0a1f5c 0%, #1650a8 60%, #3f8fdd 100%)';

const channels = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Dark text on light colours, white text on dark ones.
export const textOn = (hex) => {
  const [r, g, b] = channels(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62 ? '#121A4A' : '#fff';
};

// The colour mixed towards black by `amount` (0 to 1), for the dark end of a gradient.
const darker = (hex, amount) =>
  `#${channels(hex).map((c) => Math.round(c * (1 - amount)).toString(16).padStart(2, '0')).join('')}`;

// What fills a Donate button: one solid colour, or a gradient when the campaign chose it.
export function donateFill(color, style) {
  const own = HEX.test(color || '');
  if (style === 'gradient') {
    return own ? `linear-gradient(120deg, ${darker(color, 0.35)} 0%, ${color} 100%)` : STANDARD_GRADIENT;
  }
  return own ? color : STANDARD_COLOR;
}

// Donate buttons on campaign cards and pages. With no colour and solid style, the site's own button look stays.
export function donateButtonStyle(color, extra, style) {
  const own = HEX.test(color || '');
  if (!own && style !== 'gradient') return extra;
  const base = own ? color : STANDARD_COLOR;
  return { ...extra, background: donateFill(color, style), borderColor: style === 'gradient' ? 'transparent' : base, color: textOn(base) };
}

// CSS variables read by the donation card (components/DonationCard.css).
export function donateCardStyle(color, style) {
  const base = HEX.test(color || '') ? color : STANDARD_COLOR;
  return {
    '--dc-accent': base,
    '--dc-fill': donateFill(color, style),
    '--dc-on-accent': textOn(base),
  };
}
