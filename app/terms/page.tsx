import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="content-page">
      <article className="simple-card legal-copy">
        <h1>Terms and Conditions</h1>
        <p>
          These terms explain the basic conditions for using BookingCW and
          requesting a reservation.
        </p>
        <h2>Reservations</h2>
        <p>
          A reservation is confirmed only after availability, pricing, guest
          details, and payment requirements have been verified.
        </p>
        <h2>Changes and cancellations</h2>
        <p>
          Change and cancellation conditions may vary by room and rate. The
          applicable conditions will be shown before a reservation is finalized.
        </p>
        <h2>Guest responsibilities</h2>
        <p>
          Guests must provide accurate information and follow hotel safety,
          occupancy, and property policies.
        </p>
        <h2>Privacy</h2>
        <p>
          Personal information is used only to manage accounts, reservation
          requests, and service communications.
        </p>
        <p className="terms-note">Last updated: November 21, 2026</p>
        <Link href="/signup" className="back-link">
          ← Return to sign up
        </Link>
      </article>
    </main>
  );
}
