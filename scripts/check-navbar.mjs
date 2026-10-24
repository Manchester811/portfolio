// Run against `npm run start` (or dev). Playwright is QA-only, not an app dependency.
// PLAYWRIGHT_MODULE=/path/to/playwright node scripts/check-navbar.mjs
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const baseURL = process.env.BASE_URL || "http://localhost:3000";
const browser = await chromium.launch();
const errors = [];
const destinations = [
  ["Work", "projects"], ["About", "about"], ["Stack", "skills"],
  ["Trajectory", "experience"], ["Credentials", "certifications"], ["Contact", "contact"],
];

async function ready(page, path = "/") {
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(`${baseURL}${path}`);
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
}

async function assertTheme(page, theme) {
  await page.waitForFunction((expected) => document.documentElement.dataset.theme === expected, theme);
  // Even the existing reduced-motion 0.01ms CSS transitions finish on a render frame.
  await page.waitForFunction((expected) => getComputedStyle(document.body).backgroundColor === expected,
    theme === "light" ? "rgb(247, 247, 245)" : "rgb(7, 7, 7)");
  assert.equal(await page.locator("html").evaluate((el) => getComputedStyle(el).colorScheme), theme);
  await page.getByRole("button", { name: `Switch to ${theme === "light" ? "dark" : "light"} theme` }).waitFor();
}

async function navigate(page, label, id, mobile, reduced) {
  if (mobile) await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const navigation = page.getByRole("navigation", { name: mobile ? "Mobile" : "Primary", exact: true });
  await navigation.getByRole("button", { name: label, exact: true }).click();
  await page.waitForTimeout(reduced ? 500 : 1500);
  const section = await page.locator(`#${id}`).boundingBox();
  const bar = await page.locator("header > .glass-pill").boundingBox();
  assert.ok(section.y >= bar.y + bar.height - 1, `${label} is hidden under the navbar: ${section.y}`);
  assert.ok(section.y < 240, `${label} did not navigate to its section: ${section.y}`);
  if (mobile) await page.getByRole("button", { name: "Open menu", exact: true }).click();
  assert.equal(await navigation.getByRole("button", { name: label, exact: true }).getAttribute("aria-current"), "location");
  if (mobile) await page.keyboard.press("Escape");
}

