# CHOI DEPT Responsive Bilingual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the CHOI DEPT portfolio robust at desktop, intermediate, and mobile widths, with complete Korean/English content and a header language switcher.

**Architecture:** Keep the static HTML/Cloudflare Pages architecture. Move localized copy into `portfolio-data.js`, use `ui-state.js` for language and persona state transitions, and keep rendering in `script.js`. Put owner-tunable typography and layout tokens in `design-tokens.css`, imported before the main stylesheet.

**Tech Stack:** Vanilla HTML, CSS, ES modules, Node test runner, Python static server, Cloudflare Pages.

## Global Constraints

- Keep `choidept.com` as the canonical host and preserve the existing `www` redirect, OG artwork, favicon, robots, and sitemap.
- Keep the current public proof set: `28K+`, `15M+`, and `32`; do not add private payout, phone, address, tax, or account data.
- Use Korean system-font fallbacks after Pretendard so Korean text remains readable if the external font stylesheet fails.
- Support `1200px+`, `769–1199px`, and `768px and below` layout regimes.
- Use `textContent` for localized text and only trusted data for chip/link markup.

---

### Task 1: Localized portfolio data and test contract

**Files:**
- Modify: `portfolio-data.js`
- Test: `tests/portfolio-data.test.mjs`

**Interfaces:**
- Produces `pageCopy`, `personas`, `headlineMetrics`, `cases`, `experience`, and `links` with language-specific fields under `ko` and `en`.
- Shared image paths, accents, URLs, metric values, and publication state remain language-neutral.

- [ ] **Step 1: Write the failing test**

Add these assertions to `tests/portfolio-data.test.mjs`:

```js
import { pageCopy } from '../portfolio-data.js';

test('provides complete Korean and English page copy', () => {
  for (const language of ['ko', 'en']) {
    for (const key of ['nav', 'hero', 'proof', 'work', 'experience', 'profile', 'contact', 'footer']) {
      assert.ok(pageCopy[language][key]);
    }
  }
  assert.equal(pageCopy.ko.hero.title, '모두가 AI를 쉽게, 최피티.');
  assert.equal(pageCopy.en.hero.title, 'Making AI easy for everyone.');
});

test('localizes all personas, cases, and experience records', () => {
  for (const item of [...personas, ...cases, ...experience]) {
    for (const language of ['ko', 'en']) {
      assert.ok(item.copy?.[language] ?? item.role?.[language]);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/portfolio-data.test.mjs`

Expected: FAIL because `pageCopy` and localized record fields do not exist yet.

- [ ] **Step 3: Implement the localized data model**

Refactor `portfolio-data.js` to this shape while retaining current values and URLs:

