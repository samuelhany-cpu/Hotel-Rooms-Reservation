import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const rooms = {
  'family-room': {
    title: 'Family Room',
    image: '/images/room-1.png',
    price: 250,
    description:
      'A spacious, comfortable sample room designed for families to relax together.',
    features: [
      'Sample capacity: up to 4 guests',
      'Private bathroom',
      'Complimentary Wi-Fi',
      'Breakfast available',
    ],
  },
  'executive-suite': {
    title: 'Executive Suite',
    image: '/images/room-2.png',
    price: 350,
    description:
      'A sample suite with a separate living area, generous space, and memorable views.',
    features: [
      'King-size bed',
      'Separate living area',
      'Sample premium view',
      'Complimentary Wi-Fi',
    ],
  },
  'deluxe-room': {
    title: 'Deluxe Room',
    image: '/images/room-3.png',
    price: 200,
    description:
      'A sample modern room with a king-size bed and a city-inspired view.',
    features: [
      'King-size bed',
      'Sample city view',
      'Work desk',
      'Complimentary Wi-Fi',
    ],
  },
  'double-room': {
    title: 'Double Room',
    image: '/images/room-4.png',
    price: 300,
    description:
      'A sample room with two comfortable beds and essential amenities.',
    features: [
      'Two beds',
      'Private bathroom',
      'Climate control',
      'Complimentary Wi-Fi',
    ],
  },
} as const;

type RoomSlug = keyof typeof rooms;

export function generateStaticParams() {
  return Object.keys(rooms).map((slug) => ({ slug }));
}

export default async function RoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in rooms)) notFound();

  const room = rooms[slug as RoomSlug];

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
          <Link href="/#rooms" className="back-link">
            ← All sample rooms
          </Link>
          <p className="demo-notice" role="note">
            Sample room concept and fictional nightly price. No real
            availability is checked or reservation created.
          </p>
          <h1>{room.title}</h1>
          <p>{room.description}</p>
          <ul>
            {room.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="room-detail-price">
            <strong>${room.price}</strong> sample price per night
          </div>
          <Link href="/#book" className="primary-btn page-cta">
            Start the guest booking demo
          </Link>
        </div>
      </div>
    </main>
  );
}
