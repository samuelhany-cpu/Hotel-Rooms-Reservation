// Set NEXT_PUBLIC_SITE_URL when the verified public domain changes.
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hotel-rooms-reservation-five.vercel.app'
).replace(/\/$/, '');

export const SITE_TITLE = 'BookingCW — Fictional Hotel Booking Demo';
export const SITE_DESCRIPTION =
  'Explore a fictional boutique-hotel booking concept with sample rooms, deterministic availability, and no real reservations or payments.';

export function isPreviewDeployment() {
  return process.env.VERCEL_ENV === 'preview';
}
