# CHOI DEPT Identity OS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current flat portfolio with a responsive, accessible Identity OS that presents four personal modes and ties every professional claim to a clear proof context.

**Architecture:** Keep the existing dependency-free static site and Cloudflare Pages build. Move professional content into an ES module, keep navigation/state helpers pure and testable, render the stable document structure in semantic HTML, and use one browser controller for persona switching, menu state, and progressive reveals.

**Tech Stack:** HTML5, modern CSS, vanilla JavaScript ES modules, Node.js built-in test runner, existing Cloudflare Pages static build.

## Global Constraints

- Preserve the existing Cloudflare Pages, DNS, SSL, apex-domain canonical URL, and `www` redirect setup.
- Use `#111111`, `#F7F4EC`, and `#3157FF` as the shared foundation.
- Use Pretendard or a system sans for body copy; pixel typography is limited to labels, indices, counters, and microcopy.
- Publish only sourced metrics and approved client context.
- Do not publish Manus payouts, mixed admin aggregates, private creator identities, contracts, internal screenshots, personal phone numbers, or tax information.
- Do not represent OpenAI as an employer, client, or official partnership.
- Do not add a CMS, framework, form backend, analytics collector, 3D runtime, autoplay audio, or scroll hijacking.
- Keep native scrolling and support `prefers-reduced-motion`.
- All four persona modes must be operable by mouse, touch, and keyboard.
- The main headline and the three top metrics must remain understandable when JavaScript is unavailable.

---

## File map

| File | Responsibility |
| --- | --- |
| `portfolio-data.js` | Verified personas, metrics, cases, experience, and external links |
| `ui-state.js` | Pure persona-index and reduced-motion helpers |
| `index.html` | Semantic, progressively enhanced page structure and SEO metadata |
| `script.js` | DOM binding, persona rendering, keyboard behavior, menu, and reveal enhancement |
| `styles.css` | Tokens, responsive layout, persona scenes, glass controls, cases, timeline, and accessibility states |
| `build.mjs` | Copy every static module and asset into `dist/` |
| `public/og.svg` | CHOI DEPT social-sharing artwork |
| `tests/portfolio-data.test.mjs` | Claim boundary and structured-content tests |
| `tests/ui-state.test.mjs` | Persona navigation unit tests |
| `tests/site-contract.test.mjs` | Static HTML, metadata, accessibility, and build-output contract tests |
| `package.json` | Test and full-check scripts |

---

### Task 1: Lock the verified content model

**Files:**
- Create: `portfolio-data.js`
- Create: `tests/portfolio-data.test.mjs`
- Modify: `package.json`
- Modify: `build.mjs`

**Interfaces:**
- Produces: `personas: Persona[]`, `headlineMetrics: Metric[]`, `cases: CaseStudy[]`, `experience: ExperienceItem[]`, and `links: Record<string, string>`.
- `Persona` fields: `id`, `index`, `title`, `label`, `image`, `alt`, `accent`, `description`, `chips`.
- `Metric` fields: `value`, `label`, `context`, `publication`.
- Later tasks import these exact named exports.

- [ ] **Step 1: Add the failing content-boundary test**

```js
// tests/portfolio-data.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  personas,
  headlineMetrics,
  cases,
  experience,
  links,
} from '../portfolio-data.js';

test('defines four unique public personas', () => {
  assert.equal(personas.length, 4);
  assert.deepEqual(personas.map(({ id }) => id), ['creator', 'beauty', 'student', 'kkami']);
  assert.equal(new Set(personas.map(({ id }) => id)).size, 4);
  for (const persona of personas) {
    assert.match(persona.image, /^\/assets\/characters\/.+\.webp$/);
    assert.ok(persona.description.length >= 25);
    assert.ok(persona.chips.length >= 2);
  }
});

test('keeps the hero proof set concise and sourced', () => {
  assert.deepEqual(headlineMetrics.map(({ value }) => value), ['28K+', '15M+', '32']);
  assert.ok(headlineMetrics.every(({ publication }) => publication === 'public'));
});

test('contains three evidence-led cases and a bounded research status', () => {
  assert.deepEqual(cases.map(({ id }) => id), ['choigpt', 'beauty-growth', 'creator-ops']);
  assert.ok(cases.every(({ context, responsibility, system, result }) =>
    [context, responsibility, system, result].every(Boolean)));
  assert.ok(experience.some(({ status }) => status === 'prototype / pilot calibration'));
});

test('does not publish private Manus or personal data', () => {
  const serialized = JSON.stringify({ personas, headlineMetrics, cases, experience, links });
  assert.doesNotMatch(serialized, /private payout|revenue share|phone number|home address|tax id/i);
  assert.doesNotMatch(serialized, /010-[0-9]/);
  assert.equal(serialized.includes('official OpenAI partner'), false);
});
```

- [ ] **Step 2: Add the test script and verify the failure**

Change `package.json` scripts to:

```json
{
  "dev": "python3 -m http.server 4173",
  "test": "node --test tests/*.test.mjs",
  "build": "node build.mjs",
  "check": "npm test && npm run build"
}
```

Run: `npm test`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `portfolio-data.js`.

- [ ] **Step 3: Create the verified data module**

