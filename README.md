# Live Achieve Believe — Frontend

Interactive 3D web platform and admin operations portal for **Live Achieve Believe**, built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Three.js / React Three Fiber**, **GSAP**, **Framer Motion**, and **Ant Design**.

## Key Features

- **Cinematic 3D & Motion Experiences**: WebGL scenes (`ThreeHallway`, `EarthGlobe3D`, `AtmosphericDescentTransition`, `MistyForestCanvas`), GSAP & Framer Motion choreography, Lenis inertia scrolling, and horizontal shutter preloader.
- **Official Verbiage & Storytelling**: Centralized client copy in `src/data/officialVerbiage.ts` and `docs/OFFICIAL_CLIENT_VERBIAGE.md`, powering Welcome Home, Experience the Story, Who We Are, How We Serve, and Suicide Awareness Showdown pages.
- **Public Movement Submissions**: Interactive forms for Suicide Awareness Showdown auditions, sponsorships, volunteer applications, general/partnership inquiries, and event RSVPs via `src/lib/api/services/movement.service.ts`.
- **Authentication & Route Protection**:
  - Dedicated `/login` and `/signup` flows backed by JWT access/refresh tokens (`src/lib/api/client.ts` & `src/lib/store/slices/authSlice.ts`).
  - `ProtectedAdminRoute` verifies stored tokens against `GET /api/v1/user/me` with single-flight deduplication (`inFlightVerify`) and restricts `/admin/*` and `/dashboard/*` to `admin`, `super_admin`, and `editor` roles.
- **Lazy-Loaded Admin Operations Hub**: `AdminDashboard` maps active tabs via `TAB_RESOURCE_MAP` and `fetchResource` so navigating to `/admin/videos` fetches only the active tab's data instead of eagerly requesting every backend resource.
- **PWA & SEO Support**: Built-in `vite-plugin-pwa` manifest/service worker generation and per-page metadata via `Seo` (`react-helmet-async`).

## Prerequisites

- **Node.js** >= 18
- **pnpm**

## Environment Configuration

Create `frontend/.env.local` if pointing to a non-default API server:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

If omitted, `src/lib/api/client.ts` defaults to `http://localhost:5000/api/v1`.

## Available Scripts

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start Vite dev server at http://localhost:5173
pnpm exec tsc --noEmit    # Run TypeScript type checking
pnpm lint                 # Run ESLint with --max-warnings 0
pnpm build                # Type-check and build production bundle to dist/
pnpm preview              # Preview built dist/ bundle locally
pnpm generate-pwa-assets  # Regenerate PWA icons from public/logo.svg
```

## Key Routes

| Route | View | Access |
|---|---|---|
| `/` | Home & Welcome Experience | Public |
| `/about`, `/experience-the-story` | Experience the Story | Public |
| `/movement`, `/join-the-movement` | Join the Movement | Public |
| `/who-we-are` | Who We Are | Public |
| `/how-we-serve` | How We Serve overview | Public |
| `/how-we-serve/a-place-at-the-table`, `/a-place-at-the-table` | A Place at the Table | Public |
| `/how-we-serve/you-matter`, `/you-matter` | You Matter | Public |
| `/how-we-serve/stories-that-save-lives`, `/stories-that-save-lives` | Stories That Save Lives | Public |
| `/how-we-serve/welcome-home`, `/welcome-home` | Welcome Home | Public |
| `/suicide-awareness-showdown`, `/showdown` | Suicide Awareness Showdown (4 submission forms) | Public |
| `/meet-us` | Meet Us | Public |
| `/contact` | Contact & Inquiries | Public |
| `/donate`, `/give-hope` | Give Hope / Donate | Public |
| `/login`, `/signup` | Authentication | Public |
| `/admin`, `/admin/*`, `/dashboard`, `/dashboard/*` | Admin Operations Hub | Staff (`admin`, `super_admin`, `editor`) |

## Project Structure

```text
frontend/
├── docs/                     # Client verbiage & scroll animation docs
├── public/                   # Static icons, PWA assets, _redirects
├── src/
│   ├── assets/               # Media, textures, logos, and section images/videos
│   ├── components/           # Feature & UI components (auth, cinematic, welcome, ui, etc.)
│   ├── data/                 # Centralized copy & movement domain data
│   ├── hooks/                # Custom React hooks
│   ├── lib/
│   │   ├── api/              # Axios client, interceptors, and API service modules
│   │   └── store/            # Redux Toolkit store, slices, and async thunks
│   ├── pages/                # Route pages including admin/AdminDashboard and views
│   ├── utils/                # Video registry and helper utilities
│   ├── App.tsx               # App providers & router mounting
│   ├── main.tsx              # Entry point
│   └── routes.tsx            # React Router route definitions
├── vercel.json               # SPA history fallback rewrites
└── vite.config.ts            # Vite + PWA configuration
```
