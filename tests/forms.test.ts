import { fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ForgotPasswordPage from '../app/forgot-password/page';
import LoginPage from '../app/login/page';
import SignupPage from '../app/signup/page';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('nonfunctional authentication previews', () => {
  it('explains that login does not authenticate or transmit credentials', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    render(createElement(LoginPage));

    fireEvent.change(screen.getByLabelText('Sample email'), {
      target: { value: 'guest@example.test' },
    });
    fireEvent.change(screen.getByLabelText('Sample password'), {
      target: { value: 'fictional-only' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Preview sign-in response' })
    );

    expect(screen.getByRole('status')).toHaveTextContent(
      'Authentication is not enabled'
    );
    expect(
      screen.getByRole('link', { name: 'Continue as a guest' })
    ).toHaveAttribute('href', '/#book');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('shows inline signup errors, then an honest non-success notice', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    render(createElement(SignupPage));

    fireEvent.change(screen.getByLabelText('Sample password'), {
      target: { value: 'one-sample' },
    });
    fireEvent.change(screen.getByLabelText('Confirm sample password'), {
      target: { value: 'different-sample' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Preview account response' })
    );

    expect(screen.getAllByRole('alert')).toHaveLength(2);
    expect(screen.getByText('The sample passwords must match.')).toBeVisible();
    expect(
      screen.getByText('Agree to the terms to test this demonstration form.')
    ).toBeVisible();

    fireEvent.change(screen.getByLabelText('Confirm sample password'), {
      target: { value: 'one-sample' },
    });
    fireEvent.click(
      screen.getByRole('checkbox', {
        name: /I agree to the demo terms/i,
      })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Preview account response' })
    );

    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    expect(screen.getByRole('status')).toHaveTextContent(
      'Account creation is not enabled'
    );
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('does not request an email or claim to send a reset message', () => {
    render(createElement(ForgotPasswordPage));

    expect(
      screen.getByRole('heading', {
        name: 'Password reset is not available',
      })
    ).toBeVisible();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /send reset/i })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('note')).toHaveTextContent(
      'does not provide real accounts'
    );
  });
});
