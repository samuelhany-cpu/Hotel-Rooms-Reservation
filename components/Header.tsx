'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <div className="container flex">
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={250}
              height={90}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>
        </div>

        <div className="navlinks">
          {/* desktop fallback - keep markup for SEO */}
          <ul className="desktop-nav" id="navbar">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="#about">ABOUT</Link>
            </li>
             <li>
              <Link href="#services">CONTACT US</Link>
            </li>
            <li>
              <Link href="#services">SERVICES</Link>
            </li>
            <li>
              <Link href="/signup" className="signup-link">
                SIGN UP
              </Link>
            </li>
            <li>
              <button className="book-button">
                <Link href="/login">LOGIN</Link>
              </button>
            </li>
          </ul>

          {/* mobile toggle button */}
          <button
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile overlay panel */}
      <div
        className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeMenu}
      >
        <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li onClick={closeMenu}>
              <Link href="/">HOME</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="#about">ABOUT</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="#rooms">ROOMS</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="#services">SERVICES</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="#news">NEWS</Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/signup">SIGN UP</Link>
            </li>
            <li onClick={closeMenu}>
              <button className="book-button">
                <Link href="/login">LOGIN</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
