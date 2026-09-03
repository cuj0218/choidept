# CHOI DEPT Identity OS + Proof Ledger Design

## Status

Approved direction: **A — Identity OS + Proof Ledger**

This document replaces the first-pass flat B2B portfolio direction as the source of truth for the redesign. The existing Cloudflare Pages, DNS, SSL, and root-domain redirect setup remain unchanged.

## Product goal

Turn `choidept.com` into a personal business portfolio that makes one promise immediately clear:

> 모두가 AI를 쉽게, 최피티.

The site should present Woojin Choi as an AI evangelist who turns unfamiliar AI products into content, creator programs, growth systems, and practical workflows that people can actually adopt. It must work for both company decision-makers and consumer audiences without feeling like a generic agency landing page or an AI-generated template.

The primary conversion is a qualified B2B conversation. The secondary conversion is deeper exploration of Choi.GPT content and professional experience.

## Audience and first-viewport test

Primary audiences:

- Global AI companies entering or growing in Korea and Japan.
- Beauty and consumer brands that need short-form content, creator partnerships, and performance-led iteration.
- Teams looking for practical AI education, creator operations, localization, or research support.
- Collaborators evaluating Woojin's mix of content instincts, operating experience, and technical research.

Within five seconds, a visitor should understand:

1. The memorable line: `모두가 AI를 쉽게, 최피티.`
2. The professional meaning: AI content, growth, and creator partnerships.
3. The proof: `28K+ followers`, `15M+ organic views`, and `32 brand collaborations`.
4. The action: view selected cases or start a B2B conversation.

## Reference translation

The redesign takes mechanisms, not visual copies, from the references.

| Reference | Mechanism to retain | CHOI DEPT translation |
| --- | --- | --- |
| cyhuh.com | Character sheet, inventory, playful identity discovery | Four identity modes that change the hero environment and reveal different evidence |
| Maria Vasilyeva | Projects as a spatial, interactive sequence | A horizontal proof rail on desktop and snap-scrolling case stack on mobile |
| Odyssée | Full-bleed visual confidence, restrained type, generous whitespace | Large persona imagery, editorial copy blocks, soft cinematic surfaces |
| Apple product pages | Clear hierarchy, material depth, restrained motion | Frosted control dock, crisp typography, intentional transitions, no decorative clutter |
| Dribbble pixel portfolios | Pixel labels and game-like status language | Pixel font only for micro-labels, counters, tooltips, and mode names |

The site must not reproduce another site's source, exact composition, custom illustration, copy, or animation sequence.

## Core experience: the Identity OS

The top of the page behaves like a personal operating system rather than a conventional hero carousel.

### Persistent shell

- A calm ivory canvas with a near-black top bar or floating navigation rail.
- `CHOI DEPT.` wordmark at the left.
- Compact section links: `PROFILE`, `PROOF`, `EXPERIENCE`, `CONTACT`.
- A direct `WORK WITH ME` action, always visible on desktop and placed in the mobile menu plus final CTA.
- A small system-status label such as `SEOUL / AVAILABLE FOR SELECT PROJECTS`; availability text must remain editable and should not promise capacity unless current.

### Hero composition

Desktop uses an asymmetric two-column composition:

- Left: positioning, greeting, proof metrics, and primary actions.
- Right: the active character presented as a substantial portrait scene, not a small decorative sticker.
- Bottom or lower-right: a glass mode dock with four character thumbnails and short mode names.

Hero copy:

```text
[HELLO, I'M WOOJIN]

모두가 AI를 쉽게,
최피티.

새로운 AI 제품을 사람들이 이해하고,
직접 써보고, 결과를 만들게 합니다.

[SELECTED WORK]  [B2B INQUIRY]
```

Proof strip:

```text
28K+ FOLLOWERS  /  15M+ ORGANIC VIEWS  /  32 BRAND COLLABORATIONS
```

### Four identity modes

The four supplied character images remain recognizably the same assets but receive distinct layout, copy, accent color, metadata, and background treatment.

#### 1. AI Creator

