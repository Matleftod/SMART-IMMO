const { test, expect } = require('@playwright/test');

function attachErrorGuards(page) {
  const consoleErrors = [];
  const pageErrors = [];
  const responseErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (error) => {
    pageErrors.push(String(error));
  });

  page.on('response', (response) => {
    const status = response.status();

    if (status < 400) {
      return;
    }

    const request = response.request();
    const resourceType = request.resourceType();
    const url = response.url();

    const importantResource = ['document', 'script', 'stylesheet', 'fetch', 'xhr'].includes(resourceType);

    if (!importantResource) {
      return;
    }

    responseErrors.push(`${status} ${resourceType} ${url}`);
  });

  return () => {
    expect(pageErrors, `Runtime JS errors:\n${pageErrors.join('\n')}`).toEqual([]);
    expect(consoleErrors, `Console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
    expect(responseErrors, `HTTP errors on important resources:\n${responseErrors.join('\n')}`).toEqual([]);
  };
}

test('home smoke desktop: critical sections and interactions', async ({ page }) => {
  const assertNoErrors = attachErrorGuards(page);

  await page.goto('/');
  await page.waitForTimeout(700);

  await expect(page.locator('header.topbar')).toBeVisible();
  await expect(page.locator('a.nav-cta')).toBeVisible();
  await expect(page.locator('#offres')).toBeVisible();
  await expect(page.locator('#benefices')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();

  const benefitChoice2 = page.locator('#benefices [data-benefit-choice]').nth(1);
  await benefitChoice2.click();
  await expect(benefitChoice2).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#benefices #benefices-active')).toHaveAttribute('aria-labelledby', 'benefit-choice-2');

  const resultOutput = page.locator('#calculateur [data-net-result]');
  const before = (await resultOutput.textContent())?.trim();

  await page.locator('#sale-price').fill('400000');
  await page.locator('#sale-price').blur();
  await page.waitForTimeout(250);

  const after = (await resultOutput.textContent())?.trim();
  expect(after).not.toBe(before);

  assertNoErrors();
});

test('home smoke mobile: menu open/close and offers horizontal scroll', async ({ page }) => {
  const assertNoErrors = attachErrorGuards(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.waitForTimeout(500);

  const menuButton = page.locator('.mobile-menu-toggle');
  await expect(menuButton).toBeVisible();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

  await page.locator('#mobile-navigation a[href="#offres"]').click();
  await page.waitForTimeout(320);
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  await page.goto('/#offres');
  await page.waitForTimeout(500);

  const offersState = await page.locator('.offers-table-scroll').evaluate((el) => {
    return {
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
      bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  expect(offersState.scrollWidth > offersState.clientWidth || offersState.bodyOverflow <= 2).toBeTruthy();

  assertNoErrors();
});

test('legal pages smoke: render, navigation links, no runtime errors', async ({ page }) => {
  const legalPaths = ['/mentions-legales', '/politique-confidentialite'];

  for (const path of legalPaths) {
    const assertNoErrors = attachErrorGuards(page);

    await page.goto(path);
    await page.waitForTimeout(400);

    await expect(page.locator('header.topbar')).toBeVisible();
    await expect(page.locator('footer.site-footer')).toBeVisible();
    await expect(page.locator('a[href*="#offres"]').first()).toBeVisible();

    assertNoErrors();
  }
});