```js
// portfolio-data.js
export const personas = [
  {
    id: 'creator', index: '01', title: 'AI Creator', label: 'AI CREATOR',
    image: '/assets/characters/dark.webp',
    alt: '검은 옷을 입고 태블릿을 든 최피티 픽셀 캐릭터',
    accent: 'creator',
    description: '복잡한 AI 워크플로를 누구나 바로 써볼 수 있는 한국어 콘텐츠로 바꿉니다.',
    chips: ['28K+ FOLLOWERS', '15M+ ORGANIC VIEWS', '32 BRAND COLLABS'],
  },
  {
    id: 'beauty', index: '02', title: 'Beauty & Growth', label: 'BEAUTY INFLUENCER',
    image: '/assets/characters/field.webp',
    alt: '뷰티 제품과 스마트폰을 든 최피티 픽셀 캐릭터',
    accent: 'beauty',
    description: '콘텐츠 제작과 크리에이터 협업, 성과 데이터를 다음 크리에이티브 결정으로 연결합니다.',
    chips: ['160K MONTHLY VIEWS', '+500% TIKTOK VIEWS', '113K+ REACH'],
  },
  {
    id: 'student', index: '03', title: 'Student & Researcher', label: 'UNIVERSITY STUDENT',
    image: '/assets/characters/hood.webp',
    alt: '후드와 청바지를 입은 최피티 픽셀 캐릭터',
    accent: 'student',
    description: '미디어커뮤니케이션과 데이터애널리틱스를 공부하며 실행 가능한 AI 평가 방법을 연구합니다.',
    chips: ['MEDIA + DATA', 'GPA 4.0 / 4.5', '2024–2028'],
  },
  {
    id: 'kkami', index: '04', title: "Kkami's Dad", label: "KKAMI'S DAD",
    image: '/assets/characters/neutral.webp',
    alt: '검은 강아지 까미와 함께 서 있는 최피티 픽셀 캐릭터',
    accent: 'kkami',
    description: '대시보드 밖의 생활에서도 관찰하고 기록하며, 새로운 도구를 평범한 하루에 직접 시험합니다.',
    chips: ['DAILY OBSERVER', 'TRAVEL NOTES', 'WITH KKAMI'],
  },
];

export const headlineMetrics = [
  { value: '28K+', label: 'FOLLOWERS', context: 'Choi.GPT', publication: 'public' },
  { value: '15M+', label: 'ORGANIC VIEWS', context: 'Choi.GPT', publication: 'public' },
  { value: '32', label: 'BRAND COLLABORATIONS', context: 'Choi.GPT', publication: 'public' },
];

export const cases = [
  {
    id: 'choigpt', number: '01', title: 'Choi.GPT Content Lab', eyebrow: 'AI CREATOR / B2C',
    context: '새로운 AI 제품을 한국 사용자가 이해하고 바로 시험할 수 있게 만드는 콘텐츠 랩.',
    responsibility: '리서치, 기획, 스크립트, 디자인, 편집, 성과 분석.',
    system: 'AUDIENCE PROBLEM → HOOK → PRACTICAL EXAMPLE → NEXT ACTION',
    result: '28K+ followers · 15M+ organic views · 32 brand collaborations',
    links: [
      { label: 'INSTAGRAM', href: 'https://www.instagram.com/choi.gpt.ai/' },
      { label: 'NEWTAKE PR', href: 'https://www.instagram.com/choi.gpt.ai/reel/Db2pyX9yrNp/' },
      { label: 'MORPHIC AD', href: 'https://www.instagram.com/choi.gpt.ai/reel/Da5XpUcyMxL/' },
    ],
  },
  {
    id: 'beauty-growth', number: '02', title: 'North America Beauty Growth', eyebrow: 'BEAUTY / B2B',
    context: 'LG생활건강의 북미향 뷰티 브랜드 콘텐츠와 성장 업무.',
    responsibility: '숏폼 콘텐츠, 크리에이터 협업, 이커머스 지원, 성과 분석.',
    system: 'CREATE → PUBLISH → READ SIGNALS → IMPROVE',
    result: '160K monthly views · +500% TikTok views · 113K+ reach · 9K+ interactions',
    links: [],
  },
  {
    id: 'creator-ops', number: '03', title: 'Korea/Japan Creator Operations', eyebrow: 'CREATOR OPS / B2B',
    context: 'Manus Creator Program의 한국·일본 크리에이터 운영.',
    responsibility: '소싱, 핏 검토, 아웃리치, 온보딩, 현지화, 콘텐츠 리뷰, 운영 조율.',
    system: 'SOURCE → QUALIFY → ONBOARD → REVIEW → MEASURE',
    result: '50-candidate verified workbook · 138-profile expansion review',
    links: [{ label: 'MANUS PARTNER CONTENT', href: 'https://www.instagram.com/choi.gpt.ai/p/Db-LfeXkuDH/' }],
  },
];

export const experience = [
  { period: '2026–PRESENT', role: 'Creator & Builder', organization: 'Choi.GPT', type: 'creator', status: 'active' },
  { period: '2026', role: 'Manus AI Viral Coach', organization: 'MuseOn.AI', type: 'freelance', status: 'completed' },
  { period: '2025–2026', role: 'Global Marketing — North America', organization: 'LG Household & Health Care', type: 'work', status: 'completed' },
  { period: '2024–2028', role: 'Media Communication & Data Analytics', organization: 'Incheon National University', type: 'education', status: 'active' },
  { period: 'RESEARCH', role: 'Harness Benchmark & Implementation Lead', organization: 'Team Computer', type: 'research', status: 'prototype / pilot calibration' },
];

export const links = {
  email: 'mailto:hello@choidept.com',
  linkedin: 'https://www.linkedin.com/in/woojin-choi-a0989b24a/',
  instagram: 'https://www.instagram.com/choi.gpt.ai/',
};
```

- [ ] **Step 4: Copy the new module in the build**

Add after the existing `script.js` copy in `build.mjs`:

```js
await cp('portfolio-data.js', 'dist/portfolio-data.js');
```

- [ ] **Step 5: Run the focused tests and build**

Run: `npm test && npm run build && test -f dist/portfolio-data.js`

Expected: all content tests PASS, build prints `Built CHOI DEPT static site to dist/`, and `test -f` exits 0.

- [ ] **Step 6: Commit the content boundary**

```bash
git add package.json build.mjs portfolio-data.js tests/portfolio-data.test.mjs
git commit -m "Structure the public proof dataset" \
  -m "Constraint: Keep mixed Manus aggregates and private identifiers out of the client bundle" \
  -m "Confidence: high" \
  -m "Scope-risk: narrow" \
  -m "Tested: npm test and npm run build"
```

