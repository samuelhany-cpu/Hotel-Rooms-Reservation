'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { href: '/#about', label: 'The concept' },
  { href: '/#rooms', label: 'Rooms' },
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#demo', label: 'Demo notes' },
];
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const firstLink = mobileNavigationRef.current?.querySelector('a');
    firstLink?.focus();
    window.addEventListener('keydown', onEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onEscape);
    };
  }, [isOpen]);
  return (
    <header className="site-header">
      <div className="container header-layout">
        <Link
          href="/"
          className="brand"
          aria-label="BookingCW homepage"
          onClick={() => setIsOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            B
          </span>
          <span className="brand-name">
            Booking<span>CW</span>
            <small>THE STAY CONCEPT</small>
          </span>
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button-primary header-cta" href="/#book">
          BOOK DEMO
        </Link>
        <button
          type="button"
          ref={menuButtonRef}
          className="mobile-menu-toggle"
          onClick={() => setIsOpen((current) => !current)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <FaTimes aria-hidden="true" />
          ) : (
            <FaBars aria-hidden="true" />
          )}
        </button>
      </div>
      <nav
        ref={mobileNavigationRef}
        className={['mobile-navigation', isOpen ? 'active' : ''].join(' ')}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="container mobile-menu-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="button button-primary"
            href="/#book"
            onClick={() => setIsOpen(false)}
          >
            BOOK DEMO
          </Link>
        </div>
      </nav>
    </header>
  );
}
