'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/#about', label: 'ABOUT' },
  { href: '/#rooms', label: 'ROOMS' },
  { href: '/#gallery', label: 'GALLERY' },
  { href: '/#contact', label: 'CONTACT' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header>
      <div className="container flex">
        <div className="logo">
          <Link href="/" aria-label="BookingCW home">
            <Image
              src="/images/logo.png"
              alt="BookingCW"
              width={250}
              height={90}
              priority
            />
          </Link>
        </div>

        <nav className="navlinks" aria-label="Main navigation">
          <ul className="desktop-nav" id="navbar">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link className="book-button" href="/#book">
                BOOK DEMO
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </div>

      <div
        className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isOpen}
      >
        <nav
          id="mobile-navigation"
          className="mobile-menu-panel"
          aria-label="Mobile navigation"
          onClick={(event) => event.stopPropagation()}
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="book-button" href="/#book" onClick={closeMenu}>
                BOOK DEMO
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
