# AGENTS.md — Live Achieve Believe Project Guide

Comprehensive reference and instructions for AI agents working on this codebase.

---

## 1. Project Reference Links
* **Figma Design File**: [Figma - SynergyAssurg Cinematic Website](https://www.figma.com/design/YW7NkHHekXId1G1k3vV4hk/synergyassurg--Cinamatic-website?node-id=0-1&p=f&t=eNB472cKDMDvw79W-0)
* **Design Benchmark & Motion Reference**: [Edolus](https://edolus.com/) (Awwwards Site of the Day / cinematic pacing, smooth inertia scrolling, theatrical shutter reveal).
* **Local Dev Server**: `http://localhost:5173/`

---

## 2. Core Workflow Rules (Strict)
1. **One Section at a Time**: User strictly instructed: *"no need to do all, do one by one ok"*. Never generate multiple sections simultaneously. Build, polish, verify with user, and wait for confirmation before moving to the next section.
2. **Terse Communication Style**: Follow the caveman rule — answer first, zero fluff, active voice, <20 words per sentence, retain all technical substance.
3. **Reusable Button Requirement**: Always use `src/components/common/FigmaButton.tsx` for buttons. Never write custom button HTML for Figma action triggers.
   - Primary: Background `#F97316`, white text, `Frame 7.png` arrow badge.
   - Outline: Border `#F97316`, text `#F97316`, `Frame 55.png` arrow badge.
   - Button Font: Always `Playfair Display`, serif.
4. **Preserve Build Health**: Run `npm.cmd run build` to verify 0 type and syntax errors after each change.

---

## 3. Global Design System & Assets
* **Background Color**: `#FAF4E6` (warm cream body).
* **Primary Accent Color**: `#F97316` (buttons, primary headings, highlights).
* **Typography**:
  - Headings & Titles: `Playfair Display`, serif (`font-playfair` / `font-serif`).
  - Button Text: `Playfair Display`, serif (`font-playfair`).
  - Story Narrative & Italic Accents: `Playfair Display`, serif.
  - UI Labels, Navigation, Stats: `Helvetica` / system sans-serif (`font-sans`).
* **Key Asset Paths**:
  - Video: `src/assets/video/welcome.mp4`
  - Left Leaf Flourish: `src/assets/icons/Group.png`
  - Right Leaf Flourish: `src/assets/icons/Group-2.png`
  - Primary Button Arrow: `src/assets/icons/Frame 7.png`
  - Outline Button Arrow: `src/assets/icons/Frame 55.png`
  - Stat Icons: `utensils4.png` (Meals), `utensils3.png` (Mentors), `utensils2.png` (Stories), `utensils.png` (Partners).
  - Logos: `src/assets/logo/logo-icon.png`, `src/assets/logo/logo-with-text.png`

---

## 4. Current Implementation Status
* [x] **Preloader (`src/components/common/Preloader.tsx`)**:
  - Cinematic horizontal shutter wipe (Edolus 1:1 pacing).
  - Dispatches `preloader-complete` event upon wipe reveal.
* [x] **Welcome Video Hero (`src/components/welcome/WelcomeExperience.tsx`)**:
  - Video paused at `0.00` until preloader wipes away.
  - **Sound ON by default** with browser autoplay unlock fallback on first user gesture.
  - Smoothly docks into rounded card (`rounded-[32px]`) upon scroll or 21.5s mark.
  - Minimal 3D scroll indicator in Three.js (`ScrollIndicator3D.tsx`).
* [x] **Reusable Button (`src/components/common/FigmaButton.tsx`)**:
  - Playfair Display typography, responsive sizing, exact Figma badges.
* [x] **Section 1: "WE'VE BEEN EXPECTING YOU" (`src/components/welcome/ExpectingYouSection.tsx`)**:
  - Left side leaf: `Group.png`.
  - Right side leaf: `Group-2.png`.
  - Right narrative: Right-aligned (`lg:text-right lg:items-end lg:justify-end`).
  - All headings and narrative in `Playfair Display`.
  - Sized for standard viewport (max-w-6xl, no overflow, no text collision).
  - 4 impact stat counters matching Figma Frame 292.

---

## 5. Upcoming Roadmap (Next Sections)
1. **Section 2**: *"Where would you like to go?"* — 4 interactive 3D walnut/wood doors with mouse tilt linking to:
   - Door 1: `/about` ("Our Story")
   - Door 2: `/how-we-serve` ("How We Serve")
   - Door 3: `/movement` ("Join The Movement")
   - Door 4: `/meet-us` ("Meet Us")
2. **Section 3**: "A Place at the Table" (Interactive feast table experience).
3. **Section 4**: "You Matter - Strong Foundations" (Mission pillars).
4. **Section 5**: "Stories That Save Lives" (Testimonial cinema reel).
5. **Section 6**: "Welcome Home" (Impact showcase).
6. **Section 7**: "Serve Beside Us" & Donation gateway.

