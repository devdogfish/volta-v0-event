import {
  Lightbulb,
  GitBranch,
  Globe,
  Layers,
  MessageSquare,
  Palette,
  Terminal,
  Wand2,
  Database,
  KeyRound,
  Bot,
  ScanEye,
  FileCode,
  TrendingUp,
  HardDrive,
  Microscope,
  Images,
  Wallet,
  Receipt,
  PiggyBank,
  Shuffle,
  QrCode,
  Timer,
  Moon,
  type LucideIcon,
} from "lucide-react";

export interface Tip {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional category tag shown above the title. Use "Tip", "Feature", or "App Idea". */
  tag?: string;
  /**
   * Path to media displayed for this tip.
   * Supports images (.jpg, .jpeg, .png, .webp, .avif, .svg)
   * and videos (.mp4, .webm, .mov, .gif).
   *
   * Videos auto-play muted on loop. If omitted a fallback is shown.
   */
  media?: string;
  /**
   * How long (in ms) this tip stays visible before auto-advancing.
   * Falls back to DEFAULT_TIP_DURATION if not set.
   */
  duration?: number;
  /** Optional "Read more" link shown below the description. */
  link?: { label: string; href: string };
  /** When true, shows an "AI SDK" badge next to the tag — for app ideas that need built-in AI. */
  aiSdk?: boolean;
}

/** Default display duration (ms) when a tip doesn't specify its own. */
export const DEFAULT_TIP_DURATION = 5000;

/**
 * Add, remove, or reorder items here.
 * The carousel will adapt automatically.
 */
