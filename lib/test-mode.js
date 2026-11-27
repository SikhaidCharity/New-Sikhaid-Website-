// Test mode for the team: opening sikhaid.ngo/test (or any page with ?test=1) lets every campaign take
// ₹1 so real payments can be checked cheaply. It stays on only in that browser tab (sessionStorage) and
// marks the donation as a test, which the admin labels and leaves out of the public totals.
const KEY = 'sikhaid_test_mode';

export function startTestMode() {
  try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
}

export function inTestMode() {
  try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
}
