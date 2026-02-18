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
]
