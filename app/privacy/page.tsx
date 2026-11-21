import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main id="main-content" className="content-page">
      <article className="simple-card legal-copy">
        <span className="eyebrow">PORTFOLIO DEMO</span>
        <h1>Privacy & demo data</h1>
        <p>
          BookingCW is an illustrative frontend website, not a real booking
          service. Do not enter real personal information into demonstration
          fields.
        </p>
        <h2>What the interface does</h2>
        <p>
          The current booking search is a preview. It may place fictional dates
          and guest counts into the page URL; it does not check availability or
          create a reservation.
        </p>
        <h2>Accounts and payments</h2>
        <p>
          No accounts, payments, or password-reset emails are created or
          processed by this demo.
        </p>
        <h2>Site hosting</h2>
        <p>
          Like other hosted websites, the hosting provider may process standard
          technical request data. This page does not make claims about the
          provider’s independent practices.
        </p>
        <h2>Real information</h2>
        <p>
          Please use fictional values only. There is no guest-data storage
          service connected to the current booking interface.
        </p>
        <Link href="/terms" className="text-link">
          View demo terms <span aria-hidden="true">→</span>
        </Link>
        <Link href="/" className="back-link">
          ← Return to homepage
        </Link>
      </article>
    </main>
  );
}
