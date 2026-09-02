# CHOI DEPT B2B Portfolio Design

## Goal

Create the implementation design and low-fidelity page shape for a future single-page B2B portfolio at `www.choidept.com`. This phase does not build, host, connect DNS, send email, or publish anything. The primary visitor is a company decision-maker evaluating whether to start an AI, content, creator-operations, or research-operations engagement. Within the first viewport, the future site should make clear what CHOI DEPT does, who it is for, and how to start a conversation.

## Positioning

CHOI DEPT is presented as an AI Creative & Research Operations partner. The site should communicate practical execution: diagnose a business need, prototype a usable workflow or campaign, operate it, and measure what happened.

The site must not claim clients, revenue, performance metrics, awards, or affiliations unless supplied and verified. Empty proof slots should be omitted or labeled as work in progress rather than filled with invented social proof.

## Experience

The page is a single responsive scroll surface with a restrained editorial layout and a pixel-art signature.

1. Header: CHOI DEPT wordmark, compact anchor links, and a visible “B2B 협업 문의” CTA.
2. Hero: clear B2B headline, short explanation, service focus tags, and the supplied pixel character as a small interactive visual signature. The character modes are Research, Build, Creator, and Field; the interaction is optional and must not hide the message.
3. Services: three concise service cards covering AI content and UGC operations, creator-network/campaign systems, and AI workflow/research/evaluation.
4. Selected work: case-study cards structured as problem, intervention, and outcome. Initial content uses clearly marked representative work or verified supplied work only.
5. Operating model: Diagnose → Prototype → Operate → Measure, explaining how an engagement moves forward.
6. About/proof: short founder context, selected capabilities, and a reserved area for verified partner/client proof.
7. Contact: direct B2B inquiry CTA with email link; no form backend in the first slice unless an existing inbox or provider is supplied.

## Visual system

- Base: warm off-white background, near-black typography, cobalt blue as the primary action color, muted lavender and pale mint as supporting surfaces.
- Typography: clean system sans for body copy with a compact display treatment for headings; avoid a novelty pixel font for business-critical text.
- Layout: wide desktop canvas with generous whitespace and a compact mobile stack. Cards use modest radius, thin borders, and restrained shadows.
- Pixel art: use the user-supplied character images as identity assets, cropped/contained without fabricating additional representational artwork. Use CSS/SVG only for simple interface geometry and icons.
- Motion: subtle hover/press transitions and an optional character mode swap; respect reduced-motion preferences.

## Content and privacy boundaries

Use only verified professional details. Do not expose private identifiers, home address, birth date, tax information, or personal phone number. Any case-study metrics, client names, logos, or testimonials require explicit source material and approval before publication.

## Technical shape

The future build should be a lightweight single-route site suitable for static/edge hosting. Keep content in a small typed data structure so projects, services, and proof can be updated without restructuring the page. Add site metadata, favicon support, and an Open Graph image after the visual direction is stable. Domain connection is a separate deployment step: the current domain has no working DNS record yet.

## Current phase boundary

The deliverable for this phase is the approved structure, content model, visual direction, and implementation checklist in this document and its companion wireframe. Do not scaffold a project, edit site source, initialize a hosting project, change DNS, configure email, or publish a URL until the user approves the written design.

## Validation

- The production build completes successfully.
- The root route returns a successful response.
- Mobile and desktop layout remain readable and the primary CTA stays visible.
- All supplied local image assets load without broken paths.
- No unverified claims appear in the initial copy.
- Metadata title and description identify CHOI DEPT and its B2B AI operations positioning.
