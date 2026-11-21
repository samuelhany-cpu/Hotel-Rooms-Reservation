import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  criteriaQuery,
  getRoom,
  isRoomAvailable,
  isValidSearch,
  priceFor,
  readSearch,
  ROOMS,
} from '@/lib/booking-demo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) return { title: 'Unknown Sample Room', robots: { index: false } };
  return {
    title: `${room.title} — Sample Room`,
    description: `${room.description} Fictional room and price; no real reservation is possible.`,
    alternates: { canonical: `/rooms/${room.slug}` },
  };
}

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

type Query = Record<string, string | string[] | undefined>;

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Query>;
}) {
  const { slug } = await params;
  const room = getRoom(slug);
  if (!room) notFound();

  const raw = await searchParams;
  const criteria = new URLSearchParams();
  for (const key of ['arrival', 'departure', 'adults', 'children']) {
    const value = raw[key];
    if (typeof value === 'string') criteria.set(key, value);
  }
  const search = readSearch(criteria);
  const valid = isValidSearch(search);
  const available = valid && isRoomAvailable(room, search);
  const breakdown = available ? priceFor(room, search) : null;
  const bookingQuery = valid ? criteriaQuery(search) : new URLSearchParams();
  bookingQuery.set('room', room.slug);
  const bookingHref = '/book?' + bookingQuery.toString();
  const resultsHref = valid
    ? '/book?' + criteriaQuery(search).toString()
    : '/book';

  return (
    <main id="main-content" className="content-page room-detail-page">
      <div className="content-page-inner room-detail">
        <div className="room-detail-image">
          <Image
            src={room.image}
            alt={room.title + ' — illustrative room image'}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
        <div className="room-detail-copy">
          <Link href={resultsHref} className="back-link">
            ← {valid ? 'Back to sample results' : 'All sample rooms'}
          </Link>
          <p className="demo-notice" role="note">
            Fictional room details and sample nightly rate. No actual hotel
            inventory or payment is involved.
          </p>
          <span className="eyebrow">
            ROOM CONCEPT · UP TO {room.capacity} GUESTS
          </span>
          <h1>{room.title}</h1>
          <p>{room.description}</p>
          <p className="room-detail-beds">
            <strong>Illustrative bed arrangement:</strong> {room.beds}
          </p>
          <ul>
            {room.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="room-detail-price">
            <strong>{'$' + room.price}</strong> fictional price per night
          </div>
          {valid && (
            <div className="room-detail-availability" role="status">
              {available && breakdown ? (
                <p>
                  Sample availability: matches {search.adults + search.children}{' '}
                  guest(s) for {breakdown.nights} night(s). Estimated demo
                  total: {'$' + breakdown.total} USD.
                </p>
              ) : (
                <p>
                  This room does not match your fictional dates or guest count.
                  Try another sample room or new dates.
                </p>
              )}
            </div>
          )}
          <Link href={bookingHref} className="primary-btn page-cta">
            Start the guest booking demo
          </Link>
        </div>
      </div>
    </main>
  );
}
