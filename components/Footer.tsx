import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <div className="footer-wordmark">
            Booking<span>CW</span>
          </div>
          <p>
            A thoughtfully designed hotel booking concept. Created to explore a
            better digital guest experience.
          </p>
          <p className="footer-demo-note">
            Independent portfolio demo. Not a real hotel or booking service.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            <li>
              <Link href="/#about">Our concept</Link>
            </li>
            <li>
              <Link href="/#rooms">Sample rooms</Link>
            </li>
            <li>
              <Link href="/#gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/#book">Booking interface</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <Link href="/#demo">About this demo</Link>
            </li>
            <li>
              <Link href="/terms">Demo terms</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy & demo data</Link>
            </li>
            <li>
              <Link href="/login">Sign-in UI preview</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {new Date().getFullYear()} BookingCW · Portfolio concept</span>
        <span>Design exploration · No real reservations</span>
      </div>
    </footer>
  );
}
