'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import {
  criteriaQuery,
  demoReference,
  getRoom,
  isRoomAvailable,
  matchingRooms,
  priceFor,
  readSearch,
  ROOMS,
  roomDetailsHref,
  todayLocal,
  validateSearch,
  type DemoRoom,
  type DemoSearch,
  type SearchErrors,
} from '@/lib/booking-demo';

type Step = 'search' | 'results' | 'guest' | 'review' | 'confirmed';

interface BookingJourneyProps {
  initialSearch: DemoSearch;
  initialRoom?: string;
}

export default function BookingJourney({ initialSearch, initialRoom }: BookingJourneyProps) {
  const [search, setSearch] = useState<DemoSearch>(initialSearch);
  const [errors, setErrors] = useState<SearchErrors>({});
  const [selectedSlug, setSelectedSlug] = useState(initialRoom ?? '');
  const [alias, setAlias] = useState('Demo Guest');
  const [accepted, setAccepted] = useState(false);
  const [guestError, setGuestError] = useState('');
  const [step, setStep] = useState<Step>(initialSearch.arrival && initialSearch.departure ? 'results' : 'search');
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const restoreFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const restored = readSearch(params);
      const room = getRoom(params.get('room'));
      setSearch(restored);
      setSelectedSlug(room?.slug ?? '');
      setErrors({});
      setGuestError('');
      setAccepted(false);
      setLocked(false);
      setAlias('Demo Guest');
      setStep(restored.arrival && restored.departure ? (room && isRoomAvailable(room, restored) && Object.keys(validateSearch(restored)).length === 0 ? 'guest' : 'results') : 'search');
    };
    window.addEventListener('popstate', restoreFromUrl);
    return () => window.removeEventListener('popstate', restoreFromUrl);
  }, []);

  const selectedRoom = getRoom(selectedSlug);
  const matching = matchingRooms(search);
  const searchIsValid = Object.keys(validateSearch(search)).length === 0;
  const availableSelected = selectedRoom && searchIsValid && isRoomAvailable(selectedRoom, search);
  const breakdown = selectedRoom && availableSelected ? priceFor(selectedRoom, search) : null;

  const field = (name: keyof DemoSearch, value: string) => {
    setSearch((current) => ({ ...current, [name]: name === 'adults' || name === 'children' ? Number(value) : value }));
    setErrors({});
  };

  const selectRoom = (room: DemoRoom) => {
    setSelectedSlug(room.slug);
    setAccepted(false);
    setGuestError('');
    setStep('guest');
    // Keep only non-sensitive search criteria in the address bar.
    const query = criteriaQuery(search);
    query.set('room', room.slug);
    window.history.pushState({}, '', '/book?' + query.toString());
  };

  const searchRooms = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateSearch(search);
    setErrors(next);
    if (Object.keys(next).length) return;
    setGuestError('');
    setAccepted(false);
    setStep('results');
    const query = criteriaQuery(search);
    if (selectedSlug) query.set('room', selectedSlug);
    window.history.pushState({}, '', '/book?' + query.toString());
  };

  const proceedToReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!availableSelected || !breakdown) return;
    if (!/^Demo(?: [A-Za-z-]{2,25})?$/.test(alias.trim())) {
      setGuestError('Use a fictional alias such as Demo Guest. Do not enter a real name.');
      return;
    }
    if (!accepted) {
      setGuestError('Confirm that you understand this is only a demonstration.');
      return;
    }
    setGuestError('');
    setStep('review');
  };

  const reviewBack = () => {
    setLocked(false);
    setStep('guest');
  };

  const confirm = () => {
    if (!availableSelected || !breakdown || locked || !accepted) return;
    setLocked(true);
    setStep('confirmed');
  };

  const restart = () => {
    setAlias('Demo Guest');
    setAccepted(false);
    setGuestError('');
    setSelectedSlug('');
    setLocked(false);
    setStep('search');
    window.history.pushState({}, '', '/book');
  };

  return (
    <div className="booking-journey">
      <div className="journey-topline">
        <span className="eyebrow">BOOKINGCW · INTERACTIVE DEMO</span>
        <span>Sample data · No real reservation</span>
      </div>
      <div className="journey-progress" aria-label="Demo booking progress">
        {['Search', 'Choose room', 'Guest alias', 'Review', 'Demo result'].map((label, index) => {
          const currentIndex = { search: 0, results: 1, guest: 2, review: 3, confirmed: 4 }[step];
          return <span key={label} className={index <= currentIndex ? 'is-active' : ''}>{index + 1}. {label}</span>;
        })}
      </div>

      {(step === 'search' || step === 'results') && (
        <section aria-labelledby="journey-search-heading">
          <h2 id="journey-search-heading">{step === 'search' ? 'When would you like to stay?' : 'Your sample room matches'}</h2>
          <p className="journey-intro">Choose fictional dates and guest counts. This locally calculated demo does not check real hotel inventory.</p>
          <form className="journey-search-form" onSubmit={searchRooms} noValidate>
            <div><label htmlFor="demo-arrival">Check-in</label><input id="demo-arrival" type="date" value={search.arrival} min={todayLocal()} onChange={(e) => field('arrival', e.target.value)} aria-invalid={Boolean(errors.arrival)} aria-describedby={errors.arrival ? 'arrival-error' : undefined} required />{errors.arrival && <p className="field-error" id="arrival-error" role="alert">{errors.arrival}</p>}</div>
            <div><label htmlFor="demo-departure">Check-out</label><input id="demo-departure" type="date" value={search.departure} min={search.arrival || todayLocal()} onChange={(e) => field('departure', e.target.value)} aria-invalid={Boolean(errors.departure)} aria-describedby={errors.departure ? 'departure-error' : undefined} required />{errors.departure && <p className="field-error" id="departure-error" role="alert">{errors.departure}</p>}</div>
            <div><label htmlFor="demo-adults">Adults</label><input id="demo-adults" type="number" min="1" max="8" value={Number.isNaN(search.adults) ? '' : search.adults} onChange={(e) => field('adults', e.target.value)} aria-invalid={Boolean(errors.adults)} required />{errors.adults && <p className="field-error" role="alert">{errors.adults}</p>}</div>
            <div><label htmlFor="demo-children">Children</label><input id="demo-children" type="number" min="0" max="8" value={Number.isNaN(search.children) ? '' : search.children} onChange={(e) => field('children', e.target.value)} aria-invalid={Boolean(errors.children)} required />{errors.children && <p className="field-error" role="alert">{errors.children}</p>}</div>
            <button className="button button-primary" type="submit">{step === 'results' ? 'Update results' : 'Find sample rooms'}</button>
          </form>
          {step === 'results' && (
            <div className="journey-results" aria-live="polite">
              {!searchIsValid ? <p className="demo-notice" role="status">These search details are invalid or out of date. Update them to continue.</p> : (
                <>
                  <div className="journey-results-header"><h3>{matching.length} illustrative room{matching.length === 1 ? '' : 's'} match</h3><span>{search.adults + search.children} sample guests · {search.arrival} to {search.departure}</span></div>
                  {matching.length === 0 && <div className="journey-empty"><h3>No sample rooms match these dates.</h3><p>Try fewer guests or different dates. The availability pattern is fictional and deterministic.</p></div>}
                  <div className="journey-room-grid">
                    {matching.map((room) => (
                      <article className="journey-room" key={room.slug}>
                        <Image src={room.image} alt={room.title + ' illustrative photograph'} width={640} height={440} sizes="(max-width: 700px) 100vw, 33vw" />
                        <div className="journey-room-copy"><span className="eyebrow">SAMPLE ROOM · UP TO {room.capacity} GUESTS</span><h3>{room.title}</h3><p>{room.description}</p><div className="journey-room-bottom"><span><strong>{'$' + room.price}</strong> / night</span><button className="button button-primary" type="button" onClick={() => selectRoom(room)}>Select room</button></div><Link className="text-link" href={roomDetailsHref(room, search)}>View room details <span aria-hidden="true">→</span></Link></div>
                      </article>
                    ))}
                  </div>
                  <button type="button" className="journey-text-button" onClick={() => { setStep('search'); setErrors({}); }}>Edit search</button>
                </>
              )}
            </div>
          )}
        </section>
      )}

      {step === 'guest' && selectedRoom && availableSelected && breakdown && (
        <section aria-labelledby="guest-heading" className="journey-checkout">
          <div><span className="eyebrow">STEP 3 OF 5</span><h2 id="guest-heading">Your fictional guest alias.</h2><p className="journey-intro">No real identity, email or phone number is required. Enter a name beginning with “Demo”; nothing is stored or transmitted.</p>
            <form onSubmit={proceedToReview} noValidate>
              <label htmlFor="demo-alias">Fictional guest alias</label>
              <input id="demo-alias" value={alias} onChange={(event) => { setAlias(event.target.value); setGuestError(''); }} maxLength={40} autoComplete="off" aria-invalid={Boolean(guestError)} aria-describedby={guestError ? 'guest-error' : undefined} required />
              <label className="journey-acknowledge"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span>I understand no room is reserved, no payment is made, and no message is sent.</span></label>
              {guestError && <p id="guest-error" className="field-error" role="alert">{guestError}</p>}
              <div className="journey-actions"><button className="button button-primary" type="submit">Review demo details</button><button className="journey-text-button" type="button" onClick={() => setStep('results')}>Back to rooms</button></div>
            </form>
          </div>
          <BookingSummary room={selectedRoom} search={search} />
        </section>
      )}

      {step === 'review' && selectedRoom && availableSelected && breakdown && (
        <section aria-labelledby="review-heading" className="journey-checkout">
          <div><span className="eyebrow">STEP 4 OF 5</span><h2 id="review-heading">Review your demo stay.</h2><p className="journey-intro">All dates, availability and charges below are illustrative. Confirming creates no booking, account, email or payment.</p>
            <dl className="journey-review-list"><div><dt>Fictional guest</dt><dd>{alias}</dd></div><div><dt>Room</dt><dd>{selectedRoom.title}</dd></div><div><dt>Guests</dt><dd>{search.adults} adults · {search.children} children</dd></div><div><dt>Check-in / out</dt><dd>{search.arrival} → {search.departure}</dd></div><div><dt>Price</dt><dd>{'$' + breakdown.total} USD, illustrative total</dd></div></dl>
            <div className="journey-actions"><button className="button button-primary" type="button" onClick={confirm} disabled={locked}>Confirm demo only</button><button className="journey-text-button" type="button" onClick={reviewBack}>Edit fictional guest</button><button className="journey-text-button" type="button" onClick={() => setStep('results')}>Change room</button></div>
          </div>
          <BookingSummary room={selectedRoom} search={search} />
        </section>
      )}

      {step === 'confirmed' && selectedRoom && availableSelected && breakdown && (
        <section className="journey-confirmation" aria-labelledby="confirmation-heading" role="status">
          <span className="eyebrow">STEP 5 OF 5 · DEMONSTRATION COMPLETE</span>
          <div className="journey-confirmation-mark" aria-hidden="true">✓</div>
          <h2 id="confirmation-heading">Your demo is complete.</h2>
          <p><strong>No actual reservation was made.</strong> No payment, account or email was created. This reference is only a repeatable demo identifier.</p>
          <div className="journey-reference"><span>ILLUSTRATIVE REFERENCE</span><strong>{demoReference(selectedRoom, search)}</strong></div>
          <BookingSummary room={selectedRoom} search={search} />
          <button type="button" className="button button-primary" onClick={restart}>Start a new demo</button>
        </section>
      )}

      {(step === 'guest' || step === 'review') && !availableSelected && <div className="journey-empty" role="alert">Your sample dates or room availability have changed. <button type="button" className="journey-text-button" onClick={() => setStep('search')}>Edit search</button></div>}
      <p className="journey-footnote">Privacy: only non-sensitive room, date and guest-count selections may appear in the URL. Guest alias stays in temporary page memory; no reservation is submitted.</p>
    </div>
  );
}

function BookingSummary({ room, search }: { room: DemoRoom; search: DemoSearch }) {
  const breakdown = priceFor(room, search);
  if (!breakdown) return null;
  return (
    <aside className="journey-summary" aria-label="Illustrative price breakdown">
      <Image src={room.image} alt={room.title + ' sample image'} width={640} height={340} sizes="(max-width: 900px) 100vw, 400px" />
      <div className="journey-summary-inner">
        <span className="eyebrow">SAMPLE PRICE BREAKDOWN</span><h3>{room.title}</h3>
        <dl><div><dt>Check-in</dt><dd>{search.arrival}</dd></div><div><dt>Check-out</dt><dd>{search.departure}</dd></div><div><dt>Guests</dt><dd>{search.adults + search.children}</dd></div><div><dt>Nightly rate</dt><dd>{'$' + breakdown.nightlyRate}</dd></div><div><dt>Nights</dt><dd>{breakdown.nights}</dd></div><div className="journey-total"><dt>Illustrative total</dt><dd>{'$' + breakdown.total} USD</dd></div></dl>
        <p>No taxes or additional fees are simulated. This is not a payable quotation.</p>
      </div>
    </aside>
  );
}