- Character: dark outfit / device image.
- Accent: cobalt and graphite.
- Label: `MODE 01 / AI CREATOR`.
- Message: turns complex AI workflows into useful Korean content.
- Proof chips: `28K+ FOLLOWERS`, `15M+ ORGANIC VIEWS`, `32 BRANDS`.
- Supporting items: short-form video, carousel, practical guide, creative experiment.

#### 2. Beauty Influencer

- Character: beige cardigan / beauty-device image.
- Accent: blush, warm champagne, and ivory.
- Label: `MODE 02 / BEAUTY & GROWTH`.
- Message: connects creative execution with audience and performance signals.
- Proof chips: `160K MONTHLY VIEWS`, `+500% TIKTOK`, `113K REACH`.
- Supporting brands: CNP, ISA KNOX, Himalaya Pink Salt, and Imprintu, clearly labeled as work within LG H&H rather than personal Choi.GPT clients.

#### 3. University Student

- Character: hoodie / jeans image.
- Accent: cool blue and paper white.
- Label: `MODE 03 / STUDENT & RESEARCHER`.
- Message: combines media communication, data analytics, and executable AI research.
- Proof chips: `MEDIA + DATA`, `GPA 4.0 / 4.5`, `2024–2028`.
- Supporting item: Team Computer research, explicitly labeled `PROTOTYPE / PILOT CALIBRATION`.

#### 4. Kkami's Dad

- Character: character with the black dog.
- Accent: sage, cream, and soft charcoal.
- Label: `MODE 04 / KKAMI'S DAD`.
- Message: the human layer—curiosity, everyday experimentation, and life outside dashboards.
- No fabricated performance metrics.
- Supporting items should remain personal and compact: Kkami, daily observation, travel, and the habit of testing tools in ordinary life.

### Mode transition behavior

Selecting a mode changes only purposeful elements:

- Character image and its crop/scale.
- Accent light and background material.
- Mode label, one-sentence description, and up to three evidence chips.
- Contextual floating objects or labels built from CSS/SVG primitives and existing user assets.

The main headline remains stable to protect comprehension and SEO. The transition uses a short crossfade, vertical text shift, and subtle background interpolation. No long preloader, sound, custom cursor dependency, or scroll hijacking.

Keyboard behavior:

- Mode dock uses real buttons.
- Arrow keys move between modes when the dock is focused.
- Focus state is clearly visible.
- The selected mode is exposed with `aria-pressed` or tab semantics.

## Narrative flow

### 1. Hero / Identity OS

Establish the promise, four identities, top proof, and actions.

### 2. Proof Ledger

An editorial ledger makes every major number traceable to a work context instead of placing random counters on the page.

Recommended visible ledger:

| Metric | Context | Publication state |
| --- | --- | --- |
| 28K+ followers | Choi.GPT public Instagram profile | Ready |
| 15M+ organic views | Choi.GPT public professional profile | Ready |
| 32 brand collaborations | Choi.GPT professional profile | Ready, logos only when separately evidenced |
| 160K monthly account views | Imprintu / LG H&H work | Ready |
| +500% global TikTok views | Imprintu first three months | Ready |
| 113K+ reached / 9K+ interactions | Selected LG H&H short-form campaign | Ready |
| 7.6K views / 14+ watch hours | Generative AI beauty-ad experiment | Ready |
| 7.38M views / 137K saves / 11 qualified creators | Confirmed old Manus operating cycle | Needs explicit publication approval |
| Internal Manus program aggregates | Mixed admin reporting | Internal only; do not publish as a settled cycle |

Payout amounts, contract terms, private creator identities, personal phone numbers, tax details, and internal dashboard screenshots are excluded.

### 3. Selected work

Use three large case files rather than a dense grid.

#### Case 01 — Choi.GPT Content Lab

- Question: How can unfamiliar AI products feel immediately useful to Korean audiences?
- Role: Creator, researcher, scriptwriter, designer, editor, and performance analyst.
- Work: short-form videos, carousels, guides, and creative experiments.
- Results: 28K+ followers, 15M+ organic views, 32 brand collaborations.
- Public examples: Newtake PR short film, Morphic advertisement, and Manus partner content.