export const TIPS: Tip[] = [
  {
    icon: Lightbulb,
    title: "Start with a Clear Prompt",
    description:
      "The more specific your initial prompt, the closer v0 gets on the first try. Mention the layout, the vibe, and what the app should do. Use the Enhanced Prompt feature to let v0 expand your idea into a detailed spec before it starts building — it fills in the gaps you might miss.",
    tag: "Tip",
    media: "/media/separate/enhanced-detailed-prompt.mp4",
    duration: 12000,
  },
  {
    icon: Layers,
    title: "Compose with Components",
    description:
      "Break your UI into small, focused sections. v0 builds cleaner, more reusable code when you think in building blocks rather than one big page.",
    tag: "Tip",
    media: "/images/Compose-with-Components.png",
  },

  {
    icon: Palette,
    title: "Reference a Design You Love",
    description:
      "Paste a screenshot of a design you like, or mention a style like shadcn/ui or a specific color palette. v0 will match the look and feel closely.",
    tag: "Tip",
    media: "/images/design-system.png",
  },

  {
    icon: GitBranch,
    title: "Experiment Without Fear",
    description:
      "Every change is automatically saved as a version. Try bold ideas freely — if something breaks, you can roll back to any previous state in one click.",
    tag: "Tip",
    media: "/media/version-control.mp4",
  },
  {
    icon: Globe,
    title: "Share Your App Instantly",
    description:
      "Hit Publish to get a live link you can share right away. Test it on your phone, send it to a friend, or show it off — no setup required.",
    tag: "Feature",
    media: "/media/publish-to-vercel.mp4",
  },
  {
    icon: Wand2,
    title: "Mix AI and Manual Edits",
    description:
      "You can edit the code directly at any point, then hand it back to v0 to keep building. It picks up from your changes without overwriting anything.",
    tag: "Tip",
  },
  {
    icon: Database,
    title: "Let Your App Store Data",
    description:
      "Want your app to remember users, save posts, or track orders? Connect a database in a few clicks and v0 sets up the structure and wiring for you — no database experience needed.",
    tag: "Feature",
    media: "/media/separate/database.mp4",
    duration: 12000,
  },
  {
    icon: KeyRound,
    title: "Connect External Services Without Exposing Secrets",
    description:
      "Adding payments, emails, or maps means dealing with secret API keys. v0 automatically keeps those hidden and secure — so you can integrate any service without the risk of leaking credentials.",
    tag: "Tip",
    media: "/media/separate/env-variables.mp4",
    duration: 10000,
  },
  {
    icon: Bot,
    title: "Add a Chatbot or AI Feature to Your App",
    description:
      "Want smart search, a chat assistant, or auto-generated content? Ask v0 to add AI and it builds the interface, the backend logic, and the connection to models like Claude or GPT — all from one prompt.",
    tag: "Feature",
    aiSdk: true,
    media: "/media/separate/vercel-ai-sdk.mp4",
    duration: 12000,
    link: {
      label: "Explore the AI SDK docs →",
      href: "https://ai-sdk.dev/docs/introduction",
    },
  },
  {
    icon: ScanEye,
    title: "Turn Any Screenshot into a Working App",
    description:
      "See a design you love? Paste a screenshot and v0 will recreate it as a real, working interface. Then just describe what you want to change or add on top.",
    tag: "Tip",
    media: "/media/separate/image-to-website.mp4",
    duration: 12000,
  },

  {
    icon: TrendingUp,
    title: "The LLM Vibes Radar",
    description:
      'Periodically ask AIs for opinions and rankings ("what\'s the best burger in SF?", "who is the best candidate?", etc). Data visualization could look Google Trends-y. Use ISR for snappy and efficient rendering. This tool can help the world become aware of biases in AIs, be the "Wirecutter for everything", entertain, and inform businesses on how they\'re falling in or out of favor.',
    tag: "App Idea",
    aiSdk: true,
    media: "/images/llm-trends-radar.png",
    duration: 14000,
  },
  {
    icon: HardDrive,
    title: "Cloud to SQLite",
    description:
      "A glorious program dropped the other day on HN: Gmail to SQLite. I'm the most cloud & managed services pilled person in the world, but having near-realtime backups of any dataset of any SaaS sounds dreamy. This has value for individuals looking to explore data with LLMs and SQL, back up their data, gain portability, but also Enterprises and companies looking to build custom agents on top of their otherwise locked-up data.",
    tag: "App Idea",
    media: "/images/Cloud-to-SQLite.png",
    duration: 14000,
    link: {
      label: "Gmail to SQLite on HN →",
      href: "https://news.ycombinator.com/item?id=43943236",
    },
  },
  {
    icon: Microscope,
    title: "Deepest Research",
    description:
      'I notice that when I really need to study a topic in depth, I don\'t want to bank on the viewpoint of a single LLM. Many times I fire up ChatGPT, Grok, and Perplexity in a bunch of tabs. I would love a tool that uses all the available intelligence on the internet to produce the best possible report. Key: tell me how the "experts" aka AIs differed, especially if they have contradicting facts, figures, or conclusions.',
    tag: "App Idea",
    aiSdk: true,
    media: "/images/Deepest-Research.png",
    duration: 14000,
  },

  {
    icon: Wallet,
    title: "Expense Tracker with Receipt Scanning",
    description:
      "Snap a photo of any receipt and a visual LLM parses out the store, amount, date, and line items automatically. Add your own categories, set monthly budgets, and finally see a clear picture of where your money is actually going.",
    tag: "App Idea",
    aiSdk: true,
    media: "/images/expense-tracker-with-QR-scanning.png",
    duration: 10000,
  },
  {
    icon: Receipt,
    title: "Split the Bill",
    description:
      "Enter the total, number of people, and tip — everyone instantly sees what they owe. No more back-and-forth math at the end of a dinner.",
    tag: "App Idea",
    media: "/images/split-the-bill.png",
    duration: 8000,
  },
  {
    icon: PiggyBank,
    title: "How Long Until I Can Afford It?",
    description:
      "Enter a price and how much you save per month. See exactly how many weeks or months stand between you and that purchase. Weirdly motivating.",
    tag: "App Idea",
    media: "/images/how-long-until-i-can-afford.png",
    duration: 8000,
  },
  {
    icon: Shuffle,
    title: "Random Decision Maker",
    description:
      "Can't decide where to eat, what to watch, or which option to pick? Enter your choices, spin the wheel, and commit to the result.",
    tag: "App Idea",
    media: "/images/Random-Decision-Maker.png",
    duration: 8000,
  },
  {
    icon: QrCode,
    title: "QR Code Generator",
    description:
      "Yes, there are a thousand of these — but building your own clone in an afternoon is a great v0 exercise. Paste a URL or any text, get a scannable code instantly. Download and done.",
    tag: "App Idea",
    media: "/images/qr-code-tracker.png",
    duration: 8000,
  },
  {
    icon: Timer,
    title: "Reaction Time, Visualized",
    description:
      "Ten rounds of click-when-it-turns-green. Your results are plotted live as a dot chart — see your average, your best, and where you land compared to typical human reaction time (~200–250ms). Simple, shareable, and quietly competitive.",
    tag: "App Idea",
    media: "/images/reaction-time-test.png",
    duration: 10000,
  },
  {
    icon: Moon,
    title: "Sleep Debt Tracker",
    description:
      "Log your sleep each night against a personal target. The app tracks your running deficit or surplus and tells you how many good nights it would take to recover. Most people have no idea how deep in the hole they are — a chart makes it real.",
    tag: "App Idea",
    media: "/images/sleep-dept-tracker.png",
    duration: 10000,
  },
];