try {
  for (const [width, height, reduced] of [[1440, 900, false], [1024, 768, true], [768, 1024, true], [390, 844, false], [320, 568, true], [844, 390, true]]) {
    const context = await browser.newContext({
      viewport: { width, height }, hasTouch: width < 1024,
      reducedMotion: reduced ? "reduce" : "no-preference",
    });
    const page = await context.newPage();
    await ready(page);
    const mobile = width < 1024;
    const bar = await page.locator("header > .glass-pill").boundingBox();
    assert.ok(bar.width < (mobile ? 290 : 760), `Navbar is not compact at ${width}px`);
    assert.ok(bar.height <= (mobile ? 54 : 46), `Navbar is too tall at ${width}px`);
    assert.ok(Math.abs(bar.x + bar.width / 2 - width / 2) < 1, "Navbar is not centered");
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Horizontal overflow");

    for (const theme of ["dark", "light"]) {
      if (theme === "light") await page.getByRole("button", { name: "Switch to light theme" }).click();
      await assertTheme(page, theme);
      for (const [label, id] of destinations) await navigate(page, label, id, mobile, reduced);
      await page.getByRole("button", { name: "Rishabh Jain — back to top" }).click();
      await page.waitForTimeout(reduced ? 300 : 1400);
      assert.ok(await page.evaluate(() => scrollY < 2), "Brand button did not return home");
    }

    if (mobile) {
      const toggle = page.getByRole("button", { name: "Switch to dark theme" });
      assert.ok((await toggle.boundingBox()).height >= 44, "Theme touch target is too small");
      const menu = page.getByRole("button", { name: "Open menu", exact: true });
      await menu.focus();
      await page.keyboard.press("Enter");
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement.textContent), "Work");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      assert.ok(await menu.evaluate((el) => el === document.activeElement), "Escape did not restore focus");
      await menu.click();
      const panel = page.locator("#mobile-navigation");
      await panel.waitFor();
      const bounds = await panel.boundingBox();
      assert.ok(bounds.x >= 16 && bounds.x + bounds.width <= width - 16, "Mobile menu overflows");
      assert.ok(bounds.y + bounds.height <= height, "Mobile menu is cut off");
      assert.equal(await panel.getByRole("link", { name: "Download Résumé" }).getAttribute("href"), "/assets/Rishabh_Jain_Resume.pdf");
      assert.equal(await panel.getByRole("link", { name: "GitHub", exact: true }).getAttribute("href"), "https://github.com/Manchester811");
      await toggle.click();
      await assertTheme(page, "dark");
      assert.equal(await page.getByRole("button", { name: "Close menu", exact: true }).getAttribute("aria-expanded"), "true");
      await page.mouse.click(8, height - 8);
      await panel.waitFor({ state: "hidden" });
      await page.getByRole("button", { name: "Open menu", exact: true }).click();
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.setViewportSize({ width, height });
      await page.getByRole("button", { name: "Open menu", exact: true }).waitFor();
    }
    console.log(`PASS ${width}×${height}: compact layout, both themes, six destinations, active states, home${mobile ? ", menu keyboard/touch/outside-click/resize" : ""}`);
    await context.close();
  }

  // Persistence, keyboard theme switching, cross-tab synchronization, and preserved actions.
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await ready(page);
  await page.getByRole("button", { name: "Switch to light theme" }).focus();
  await page.keyboard.press("Space");
  await assertTheme(page, "light");
  assert.equal(await page.evaluate(() => localStorage.getItem("rj-portfolio-theme")), "light");
  await page.reload();
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
  await assertTheme(page, "light");
  const secondTab = await context.newPage();
  await ready(secondTab, "/#projects");
  await assertTheme(secondTab, "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await assertTheme(secondTab, "dark");
  await page.reload();
  await page.getByRole("status", { name: "Loading portfolio" }).waitFor({ state: "hidden" });
  await assertTheme(page, "dark");
  await page.getByRole("button", { name: "Open command palette" }).click();
  await page.getByRole("dialog", { name: "Command palette" }).waitFor();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Hire me", exact: true }).click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await navigate(page, "Work", "projects", false, true);
  await page.getByRole("button", { name: "Open case study" }).click();
  await page.getByRole("dialog", { name: /case study/ }).waitFor();
  await page.getByRole("button", { name: "Close case study" }).click();
  console.log("PASS persisted light/dark refresh, deep link, keyboard toggle, cross-tab sync, search, contact, case study");
  await context.close();

  // The head bootstrap must apply saved light mode without waiting for React.
  const earlyContext = await browser.newContext();
  await earlyContext.addInitScript(() => localStorage.setItem("rj-portfolio-theme", "light"));
  const earlyPage = await earlyContext.newPage();
  await earlyPage.route("**/_next/static/**/*.js", (route) => route.abort());
  await earlyPage.goto(baseURL, { waitUntil: "domcontentloaded" });
  assert.equal(await earlyPage.locator("html").getAttribute("data-theme"), "light");
  assert.equal(await earlyPage.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor), "rgb(247, 247, 245)");
  await earlyContext.close();

  const blockedContext = await browser.newContext({ reducedMotion: "reduce" });
  await blockedContext.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new DOMException("Storage blocked", "SecurityError"); } });
  });
  const blockedPage = await blockedContext.newPage();
  await ready(blockedPage);
  await blockedPage.getByRole("button", { name: "Switch to light theme" }).click();
  await assertTheme(blockedPage, "light");
  await blockedContext.close();
  console.log("PASS pre-hydration saved theme and blocked-storage fallback");
  assert.deepEqual(errors, [], "Browser errors or hydration warnings");
  console.log("PASS no console errors, uncaught exceptions, or hydration warnings");
} finally {
  await browser.close();
}