#### Case 02 — North America Beauty Growth

- Context: LG Household & Health Care, North America marketing.
- Role: short-form content, creator partnerships, e-commerce support, and performance analysis.
- Results: 160K monthly account views, 500% TikTok-view growth in three months, and a campaign with 113K+ reach and 9K+ interactions.
- Visual treatment: editorial beauty layout using abstract product-color fields and approved/public assets only; do not scrape or reuse brand campaign photography without rights.

#### Case 03 — Korea/Japan Creator Operations

- Context: Manus Creator Program.
- Role: sourcing, fit checks, outreach, onboarding, localization, content review, and day-to-day operations.
- Operating model: `SOURCE → QUALIFY → ONBOARD → REVIEW → MEASURE`.
- Evidence: verified 50-candidate workbook and 138-profile expansion review.
- Optional performance line: confirmed cycle metrics only after publication approval.

Each case follows a consistent evidence model:

```text
CONTEXT / RESPONSIBILITY / SYSTEM / RESULT / WHAT CHANGED
```

No client quote, testimonial, logo wall, or award badge is invented.

### 4. Experience timeline

Use a restrained chronological line with expandable entries:

- `2026–PRESENT` — Creator & Builder, Choi.GPT.
- `2026` — Manus AI Viral Coach, MuseOn.AI; Korea/Japan creator operations.
- `2025–2026` — Global Marketing — North America, LG Household & Health Care.
- `2024–2028` — Incheon National University, Media Communication & Data Analytics.
- `PROTOTYPE` — Team Computer, Harness Benchmark & Implementation Lead.

The timeline differentiates employment, freelance work, education, and research status visually. It must not imply that prototype research is a published production system.

### 5. Personal profile

Use a large conversational block next to a composite of the four character images.

Approved draft:

> 안녕하세요, 최우진입니다. 저는 새로운 AI를 어렵게 설명하기보다, 사람들이 직접 써보고 결과를 만들 수 있게 바꿉니다.
>
> Choi.GPT에서는 복잡한 기능을 짧고 실용적인 콘텐츠로 풀어내고, 기업에서는 콘텐츠·크리에이터·데이터를 연결해 실제 성장으로 이어지게 합니다. 북미 뷰티 시장의 마케팅부터 한국과 일본의 AI 크리에이터 프로그램 운영, AI 에이전트 연구까지 서로 다른 현장을 오가며 일해왔습니다.
>
> 기술을 소개하는 사람보다, 사람들이 기술을 실제로 쓰게 만드는 사람에 가깝습니다.

### 6. Contact

- Primary line: `새로운 AI를 사람들이 실제로 쓰게 만들고 싶다면.`
- Primary action: existing work email via `mailto:`.
- Secondary links: LinkedIn and `@choi.gpt.ai`.
- No inquiry form in this redesign unless a privacy notice, collection purpose, retention period, and backend provider are separately approved.

## Visual system

### Palette

- `Ink`: `#111111`
- `Ivory`: `#F7F4EC`
- `Cobalt`: `#3157FF`
- `Glass`: translucent ivory/white with restrained blur
- Persona accents: champagne blush, research blue, and Kkami sage

Use gradients as ambient light, never as rainbow text or generic AI decoration.

### Typography

- Korean/body/UI: Pretendard Variable with a system-sans fallback.
- English display: a clean grotesk/system face with strong weight contrast.
- Pixel face: one web-safe or self-hosted Korean/Latin pixel font used only for labels such as `MODE 01`, section indices, counters, and microcopy.
- Do not render Korean paragraphs or core CTAs in the pixel face.

### Glass and material depth

Glassmorphism is limited to interactive chrome:

- Mode dock.
- Compact navigation.
- Proof chips and tooltips.
- Optional floating metadata cards.

Large reading surfaces remain opaque or nearly opaque for contrast and avoid the common AI-template look of many identical translucent cards.

