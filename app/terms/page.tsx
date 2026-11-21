import Link from 'next/link';

export default function TermsPage() {
  return (
    <main id="main-content" className="content-page">
      <article className="simple-card legal-copy">
        <span className="eyebrow">PORTFOLIO DEMO</span>
        <h1>Demo terms & conditions</h1>
        <p>
          BookingCW is a fictional hotel-booking design concept. It does not
          represent a real accommodation provider.
        </p>
        <h2>Room data and pricing</h2>
        <p>
          All room names, features, nightly prices and images are illustrative.
          They do not constitute an offer or guarantee of availability.
        </p>
        <h2>Search and reservations</h2>
        <p>
          Search fields currently demonstrate an interface only. No availability
          is checked, booking is created, or payment is accepted.
        </p>
        <h2>Accounts and contact</h2>
        <p>
          Login and signup screens are nonfunctional previews. Please do not
          enter real credentials or personal information.
        </p>
        <h2>Changes</h2>
        <p>Demo content can be updated as the portfolio project evolves.</p>
        <Link href="/privacy" className="text-link">
          Privacy and demo data <span aria-hidden="true">→</span>
        </Link>
        <Link href="/" className="back-link">
          ← Return to homepage
        </Link>
      </article>
    </main>
  );
}
