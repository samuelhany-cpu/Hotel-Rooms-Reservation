import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  hasValidationErrors,
  validateSignupDemo,
} from '../lib/auth-demo-validation';

const read = (path: string) => readFileSync(path, 'utf8');

describe('Milestone 1 route safety', () => {
  const routes = [
    'app/page.tsx',
    'app/login/page.tsx',
    'app/signup/page.tsx',
    'app/forgot-password/page.tsx',
    'app/terms/page.tsx',
    'app/rooms/[slug]/page.tsx',
    'app/not-found.tsx',
  ];

  it.each(routes)('preserves %s', (route) => {
    expect(existsSync(route)).toBe(true);
  });

  it('does not log or alert with authentication form values', () => {
    const source = [read('app/login/page.tsx'), read('app/signup/page.tsx')].join(
      '\n',
    );

    expect(source).not.toMatch(/console\.log\s*\(/);
    expect(source).not.toMatch(/alert\s*\(/);
  });

  it('does not claim that a password-reset email was sent', () => {
    const source = read('app/forgot-password/page.tsx');

    expect(source).not.toContain('setSent(true)');
    expect(source).not.toMatch(/email (?:was|has been|will be) sent/i);
    expect(source).toContain('does not provide real accounts');
  });

  it('makes guest booking the primary header action', () => {
    const source = read('components/Header.tsx');

    expect(source).toContain('BOOK DEMO');
    expect(source).toContain('href="/#book"');
    expect(source).not.toContain('href="/login"');
    expect(source).not.toContain('href="/signup"');
  });

  it('removes sign-in as the room booking requirement', () => {
    const source = read('app/rooms/[slug]/page.tsx');

    expect(source).toContain('Start the guest booking demo');
    expect(source).not.toContain('Sign in to book');
  });
});

describe('signup demo validation', () => {
  it('returns accessible validation messages for mismatched passwords and terms', () => {
    const errors = validateSignupDemo({
      password: 'sample-one',
      confirmPassword: 'sample-two',
      agreeTerms: false,
    });

    expect(errors.password).toBe('The sample passwords must match.');
    expect(errors.agreeTerms).toBe(
      'Agree to the terms to test this demonstration form.',
    );
    expect(hasValidationErrors(errors)).toBe(true);
  });

  it('accepts matching sample values with accepted terms', () => {
    const errors = validateSignupDemo({
      password: 'sample-only',
      confirmPassword: 'sample-only',
      agreeTerms: true,
    });

    expect(errors).toEqual({});
    expect(hasValidationErrors(errors)).toBe(false);
  });
});
