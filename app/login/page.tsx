'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [notice, setNotice] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      'Authentication is not enabled in this frontend portfolio demo. No credentials were submitted. Continue with the guest booking demo instead.'
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Sign-in interface preview</h1>
            <p>This screen demonstrates form design only.</p>
          </div>

          <div className="demo-notice" role="note">
            <strong>Portfolio demo</strong>
            Do not enter real credentials. This form does not authenticate,
            transmit, or store its values.
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Sample email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="guest@example.test"
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Sample password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Use fictional characters only"
                autoComplete="off"
                required
              />
            </div>

            {notice && (
              <div className="status-message" role="status">
                {notice}
              </div>
            )}

            <div className="auth-actions">
              <button type="submit" className="auth-btn">
                Preview sign-in response
              </button>
              <Link href="/#book" className="auth-secondary-btn">
                Continue as a guest
              </Link>
            </div>
          </form>

          <div className="auth-footer">
            <p>
              <Link href="/signup" className="auth-switch-link">
                Preview the account form
              </Link>
              {' · '}
              <Link href="/forgot-password" className="auth-switch-link">
                Password-reset information
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-image">
          <Image
            src="/images/room-1.png"
            alt="Sample BookingCW room"
            width={600}
            height={800}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="auth-image-overlay">
            <h2>Guest booking comes first</h2>
            <p>No account is required for the portfolio reservation demo.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
