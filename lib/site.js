// Organisation contact details, edited from Admin → Settings → Project Details.
import site from './content/site.json';

export const SITE = site;

export const SITE_LINKS = {
  mail: `mailto:${site.email}`,
  tel: `tel:${String(site.phone || '').replace(/[^\d+]/g, '')}`,
  whatsapp: `https://wa.me/${String(site.whatsapp || '').replace(/\D/g, '')}`,
  map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address || '')}`,
};