---

### Task 2: Replace the document with the semantic Identity OS shell

**Files:**
- Create: `tests/site-contract.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: the exported content in `portfolio-data.js` for enhancement.
- Produces: stable IDs `persona-panel`, `persona-image`, `persona-label`, `persona-title`, `persona-description`, `persona-chips`, `proof-ledger`, `selected-work`, `experience`, `profile`, and `contact`.
- Persona buttons use `[data-persona]`, `role="tab"`, `aria-controls="persona-panel"`, and `aria-selected`.

- [ ] **Step 1: Write the failing site contract**

```js
// tests/site-contract.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('ships the stable positioning and canonical metadata', () => {
  assert.match(html, /모두가 AI를 쉽게/);
  assert.match(html, /28K\+/);
  assert.match(html, /15M\+/);
  assert.match(html, /32/);
  assert.match(html, /<link rel="canonical" href="https:\/\/choidept\.com\/"/);
  assert.match(html, /<title>CHOI DEPT\. — 모두가 AI를 쉽게, 최피티<\/title>/);
});

test('contains semantic persona and portfolio landmarks', () => {
  for (const id of ['persona-panel', 'proof-ledger', 'selected-work', 'experience', 'profile', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.equal((html.match(/data-persona=/g) ?? []).length, 4);
  assert.match(html, /role="tablist"/);
  assert.match(html, /aria-live="polite"/);
});

test('loads the browser controller as a module', () => {
  assert.match(html, /<script type="module" src="\/script\.js"><\/script>/);
});
```

- [ ] **Step 2: Verify the contract fails against the old page**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL on the new title, Identity OS IDs, and module script.

- [ ] **Step 3: Replace the page structure**

Replace the current header with this navigation:

```html
<header class="site-header" aria-label="주요 메뉴">
  <a class="wordmark" href="#top" aria-label="CHOI DEPT 홈">CHOI DEPT.</a>
  <nav class="desktop-nav" aria-label="데스크톱 메뉴">
    <a href="#proof-ledger">PROOF</a>
    <a href="#selected-work">WORK</a>
    <a href="#experience">EXPERIENCE</a>
    <a class="nav-cta" href="mailto:hello@choidept.com">WORK WITH ME ↗</a>
  </nav>
  <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">MENU</button>
  <nav id="mobile-nav" class="mobile-nav" aria-label="모바일 메뉴">
    <a href="#proof-ledger">PROOF</a>
    <a href="#selected-work">WORK</a>
    <a href="#experience">EXPERIENCE</a>
    <a href="mailto:hello@choidept.com">WORK WITH ME ↗</a>
  </nav>
</header>
```

Replace the old `services`, generic work-grid, process, and about blocks with this semantic order:

```html
<main id="top">
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__copy">
      <p class="pixel-label">[ HELLO, I'M WOOJIN ]</p>
      <h1 id="hero-title">모두가 AI를 쉽게,<br><em>최피티.</em></h1>
      <p class="hero__lede">새로운 AI 제품을 사람들이 이해하고, 직접 써보고, 결과를 만들게 합니다.</p>
      <div class="hero__actions">
        <a class="button button--primary" href="#selected-work">SELECTED WORK</a>
        <a class="button button--glass" href="mailto:hello@choidept.com">B2B INQUIRY ↗</a>
      </div>
      <dl class="hero__metrics" aria-label="주요 성과">
        <div><dt>28K+</dt><dd>FOLLOWERS</dd></div>
        <div><dt>15M+</dt><dd>ORGANIC VIEWS</dd></div>
        <div><dt>32</dt><dd>BRAND COLLABORATIONS</dd></div>
      </dl>
    </div>

    <div class="identity-os" data-accent="creator">
      <div id="persona-panel" class="persona-scene" role="tabpanel" aria-live="polite">
        <p id="persona-label" class="pixel-label">MODE 01 / AI CREATOR</p>
        <img id="persona-image" src="/assets/characters/dark.webp" alt="검은 옷을 입고 태블릿을 든 최피티 픽셀 캐릭터" width="900" height="900">
        <div class="persona-copy">
          <h2 id="persona-title">AI Creator</h2>
          <p id="persona-description">복잡한 AI 워크플로를 누구나 바로 써볼 수 있는 한국어 콘텐츠로 바꿉니다.</p>
          <ul id="persona-chips" class="persona-chips"><li>28K+ FOLLOWERS</li><li>15M+ ORGANIC VIEWS</li><li>32 BRAND COLLABS</li></ul>
        </div>
      </div>
      <div class="mode-dock" role="tablist" aria-label="최우진의 네 가지 프로필">
        <button type="button" role="tab" data-persona="creator" aria-selected="true" aria-controls="persona-panel">01 <span>AI CREATOR</span></button>
        <button type="button" role="tab" data-persona="beauty" aria-selected="false" aria-controls="persona-panel">02 <span>BEAUTY</span></button>
        <button type="button" role="tab" data-persona="student" aria-selected="false" aria-controls="persona-panel">03 <span>STUDENT</span></button>
        <button type="button" role="tab" data-persona="kkami" aria-selected="false" aria-controls="persona-panel">04 <span>KKAMI</span></button>
      </div>
    </div>
  </section>

  <section id="proof-ledger" class="proof-ledger" aria-labelledby="proof-title">
    <p class="section-index">01 / PROOF LEDGER</p>
    <h2 id="proof-title">숫자는 맥락과 함께<br>보여줍니다.</h2>
    <div id="proof-list" class="proof-list"></div>
  </section>

  <section id="selected-work" class="selected-work" aria-labelledby="work-title">
    <p class="section-index">02 / SELECTED WORK</p>
    <h2 id="work-title">새로운 기술을<br>사람이 쓰는 결과로.</h2>
    <div id="case-list" class="case-list"></div>
  </section>

  <section id="experience" class="experience" aria-labelledby="experience-title">
    <p class="section-index">03 / EXPERIENCE</p>
    <h2 id="experience-title">콘텐츠, 성장, 운영,<br>그리고 연구.</h2>
    <ol id="experience-list" class="experience-list"></ol>
  </section>

  <section id="profile" class="profile" aria-labelledby="profile-title">
    <div class="profile-portraits" aria-hidden="true">
      <img src="/assets/characters/dark.webp" alt="" width="900" height="900">
      <img src="/assets/characters/field.webp" alt="" width="900" height="900">
      <img src="/assets/characters/hood.webp" alt="" width="900" height="900">
      <img src="/assets/characters/neutral.webp" alt="" width="900" height="900">
    </div>
    <div class="profile-copy">
      <p class="section-index">04 / PROFILE</p>
      <h2 id="profile-title">안녕하세요,<br>최우진입니다.</h2>
      <p>저는 새로운 AI를 어렵게 설명하기보다, 사람들이 직접 써보고 결과를 만들 수 있게 바꿉니다.</p>
      <p>Choi.GPT에서는 복잡한 기능을 짧고 실용적인 콘텐츠로 풀어내고, 기업에서는 콘텐츠·크리에이터·데이터를 연결해 실제 성장으로 이어지게 합니다.</p>
      <p>기술을 소개하는 사람보다, 사람들이 기술을 실제로 쓰게 만드는 사람에 가깝습니다.</p>
    </div>
  </section>

  <section id="contact" class="contact" aria-labelledby="contact-title">
    <p class="section-index">05 / CONTACT</p>
    <h2 id="contact-title">새로운 AI를 사람들이<br>실제로 쓰게 만들고 싶다면.</h2>
    <a class="contact__email" href="mailto:hello@choidept.com">LET'S WORK TOGETHER ↗</a>
    <nav aria-label="외부 프로필"><a href="https://www.linkedin.com/in/woojin-choi-a0989b24a/">LINKEDIN</a><a href="https://www.instagram.com/choi.gpt.ai/">INSTAGRAM</a></nav>
  </section>
</main>

<footer class="site-footer">
  <span>© 2026 CHOI DEPT.</span>
  <span>SEOUL / KOREA</span>
  <a href="#top">BACK TO TOP ↑</a>
</footer>
```

Use this exact title, description, canonical, and share metadata in `<head>`:

```html
<title>CHOI DEPT. — 모두가 AI를 쉽게, 최피티</title>
<meta name="description" content="AI 콘텐츠, 성장, 크리에이터 파트너십을 통해 새로운 AI 제품을 사람들이 실제로 쓰게 만드는 최우진의 포트폴리오.">
<link rel="canonical" href="https://choidept.com/">
<link rel="icon" type="image/svg+xml" href="/public/favicon.svg">
<meta property="og:title" content="CHOI DEPT. — 모두가 AI를 쉽게, 최피티">
<meta property="og:description" content="AI 콘텐츠, 성장, 크리에이터 파트너십을 통해 새로운 AI 제품을 사람들이 실제로 쓰게 만듭니다.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://choidept.com/">
<meta property="og:image" content="https://choidept.com/public/og.svg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="CHOI DEPT. — 모두가 AI를 쉽게, 최피티">
<meta name="twitter:description" content="AI 콘텐츠, 성장, 크리에이터 파트너십을 통해 새로운 AI 제품을 사람들이 실제로 쓰게 만듭니다.">
<meta name="twitter:image" content="https://choidept.com/public/og.svg">
```

Change the final script tag to:

```html
<script type="module" src="/script.js"></script>
```

- [ ] **Step 4: Run the site contract**

Run: `node --test tests/site-contract.test.mjs`

Expected: 3 tests PASS.

- [ ] **Step 5: Commit the semantic shell**

```bash
git add index.html tests/site-contract.test.mjs
git commit -m "Reframe the portfolio around identity and proof" \
  -m "Constraint: Keep headline proof readable without JavaScript" \
  -m "Confidence: high" \
  -m "Scope-risk: moderate" \
  -m "Tested: node --test tests/site-contract.test.mjs"
```

---

### Task 3: Implement accessible persona and content rendering

**Files:**
- Create: `tests/ui-state.test.mjs`
- Modify: `ui-state.js`
- Modify: `script.js`

**Interfaces:**
- Consumes: `personas`, `headlineMetrics`, `cases`, `experience`, and `links` from `portfolio-data.js`.
- Consumes: `nextPersonaIndex(current: number, key: string, length: number): number` from `ui-state.js`.
- Produces: `applyPersona(index: number, options?: { focus?: boolean }): void` inside `script.js`.

- [ ] **Step 1: Add failing navigation tests**

```js
// tests/ui-state.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { nextPersonaIndex, wrapIndex } from '../ui-state.js';

test('wraps persona indices', () => {
  assert.equal(wrapIndex(4, 4), 0);
  assert.equal(wrapIndex(-1, 4), 3);
});

test('maps directional and boundary keys', () => {
  assert.equal(nextPersonaIndex(0, 'ArrowRight', 4), 1);
  assert.equal(nextPersonaIndex(0, 'ArrowLeft', 4), 3);
  assert.equal(nextPersonaIndex(2, 'Home', 4), 0);
  assert.equal(nextPersonaIndex(1, 'End', 4), 3);
  assert.equal(nextPersonaIndex(2, 'Enter', 4), 2);
});
```

- [ ] **Step 2: Run the focused unit test**

Run: `node --test tests/ui-state.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `ui-state.js`.

- [ ] **Step 3: Create the pure navigation helper and add it to the build**

```js
// ui-state.js
export function wrapIndex(index, length) {
  return ((index % length) + length) % length;
}

export function nextPersonaIndex(current, key, length) {
  if (key === 'Home') return 0;
  if (key === 'End') return length - 1;
  if (key === 'ArrowRight' || key === 'ArrowDown') return wrapIndex(current + 1, length);
  if (key === 'ArrowLeft' || key === 'ArrowUp') return wrapIndex(current - 1, length);
  return current;
}
```

Add to `build.mjs` after the `portfolio-data.js` copy:

```js
await cp('ui-state.js', 'dist/ui-state.js');
```

Run: `node --test tests/ui-state.test.mjs`

Expected: 2 tests PASS.

- [ ] **Step 4: Replace `script.js` with the controller**

```js
import { personas, headlineMetrics, cases, experience } from './portfolio-data.js';
import { nextPersonaIndex } from './ui-state.js';

const byId = (id) => document.getElementById(id);
const personaButtons = [...document.querySelectorAll('[data-persona]')];
const identityOs = document.querySelector('.identity-os');
const personaImage = byId('persona-image');
const personaLabel = byId('persona-label');
const personaTitle = byId('persona-title');
const personaDescription = byId('persona-description');
const personaChips = byId('persona-chips');
let activePersonaIndex = 0;

function listItems(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function applyPersona(index, { focus = false } = {}) {
  const persona = personas[index];
  if (!persona) return;
  activePersonaIndex = index;
  identityOs.dataset.accent = persona.accent;
  personaImage.classList.add('is-changing');
  window.setTimeout(() => {
    personaImage.src = persona.image;
    personaImage.alt = persona.alt;
    personaLabel.textContent = `MODE ${persona.index} / ${persona.label}`;
    personaTitle.textContent = persona.title;
    personaDescription.textContent = persona.description;
    personaChips.innerHTML = listItems(persona.chips);
    personaImage.classList.remove('is-changing');
  }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 140);
  personaButtons.forEach((button, buttonIndex) => {
    const selected = buttonIndex === index;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
  });
  if (focus) personaButtons[index].focus();
}

personaButtons.forEach((button, index) => {
  button.addEventListener('click', () => applyPersona(index));
  button.addEventListener('keydown', (event) => {
    const next = nextPersonaIndex(activePersonaIndex, event.key, personas.length);
    if (next === activePersonaIndex && !['Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    applyPersona(next, { focus: true });
  });
});

byId('proof-list').innerHTML = headlineMetrics.map((metric) => `
  <article class="proof-row">
    <strong>${metric.value}</strong><span>${metric.label}</span><small>${metric.context}</small>
  </article>`).join('');

byId('case-list').innerHTML = cases.map((item) => `
  <article class="case-file case-file--${item.id}">
    <header><span>${item.number}</span><p>${item.eyebrow}</p></header>
    <h3>${item.title}</h3>
    <dl>
      <div><dt>CONTEXT</dt><dd>${item.context}</dd></div>
      <div><dt>RESPONSIBILITY</dt><dd>${item.responsibility}</dd></div>
      <div><dt>SYSTEM</dt><dd>${item.system}</dd></div>
      <div><dt>RESULT</dt><dd>${item.result}</dd></div>
    </dl>
    <footer>${item.links.map((link) => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label} ↗</a>`).join('')}</footer>
  </article>`).join('');

byId('experience-list').innerHTML = experience.map((item) => `
  <li data-type="${item.type}">
    <time>${item.period}</time><div><strong>${item.role}</strong><span>${item.organization}</span></div><small>${item.status}</small>
  </li>`).join('');

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = byId('mobile-nav');
menuToggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'CLOSE' : 'MENU';
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'MENU';
}));

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
}

