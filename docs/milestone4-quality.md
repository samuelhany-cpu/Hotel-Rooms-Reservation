# Milestone 4 — Release Quality Report

## Delivered on feature branch

- Next.js App Router canonical and per-room metadata, Open Graph and social image metadata.
- Branded SVG icon; production sitemap and crawler policy.
- `/book`, demo authentication forms, legal pages are explicitly not intended for indexing.
- Preview deployments disable indexing when `VERCEL_ENV=preview`.
- First-party images use Next Image optimization. Disused legacy assets were removed after tracing references in active React/CSS modules.
- jQuery, Owl Carousel and Swiper packages and their unused types were removed from dependencies; lockfile regenerated.
- Keyboard-responsive navigation and improved WCAG AA contrast after real-browser axe diagnostics.
- Browser-level Playwright tests for desktop and mobile: route/navigation, fictional booking flow, mobile menu, overflow, and axe accessibility findings.
- Deterministic data and booking interactions continue to be covered by Vitest.

## Honest boundaries

- This is a fictional portfolio demonstration, not a hotel, booking engine or payment platform.
- Preview search dates, guest counts, and local alias behavior should not be represented as real occupancy or guest records.
- Existing images come from the repository; verify ownership / licensing before public release.
- Accessibility automation complements but does not replace manual screen-reader, contrast, zoom, keyboard, and reduced-motion checks.
- Lighthouse metrics are **not yet measured**; do not claim Performance 90+, Accessibility 95+, Best Practices 95+, or SEO 95+ without real reports.
- Production canonical domain is based on `NEXT_PUBLIC_SITE_URL` when configured, otherwise the known Vercel production address. Verify the canonical origin before launch.
- Future versions should remove any legacy off-route markup or dead duplicate artifacts not covered by the current active-source sweep.

## Verification commands

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
npx playwright install chromium
npm run test:e2e
npm audit --omit=dev
```

Browser tests launch the app via the Playwright webServer configuration. On CI the app uses `npm run start` after a real production build. Browser evidence is attached to failed GitHub Actions runs.

## Manual QA checklist before accepting Milestone 4

- [ ] Confirm desktop and mobile appearance at 360×800, 390×844, 768×1024, 1024×768, and 1440×900.
- [ ] Check screen-reader announcement, keyboard-only journey, 200% zoom, reduced motion.
- [ ] Run Lighthouse on preview/production-like build; record actual scores, URLs and date.
- [ ] Verify image licensing and the canonical `NEXT_PUBLIC_SITE_URL` value.
- [ ] Verify internal links and live preview deployment against the final tested commit.
