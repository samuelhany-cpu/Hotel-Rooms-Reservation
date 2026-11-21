import Link from 'next/link';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#282834] text-[#b6b7b9] mt-12">
      <div className="container mx-auto px-5 py-12 grid grid-cols-3 gap-8">
        <div>
          <h2 className="text-white text-xl mb-4">BookingCW</h2>
          <p className="text-sm">
            A warm welcome awaits you. Enjoy a comfortable stay, thoughtful
            amenities, and responsive service.
          </p>
        </div>
        <div>
          <h2 className="text-white text-xl mb-4">Quick Links</h2>
          <ul>
            <li className="mb-2">
              <Link href="/">Home</Link>
            </li>
            <li className="mb-2">
              <Link href="/#about">About</Link>
            </li>
            <li className="mb-2">
              <Link href="/#rooms">Rooms</Link>
            </li>
            <li className="mb-2">
              <Link href="/terms">Terms</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-xl mb-4">Contact</h2>
          <p className="text-sm">
            <a href="mailto:reservations@bookingcw.com">
              reservations@bookingcw.com
            </a>
            <br />
            <a href="tel:+201000000000">+20 100 000 0000</a>
          </p>
        </div>
      </div>
      <div className="legal bg-[#1a1a24] py-4 text-center text-sm">
        © {new Date().getFullYear()} BookingCW. All rights reserved.
      </div>
    </footer>
  );
}