### Image treatment

- Optimize the four supplied character files to responsive WebP/AVIF variants while preserving pixel edges.
- Use `image-rendering` intentionally only where it improves the pixel-art appearance.
- Each persona image gets a designed scene with depth, lighting, and context rather than a plain square frame.
- Do not generate replacement identity art without a separate user request.

### Motion

- 180–320ms interface transitions.
- Scroll reveals use opacity and small translation only.
- Case rail may use sticky positioning on desktop but must preserve native scrolling.
- `prefers-reduced-motion` removes transforms, parallax, and animated interpolation.
- No autoplay audio or essential video background.

## Responsive behavior

### Desktop, 1200px and above

- Hero uses a 12-column grid and fills most of the first viewport.
- Character scene occupies approximately 40–48% of the width.
- Mode dock is horizontal.
- Selected-work cards use sticky text with a horizontally advancing visual rail only when the browser can support it without scroll trapping.

### Tablet, 768–1199px

- Hero remains two-column where space allows, then stacks below approximately 900px.
- Proof strip wraps to two rows.
- Mode dock remains visible without horizontal clipping.

### Mobile, below 768px

- Headline and proof appear before the character.
- Character scene uses a controlled aspect ratio and never exceeds the viewport height.
- Mode dock becomes a four-item snap row with text labels.
- Cases become a vertical stack; no horizontal scroll dependency.
- CTA remains reachable without a permanent overlay covering content.

## Accessibility and performance

- Target WCAG AA contrast for all body text, controls, and focus states.
- Use semantic headings, buttons, links, lists, and timeline markup.
- Character descriptions receive useful alt text; decorative lights and shapes are hidden from assistive technology.
- All mode content exists in HTML or structured JavaScript data and remains readable if animation fails.
- Avoid layout shifts by reserving character/image dimensions.
- Keep the initial route lightweight: optimized raster assets, no heavy 3D runtime, and no framework requirement solely for animation.
- Fonts use `font-display: swap`; preload only the essential weights.

## Content architecture

Keep professional content separate from presentation in a small data model:

- `personas`: title, label, copy, image, accent, and proof chips.
- `metrics`: value, label, context, source type, and publication state.
- `cases`: context, responsibility, system, result, learnings, links, and visual asset.
- `experience`: dates, role, organization, type, summary, and status.
- `links`: contact, LinkedIn, Instagram, and public case URLs.

This data model should make later verification and copy updates possible without editing layout markup.

## SEO and sharing

- Title: `CHOI DEPT. — 모두가 AI를 쉽게, 최피티`
- Description: `AI 콘텐츠, 성장, 크리에이터 파트너십을 통해 새로운 AI 제품을 사람들이 실제로 쓰게 만드는 최우진의 포트폴리오.`
- Canonical: `https://choidept.com/`
- OG image: ivory/black/cobalt composition with the main character, tagline, and `CHOI DEPT.` wordmark.
- Structured data: `Person` plus relevant profile links; do not claim an organization relationship that is not current or verified.
- Preserve sitemap, robots, favicon, and root-domain canonical behavior.

## Acceptance criteria

- The first viewport communicates tagline, professional meaning, three headline metrics, and a B2B action.
- All four persona modes have substantial, distinct content and remain keyboard accessible.
- Main headline and proof remain understandable without interacting with the persona switcher.
- Three selected cases use the evidence model and contain no invented client claims.
- Manus mixed portal aggregates and payout data are not published.
- OpenAI is not represented as an employer, client, or official partnership.
- Existing Cloudflare Pages deployment and root-domain redirect continue working.
- `npm run build` succeeds.
- Desktop and mobile screenshots are visually inspected after implementation.
- Reduced-motion behavior and keyboard navigation are verified.

## Out of scope for this redesign

- CMS, authentication, user accounts, payments, or a database.
- A live inquiry form or analytics that collect personal data.
- Publishing private creator identities, contracts, payouts, or internal dashboards.
- Fabricating testimonials, awards, partner logos, or event history.
- Exact cloning of a reference website.
