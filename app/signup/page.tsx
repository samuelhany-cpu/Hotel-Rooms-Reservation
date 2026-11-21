'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import {
  hasValidationErrors,
  SignupValidationErrors,
  validateSignupDemo,
} from '@/lib/auth-demo-validation';

export default function SignupPage() {
  const [errors, setErrors] = useState<SignupValidationErrors>({});
  const [notice, setNotice] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('');

    const form = new FormData(event.currentTarget);
    const nextErrors = validateSignupDemo({
      password: String(form.get('password') ?? ''),
      confirmPassword: String(form.get('confirmPassword') ?? ''),
      agreeTerms: form.get('agreeTerms') === 'on',
    });

    setErrors(nextErrors);

    if (!hasValidationErrors(nextErrors)) {
      setNotice(
        'Account creation is not enabled in this frontend portfolio demo. No form values were transmitted or stored. Continue as a guest instead.'
      );
    }
  }

  return (
    <main id="main-content" className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Account form preview</h1>
            <p>This screen demonstrates accessible form validation only.</p>
          </div>

          <div className="demo-notice" role="note">
            <strong>Use fictional sample values only</strong>
            This form does not create an account, transmit data, or persist its
            values.
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Sample first name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Sample"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Sample last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Guest"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

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

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Sample password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Fictional value only"
                  autoComplete="off"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm sample password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Repeat the sample value"
                  autoComplete="off"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : undefined
                  }
                  required
                />
              </div>
            </div>

            {errors.password && (
              <p id="password-error" className="field-error" role="alert">
                {errors.password}
              </p>
            )}

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  aria-invalid={Boolean(errors.agreeTerms)}
                  aria-describedby={
                    errors.agreeTerms ? 'terms-error' : undefined
                  }
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="terms-link">
                    demo terms
                  </Link>
                </span>
              </label>
            </div>

            {errors.agreeTerms && (
              <p id="terms-error" className="field-error" role="alert">
                {errors.agreeTerms}
              </p>
            )}

            {notice && (
              <div className="status-message" role="status">
                {notice}
              </div>
            )}

            <div className="auth-actions">
              <button type="submit" className="auth-btn">
                Preview account response
              </button>
              <Link href="/#book" className="auth-secondary-btn">
                Continue as a guest
              </Link>
            </div>
          </form>

          <div className="auth-footer">
            <p>
              <Link href="/login" className="auth-switch-link">
                Preview the sign-in form
              </Link>
            </p>
          </div>
        </div>

        <div className="auth-image">
          <Image
            src="/images/room-2.png"
            alt="Sample BookingCW suite"
            width={600}
            height={800}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <div className="auth-image-overlay">
            <h2>Explore without an account</h2>
            <p>The reservation journey is designed for demo guest checkout.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
