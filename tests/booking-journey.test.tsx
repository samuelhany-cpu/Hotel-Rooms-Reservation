import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { createElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BookingJourney from '../components/BookingJourney';
import type { DemoSearch } from '../lib/booking-demo';

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
  vi.unstubAllGlobals();
});

const futureSearch: DemoSearch = {
  arrival: '2030-01-01', departure: '2030-01-03', adults: 2, children: 0,
};

describe('frontend-only booking guest journey', () => {
  it('shows validation errors for invalid search dates', () => {
    render(createElement(BookingJourney, { initialSearch: { arrival: '', departure: '', adults: 2, children: 0 } }));
    fireEvent.click(screen.getByRole('button', { name: 'Find sample rooms' }));
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(2);
    expect(screen.queryByText(/illustrative room.*match/)).not.toBeInTheDocument();
  });

  it('supports results, fictional guest review and a no-booking confirmation', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    const { container } = render(createElement(BookingJourney, { initialSearch: futureSearch }));
    // Choose an available demo room deterministically for these dates.
    const choices = screen.queryAllByRole('button', { name: 'Select room' });
    expect(choices.length).toBeGreaterThan(0);
    fireEvent.click(choices[0]);
    expect(screen.getByLabelText('Fictional guest alias')).toHaveValue('Demo Guest');
    expect(window.location.search).not.toContain('Guest');
    fireEvent.click(screen.getByRole('button', { name: 'Review demo details' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Confirm that you understand');
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Review demo details' }));
    expect(screen.getByRole('heading', { name: 'Review your demo stay.' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Confirm demo only' }));
    expect(screen.getByRole('heading', { name: 'Your demo is complete.' })).toBeVisible();
    expect(screen.getByText(/No actual reservation was made/)).toBeVisible();
    expect(container.textContent).toContain('DEMO-');
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: 'Confirm demo only' })).not.toBeInTheDocument();
  });
});
