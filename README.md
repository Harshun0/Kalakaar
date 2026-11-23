# Kalakaar

Kalakaar is a marketplace where brands discover and hire Indian content creators — reels, YouTube, photography, UGC, podcasts and music. Creators list a profile with their niche, pricing and a contact option. Brands browse, filter and send direct inquiries, with no agencies and no middlemen in between.

This repository contains the marketing landing page: a single-page React app with mock data, no backend or authentication yet.

## What this solves

Brands currently find creators through agencies or scattered DMs, with no visibility into pricing until deep into a conversation. Creators have no dedicated place to showcase their work and set their own rates. Kalakaar fixes both sides: creators publish a profile once, brands filter by niche, city and budget, and inquiries go straight from brand to creator. Nobody's email is ever shown publicly — all contact happens through an inquiry form.

## Design direction

The page follows a "Spotlight Stage" concept: dark, cinematic, and built around a flat Black / Burgundy / White palette rather than gradients, so the UI reads as a deliberate brand rather than a generic template. Headings mix English with Devanagari accents throughout (करलाकार, क्यों कलाकार, कैसे काम करता है, and others). Hand-drawn sketch marks — an underline, an arrow, a couple of stars — break up the flat surfaces at a few key moments (the hero headline, the creator CTA, the final call to action).

Typography is Bricolage Grotesque for headings, Inter for body and UI text, and Hind for the Devanagari accents. Vertical 9:16 creator cards echo reels and stories. Scroll-triggered reveals, a floating hero card fan, and an infinite niche marquee provide motion, all gated behind `prefers-reduced-motion`.

## Tech stack

- React 19 with Vite
- Tailwind CSS v4 (CSS-first theme, defined in `src/index.css`)
- lucide-react for general iconography; a handful of brand icons (Instagram, YouTube, LinkedIn, X) are hand-rolled SVGs in `src/components/icons.jsx` since recent lucide-react releases dropped brand marks
- No backend, no auth, no state management library — component state only

## Project structure

```
src/
  components/      One component per file, no nested folders
  data/
    mockData.js    All mock content: creators, niches, FAQs, testimonials, stats
  lib/
    utils.js        cn() class-merging helper
    useReveal.js     Scroll-reveal IntersectionObserver hook
  assets/
    logo.png         Kalakaar wordmark, used as-is in the navbar and footer
  index.css          Tailwind import, theme tokens, keyframes, global styles
  App.jsx            Section order, inquiry modal and toast state
```

Section components, in the order they render in `App.jsx`:

| Component | Section |
|---|---|
| `Navbar` | Sticky glass navbar with mobile menu |
| `Hero` | Headline, search bar, floating creator card fan |
| `NicheMarquee` | Infinite-scroll niche pill strip |
| `FeaturedCreators` | Filterable grid/scroll of `CreatorCard`s |
| `HowItWorks` | Brand/Creator toggle with `StepCard`s |
| `WhyKalakaar` | Bento grid of `BentoCard`s |
| `NumbersBand` | Animated `StatCounter`s |
| `ForCreatorsCTA` | Creator sign-up pitch with a profile preview |
| `Testimonials` | `TestimonialCard` grid |
| `FAQ` | Accordion built from `FAQItem` |
| `FinalCTA` | Closing call to action |
| `Footer` | Logo, link columns, socials |

`InquiryModal` and `Toast` are mounted once in `App.jsx` and driven by state lifted from `FeaturedCreators`. Submitting the modal is a mock action — it does not call any API, it only triggers the success toast.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173`. To check for lint issues:

```bash
npm run lint
```

To produce a production build:

```bash
npm run build
```

## Mock data

Everything shown on the page — creator profiles, niches, step copy, bento card copy, stats, testimonials and FAQs — lives in `src/data/mockData.js`. Swapping this file for real API calls is the intended path to wiring up a backend; component props are already shaped to match what the mock data exports.

## Known gaps

- No backend, authentication, or persistence. The inquiry modal's "Send" is a mock success state only.
- No routing. Everything lives on a single page with anchor-link navigation.
- Creator and brand profile creation flows are not built; "Join as Creator" and "Create your profile" are presentational buttons only.
