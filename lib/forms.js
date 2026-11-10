// Sends website form entries and donation records to the Sikhaid Admin app.
// It must never get in the way of a visitor, so failures stay silent.
const ADMIN_API = (process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:3003').replace(/\/$/, '');

const record = (collection, body) =>
  fetch(`${ADMIN_API}/api/local/${collection}`, {
    method: 'POST',
    // Plain text keeps this a simple cross-site request (no preflight), which keepalive needs.
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});

export const saveFormSubmission = (type, fields) => record('submissions', { type, fields });
export const saveDonation = (donation) => record('donations', donation);
