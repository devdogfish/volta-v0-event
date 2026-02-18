import {
  Lightbulb,
  Zap,
  MousePointerClick,
  Layers,
  MessageSquare,
  Palette,
  Terminal,
  GitBranch,
  Globe,
  Wand2,
  Database,
  KeyRound,
  Bot,
  ScanEye,
  type LucideIcon,
} from "lucide-react"

export interface Tip {
  icon: LucideIcon
  title: string
  description: string
  /** Optional category tag shown above the title */
  tag?: string
  /**
   * Path to media displayed for this tip.
   * Supports images (.jpg, .jpeg, .png, .webp, .avif, .svg)
   * and videos (.mp4, .webm, .mov, .gif).
   *
   * Videos auto-play muted on loop. If omitted a fallback is shown.
   * Place files in `public/images/tips/` or `public/videos/tips/`.
   */
  media?: string
  /**
   * How long (in ms) this tip stays visible before auto-advancing.
   * Falls back to DEFAULT_TIP_DURATION if not set.
   */
  duration?: number
}

/** Default display duration (ms) when a tip doesn't specify its own. */
export const DEFAULT_TIP_DURATION = 5000

/**
 * Add, remove, or reorder items here.
 * The carousel will adapt automatically.
 */
export const TIPS: Tip[] = [
  {
    icon: Lightbulb,
    title: "Start with a Clear Prompt",
    description:
      "The more specific your initial prompt, the closer v0 gets on the first try. Mention the stack, layout, and vibe you want.",
    tag: "Tip",
    // media: "/images/tips/clear-prompt.jpg",
    // duration: 6000,
  },
  {
    icon: MousePointerClick,
    title: "Use Design Mode First",
    description:
      "Before burning AI credits on style tweaks, jump into Design Mode to adjust colors, fonts, spacing, and copy for free.",
    tag: "Trick",
    // media: "/videos/tips/design-mode.mp4",
  },
  {
    icon: Layers,
    title: "Compose with Components",
    description:
      "Break your UI into small, reusable components. v0 understands component boundaries and generates cleaner code that way.",
    tag: "Tip",
    // media: "/images/tips/components.png",
  },
  {
    icon: MessageSquare,
    title: "Iterate in Conversation",
    description:
      'Don\'t try to get everything perfect in one prompt. Treat v0 like a pair-programming partner — say "now add auth" or "make it responsive".',
    tag: "Trick",
    // media: "/videos/tips/iterate.mov",
  },
  {
    icon: Zap,
    title: "Leverage Integrations",
    description:
      "Connect Supabase, Neon, or Vercel Blob directly from the sidebar. v0 will wire up the SDK, env vars, and types automatically.",
    tag: "Feature",
    // media: "/images/tips/integrations.gif",
  },
  {
    icon: Palette,
    title: "Reference a Design System",
    description:
      "Paste a screenshot or mention shadcn/ui, Tailwind, or a specific color palette. v0 will match the aesthetic closely.",
    tag: "Inspiration",
    // media: "/images/tips/design-system.jpg",
  },
  {
    icon: Terminal,
    title: "Ask v0 to Explain Code",
    description:
      'Not sure what a piece of generated code does? Ask "explain the auth middleware" and v0 will walk you through it.',
    tag: "Tip",
    // media: "/images/tips/explain.webp",
  },
  {
    icon: GitBranch,
    title: "Version Everything",
    description:
      "Every generation is auto-versioned. Experiment boldly — you can always roll back to any previous version in one click.",
    tag: "Feature",
    // media: "/videos/tips/versioning.mp4",
  },
  {
    icon: Globe,
    title: "Deploy in One Click",
    description:
      "Hit Publish to get a live Vercel URL instantly. Share it, test it on mobile, or hand it off to your team.",
    tag: "Feature",
    // media: "/images/tips/deploy.jpg",
  },
  {
    icon: Wand2,
    title: "Combine AI with Manual Edits",
    description:
      "You can edit code directly, then ask v0 to continue from your changes. It respects your manual edits and builds on top of them.",
    tag: "Inspiration",
    // media: "/videos/tips/manual-edits.webm",
  },
  {
    icon: Database,
    title: "Connect a Real Database",
    description:
      "Use v0's native database integrations to spin up Supabase, Neon, or Vercel Postgres in seconds. v0 generates the schema, runs migrations, and wires the client — you just describe the data model.",
    tag: "Integration",
    media: "/media/separate/database.mp4",
    duration: 12000,
  },
  {
    icon: KeyRound,
    title: "Manage Env Variables Safely",
    description:
      "v0 detects secrets like API keys and database URLs and prompts you to store them as environment variables — never hard-coded. Add or update them from the project settings without touching your code.",
    tag: "Best Practice",
    media: "/media/separate/env-variables.mp4",
    duration: 10000,
  },
  {
    icon: Bot,
    title: "Add AI with the Vercel AI SDK",
    description:
      "Drop in streaming chat, text generation, or structured output by asking v0 to use the Vercel AI SDK. It scaffolds the route, the React hooks, and the UI — so you ship AI features in minutes, not days.",
    tag: "Feature",
    media: "/media/separate/vercel-ai-sdk.mp4",
    duration: 12000,
  },
  {
    icon: ScanEye,
    title: "Clone Any UI from a Screenshot",
    description:
      "Paste a screenshot of any interface and v0 will reverse-engineer it into clean, production-ready code. No manual pixel-pushing — just describe any tweaks you want on top.",
    tag: "Visual AI",
    media: "/media/separate/image-to-website.mp4",
    duration: 12000,
  },
]
