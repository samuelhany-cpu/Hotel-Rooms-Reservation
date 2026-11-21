import { describe, expect, it } from 'vitest';
import {
  criteriaQuery,
  demoReference,
  getRoom,
  isRoomAvailable,
  matchingRooms,
  nightsBetween,
  priceFor,
  readSearch,
  ROOMS,
  toUtcDay,
  validateSearch,
} from '../lib/booking-demo';

const TODAY = '2030-01-01';
const VALID = { arrival: '2030-02-01', departure: '2030-02-04', adults: 2, children: 0 };

describe('booking demo date validation', () => {
  it('rejects invalid calendar dates and keeps leap-year dates', () => {
    expect(toUtcDay('2030-02-29')).toBeNull();
    expect(toUtcDay('2032-02-29')).not.toBeNull();
    expect(nightsBetween('2030-02-01', '2030-02-04')).toBe(3);
    expect(nightsBetween('2030-02-04', '2030-02-01')).toBe(-3);
  });

  it('rejects past arrival, equal/earlier departure, and long stays', () => {
    expect(validateSearch({ ...VALID, arrival: '2029-12-30' }, TODAY).arrival).toMatch(/past/);
    expect(validateSearch({ ...VALID, departure: VALID.arrival }, TODAY).departure).toMatch(/after/);
    expect(validateSearch({ ...VALID, departure: '2030-03-01' }, TODAY).departure).toMatch(/21 nights/);
  });

  it('validates integer adults, children, and combined counts', () => {
    expect(validateSearch({ ...VALID, adults: 0 }, TODAY).adults).toBeDefined();
    expect(validateSearch({ ...VALID, adults: 1.5 }, TODAY).adults).toBeDefined();
    expect(validateSearch({ ...VALID, children: -1 }, TODAY).children).toBeDefined();
    expect(validateSearch({ ...VALID, adults: 6, children: 3 }, TODAY).children).toMatch(/maximum/);
  });
});

describe('deterministic demo availability and pricing', () => {
  it('uses one canonical catalog with unique slugs', () => {
    expect(ROOMS).toHaveLength(4);
    expect(new Set(ROOMS.map((room) => room.slug)).size).toBe(4);
    expect(getRoom('family-room')?.capacity).toBe(4);
    expect(getRoom('missing-room')).toBeUndefined();
  });

  it('filters by capacity and deterministic sample calendar', () => {
    const family = getRoom('family-room')!;
    const suite = getRoom('executive-suite')!;
    const group = { ...VALID, adults: 3, children: 1 };
    expect(isRoomAvailable(suite, group)).toBe(false);
    expect(matchingRooms(group, TODAY).every((room) => room.capacity >= 4)).toBe(true);
    expect(isRoomAvailable(family, VALID)).toBe(isRoomAvailable(family, VALID));
    expect(matchingRooms({ ...VALID, departure: '2030-02-22' }, TODAY)).toHaveLength(0);
  });

  it('multiplies nights by nightly rate with no hidden charges', () => {
    const room = getRoom('deluxe-room')!;
    expect(priceFor(room, VALID)).toEqual({
      nights: 3, nightlyRate: 200, roomSubtotal: 600, total: 600, currency: 'USD',
    });
    expect(priceFor(room, { ...VALID, departure: VALID.arrival })).toBeNull();
  });

  it('keeps URL criteria non-sensitive and parses missing/invalid guest counts', () => {
    const query = criteriaQuery(VALID);
    expect(Object.fromEntries(query.entries())).toEqual({
      arrival: VALID.arrival, departure: VALID.departure, adults: '2', children: '0',
    });
    expect(query.toString()).not.toContain('Demo Guest');
    expect(readSearch(query)).toEqual(VALID);
    expect(Number.isNaN(readSearch(new URLSearchParams('adults=2.5')).adults)).toBe(true);
    expect(readSearch(new URLSearchParams()).adults).toBe(2);
  });

  it('produces repeatable illustrative confirmation references', () => {
    const room = getRoom('family-room')!;
    expect(demoReference(room, VALID)).toBe(demoReference(room, VALID));
    expect(demoReference(room, VALID)).toContain('DEMO-');
  });
});
