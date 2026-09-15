# Design System — Africa Climate Finance

<!-- impeccable:design-schema 1 -->

## Status

Built for 4 of 23 pages: `index.html`, `about.php.html`, `what-we-do.php.html`, `contact.php.html`, plus the shared `assets/inc/header.html` / `assets/inc/footer.html` partials (loaded on every page via `header-loader.js` / `footer-loader.js`, so nav/footer now render in the new system site-wide even though the other 19 page bodies still use the old CSS — see Known Gaps).

Direction: **Canon / standing exit.** The user was offered three rolled directions (Concept Note Register, Savings-Group Passbook, Custody Ribbon) and chose the category-standard nonprofit/development-finance layout instead, executed at full craft rather than as a strawman. Full round record: `.impeccable/surfaces/index-html.md`.

## Palette

Color strategy: **Committed** (one dominant field color + one accent).

| Token | Hex | Use |
|---|---|---|
| `--forest-800` | `#1F4D3D` | Dominant field — nav (sticky, translucent), section bands, footer, buttons |
| `--forest-900` / `--forest-950` | `#16382A` / `#0F2A20` | Darker forest steps — footer, step-flow background |
| `--stone-50` | `#F6F4EF` | Page ground (warm off-white, not pure white or cream) |
| `--stone-100` / `--stone-200` | `#EFECE3` / `#E3DED0` | Card/section-alt backgrounds |
| `--ink-900` / `--ink-700` / `--ink-500` | `#17201C` / `#3C453F` / `#647169` | Text — heading / body / muted |
| `--gold-500` / `--gold-600` | `#D9A441` / `#B8863A` | Accent — primary CTAs, live-state markers, links on dark |
| `--gold-100` | `#F6E6C4` | Accent tint for text-on-forest |

Chosen deliberately **against** the flagged AI-cluster default (warm cream + serif + terracotta/signal-red): dominant color is a saturated forest green covering real surface area (not just an accent line on white), and the accent is gold/ochre, not terracotta or signal-red.

## Type

| Role | Face | Notes |
|---|---|---|
| Display / headings | **Zilla Slab** (500/600/700) | Slab serif — institutional/report register, not a "stopped-looking" default (Fraunces, Playfair, etc. were avoided per brief) |
| Body / UI | **Public Sans** | US-federal open-source workhorse sans — reinforces the "official, credible institution" register |
| Data / labels / stats | **JetBrains Mono** | Tabular figures, stat labels, step indices |

Loaded via Google Fonts (`assets/css/site.css` `@import` is not used — linked in each page `<head>`).

## Components

- **Buttons**: pill-shaped (`--radius-pill`). `.btn-gold` (primary), `.btn-ghost-light` / `.btn-ghost-dark` (secondary), `.btn-outline-gold`.
- **Service cards** (`.service-card`): icon + heading + text grid — this is normally a banned lazy default, but it's explicitly named in the locked direction contract's OWN-WORLD block ("3-icon service cards"), so it's earned, not defaulted into.
- **Step flow** (`.step-flow`): the four-stage Educate→Finance→Prepare→Place model as numbered steps — numbering is earned here because the sequence is real (order matters), unlike the seven services (unordered, not numbered).
- **No kicker/eyebrow labels anywhere** — this is an absolute craft-floor ban; headings carry their own weight.
- **No colored `border-left`/`border-right` accents** — pull-quote uses a large quote-mark glyph instead of a border; step cards use a background-color shift for the "live" state instead of a border.
- **Hero stat rail**: real facts only (CBT license, 280+ women trained Jan 2026, $1.7B pipeline) — the one "hero-metric" pattern used, justified because it's named explicitly in the direction contract's FIRST VIEWPORT block with real evidence, not placeholder numbers.
- **Mobile nav**: off-canvas drawer (`position: fixed` + `translateX`), event-delegated in `nav.js` (not directly bound) to avoid a load-order race against the async header partial fetch. Submenu collapse uses `grid-template-rows: 0fr → 1fr` (not `max-height`, which the detector flags as a layout-thrash antipattern).
- **Root has `overflow-x: hidden`** — required because Chromium expands `scrollWidth` to include the pre-transform geometry of `position: fixed` + `transform` elements (the off-canvas nav), which otherwise causes phantom horizontal scroll.

## Spacing & responsive

- Section rhythm: `clamp(56px, 7vw, 108px)` vertical padding, one scale throughout.
- Two-column layouts collapse to one column at 860–900px; nav collapses to the off-canvas drawer at 980px.
- Body measure capped at `68ch`.

## Motion

One authored moment: scroll-reveal (`.reveal`, `IntersectionObserver`-driven fade + translateY), respects `prefers-reduced-motion`. No per-section novelty animation.

## Known gaps / honest disclosure

- **Scope**: only 4 of 23 pages were rebuilt in this pass (confirmed with the user up front). The header/footer are shared site-wide, so the other 19 pages now show the new nav/footer with their old page-body styling until they're redesigned in a follow-up pass.
- **`abouut.png` bug found and fixed**: this asset (used on the old `about.php.html`) is actually a generic "Greenhouse Effect" stock diagram mislabeled as a community photo — not real evidence. It was swapped for a real Rungwe field photo (`dairy-farming-beneficiary-rungwe-tanzania`) in the rebuilt pages. The mislabeled file still exists on disk for the un-rebuilt pages that reference it.
- **i18n**: the EN/SW language-switcher UI is preserved and functional for nav/footer strings (existing dictionary keys reused), but new homepage/about/contact copy has no Swahili translation yet — it stays English until translated.
- **No formal finish-reviewer/documenter subagent round-trip**: this session's browser tool can display screenshots inline but cannot save them to disk, so the file-based evidence packet those subagents require (`.impeccable/review/desktop.png` etc.) couldn't be produced. Verification was instead done directly in this thread: desktop + mobile screenshots reviewed inline, console errors checked on all 4 pages, the mechanical detector (`detect.mjs`) run clean after fixes, and one real functional bug (mobile nav race condition) and one real layout bug (hero flex-direction) found and fixed along the way.
- **Contact form**: the Google Apps Script endpoint is preserved from the original site's `form-config.js`; it was not independently re-tested end-to-end (would require submitting real data to a third-party script).
