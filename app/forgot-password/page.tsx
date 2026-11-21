import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <main id="main-content" className="content-page">
      <div className="simple-card">
        <h1>Password reset is not available</h1>
        <div className="demo-notice" role="note">
          <strong>Frontend portfolio demo</strong>
          BookingCW does not provide real accounts or send password-reset
          emails. No email address is requested, transmitted, or stored here.
        </div>
        <p>
          You can explore the reservation experience without signing in or
          providing real personal information.
        </p>
        <Link href="/#book" className="primary-btn page-cta">
          Start the guest booking demo
        </Link>
        <br />
        <Link href="/login" className="back-link">
          ← Return to the sign-in preview
        </Link>
      </div>
    </main>
  );
}
