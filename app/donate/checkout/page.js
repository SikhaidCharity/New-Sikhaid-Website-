import DonatePage from '../page';

export const metadata = {
  title: 'Checkout - Donate | SikhAid Charitable Trust',
  description: 'Complete your donation. Instant 80G tax receipt and transparent impact updates.',
};

export default function CheckoutPage() {
  return <DonatePage initialSlug="general" isCheckoutPage={true} />;
}
