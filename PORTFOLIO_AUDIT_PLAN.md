# BookingCW Portfolio Demo — Implementation Plan

## Goal and v1 Scope

Turn BookingCW into a polished and technically credible Mostaql portfolio project.

Version 1 is **Option A: Portfolio Demo**. It is a deterministic frontend-only experience. It must not use real authentication, databases, payments, email delivery, paid services, or new infrastructure. It must clearly state that rooms, availability, prices, guest details, and confirmations are sample/demo data and that no actual reservation is created.

Real guest personal data must never be persisted or transmitted. Demo forms must instruct users to enter fictional/sample values, keep state ephemeral, and avoid network submission.

## Verified Baseline

Re-audited against GitHub `main` at `a9120526b0c1d4336ec1816d0bd6219e6c26edb7`.

- Vercel reports the deployment successful.
- Next.js is patched to 15.5.29.
- Routes: `/`, `/login`, `/signup`, `/forgot-password`, `/terms`, four generated `/rooms/[slug]` pages, and custom 404.
- Existing navigation and route fixes must be preserved.
- Remaining problems: sensitive logging, blocking alerts, fake reset success, nonfunctional authentication, incomplete booking flow, legacy jQuery/Owl Carousel, no tests/CI, outdated README, inconsistent content, and legacy/oversized assets.

## Working Method

- Use only `feature/portfolio-demo-v1` for v1 implementation.
- Keep changes small, reviewable, and buildable.
- Preserve working features until a complete replacement exists.
- Add tests progressively.
- Keep authentication pages safe and explicitly nonfunctional.
- Prioritize guest booking throughout the product.
- Do not merge to `main` or deploy to production until all milestones pass.
- Do repository and asset cleanup before final release verification, screenshots, and merge approval.

---

## Milestone 1 — Stability, Security & Baseline

### Dependencies

Latest re-audited `main`, successful existing deployment, one working branch, and no external services.

### Work

- Record route/dependency/asset baseline.
- Add formatting, lint, typecheck, test, and build scripts.
- Remove sensitive credential/form logging.
- Replace blocking alerts with accessible inline validation.
- Remove fake authentication, account, and reset-email success behavior.
- Add explicit demo notices and guest-booking links.
- Remove/de-emphasize authentication from primary navigation.
- Re-check links, keyboard access, form semantics, and existing routes.
- Add route/link, validation, disclosure, and sensitive-logging tests.

### Acceptance

No sensitive logging, alerts, misleading success, or dead primary actions; all routes remain working; guest booking is primary; verification commands pass.

### Verify

```bash
npm install
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

---

## Milestone 2 — Branding, Design System & Responsive Redesign

### Dependencies

Milestone 1 accepted, BookingCW confirmed as the demo brand, and approved/licensed assets.

### Work

- Use one brand and one honest content voice.
- Remove invented ratings, statistics, achievements, addresses, and unrelated copy.
- Label sample rooms, prices, amenities, policies, and contacts.
- Define reusable design tokens and components.
- Consolidate CSS progressively.
- Redesign every route and shared component.
- Add WCAG AA contrast, focus states, reduced motion, and touch/keyboard equivalents.
- Verify 360×800, 390×844, 768×1024, 1024×768, and 1440×900.

### Acceptance

One coherent identity, no unsupported claims, responsive routes without overflow, visible focus, non-hover access, and preserved functionality.

### Verify

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:e2e -- --project=chromium
npm run build
```

---

## Milestone 3 — Complete Frontend Reservation Demo

### Dependencies

Accepted design system and approved deterministic sample room/pricing/policy data.

### Journey

`Dates and guests → Matching sample rooms → Room details → Fictional guest details → Review → Demo confirmation`

### Work

- Create one typed deterministic room/availability source.
- Validate dates, guests, capacity, availability, nights, and totals.
- Preserve search state between results and room details.
- Replace sign-in-to-book with guest checkout.
- Collect only minimal fictional/sample details.
- Never persist or transmit real personal data.
- Add edit/review and double-submit protection.
- Clearly state that no booking, charge, account, or email is created.
- Prefer simple React/URL state; use validated ephemeral session state only if necessary.

### Acceptance

A consistent end-to-end guest demo works without an account; invalid input cannot continue; results are deterministic; confirmation is unmistakably a demo; no personal data is transmitted or persisted.

### Verify

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

---

## Milestone 4 — Performance, Accessibility, SEO & Automated Testing

### Dependencies

Stable Milestone 3 journey, final routes/assets, and confirmed production domain for canonical metadata.

### Work

- Replace and remove jQuery/Owl Carousel and timeout initialization.
- Optimize/remove oversized, unused, and duplicate assets.
- Reduce unused CSS, packages, client code, and requests.
- Complete semantic, keyboard, focus, contrast, zoom, reduced-motion, and screen-reader review.
- Add honest route metadata, Open Graph, icons, robots, sitemap, and indexing controls.
- Complete unit/component/e2e/accessibility coverage.
- Add CI for format, lint, typecheck, tests, and build.

### Targets

Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+, zero broken internal links/runtime errors/legacy carousel code.

### Acceptance

Legacy code is removed, assets optimized, accessibility verified, metadata honest, CI green, and targets met or exceptions documented.

### Verify

```bash
npm run format:check
npm run lint
npm run typecheck
npm run test -- --coverage
npm run test:e2e
npm run build
npm run start
```

---

## Milestone 5 — Production Deployment & Portfolio Presentation

### Dependencies

Milestones 1–4 accepted, final domain/disclosure approved, and all checks passing.

### Required Order

1. Update the one working branch from latest `main`.
2. Remove the nested empty project, zero-byte/duplicate/legacy files, unused dependencies, and unused assets.
3. Resolve licensing intentionally.
4. Run full verification **after cleanup**.
5. Deploy the exact candidate commit to preview and test it.
6. Rewrite README with accurate versions, routes, architecture, limits, commands, evidence, and live URL.
7. Capture screenshots from the real implemented UI only.
8. Prepare honest English/Arabic Mostaql descriptions.
9. Merge only after preview acceptance.
10. Verify production commit and run post-deployment smoke tests.

### Acceptance

Production matches the verified commit; all routes/journey pass; repository is clean; README and Mostaql claims match reality; screenshots show the real UI; demo limitations are explicit.

### Verify

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test -- --coverage
npm run test:e2e
npm run build
```

## Recommended First Task

Secure and clarify the existing forms in one reviewable change:

1. Remove credential logging.
2. Replace alerts with inline accessible validation.
3. Remove simulated reset-email success.
4. Add honest nonfunctional-auth and guest-booking notices.
5. Preserve routes/layout.
6. Add focused tests.
7. Pass format, lint, typecheck, tests, and build.
