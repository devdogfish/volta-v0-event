# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js web application for a "v0 Vibe Coding Meetup" - a demo/showcase application built with modern web technologies. The app features a slideshow-style presentation interface.

**Key Tech Stack:**
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **UI Components**: shadcn/ui (pre-built Radix UI components)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **Forms**: React Hook Form + Zod validation
- **Icons**: lucide-react
- **Charts**: recharts
- **Toast Notifications**: sonner

## Development Commands

```bash
# Start development server with Turbo mode enabled
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm lint
```

## Architecture Overview

### Directory Structure

- **`app/`** - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with metadata
  - `page.tsx` - Home page (renders the Slideshow component)
  - `globals.css` - Global styles with Tailwind and CSS variables

- **`components/`** - React components
  - `ui/` - shadcn/ui pre-built components (Button, Card, Dialog, Form, etc.)
  - `slideshow/` - Custom slideshow components
    - `slideshow.tsx` - Main slideshow controller (manages navigation, animations, keyboard/custom events)
    - `slides.tsx` - Individual slide components (CoverSlide, PresenterSlide, FeaturesSlide, TipsSlide) + shared `MediaDisplay` component + `buildRound` algorithm
    - `tips-data.ts` - All tip/idea content: `Tip` interface, `TIPS` array (25 entries), `DEFAULT_TIP_DURATION`
    - `demo-animations.tsx` - Animation utilities
    - `vercel-logos.tsx` - Brand asset components
  - `theme-provider.tsx` - Theme configuration provider

- **`lib/`** - Utilities and helpers
  - `utils.ts` - `cn()` utility for merging Tailwind classes with clsx + tailwind-merge

- **`hooks/`** - Custom React hooks
  - `use-toast.ts` - Toast notification hook (from shadcn/ui)

- **`styles/`** - Additional style definitions

- **Config files**:
  - `tsconfig.json` - TypeScript configuration with `@/*` path alias pointing to root
  - `tailwind.config.ts` - Tailwind customization with CSS variable colors
  - `components.json` - shadcn/ui configuration (RSC enabled, Tailwind setup)
  - `next.config.mjs` - Next.js config (TypeScript build errors ignored - see note below)
  - `postcss.config.mjs` - PostCSS configuration for Tailwind

### Path Aliases

- `@/*` resolves to the project root (e.g., `@/components` = `./components`)

## Important Implementation Notes

### TypeScript Build Errors Ignored

The `next.config.mjs` has `typescript.ignoreBuildErrors: true` enabled. This means TypeScript errors won't break the build, but they should still be fixed in code. Always check for and resolve TypeScript issues.

### Component Patterns

1. **UI Components** - Located in `components/ui/`, these are pre-built shadcn/ui components. Don't modify their internal structure unless necessary.

2. **Slideshow Navigation** - The Slideshow component (`components/slideshow/slideshow.tsx`) uses:
   - Custom window events: `slideshow:prev` and `slideshow:next`
   - Arrow key navigation (ArrowLeft/Right, ArrowUp/Down)
   - State-based animation system with 500ms transitions
   - Prevents navigation interference with interactive elements (e.g., listbox dropdowns)

3. **Styling Approach** - Uses Tailwind CSS with:
   - CSS variables for colors (e.g., `bg-background`, `text-foreground`)
   - `cn()` utility function for conditional class merging (combines clsx + tailwind-merge)
   - Custom animations defined in `tailwind.config.ts` (e.g., `accordion-down`, `accordion-up`)
   - Dark mode support via `darkMode: ['class']`

### Form Validation

When creating forms, use React Hook Form with Zod for schema validation. The project has `@hookform/resolvers` for integration. Example patterns available in shadcn/ui form component.

### CSS Variables & Theming

Colors are defined as CSS variables in `globals.css`. The theme supports both light and dark modes through Tailwind's class-based dark mode. Theme can be toggled using `next-themes` (installed but may not be actively used).

## Common Development Tasks

### Adding a New UI Component

Use shadcn/ui's CLI (if configured) or copy from the existing `components/ui/` folder as a template.

### Modifying Slides

Edit `components/slideshow/slides.tsx` to update slide content. Each slide is a component referenced in the `SLIDES` array in `slideshow.tsx`.

### Adding or Editing Tips (Slide 4)

All tip content lives in `components/slideshow/tips-data.ts`. Edit the `TIPS` array there — the carousel adapts automatically to any number of items.

**`Tip` interface fields:**
- `icon` — a `LucideIcon` component (import from `lucide-react`)
- `title` — short display title
- `description` — body text shown below the title
- `tag` — category label. Use one of the three established values: `"Tip"`, `"Feature"`, or `"App Idea"`
- `media?` — path to an image or video in `public/`. Auto-detected by extension; videos autoplay muted on loop
- `duration?` — ms to display before auto-advancing (falls back to `DEFAULT_TIP_DURATION = 5000`)
- `link?` — `{ label: string; href: string }` rendered as a "read more" anchor below the description

**Carousel ordering — `buildRound` in `slides.tsx`:**
The carousel never repeats an item until all 25 have been shown (one full round). At the start of each round, `buildRound(prevLastTag?)` produces a new randomised order using a greedy category-interleaving algorithm:
1. Tips are grouped by `tag` and Fisher-Yates shuffled within each group
2. Items are picked greedily from the largest group that differs from the last-shown category, keeping same-category runs rare
3. When multiple groups are close in size (within 1), the pick is random to avoid a mechanical pattern
4. The `prevLastTag` argument seeds the first pick so the category doesn't repeat across the round boundary

The component uses `orderRef` (index sequence) and `posRef` (position within it) as refs, with `activeIndex` and `prevIndex` as state for rendering. Going forward past the last item of a round triggers a new `buildRound` call; going backward wraps within the current round.

### Adding Custom Animations

Add keyframes to `tailwind.config.ts` in the `keyframes` section, then use them as animation classes. Complex animations can also use `<style jsx>` blocks as seen in `slideshow.tsx`.

### Working with Images and Videos

- `public/images/` — static images (e.g. `v0-logo.jpeg`, `design-system.png`)
- `public/media/` — feature demo videos used in Slide 3 (`browse-templates.mp4`, `design-mode.mp4`, etc.)
- `public/media/separate/` — individual tip videos used in Slide 4 (`database.mp4`, `env-variables.mp4`, `vercel-ai-sdk.mp4`, `image-to-website.mp4`)

Use Next.js `Image` component where possible for optimization, but `<img>` tags are used when necessary (noted with `eslint-disable`). The shared `MediaDisplay` component in `slides.tsx` handles both images and videos — it auto-detects the type from the file extension, autoplays videos muted on loop, and shows a fallback icon when no media is provided or the file is missing.

## Testing

No test suite is currently configured. Tests would typically use Jest + React Testing Library with Next.js.

## Build & Deployment

- The build process uses Turbo mode for faster compilation
- TypeScript errors don't block builds (see "TypeScript Build Errors Ignored" note)
- Ensure the app builds without runtime errors before deployment: `npm run build && npm start`