```js
export const pageCopy = {
  ko: {
    nav: { proof: 'PROOF', work: 'WORK', experience: 'EXPERIENCE', cta: 'WORK WITH ME ↗', language: 'EN' },
    hero: {
      eyebrow: "[ HELLO, I'M WOOJIN ]",
      title: '모두가 AI를 쉽게, 최피티.',
      lede: '새로운 AI 제품을 사람들이 이해하고, 직접 써보고, 결과를 만들게 합니다.',
      primary: 'SELECTED WORK', secondary: 'B2B INQUIRY ↗', metricsLabel: '주요 성과',
    },
    proof: { index: '01 / PROOF LEDGER', title: ['숫자는 맥락과 함께', '보여줍니다.'] },
    work: { index: '02 / SELECTED WORK', title: ['새로운 기술을', '사람이 쓰는 결과로.'], fields: ['CONTEXT', 'RESPONSIBILITY', 'SYSTEM', 'RESULT'] },
    experience: { index: '03 / EXPERIENCE', title: ['콘텐츠, 성장, 운영,', '그리고 연구.'] },
    profile: { index: '04 / PROFILE', title: ['안녕하세요,', '최우진입니다.'], paragraphs: ['저는 새로운 AI를 어렵게 설명하기보다, 사람들이 직접 써보고 결과를 만들 수 있게 바꿉니다.', 'Choi.GPT에서는 복잡한 기능을 짧고 실용적인 콘텐츠로 풀어내고, 기업에서는 콘텐츠·크리에이터·데이터를 연결해 실제 성장으로 이어지게 합니다.', '기술을 소개하는 사람보다, 사람들이 기술을 실제로 쓰게 만드는 사람에 가깝습니다.'] },
    contact: { index: '05 / CONTACT', title: ['새로운 AI를 사람들이', '실제로 쓰게 만들고 싶다면.'], cta: "LET'S WORK TOGETHER ↗", socials: ['LINKEDIN', 'INSTAGRAM'] },
    footer: { copyright: '© 2026 CHOI DEPT.', location: 'SEOUL / KOREA', top: 'BACK TO TOP ↑' },
  },
  en: {
    nav: { proof: 'PROOF', work: 'WORK', experience: 'EXPERIENCE', cta: 'WORK WITH ME ↗', language: 'KO' },
    hero: {
      eyebrow: "[ HELLO, I'M WOOJIN ]",
      title: 'Making AI easy for everyone.',
      lede: 'I turn new AI products into clear experiences people can understand, try, and use to make real outcomes.',
      primary: 'SELECTED WORK', secondary: 'B2B INQUIRY ↗', metricsLabel: 'Selected proof',
    },
    proof: { index: '01 / PROOF LEDGER', title: ['Numbers need context.', 'Here is the context.'] },
    work: { index: '02 / SELECTED WORK', title: ['Turning new technology', 'into something people use.'], fields: ['CONTEXT', 'RESPONSIBILITY', 'SYSTEM', 'RESULT'] },
    experience: { index: '03 / EXPERIENCE', title: ['Content, growth, operations,', 'and research.'] },
    profile: { index: '04 / PROFILE', title: ['Hello,', "I'm Woojin Choi."], paragraphs: ['I make new AI easier to try and easier to turn into useful outcomes.', 'Through Choi.GPT, I translate complex features into practical content. For companies, I connect content, creators, and data to measurable growth.', 'I am less interested in explaining technology than in helping people actually use it.'] },
    contact: { index: '05 / CONTACT', title: ['If you want people to', 'actually use new AI.'], cta: "LET'S WORK TOGETHER ↗", socials: ['LINKEDIN', 'INSTAGRAM'] },
    footer: { copyright: '© 2026 CHOI DEPT.', location: 'SEOUL / KOREA', top: 'BACK TO TOP ↑' },
  },
};
```

Add `copy.ko` and `copy.en` objects to each persona, case, and experience item. Keep `description` and `title` only if existing tests or callers require them; the renderer will read `copy[language]`.

- [ ] **Step 4: Run the data tests**

Run: `node --test tests/portfolio-data.test.mjs`

Expected: PASS with the original public-data and privacy assertions still green.

- [ ] **Step 5: Commit the data contract**

```bash
git add portfolio-data.js tests/portfolio-data.test.mjs
git commit -m "Add bilingual portfolio content model"
```

### Task 2: Language state and accessible toggle behavior

**Files:**
- Modify: `ui-state.js`
- Modify: `script.js`
- Modify: `tests/ui-state.test.mjs`
- Modify: `tests/persona-controller.test.mjs`

**Interfaces:**
- `languageFromLocation(search, storedLanguage)` returns `'ko'` or `'en'`, defaulting to `'ko'`.
- `nextLanguage(language)` toggles between the two supported languages.
- `applyLanguage(language)` updates all localized nodes and metadata without reload.

- [ ] **Step 1: Write the failing state tests**

Add to `tests/ui-state.test.mjs`:

```js
import { languageFromLocation, nextLanguage } from '../ui-state.js';

test('resolves language from query and storage safely', () => {
  assert.equal(languageFromLocation('?lang=en', 'ko'), 'en');
  assert.equal(languageFromLocation('', 'en'), 'en');
  assert.equal(languageFromLocation('?lang=fr', 'en'), 'en');
});

test('toggles between Korean and English', () => {
  assert.equal(nextLanguage('ko'), 'en');
  assert.equal(nextLanguage('en'), 'ko');
  assert.equal(nextLanguage('fr'), 'ko');
});
```

Add a controller test that verifies a language change updates title, `lang`, selected toggle state, persona title, and image alt text.

- [ ] **Step 2: Run the focused tests to verify failure**

Run: `node --test tests/ui-state.test.mjs tests/persona-controller.test.mjs`

Expected: FAIL because language helpers and controller behavior are missing.

- [ ] **Step 3: Implement language helpers**

Add to `ui-state.js`:

```js
export function languageFromLocation(search, storedLanguage = 'ko') {
  const queryLanguage = new URLSearchParams(search).get('lang');
  return ['ko', 'en'].includes(queryLanguage) ? queryLanguage : (['ko', 'en'].includes(storedLanguage) ? storedLanguage : 'ko');
}

export function nextLanguage(language) {
  return language === 'en' ? 'ko' : 'en';
}
```

- [ ] **Step 4: Implement the controller transition**

In `script.js`, import `pageCopy` and the language helpers. Add `currentLanguage`, `applyLanguage(language)`, and `applyLocalizedPersona(persona)`. Use `document.querySelectorAll('[data-copy]')` for simple nodes and explicit rendering for proof, cases, experience, profile, and contact. Update:

```js
document.documentElement.lang = language;
document.title = language === 'ko' ? 'CHOI DEPT. — 모두가 AI를 쉽게, 최피티' : 'CHOI DEPT. — Making AI easy for everyone.';
document.querySelector('meta[name="description"]').content = pageCopy[language].hero.lede;
document.querySelector('meta[property="og:title"]').content = document.title;
document.querySelector('meta[property="og:description"]').content = pageCopy[language].hero.lede;
languageToggle.setAttribute('aria-pressed', String(language === 'en'));
languageToggle.textContent = pageCopy[language].nav.language;
history.replaceState(null, '', `${location.pathname}${language === 'en' ? '?lang=en' : ''}${location.hash}`);
localStorage.setItem('choidept-language', language);
```

Do not call `localStorage` during module initialization if it is unavailable; guard it with `try/catch` and default to Korean.

- [ ] **Step 5: Run focused tests**

Run: `node --test tests/ui-state.test.mjs tests/persona-controller.test.mjs`

Expected: PASS.

- [ ] **Step 6: Commit the language behavior**

```bash
git add ui-state.js script.js tests/ui-state.test.mjs tests/persona-controller.test.mjs
git commit -m "Add accessible Korean English language switching"
```

### Task 3: Responsive layout, typography tokens, and page markup

**Files:**
- Create: `design-tokens.css`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `tests/site-contract.test.mjs`

**Interfaces:**
- `design-tokens.css` exposes owner-editable `--hero-title-tracking`, `--hero-title-leading`, `--body-leading`, `--page-gutter`, `--desktop-breakpoint`, and `--mobile-breakpoint` values.
- `index.html` exposes a `language-toggle` button and `data-copy` targets while preserving all semantic landmarks.

- [ ] **Step 1: Write failing markup and CSS contracts**

Add to `tests/site-contract.test.mjs`:

```js
const tokens = await readFile(new URL('../design-tokens.css', import.meta.url), 'utf8');

test('ships the editable type system and bilingual header control', () => {
  assert.match(html, /id="language-toggle"/);
  assert.match(html, /aria-pressed="false"/);
  for (const token of ['--hero-title-tracking', '--hero-title-leading', '--body-leading', '--page-gutter']) {
    assert.match(tokens, new RegExp(`${token}:`));
  }
  assert.match(css, /@import url\('\.\/design-tokens\.css'\)/);
  assert.match(css, /font-family:.*Apple SD Gothic Neo.*Noto Sans KR/);
  assert.match(css, /@media \(max-width: 768px\)[\s\S]*grid-template-columns:\s*1fr/);
});
```

