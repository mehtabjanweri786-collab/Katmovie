# replit.md

## Overview

KatMovieHD is a movie discovery web application focused on Hindi/Bollywood content. It lets users browse trending movies, explore by genre categories, and view detailed movie information. The app acts as a frontend for TMDB (The Movie Database) API data, with a server-side proxy to handle API calls. It features a dark-themed, modern UI with ad placement areas (Adsterra placeholders) built into the layout.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS variables for theming (dark mode only)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives
- **Build Tool**: Vite with React plugin
- **Fonts**: Outfit (body) and Space Grotesk (display/headings) via CSS variables `--font-body` and `--font-display`

**Pages:**
- `/` — Home page with hero section and trending Hindi movies grid
- `/category/:id` — Movies filtered by TMDB genre ID
- `/watch/:id` — Movie detail/watch page

**Key Components:**
- `Navigation` — Sticky header with logo, category links, mobile sheet menu
- `Footer` — Site footer with category links, social icons, Adsterra ad placeholder
- `MovieCard` — Card component displaying poster, rating, year, Hindi badge
- `AdPlaceholder` — Placeholder div for future Adsterra ad integration

### Backend
- **Framework**: Express 5 (on Node.js)
- **Language**: TypeScript, run with tsx
- **Architecture**: The server acts as a proxy between the frontend and TMDB API. It has three main API endpoints defined in `shared/routes.ts`:
  - `GET /api/movies/trending` — Fetches trending movies, filters to Hindi language only, returns up to 30
  - `GET /api/movies/:id` — Fetches individual movie details from TMDB
  - `GET /api/movies/category/:genreId` — Fetches movies by genre from TMDB
- **Dev mode**: Vite dev server middleware is attached to Express for HMR
- **Production**: Client is built to `dist/public`, server is bundled with esbuild to `dist/index.cjs`

### Shared Code (`shared/`)
- `schema.ts` — Drizzle ORM schema definitions (PostgreSQL) with a `movies` table for potential caching
- `routes.ts` — API route definitions with Zod schemas for type-safe responses, plus a `buildUrl` helper for parameterized paths

### Database
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: `node-postgres` (pg) Pool using `DATABASE_URL` environment variable
- **Schema**: Single `movies` table with fields: `id`, `tmdbId`, `title`, `posterPath`, `overview`, `mediaType`, `isHindiDubbed`
- **Migrations**: Generated via `drizzle-kit push` command (`npm run db:push`)
- **Current usage**: The database storage layer exists but the app primarily fetches directly from TMDB API. The database is set up for future caching or favorites features.

### Build Process
- `npm run dev` — Starts development server with Vite HMR
- `npm run build` — Builds client with Vite, bundles server with esbuild
- `npm run start` — Runs production build
- `npm run db:push` — Pushes Drizzle schema to PostgreSQL

### Path Aliases
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`
- `@assets` → `./attached_assets/`

## External Dependencies

### APIs
- **TMDB (The Movie Database)**: Primary data source for all movie information. API key is hardcoded in `server/routes.ts`. Base URL: `https://api.themoviedb.org/3`. Image base URL: `https://image.tmdb.org/t/p/w500` (or `/original` for backdrops).

### Database
- **PostgreSQL**: Required via `DATABASE_URL` environment variable. Used with Drizzle ORM and `connect-pg-simple` for session storage capability.

### Ad Network
- **Adsterra**: Placeholder components exist in the Header and Footer for future ad integration (728x90 banner format).

### Key NPM Packages
- `express` v5 — HTTP server
- `drizzle-orm` + `drizzle-kit` — Database ORM and migration tooling
- `@tanstack/react-query` — Client-side data fetching/caching
- `wouter` — Client-side routing
- `zod` + `drizzle-zod` — Schema validation
- `shadcn/ui` components (Radix UI primitives) — Full component library
- `lucide-react` — Icon library
- `tailwindcss` — Utility-first CSS
- `vite` — Frontend build tool with Replit-specific plugins (`@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner`)