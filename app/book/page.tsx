import type { Metadata } from 'next';
import BookingJourney from '@/components/BookingJourney';
import { readSearch } from '@/lib/booking-demo';

export const metadata: Metadata = {
  title: 'Guest Booking Demo',
  description:
    'Explore a fictional hotel reservation flow using sample availability and room pricing. No real booking is created.',
  robots: { index: false, follow: true },
};

type Query = Record<string, string | string[] | undefined>;

export default async function BookingDemoPage({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const raw = await searchParams;
  const parameters = new URLSearchParams();
  for (const key of ['arrival', 'departure', 'adults', 'children', 'room']) {
    const value = raw[key];
    if (typeof value === 'string') parameters.set(key, value);
  }

  return (
    <main id="main-content" className="content-page booking-route">
      <div className="container">
        <div className="booking-page-title">
          <span className="eyebrow">EXPLORE THE EXPERIENCE</span>
          <h1>Build your sample stay.</h1>
          <p>
            From dates to demo confirmation. Your choices stay within this
            frontend experience.
          </p>
        </div>
        <BookingJourney
          initialSearch={readSearch(parameters)}
          initialRoom={parameters.get('room') ?? undefined}
        />
      </div>
    </main>
  );
}
