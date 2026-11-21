import Image from 'next/image';
import Link from 'next/link';
import RoomCard from '@/components/RoomCard';
import GalleryCard from '@/components/GalleryCard';
import { ROOMS } from '@/lib/booking-demo';

const gallery = [
  { image: '/images/gallery-1.png', title: 'Room details' },
  { image: '/images/gallery-2.png', title: 'Comfortable corners' },
  { image: '/images/gallery-3.png', title: 'Warm interiors' },
  { image: '/images/gallery-4.png', title: 'Considered spaces' },
  { image: '/images/gallery-5.png', title: 'A place to unwind' },
  { image: '/images/gallery-6.png', title: 'Inspired surroundings' },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/banner-1.png"
          alt="Warmly lit hotel-inspired interior, used as sample imagery"
          fill
          className="hero-image"
          priority
          sizes="100vw"
        />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <span className="eyebrow hero-eyebrow">
            BOOKINGCW · A HOTEL BOOKING CONCEPT
          </span>
          <h1 id="hero-title">
            A quieter way to <em>plan your stay.</em>
          </h1>
          <p>
            Explore thoughtful rooms and a more welcoming booking experience.
            Built as a front-end portfolio demonstration.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/#book">
              Explore the booking demo
            </Link>
            <Link className="button button-ghost" href="/#rooms">
              Discover sample rooms
            </Link>
          </div>
        </div>
        <p className="hero-photo-note">
          Illustrative room imagery · Demo property, not a real hotel
        </p>
      </section>
      <section
        id="book"
        className="booking-section"
        aria-labelledby="booking-heading"
      >
        <div className="container">
          <div className="booking-panel">
            <div className="booking-heading">
              <span className="eyebrow">PLAN YOUR VISIT</span>
              <h2 id="booking-heading">Find your kind of stay.</h2>
              <p>
                Try the search interface with fictional dates and guest counts.
              </p>
            </div>
            <form className="booking-fields" action="/book" method="get">
              <div className="booking-field">
                <label htmlFor="arrival">Check-in</label>
                <input id="arrival" name="arrival" type="date" required />
              </div>
              <div className="booking-field">
                <label htmlFor="departure">Check-out</label>
                <input id="departure" name="departure" type="date" required />
              </div>
              <div className="booking-field">
                <label htmlFor="adults">Adults</label>
                <input
                  id="adults"
                  name="adults"
                  type="number"
                  min="1"
                  max="8"
                  defaultValue="2"
                  required
                />
              </div>
              <div className="booking-field">
                <label htmlFor="children">Children</label>
                <input
                  id="children"
                  name="children"
                  type="number"
                  min="0"
                  max="8"
                  defaultValue="0"
                />
              </div>
              <button
                className="button button-primary booking-submit"
                type="submit"
              >
                Preview search
              </button>
            </form>
            <div className="booking-disclosure" role="note">
              <strong>Demo only.</strong> Enter fictional dates and guest counts to explore sample availability and pricing. No real reservation or payment is processed.
              <Link href="/book"> Start the booking demo.</Link>
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        className="story-section section-pad"
        aria-labelledby="about-heading"
      >
        <div className="container story-layout">
          <div className="story-visual">
            <Image
              src="/images/booking-section.jpg"
              alt="Inviting interior with warm natural light"
              width={720}
              height={560}
              sizes="(max-width: 850px) 100vw, 45vw"
            />
            <span className="story-photo-label">THE BOOKINGCW CONCEPT</span>
          </div>
          <div className="story-copy">
            <span className="eyebrow">A STAY WORTH IMAGINING</span>
            <h2 id="about-heading">
              Good design makes room for everything else.
            </h2>
            <p>
              BookingCW is a fictional boutique-hotel concept created to
              demonstrate clear navigation, considered room presentation and an
              approachable guest journey.
            </p>
            <p>
              Every room, price and photograph here illustrates the experience;
              this site is not operated by a hotel and cannot accept real
              bookings.
            </p>
            <Link className="text-link" href="/#rooms">
              Explore room concepts <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <section
        id="rooms"
        className="rooms-section section-pad"
        aria-labelledby="rooms-heading"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CURATED CONCEPTS</span>
              <h2 id="rooms-heading">Choose your space.</h2>
            </div>
            <p>
              Four sample room types, each designed to make browsing simple.
              Prices are fictional nightly estimates.
            </p>
          </div>
          <div className="rooms-grid">
            {ROOMS.map((room) => (
              <RoomCard key={room.slug} image={room.image} title={room.title} description={room.description} price={room.price} bookingLink={'/rooms/' + room.slug} />
            ))}
          </div>
        </div>
      </section>
      <section
        id="gallery"
        className="gallery-section section-pad"
        aria-labelledby="gallery-heading"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A CLOSER LOOK</span>
              <h2 id="gallery-heading">Spaces to inspire.</h2>
            </div>
            <p>Imagery used to illustrate this fictional booking experience.</p>
          </div>
          <div className="gallery-grid">
            {gallery.map((item) => (
              <GalleryCard
                key={item.image}
                image={item.image}
                title={item.title}
                alt={item.title + ' — illustrative hotel-style imagery'}
              />
            ))}
          </div>
        </div>
      </section>
      <section
        id="demo"
        className="demo-section section-pad"
        aria-labelledby="demo-heading"
      >
        <div className="container demo-layout">
          <div>
            <span className="eyebrow">A PORTFOLIO EXPERIENCE</span>
            <h2 id="demo-heading">Made to demonstrate, not to book.</h2>
          </div>
          <div>
            <p>
              This is a frontend concept. Room descriptions, amenities and
              prices are sample content. Sample availability and confirmation are calculated locally as part of the interactive demo. Accounts, payments and emails are not connected to real services.
            </p>
            <Link className="text-link" href="/privacy">
              How demo data is handled <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