applyPersona(0);
```

- [ ] **Step 5: Run all unit and contract tests**

Run: `npm test`

Expected: all tests PASS with no DOM required by the pure state tests.

- [ ] **Step 6: Commit the accessible controller**

```bash
git add script.js ui-state.js tests/ui-state.test.mjs
git commit -m "Make the identity modes keyboard operable" \
  -m "Constraint: Preserve complete hero meaning before interaction" \
  -m "Confidence: high" \
  -m "Scope-risk: moderate" \
  -m "Tested: npm test"
```

---

### Task 4: Build the Apple-material and pixel-label visual system

**Files:**
- Modify: `styles.css`

**Interfaces:**
- Consumes: all class names and `data-accent` values created in Tasks 2–3.
- Produces: responsive layouts at `1200px`, `900px`, and `768px`; visible keyboard focus; reduced-motion override.

- [ ] **Step 1: Add a static CSS contract test**

Append to `tests/site-contract.test.mjs`:

```js
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

test('defines brand tokens, persona accents, responsive layouts, and reduced motion', () => {
  for (const token of ['--ink: #111111', '--ivory: #f7f4ec', '--cobalt: #3157ff']) {
    assert.ok(css.toLowerCase().includes(token));
  }
  for (const selector of ['[data-accent="creator"]', '[data-accent="beauty"]', '[data-accent="student"]', '[data-accent="kkami"]']) {
    assert.ok(css.includes(selector));
  }
  assert.match(css, /@media \(max-width: 768px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
});
```

- [ ] **Step 2: Verify the CSS contract fails**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL because the old stylesheet does not define the four persona accents or the required token syntax.

- [ ] **Step 3: Replace the old stylesheet using these exact foundations**

Begin `styles.css` with:

```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

:root {
  --ink: #111111;
  --ivory: #f7f4ec;
  --cobalt: #3157ff;
  --paper: rgba(255, 255, 255, 0.72);
  --line: rgba(17, 17, 17, 0.14);
  --muted: rgba(17, 17, 17, 0.62);
  --radius-lg: 32px;
  --radius-md: 20px;
  --shadow-soft: 0 24px 80px rgba(26, 28, 38, 0.12);
  --page: min(1440px, calc(100vw - 48px));
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--ivory); }
body { margin: 0; color: var(--ink); background: var(--ivory); font-family: Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
a { color: inherit; }
img { display: block; max-width: 100%; }
button, a { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 3px solid var(--cobalt); outline-offset: 4px; }
.pixel-label, .section-index, .mode-dock { font-family: "SFMono-Regular", Consolas, monospace; letter-spacing: 0.08em; text-transform: uppercase; }
```

Continue the replacement stylesheet with these exact layout rules:

```css
.site-header { position: sticky; top: 16px; z-index: 20; width: var(--page); margin: 16px auto 0; display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid rgba(255,255,255,.7); border-radius: 18px; background: rgba(247,244,236,.72); backdrop-filter: blur(22px) saturate(140%); }
.wordmark { font-weight: 900; letter-spacing: -.04em; text-decoration: none; }
.desktop-nav { display: flex; align-items: center; gap: 24px; font: 11px/1 "SFMono-Regular", monospace; }
.desktop-nav a, .mobile-nav a { text-decoration: none; }
.nav-cta { padding: 10px 14px; border-radius: 999px; color: white; background: var(--ink); }
.menu-toggle { display: none; border: 0; background: transparent; font: 11px/1 "SFMono-Regular", monospace; }
.mobile-nav { position: absolute; top: calc(100% + 8px); left: 0; right: 0; display: none; padding: 18px; border: 1px solid var(--line); border-radius: 18px; background: var(--ivory); box-shadow: var(--shadow-soft); }
.mobile-nav.is-open { display: grid; gap: 16px; }
.hero { width: var(--page); min-height: calc(100svh - 96px); margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(420px, .92fr); gap: clamp(28px, 5vw, 88px); align-items: center; padding: 72px 0 64px; }
.hero h1 { margin: 18px 0 24px; font-size: clamp(64px, 8vw, 132px); line-height: .9; letter-spacing: -.075em; }
.hero h1 em { color: var(--cobalt); font-style: normal; }
.hero__lede { max-width: 620px; color: var(--muted); font-size: clamp(18px, 2vw, 25px); line-height: 1.55; }
.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.button { display: inline-flex; min-height: 48px; align-items: center; justify-content: center; padding: 0 20px; border: 1px solid var(--line); border-radius: 999px; text-decoration: none; font-weight: 750; }
.button--primary { color: white; background: var(--ink); }
.button--glass { background: rgba(255,255,255,.55); backdrop-filter: blur(16px); }
.hero__metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin: 46px 0 0; border: 1px solid var(--line); background: var(--line); }
.hero__metrics div { padding: 18px; background: var(--ivory); }
.hero__metrics dt { font-size: clamp(28px, 4vw, 48px); font-weight: 850; letter-spacing: -.05em; }
.hero__metrics dd { margin: 5px 0 0; color: var(--muted); font: 11px/1.3 "SFMono-Regular", monospace; }
.identity-os { --accent: var(--cobalt); position: relative; padding: 18px; border: 1px solid rgba(255,255,255,.8); border-radius: 36px; background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 18%, white), rgba(255,255,255,.52)); box-shadow: var(--shadow-soft); overflow: hidden; }
[data-accent="creator"] { --accent: #3157ff; }
[data-accent="beauty"] { --accent: #e9a9a1; }
[data-accent="student"] { --accent: #88aee8; }
[data-accent="kkami"] { --accent: #8daa86; }
.persona-scene { position: relative; min-height: 650px; display: grid; grid-template-rows: auto 1fr auto; padding: 18px; border-radius: 26px; background: radial-gradient(circle at 70% 20%, rgba(255,255,255,.92), transparent 38%), rgba(255,255,255,.32); overflow: hidden; }
.persona-scene::before { content: ""; position: absolute; inset: 18% -20% -35% 10%; background: var(--accent); filter: blur(90px); opacity: .25; border-radius: 50%; }
#persona-image { position: relative; z-index: 1; align-self: end; justify-self: center; width: min(94%, 560px); transition: opacity .18s ease, transform .32s cubic-bezier(.2,.7,.2,1); }
#persona-image.is-changing { opacity: 0; transform: translateY(10px) scale(.985); }
.persona-copy { position: relative; z-index: 2; padding: 20px; border: 1px solid rgba(255,255,255,.72); border-radius: 20px; background: rgba(247,244,236,.66); backdrop-filter: blur(18px); }
.persona-copy h2 { margin: 0 0 8px; font-size: clamp(28px, 4vw, 48px); letter-spacing: -.045em; }
.persona-copy p { margin: 0; color: var(--muted); line-height: 1.55; }
.persona-chips { display: flex; flex-wrap: wrap; gap: 7px; padding: 0; margin: 16px 0 0; list-style: none; }
.persona-chips li { padding: 7px 10px; border: 1px solid var(--line); border-radius: 999px; background: rgba(255,255,255,.58); font: 10px/1 "SFMono-Regular", monospace; }
.mode-dock { display: grid; grid-template-columns: repeat(4, 1fr); gap: 7px; margin-top: 10px; padding: 7px; border-radius: 18px; background: rgba(17,17,17,.88); backdrop-filter: blur(18px); }
.mode-dock button { min-width: 0; padding: 12px 8px; border: 0; border-radius: 12px; color: rgba(255,255,255,.58); background: transparent; font: inherit; cursor: pointer; }
.mode-dock button span { display: block; margin-top: 4px; overflow: hidden; text-overflow: ellipsis; font-size: 9px; }
.mode-dock button[aria-selected="true"] { color: var(--ink); background: var(--ivory); }
.proof-ledger, .selected-work, .experience, .profile, .contact { width: var(--page); margin: 0 auto; padding: clamp(96px, 12vw, 180px) 0; }
.proof-ledger h2, .selected-work h2, .experience h2, .profile h2, .contact h2 { max-width: 950px; margin: 18px 0 54px; font-size: clamp(46px, 7vw, 96px); line-height: .98; letter-spacing: -.065em; }
.proof-list { border-top: 1px solid var(--line); }
.proof-row { display: grid; grid-template-columns: .6fr 1fr 1fr; align-items: baseline; gap: 20px; padding: 22px 0; border-bottom: 1px solid var(--line); }
.proof-row strong { font-size: clamp(38px, 6vw, 78px); letter-spacing: -.06em; }
.proof-row span { font-weight: 750; }
.proof-row small { color: var(--muted); }
.case-list { display: grid; gap: 22px; }
.case-file { min-height: 72vh; padding: clamp(28px, 5vw, 72px); border: 1px solid var(--line); border-radius: var(--radius-lg); background: #fffdf8; box-shadow: 0 16px 60px rgba(17,17,17,.06); }
.case-file--choigpt { background: linear-gradient(140deg, #eef1ff, #fffdf8 62%); }
.case-file--beauty-growth { background: linear-gradient(140deg, #f8e8e3, #fffdf8 62%); }
.case-file--creator-ops { background: linear-gradient(140deg, #e8efe6, #fffdf8 62%); }
.case-file header { display: flex; justify-content: space-between; font-family: "SFMono-Regular", monospace; }
.case-file h3 { max-width: 800px; margin: 12vh 0 48px; font-size: clamp(44px, 7vw, 94px); line-height: .95; letter-spacing: -.06em; }
.case-file dl { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.case-file dl div { padding: 22px; background: rgba(255,255,255,.72); }
.case-file dt { margin-bottom: 10px; color: var(--muted); font: 10px/1 "SFMono-Regular", monospace; }
.case-file dd { margin: 0; line-height: 1.55; }
.case-file footer { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 28px; }
.experience-list { margin: 0; padding: 0; border-top: 1px solid var(--line); list-style: none; }
.experience-list li { display: grid; grid-template-columns: 180px 1fr 260px; gap: 24px; padding: 24px 0; border-bottom: 1px solid var(--line); }
.experience-list strong, .experience-list span { display: block; }
.experience-list span, .experience-list small { color: var(--muted); }
.profile { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(40px, 8vw, 120px); align-items: center; }
.profile-portraits { min-height: 720px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; border: 1px solid var(--line); border-radius: var(--radius-lg); background: var(--line); overflow: hidden; }
.profile-portraits img { width: 100%; height: 100%; min-height: 0; object-fit: contain; background: radial-gradient(circle at 50% 28%, white, #e7e4dc); }
.profile-copy p { max-width: 720px; color: var(--muted); font-size: clamp(18px, 2vw, 24px); line-height: 1.7; }
.contact { min-height: 86vh; display: flex; flex-direction: column; justify-content: center; }
.contact__email { align-self: flex-start; font-size: clamp(22px, 3vw, 40px); text-underline-offset: 8px; }
.contact nav { display: flex; gap: 20px; margin-top: 40px; font-family: "SFMono-Regular", monospace; }
.site-footer { width: var(--page); margin: 0 auto; display: flex; justify-content: space-between; gap: 20px; padding: 28px 0 42px; border-top: 1px solid var(--line); color: var(--muted); font: 10px/1.4 "SFMono-Regular", monospace; }
.site-footer a { color: inherit; }
```

Add responsive and reduced-motion behavior:

```css
@media (max-width: 1199px) {
  :root { --page: min(100% - 36px, 1100px); }
  .hero { grid-template-columns: 1fr 440px; }
  .persona-scene { min-height: 580px; }
}

@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; }
  .identity-os { max-width: 680px; width: 100%; margin: 0 auto; }
  .profile { grid-template-columns: 1fr; }
  .profile-portraits { min-height: 560px; }
}

@media (max-width: 768px) {
  :root { --page: calc(100% - 24px); --radius-lg: 24px; }
  .desktop-nav { display: none; }
  .menu-toggle { display: block; }
  .hero { min-height: auto; padding-top: 72px; }
  .hero h1 { font-size: clamp(56px, 18vw, 84px); }
  .hero__metrics { grid-template-columns: 1fr; }
  .persona-scene { min-height: 520px; }
  .mode-dock { grid-template-columns: repeat(4, minmax(76px, 1fr)); overflow-x: auto; scroll-snap-type: x mandatory; }
  .mode-dock button { scroll-snap-align: start; }
  .proof-row { grid-template-columns: 1fr 1fr; }
  .proof-row small { grid-column: 1 / -1; }
  .case-file { min-height: auto; }
  .case-file h3 { margin-top: 80px; }
  .case-file dl { grid-template-columns: 1fr; }
  .experience-list li { grid-template-columns: 1fr; gap: 8px; }
  .profile-portraits { min-height: 440px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 4: Run the static contract and build**

Run: `npm test && npm run build`

Expected: all tests PASS and the build completes.

- [ ] **Step 5: Commit the visual system**

```bash
git add styles.css tests/site-contract.test.mjs
git commit -m "Give each identity mode a restrained material system" \
  -m "Rejected: Uniform glass-card grid | obscures hierarchy and looks template-generated" \
  -m "Confidence: medium" \
  -m "Scope-risk: broad" \
  -m "Tested: npm test and npm run build" \
  -m "Not-tested: final browser rendering"
```

---

### Task 5: Finish sharing artwork and production metadata

**Files:**
- Modify: `public/og.svg`
- Modify: `public/favicon.svg`
- Modify: `robots.txt`
- Modify: `sitemap.xml`
- Modify: `tests/site-contract.test.mjs`

**Interfaces:**
- Produces: public, absolute OG metadata at `https://choidept.com/public/og.svg` and canonical crawl files for `https://choidept.com/`.

- [ ] **Step 1: Add metadata assertions**

Append to `tests/site-contract.test.mjs`:

```js
test('uses absolute share metadata and the apex domain', () => {
  assert.match(html, /property="og:image" content="https:\/\/choidept\.com\/public\/og\.svg"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.equal(html.includes('www.choidept.com'), false);
});
```

- [ ] **Step 2: Replace `public/og.svg` with the approved composition**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">CHOI DEPT — 모두가 AI를 쉽게, 최피티</title>
  <desc id="desc">아이보리 배경 위 코발트 포인트와 최피티 캐릭터가 있는 공유 이미지</desc>
  <rect width="1200" height="630" fill="#F7F4EC"/>
  <circle cx="970" cy="160" r="270" fill="#3157FF" opacity=".16"/>
  <rect x="54" y="48" width="1092" height="534" rx="34" fill="none" stroke="#111111" stroke-opacity=".18"/>
  <image href="../assets/characters/dark.webp" x="760" y="95" width="380" height="480" preserveAspectRatio="xMidYMid meet"/>
  <text x="90" y="118" fill="#111111" font-family="Arial, sans-serif" font-size="25" font-weight="700">CHOI DEPT.</text>
  <text x="90" y="288" fill="#111111" font-family="Arial, sans-serif" font-size="78" font-weight="800">모두가 AI를 쉽게,</text>
  <text x="90" y="386" fill="#3157FF" font-family="Arial, sans-serif" font-size="102" font-weight="900">최피티.</text>
  <text x="94" y="476" fill="#111111" fill-opacity=".62" font-family="Arial, sans-serif" font-size="24">AI CONTENT · GROWTH · CREATOR PARTNERSHIPS</text>
  <text x="94" y="530" fill="#111111" font-family="monospace" font-size="18">CHOIDEPT.COM</text>
</svg>
```

Replace `public/favicon.svg` with this dependency-free mark:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="CHOI DEPT favicon">
  <rect width="64" height="64" rx="15" fill="#111111"/>
  <path d="M42 19H27c-7.2 0-12 5.2-12 13s4.8 13 12 13h15v-8H28c-3 0-5-1.8-5-5s2-5 5-5h14z" fill="#F7F4EC"/>
  <rect x="42" y="37" width="8" height="8" fill="#3157FF"/>
</svg>
```

- [ ] **Step 3: Normalize robots and sitemap**

`robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://choidept.com/sitemap.xml
```

`sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://choidept.com/</loc></url>
</urlset>
```

- [ ] **Step 4: Run all checks**

Run: `npm run check && rg -n 'www\.choidept\.com|official OpenAI partner|PRIVATE|CONFIDENTIAL|010-[0-9]' dist`

Expected: `npm run check` succeeds and `rg` returns no matches.

- [ ] **Step 5: Commit metadata and artwork**

```bash
git add public/og.svg public/favicon.svg robots.txt sitemap.xml tests/site-contract.test.mjs
git commit -m "Align sharing metadata with the identity system" \
  -m "Constraint: Keep choidept.com as the only canonical host" \
  -m "Confidence: high" \
  -m "Scope-risk: narrow" \
  -m "Tested: npm run check and private-claim scan"
```

---

### Task 6: Perform desktop, mobile, keyboard, and production verification

**Files:**
- Modify only when verification reveals a concrete defect: `index.html`, `styles.css`, `script.js`, `portfolio-data.js`

**Interfaces:**
- Consumes: completed static build from Tasks 1–5.
- Produces: a browser-verified branch ready for user visual review; production remains unchanged until approved and merged to `main`.

- [ ] **Step 1: Run the complete automated check**

Run: `npm run check`

Expected: all Node tests PASS and `dist/` is rebuilt without errors.

- [ ] **Step 2: Start the production build locally**

Run: `python3 -m http.server 4173 --directory dist`

Expected: server listens on `http://127.0.0.1:4173/`.

- [ ] **Step 3: Verify desktop rendering at 1440×1000**

Using the in-app browser, open `http://127.0.0.1:4173/` and verify:

- Tagline, lede, three metrics, character scene, and both actions appear in the first viewport.
- Each persona button changes image, label, description, chips, and accent.
- No image is stretched or clipped through the face.
- Proof ledger, three case files, experience, profile, and contact render in order.
- No horizontal scrollbar appears.

Expected: all checks pass; capture a screenshot for visual inspection but do not commit it.

- [ ] **Step 4: Verify mobile rendering at 390×844**

Using the in-app browser mobile viewport, verify:

- Copy and three proof metrics precede the character scene.
- The four-mode dock is touch-scrollable and no label is unreachable.
- Case definitions stack vertically.
- Header/menu and contact action do not cover content.
- There is no horizontal page overflow.

Expected: all checks pass; capture a mobile screenshot for visual inspection but do not commit it.

- [ ] **Step 5: Verify keyboard and reduced-motion behavior**

Keyboard sequence:

1. Tab to the active persona.
2. Press ArrowRight twice; Student becomes selected.
3. Press End; Kkami becomes selected.
4. Press Home; AI Creator becomes selected.
5. Continue tabbing; every link and menu control has a visible focus indicator.

Reduced motion:

1. Emulate `prefers-reduced-motion: reduce`.
2. Switch personas and navigate anchors.
3. Confirm transitions are effectively immediate and content remains readable.

Expected: selection and focus follow the WAI-ARIA tab pattern, and no essential content depends on animation.

- [ ] **Step 6: Run live-domain regression after user approval and merge**

After the user approves the local screenshots, merge this branch into `main`, push it, wait for Cloudflare Pages to deploy, then run:

```bash
git switch main
git pull --ff-only origin main
git merge --ff-only codex/identity-os-redesign
git push origin main
curl -I https://choidept.com/
curl -I 'https://www.choidept.com/test-path?source=verify'
```

Expected: apex returns HTTP 200; `www` returns HTTP 301 to `https://choidept.com/test-path?source=verify` with the query string preserved.

- [ ] **Step 7: Commit only concrete verification fixes**

If browser verification required edits:

```bash
git add index.html styles.css script.js portfolio-data.js
git commit -m "Resolve identity-system browser defects" \
  -m "Confidence: high" \
  -m "Scope-risk: narrow" \
  -m "Tested: npm run check plus desktop mobile keyboard and reduced-motion review"
```

If no files changed, do not create an empty commit.

---

## Final completion evidence

Before reporting completion, retain these observed results in the final handoff:

- `npm run check` output.
- Desktop and mobile visual inspection result.
- Keyboard and reduced-motion result.
- `git status --short --branch` showing the expected branch state.
- Cloudflare Pages deployment status after merge.
- Apex HTTP 200 and `www` HTTP 301 regression results.
