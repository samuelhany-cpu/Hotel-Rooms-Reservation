import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="content-page">
      <div className="simple-card not-found-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you requested does not exist or may have moved.</p>
        <Link href="/" className="primary-btn page-cta">
          Return home
        </Link>
      </div>
    </main>
  );
}
