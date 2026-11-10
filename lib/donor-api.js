// The donor's account on the Sikhaid Admin: signing in, their donations, profile and PDFs.
// The sign-in is a token kept in this browser and sent with each request.
import { ADMIN_API } from './forms';

const KEY = 'sa_donor_session';

export const getSession = () => {
  try {
    return localStorage.getItem(KEY) || '';
  } catch {
    return '';
  }
};
const saveSession = (token) => {
  try {
    localStorage.setItem(KEY, token);
  } catch {}
};
export const signOut = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {}
};

export const isSignedIn = () => Boolean(getSession());

async function call(path, { method = 'GET', body, auth = true } = {}) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (auth) headers.Authorization = `Bearer ${getSession()}`;
  const res = await fetch(`${ADMIN_API}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && auth) signOut();
    const error = new Error(data.error || 'Something went wrong. Please try again.');
    error.status = res.status;
    throw error;
  }
  return data;
}

async function startSession(body) {
  const data = await call('/api/donor/session', { method: 'POST', body, auth: false });
  saveSession(data.session);
  return data.donor;
}

// Straight after donating: signs the donor in with that donation's private code.
export const signInAfterDonation = (receiptNo, token) => startSession({ method: 'donation', receiptNo, token });
export const signInWithPassword = (email, password) => startSession({ method: 'password', email, password });
export const signInWithGoogle = (credential) => startSession({ method: 'google', credential });

export const getAccount = () => call('/api/donor/me');
export const saveProfile = (profile) => call('/api/donor/me', { method: 'PUT', body: profile });
export const setPassword = (password) => call('/api/donor/password', { method: 'POST', body: { password } });

// Downloads one donation's PDF (receipt, plus 80G certificate when it qualifies).
export async function downloadDonationPdf(donationId) {
  const res = await fetch(`${ADMIN_API}/api/donor/pdf?donation=${encodeURIComponent(donationId)}`, {
    headers: { Authorization: `Bearer ${getSession()}` },
  });
  if (!res.ok) throw new Error('Could not download this receipt. Please try again.');
  const name = /filename="([^"]+)"/.exec(res.headers.get('content-disposition') || '')?.[1] || 'SikhAid-Receipt.pdf';
  const url = URL.createObjectURL(await res.blob());
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

// "Sign in with Google" button. Shows only when NEXT_PUBLIC_GOOGLE_CLIENT_ID is set.
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export function renderGoogleButton(element, onCredential) {
  if (!GOOGLE_CLIENT_ID || !element) return () => {};
  let cancelled = false;
  const draw = () => {
    if (cancelled || !window.google?.accounts?.id) return;
    window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: (r) => onCredential(r.credential) });
    window.google.accounts.id.renderButton(element, { theme: 'outline', size: 'large', text: 'continue_with', shape: 'pill', width: 320 });
  };
  if (window.google?.accounts?.id) draw();
  else {
    let script = document.getElementById('google-gsi');
    if (!script) {
      script = document.createElement('script');
      script.id = 'google-gsi';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', draw);
  }
  return () => {
    cancelled = true;
  };
}
