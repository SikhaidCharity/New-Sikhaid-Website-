// Paying for a donation with Razorpay. The Sikhaid Admin makes the order and, after payment, checks it
// with Razorpay before recording the donation (admin: lib/donation-payments.js).
import { ADMIN_API } from './forms';

const CHECKOUT_JS = 'https://checkout.razorpay.com/v1/checkout.js';
// Razorpay's method names for the choice made in the donation card.
const METHOD = { upi: 'upi', card: 'card', nb: 'netbanking', wallet: 'wallet' };

let loading = null;
function loadCheckout() {
  if (typeof window !== 'undefined' && window.Razorpay) return Promise.resolve();
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = CHECKOUT_JS;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        loading = null;
        reject(new Error('The payment window could not load. Please check your connection and try again.'));
      };
      document.head.appendChild(script);
    });
  }
  return loading;
}

async function post(path, body) {
  // A dropped connection (offline, or the payment server unreachable) shows a plain message, not "Failed to fetch".
  const res = await fetch(`${ADMIN_API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {
    throw new Error('We could not reach the payment server. Please check your internet connection and try again.');
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
  return data;
}

export class PaymentCancelled extends Error {}

// Opens Razorpay for the donation and resolves with { receiptNo, paymentId } once the payment is
// confirmed and recorded. Rejects with PaymentCancelled if the donor closes the window.
export async function payDonation(donation, { method, color, description } = {}) {
  const [order] = await Promise.all([post('/api/pay/order', donation), loadCheckout()]);
  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: 'SikhAid Charitable Trust',
      description: description || 'Donation',
      image: 'https://www.sikhaid.ngo/sikhaidLogo.webp',
      prefill: {
        name: donation.donor.name,
        email: donation.donor.email,
        contact: donation.donor.phone.replace(/[^\d+]/g, '').replace(/^(\d{10})$/, '+91$1'),
        ...(METHOD[method] && { method: METHOD[method] }),
      },
      notes: { cause: donation.cause },
      theme: { color: color || '#121A4A' },
      modal: {
        confirm_close: true,
        ondismiss: () => reject(new PaymentCancelled('Payment cancelled. Your donation has not been made.')),
      },
      handler: (response) => {
        post('/api/pay/confirm', {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        }).then(resolve, reject);
      },
    });
    checkout.on('payment.failed', (event) => {
      // Razorpay lets the donor try again in the same window; this only reports the failure.
      console.warn('Payment failed:', event?.error?.description);
    });
    checkout.open();
  });
}
