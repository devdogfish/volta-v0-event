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
    - `slides.tsx` - Individual slide components (CoverSlide, PresenterSlide, FeaturesSlide, TipsSlide)
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

### Adding Custom Animations

Add keyframes to `tailwind.config.ts` in the `keyframes` section, then use them as animation classes. Complex animations can also use `<style jsx>` blocks as seen in `slideshow.tsx`.

### Working with Images

Images are in the `public/images/` directory. Use Next.js `Image` component where possible for optimization, but `<img>` tags are used when necessary (noted with `eslint-disable`).

## Testing

No test suite is currently configured. Tests would typically use Jest + React Testing Library with Next.js.

## Build & Deployment

- The build process uses Turbo mode for faster compilation
- TypeScript errors don't block builds (see "TypeScript Build Errors Ignored" note)
- Ensure the app builds without runtime errors before deployment: `npm run build && npm start`
