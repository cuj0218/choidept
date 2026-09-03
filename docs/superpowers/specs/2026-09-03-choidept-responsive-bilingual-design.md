# CHOI DEPT Responsive Bilingual Redesign

## Goal

Rework the existing CHOI DEPT portfolio into a resilient responsive site that preserves the Identity OS concept while providing complete Korean and English content through a visible language switcher.

## Decisions

- Keep the single-page static architecture and Cloudflare Pages deployment.
- Keep the four identity modes, proof-led case studies, experience, profile, and contact sections.
- Add a `KO / EN` control in the upper-right header. It changes all visible copy, document language, title, description, and accessible labels without a page reload.
- Store language-specific copy in `portfolio-data.js`; do not duplicate page markup for each language.
- Store frequently tuned typography, spacing, color, and breakpoint values in `design-tokens.css` so the owner can edit those values directly.
- Treat Korean font fallback as a first-class requirement: system Korean fonts must remain in the stack if the web font is unavailable.
- Use three layout regimes: desktop (`1200px+`), intermediate (`769–1199px`), and mobile (`768px and below`).
- Preserve the mobile reading order: introduction → proof metrics → identity panel → mode dock.
- Keep `choidept.com` as canonical and preserve current OG, favicon, robots, sitemap, and `www` redirect behavior.

## Visual system

The page keeps the ivory/cobalt/ink palette and glass identity panel, but typography becomes tokenized. Korean headings use a responsive `clamp()` scale with controlled tracking and line-height. The intermediate layout keeps the headline and identity panel side by side without relying on a fixed `440px` column. Mobile uses one column, constrained copy widths, and no horizontal overflow.

The header language control is a compact pill beside the existing CTA. The active language is visually selected and exposed through `aria-pressed`; the control label updates between `한국어` and `ENGLISH`.

## Content model

`portfolio-data.js` will export localized page copy and localized persona/case/experience fields. Shared identifiers, metrics, image paths, accents, URLs, and publication status remain language-neutral. The renderer will use `textContent` for copy and will only generate trusted internal list markup for chips and links.

The English version will be a faithful professional translation, not a literal machine translation. It will preserve metric context and avoid adding claims not present in the Korean source.

## Behavior

- Initial language is Korean unless `?lang=en` is present; the selected language is saved in `localStorage` for return visits.
- Clicking the toggle updates all localized content, `document.documentElement.lang`, `document.title`, meta description, OG title/description, and toggle accessibility state.
- The URL query is updated with `history.replaceState` so the English view can be shared without creating a second deployment route.
- Persona switching continues to update image, accent, title, description, chips, and alt text in the active language.
- Reduced-motion users receive immediate persona updates and no decorative reveal transitions.

## Acceptance criteria

- Korean and English versions contain all nav, hero, persona, proof, case-study, experience, profile, contact, and footer copy.
- `KO / EN` is keyboard operable, exposes its state, and does not reload the page.
- All four personas work in both languages.
- The hero remains two-column at 864px CSS width and one-column at 390px CSS width.
- No horizontal overflow appears at 390px, 768px, 864px, 1280px, or 1440px.
- Korean glyphs remain readable if the external Pretendard stylesheet fails.
- `npm run check` passes and live deployment checks confirm the canonical domain serves the new build.
