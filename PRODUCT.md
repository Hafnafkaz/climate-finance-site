# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, no build step (matches the incumbent site: Bootstrap 5, jQuery, vanilla JS partials for header/footer). User confirmed this over Next.js/Astro.

## Users

- **Institutional funders & development partners**: climate funds, multilateral/bilateral development banks, and programme officers evaluating Africa Climate Finance as a counterpart or grantee (evidenced by FP179/FP223 funding-proposal references, COP29/COP30 engagement, BIOFIN/UNDP committee membership).
- **Grassroots beneficiaries & local partners**: cooperatives, smallholder farmers, women-led enterprises, and community members in Rungwe/Mbeya (and wider Tanzania/East Africa) who access financial literacy training and climate-smart microfinance.
- **Prospective partners/press**: NGOs, government bodies, and media researching the organization's credibility and track record.

## Product Purpose

Africa Climate Finance is a climate-finance organization that bridges grassroots communities and institutional capital: it runs Central Bank of Tanzania-licensed climate-smart microfinance for cooperatives/SMEs/women-led enterprises, and prepares bankable climate projects (market analysis, financial modelling, gender assessment, stakeholder engagement, scientific assessment, climate risk) that can be placed with climate funds and development partners. Success = local climate priorities translated into financed, lasting activity.

## Positioning

Model: "Educate → Finance → Prepare → Place" (classroom to term sheet). The organization's differentiator is operating at both ends of the chain at once — licensed grassroots microfinance delivery in the field (Rungwe) plus institutional-grade project preparation (bankable financial models, funding proposals) — rather than being purely a consultancy or purely a lender.

## Operating Context

- Rooted in Rungwe, Mbeya, Tanzania; reaches Iringa and beyond; works across East Africa/the African continent.
- Central Bank of Tanzania-licensed microfinance institution.
- Seven service lines: Market Analysis, Financial Modelling, Microfinance for Climate, Gender Assessment, Stakeholders Engagement, Scientific Assessment, Climate Risk.
- Engages at global forums: COP29 Baku, COP30 Belém.
- Funding-proposal pipeline referenced: FP179 (~US$200M) and FP223 (~US$1.5B) — combined ~US$1.7B climate finance pipeline.
- Contact form currently posts via a Google Apps Script handler (`data-form-handler="gas"`); WhatsApp click-to-chat widget; phone/email contact channels.

## Capabilities and Constraints

- **Redesign scope (confirmed):** start with homepage + key pages (home, about, what-we-do, contact) as the core flow and coherent system; remaining ~19 pages (7 service detail pages, team + 2 individual bios, testimonials, women-empowerment, loan-program, cop-engagements, climate-policy-insights, FAQ, privacy-policy, terms-of-service, team-details) extend the same system afterward rather than being redesigned in this pass.
- **Deploy target (confirmed):** same host as the current live site — flat-file hosting compatible with the existing `.php.html`/`.html` flat naming (looks like shared/cPanel hosting, no server framework detected). Do not introduce a build step or server runtime requirement.
- Preserve real functional behavior: contact form fields/handler, WhatsApp/phone links, Google Maps embed, social links.
- Site currently ships duplicate/malformed `<link rel="apple-touch-icon">` tags and other HTML cruft (e.g. broken Google Fonts URL params picked up as asset links) — technical debt to clean up during rebuild, not a product fact to preserve.

## Brand Commitments

- Name: **Africa Climate Finance** (site title also says "Tanzania"; domain is climatefinance.co.tz).
- Founder/CEO: Kenneth Davis Kasigila — his bio, credentials, and photo are real and must stay factually accurate.
- Team roster (Karen Marie Kasigila, Happy Kasigila, Atupakisye Njalila, Rose Mgode, Samson Mwalusambo, Rehema Mwateba) with real roles/bios — preserve as factual content.
- Contact details are real and must be preserved exactly: info@climatefinance.co.tz, hello@climatefinance.co.tz, +255 754 763 558, Rungwe/Mbeya/Tanzania address.
- **Visual direction (confirmed, standing exit):** user chose the category-standard climate/development-org layout over three more distinctive rolled directions (Concept Note Register, Savings-Group Passbook, Custody Ribbon) — full-bleed photo hero with overlay, centered headline/CTA, icon-grid services, logo trust strip. Execute this layout at full craft fidelity, never as a strawman; craft bar delegated to well-executed climate/development-sector sites (e.g. Acumen, GiveDirectly, Global Innovation Fund) rather than a generic template. Even within this conventional shape, keep content field-rooted and real (per Product Principle 3) rather than generic stock-feeling copy.

## Evidence on Hand

- Full incumbent site mirrored locally (23 pages + assets) at project root — treat as content/evidence source, and per the `redesign` command as visual anti-reference only.
- Incumbent (not binding) type pairing was Fraunces (serif display) + Source Sans 3 (body) + IBM Plex Mono (accents/data) — evidence of the old look only, not a preserved brand commitment; the chosen direction picks its own faces.
- Real beneficiary stories with names/places: ginger farmers (Isajilo, Tukuyu), Nyasa Masala (Mbeya spice enterprise), Power Porridge (Aswile Francis Mwaihola, Iringa).
- Real stat: 280+ women trained in financial literacy, Isajilo Ward, Rungwe, January 2026.
- Partner/affiliation logos referenced (UN Climate Change, IPCC, SDGs, Mbeya Avocados) — real links, treat logos as evidence to reuse, not to fabricate new ones.
- Pink Hijab Initiative Tanzania (pinkhijab.or.tz, women's/youth empowerment org, founded 2016) added to the affiliations strip at the user's request; real logo fetched from their official site.
- Social links (Facebook/Twitter/Instagram/LinkedIn in the footer) currently point to generic platform homepages, not real org profiles — do not treat as confirmed real handles.
- No pricing, licensing terms, or deployment credentials are documented; none should be invented.

## Product Principles

1. Credibility over decoration — the org's authority rests on real licensing (Central Bank of Tanzania), real funding-proposal figures, and named leadership; design should foreground evidence, not generic trust badges.
2. Two audiences, one site — every key page should work for an institutional funder skimming for bankability signals *and* a partner/community reader looking for real, place-based work.
3. Field-rooted, not generic-NGO — Rungwe/Mbeya/Tukuyu/Iringa specificity (place names, dates, named beneficiaries) is the differentiator versus generic climate-consultancy visual language.
4. Preserve factual content exactly — names, figures, credentials, and contact details are real-world facts, not copy to embellish.

## Accessibility & Inclusion

No formal standard specified by the user. Given the funder/institutional audience and rural-Tanzania field-worker audience (variable connectivity, mixed device classes), keep the build lightweight and broadly accessible (semantic HTML, sufficient contrast, keyboard/screen-reader support) as a baseline rather than a decorative afterthought.
