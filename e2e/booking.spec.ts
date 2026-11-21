import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('main pages render with honest metadata and working navigation', async ({
  page,
}) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /A quieter way/ })
  ).toBeVisible();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /fictional/i
  );
  await page.getByRole('link', { name: /Discover sample rooms/i }).click();
  await expect(page).toHaveURL(/#rooms$/);
  await page.getByRole('link', { name: /View Family Room details/i }).click();
  await expect(
    page.getByRole('heading', { name: 'Family Room' })
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/rooms\/family-room$/
  );
});

test('booking validation and local-only demo completion', async ({ page }) => {
  await page.goto('/book');
  await page.getByRole('button', { name: 'Find sample rooms' }).click();
  await expect(page.getByRole('alert').first()).toBeVisible();
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 30);
  const start = d.toISOString().slice(0, 10);
  d.setUTCDate(d.getUTCDate() + 1);
  const end = d.toISOString().slice(0, 10);
  await page.getByLabel('Check-in').fill(start);
  await page.getByLabel('Check-out').fill(end);
  await page.getByRole('button', { name: 'Find sample rooms' }).click();
  await expect(
    page.getByRole('button', { name: 'Select room' }).first()
  ).toBeVisible();
  await page.getByRole('button', { name: 'Select room' }).first().click();
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Review demo details' }).click();
  await expect(
    page.getByRole('heading', { name: 'Review your demo stay.' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Confirm demo only' }).click();
  await expect(
    page.getByRole('heading', { name: 'Your demo is complete.' })
  ).toBeVisible();
  await expect(
    page.getByText('No actual reservation was made.', { exact: false })
  ).toBeVisible();
  await expect(page).not.toHaveURL(/(?:email|alias|name)=/i);
});

test('keyboard menu and responsive layout have no horizontal overflow', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1
  );
  expect(overflow).toBe(false);
  if (isMobile) {
    const menu = page.getByRole('button', { name: 'Open menu' });
    await menu.click();
    await expect(
      page.getByRole('navigation', { name: 'Mobile navigation' })
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
  } else {
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: 'Skip to main content' })
    ).toBeFocused();
  }
});

test('critical accessibility violations are absent on public flows', async ({
  page,
}) => {
  for (const pathname of ['/', '/book', '/login', '/signup']) {
    await page.goto(pathname);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.filter(
        (item) => item.impact === 'critical' || item.impact === 'serious'
      )
    ).toEqual([]);
  }
});
