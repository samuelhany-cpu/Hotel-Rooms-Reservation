'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="content-page">
      <div className="simple-card">
        <h1>Reset your password</h1>
        {sent ? (
          <div className="status-message" role="status">
            If an account exists for that email, password-reset instructions will be sent.
          </div>
        ) : (
          <>
            <p>Enter the email associated with your account.</p>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="reset-email">Email address</label>
                <input id="reset-email" name="email" type="email" autoComplete="email" required />
              </div>
              <button className="auth-btn" type="submit">Send reset instructions</button>
            </form>
          </>
        )}
        <Link href="/login" className="back-link">← Back to sign in</Link>
      </div>
    </main>
  );
}