- [ ] **Step 2: Run the contract test to verify failure**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL because the token file and toggle markup do not exist.

- [ ] **Step 3: Add the editable token layer**

Create `design-tokens.css`:

```css
:root {
  --hero-title-tracking: -0.075em;
  --hero-title-leading: 0.9;
  --section-title-tracking: -0.065em;
  --body-leading: 1.55;
  --page-gutter: 24px;
  --desktop-breakpoint: 1200px;
  --mobile-breakpoint: 768px;
}
```

Import it as the first local stylesheet in `styles.css`, then replace hard-coded headline tracking, headline leading, body leading, and page gutter values with the tokens. Set the stable font stack to:

```css
font-family: Pretendard, "Apple SD Gothic Neo", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

- [ ] **Step 4: Add the language control and localized targets**

Add this control beside the desktop CTA and inside the mobile header flow:

```html
<button id="language-toggle" class="language-toggle" type="button" aria-pressed="false" aria-label="Switch language">EN</button>
```

Mark static navigation, hero, section headings, profile, contact, and footer nodes with `data-copy` keys. Keep the Korean text as the no-JavaScript fallback.

- [ ] **Step 5: Rebuild the responsive CSS regimes**

Use these exact layout rules:

```css
.hero { grid-template-columns: minmax(0, 1.08fr) minmax(420px, .92fr); }
@media (max-width: 1199px) {
  .hero { grid-template-columns: minmax(0, 1.05fr) minmax(300px, .95fr); gap: clamp(20px, 3vw, 48px); }
}
@media (max-width: 768px) {
  .hero { grid-template-columns: 1fr; }
  .language-toggle { justify-self: end; }
}
```

Keep the hero copy first in DOM order, prevent `min-width` overflow, and use `clamp()` for headings and body text. Avoid fixed widths on localized copy; English labels must be allowed to wrap without clipping.

- [ ] **Step 6: Run the contract and full tests**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 7: Commit the responsive redesign**

```bash
git add design-tokens.css index.html styles.css tests/site-contract.test.mjs
git commit -m "Rebuild the portfolio as a bilingual responsive system"
```

### Task 4: Visual and deployment verification

**Files:**
- Modify: `README.md` if hosting status text is stale after verification
- Test: rendered local and live pages

**Interfaces:**
- Local preview at `http://127.0.0.1:4173/`.
- Production page at `https://choidept.com/`.

- [ ] **Step 1: Build and run the local preview**

Run: `npm run check`

Then run: `npm run dev`

- [ ] **Step 2: Capture each responsive regime**

Capture screenshots at `1440x900`, `864x982`, `768x1024`, and `390x844`. Confirm no horizontal overflow, no missing glyphs, no title clipping, and correct content order.

- [ ] **Step 3: Exercise language switching**

At desktop and mobile widths, click `EN`, verify English copy and `<html lang="en">`, reload `?lang=en`, click `KO`, and verify Korean copy returns without a reload.

- [ ] **Step 4: Exercise persona switching in both languages**

Select all four persona tabs in Korean and English. Verify title, description, chips, accent, image source, and alt text match the selected language. Press ArrowRight, ArrowLeft, Home, and End while focus is on the tablist.

- [ ] **Step 5: Verify live deployment after explicit publish approval**

Run: `git status --short`

If clean and approved for production, push `main`, wait for Cloudflare Pages to rebuild, then verify:

```bash
curl -sS -L https://choidept.com/ | rg '<title>|language-toggle|PROOF LEDGER'
curl -sS -I https://www.choidept.com/
```

Expected: the live title, toggle, and responsive build are present; `www` returns a 301 to `https://choidept.com/`.

- [ ] **Step 6: Commit any documentation status correction**

```bash
git add README.md
git commit -m "Document the bilingual responsive deployment state"
```
