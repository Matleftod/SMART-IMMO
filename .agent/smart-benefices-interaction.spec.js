const { test, expect } = require("@playwright/test");

test("benefices split interaction updates active panel and aria state", async ({ page }) => {
  await page.goto("file:///Users/mat/Pro/SMART-IMMO/concept-01.html#benefices");
  await page.waitForSelector("#benefices [data-benefit-choice]");

  const choices = page.locator("#benefices [data-benefit-choice]");
  const panel = page.locator("#benefices #benefices-active");
  const title = page.locator("#benefices [data-benefit-title]");
  const copy = page.locator("#benefices [data-benefit-copy]");

  await choices.nth(2).click();
  await expect(title).toHaveText("3. Ne garder que les bonnes visites");
  await expect(copy).toHaveText("Ce qui n’est pas sérieux ne passe pas la porte. Ce qui l’est, reste et avance.");
  await expect(choices.nth(2)).toHaveAttribute("aria-selected", "true");
  await expect(panel).toHaveAttribute("aria-labelledby", "benefit-choice-3");

  await choices.nth(2).press("ArrowDown");
  await expect(title).toHaveText("4. Accompagner jusqu’à la concrétisation");
  await expect(choices.nth(3)).toHaveAttribute("aria-selected", "true");
  await expect(panel).toHaveAttribute("aria-labelledby", "benefit-choice-4");
});
