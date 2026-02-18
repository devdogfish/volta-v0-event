"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"
import {
  Sparkles,
  Paintbrush,
  Database,
  RotateCcw,
  Rocket,
  ImageOff,
  ArrowLeft,
} from "lucide-react"
import { TIPS, DEFAULT_TIP_DURATION } from "./tips-data"

/* ================================================================== */
/*  Shared: detect whether a path is a video or image                 */
/* ================================================================== */

const VIDEO_EXTENSIONS = /\.(mp4|webm|mov)$/i

function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.test(src)
}

/* ================================================================== */
/*  Shared: unified media display (image or video, with fallback)     */
/* ================================================================== */

function MediaDisplay({
  src,
  alt,
  isActive = true,
}: {
  src?: string
  alt: string
  isActive?: boolean
}) {
  const [errored, setErrored] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Reset error state when src changes
  useEffect(() => {
    setErrored(false)
  }, [src])

  // Play / pause video based on active state
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isActive) {
      video.currentTime = 0
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive, src])

  if (!src || errored) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2">
        <ImageOff className="h-6 w-6 text-muted-foreground/30" />
        <p className="font-mono text-[10px] text-muted-foreground/40">
          {errored ? "Media not found" : "No media available"}
        </p>
      </div>
    )
  }

  if (isVideo(src)) {
    return (
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        autoPlay={isActive}
        onError={() => setErrored(true)}
        className="h-full w-full object-contain"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      unoptimized={/\.gif$/i.test(src)}
      onError={() => setErrored(true)}
    />
  )
}

/* ================================================================== */
/*  Slide 1 — Cover                                                   */
/* ================================================================== */

export function CoverSlide() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div
        className={`transition-all duration-1000 ease-out ${
          mounted ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/v0-logo.jpeg"
          alt="v0 logo"
          width={120}
          height={120}
          className="rounded-2xl"
          fetchPriority="high"
          decoding="sync"
        />
      </div>
      <div
        className={`flex flex-col items-center gap-3 transition-all delay-300 duration-1000 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h1 className="text-balance text-center font-sans text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          Vibe Coding Meetup
        </h1>
        <p className="max-w-md text-balance text-center font-mono text-sm text-muted-foreground md:text-base">
          Build real apps with AI. Ship instantly.
        </p>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  Slide 2 — Connect                                                 */
/* ================================================================== */

/**
 * Edit these constants to customise the connect slide.
 * This is a lightweight slide so the audience knows how to reach you
 * without turning the presentation into a personal showcase.
 */
const CONNECT = {
  name: "Luigi Girke",
  handle:"",
  // handle: "/in/luigigirke",
  links: [
    { label: "GitHub", href: "https://github.com/devdogfish" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/luigigirke/" },
  ],
}

export function PresenterSlide() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Presented by
        </p>
        <h2 className="font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {CONNECT.name}
        </h2>
        {CONNECT.handle && (
          <p className="font-mono text-sm text-muted-foreground">
            {CONNECT.handle}
          </p>
        )}
      </div>

      {CONNECT.links.length > 0 && (
        <div
          className={`flex gap-3 transition-all delay-300 duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {CONNECT.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ================================================================== */
/*  Slide 3 — Top 5 Features                                         */
/* ================================================================== */

/**
 * Feature list for Slide 3.
 *
 * Set `media` to any image or video path. The component auto-detects
 * the type from the extension and renders accordingly. Videos autoplay
 * muted on loop. If omitted, a fallback is shown.
 */
const BULLET_POINTS = [
  {
    icon: Sparkles,
    title: "Kickstart Your Project",
    description:
      "Starter templates and AI prompt enhancement turn a vague idea into a detailed, buildable spec in seconds.",
    media: "/media/browse-templates.mp4",
  },
  {
    icon: Paintbrush,
    title: "Polish the UI for Free",
    description:
      "Design mode lets you tweak styles and copy on any element live — without burning a single AI credit.",
    media: "/media/design-mode.mp4",
  },
  {
    icon: Database,
    title: "Add Real Backend Power",
    description:
      "Natively connect databases, sync to GitHub, and brainstorm implementation details with the AI — all without leaving v0.",
    media: "/media/backend-sequence.mp4",
  },
  {
    icon: RotateCcw,
    title: "Experiment Without Fear",
    description:
      "Every change is auto-versioned with instant rollback, so you can try bold ideas and revert in one click.",
    media: "/media/version-control.mp4",
  },
  {
    icon: Rocket,
    title: "Ship Instantly",
    description:
      "One-click deploy gives you a live production URL, and export options let you download the code or push to GitHub when you're ready to move on.",
    media: "/media/publish-to-vercel.mp4",
  },
]

export function FeaturesSlide() {
  const [activeIndex, setActiveIndex] = useState(0)
  const bulletRefs = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (
        e.key === "ArrowDown" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowLeft"
      ) {
        e.preventDefault()
        const isForward = e.key === "ArrowDown" || e.key === "ArrowRight"

        if (isForward) {
          if (activeIndex < BULLET_POINTS.length - 1) {
            setActiveIndex((prev) => prev + 1)
          } else {
            window.dispatchEvent(new CustomEvent("slideshow:next"))
          }
        } else {
          if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1)
          } else {
            window.dispatchEvent(new CustomEvent("slideshow:prev"))
          }
        }
      }
    },
    [activeIndex]
  )

  useEffect(() => {
    bulletRefs.current[activeIndex]?.focus()
  }, [activeIndex])

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col gap-6 p-4 md:flex-row md:gap-0 md:p-0"
      role="region"
      aria-label="v0 Features"
    >
      {/* Bullet Points - Left Side */}
      <div className="flex flex-col justify-center md:w-1/2 md:pr-8">
        <h2 className="mb-6 font-sans text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          What you can do with v0
        </h2>
        <div
          role="listbox"
          aria-label="Feature list"
          aria-activedescendant={`feature-${activeIndex}`}
          className="flex flex-col gap-1"
        >
          {BULLET_POINTS.map((point, i) => {
            const Icon = point.icon
            const isActive = i === activeIndex
            return (
              <button
                key={i}
                id={`feature-${i}`}
                ref={(el) => {
                  bulletRefs.current[i] = el
                }}
                role="option"
                aria-selected={isActive}
                onClick={() => setActiveIndex(i)}
                onKeyDown={handleKeyDown}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? "bg-secondary/80"
                    : "bg-transparent hover:bg-secondary/40"
                }`}
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded transition-colors duration-300 ${
                    isActive
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <p
                  className={`flex-1 font-sans text-sm font-semibold transition-colors duration-300 ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {point.title}
                </p>
                <div
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                    isActive ? "bg-foreground" : "bg-transparent"
                  }`}
                />
              </button>
            )
          })}
        </div>
        <div className="mt-4 h-12 px-3">
          <p className="font-sans text-xs leading-relaxed text-muted-foreground transition-opacity duration-300">
            {BULLET_POINTS[activeIndex].description}
          </p>
        </div>
      </div>

      {/* Media - Right Side */}
      <div className="flex items-center justify-center md:w-1/2">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border bg-card">
          {BULLET_POINTS.map((point, i) => {
            const isActive = i === activeIndex
            return (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  isActive ? "z-10 opacity-100" : "z-0 opacity-0"
                }`}
                aria-hidden={!isActive}
              >
                {isActive && (
                  <MediaDisplay
                    src={point.media}
                    alt={point.title}
                    isActive={isActive}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  Slide 4 — Tips, Tricks & Inspiration (infinite carousel)          */
/* ================================================================== */

const TRANSITION_DURATION = 800 // ms — matches the CSS animation length

/**
 * Builds one round of tip indices with category-aware shuffling.
 *
 * Algorithm:
 *   1. Group tip indices by category and Fisher-Yates shuffle within each group.
 *   2. Greedily interleave: always pull from the largest group that isn't the
 *      same category as the last-shown tip, so same-category runs are rare.
 *   3. When multiple groups are close in size (within 1), pick randomly among
 *      them to add variety rather than always following a fixed pattern.
 *   4. Falls back to any non-empty group if all remaining items share the last
 *      category (mathematically unavoidable when one category dominates).
 *
 * The `prevLastTag` parameter lets the first tip of a new round differ from
 * the last tip of the previous round, eliminating cross-round same-category
 * transitions.
 */
function buildRound(prevLastTag?: string): number[] {
  // Group tip indices by category
  const buckets = new Map<string, number[]>()
  TIPS.forEach((tip, i) => {
    const key = tip.tag ?? "uncategorized"
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key)!.push(i)
  })

  // Shuffle within each bucket for intra-category randomness
  for (const bucket of buckets.values()) {
    for (let i = bucket.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[bucket[i], bucket[j]] = [bucket[j], bucket[i]]
    }
  }

  const result: number[] = []
  let lastTag: string | undefined = prevLastTag

  while (result.length < TIPS.length) {
    const available = [...buckets.entries()]
      .filter(([, b]) => b.length > 0)
      .sort((a, b) => b[1].length - a[1].length)
    if (available.length === 0) break

    // Prefer any category other than the last shown
    const eligible = available.filter(([tag]) => tag !== lastTag)
    const pool = eligible.length > 0 ? eligible : available

    // Among buckets within 1 of the max remaining count, pick randomly
    const maxCount = pool[0][1].length
    const topTier = pool.filter(([, b]) => b.length >= maxCount - 1)
    const [chosenTag, chosenBucket] =
      topTier[Math.floor(Math.random() * topTier.length)]

    result.push(chosenBucket.pop()!)
    lastTag = chosenTag
  }

  return result
}

export function TipsSlide() {
  // Round management: orderRef holds the pre-computed sequence of TIPS indices
  // for the current round; posRef tracks our position within it.
  // Both are refs so callbacks always see the latest values without stale closures.
  const orderRef = useRef<number[]>([])
  const posRef = useRef(0)

  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const order = buildRound()
    orderRef.current = order
    posRef.current = 0
    return order[0]
  })
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const isTransitioning = useRef(false)
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const count = TIPS.length

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (isTransitioning.current) return
      isTransitioning.current = true

      const curPos = posRef.current
      const order = orderRef.current
      let nextIdx: number

      if (dir === 1) {
        const nextPos = curPos + 1
        if (nextPos >= order.length) {
          // End of round — build a fresh round seeded with the last shown category
          // so the first tip of the new round differs from the last of this one
          const newOrder = buildRound(TIPS[activeIndex].tag)
          orderRef.current = newOrder
          posRef.current = 0
          nextIdx = newOrder[0]
        } else {
          posRef.current = nextPos
          nextIdx = order[nextPos]
        }
      } else {
        // Going backward stays within the current round (wraps to end)
        const prevPos = curPos > 0 ? curPos - 1 : order.length - 1
        posRef.current = prevPos
        nextIdx = order[prevPos]
      }

      setPrevIndex(activeIndex)
      setActiveIndex(nextIdx)
      setTimeout(() => {
        setPrevIndex(null)
        isTransitioning.current = false
      }, TRANSITION_DURATION)
    },
    [activeIndex]
  )

  const goNext = useCallback(() => advance(1), [advance])
  const goPrev = useCallback(() => advance(-1), [advance])

  // Schedule auto-advance using the current tip's duration
  const scheduleNext = useCallback(() => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    const ms = TIPS[activeIndex]?.duration ?? DEFAULT_TIP_DURATION
    autoTimerRef.current = setTimeout(goNext, ms)
  }, [activeIndex, goNext])

  useEffect(() => {
    scheduleNext()
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current)
    }
  }, [scheduleNext])

  const resetTimer = useCallback(() => {
    scheduleNext()
  }, [scheduleNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!containerRef.current?.closest('[data-slide-active="true"]')) return

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault()
        e.stopPropagation()
        goNext()
        resetTimer()
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault()
        e.stopPropagation()
        goPrev()
        resetTimer()
      } else if (e.key === "Escape") {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent("slideshow:prev"))
      }
    }

    window.addEventListener("keydown", handleKey, true)
    return () => window.removeEventListener("keydown", handleKey, true)
  }, [goNext, goPrev, resetTimer])

  // Render a single tip
  const renderTip = (tip: (typeof TIPS)[number], active: boolean) => (
    <>
      {/* Media */}
      <div className="relative aspect-video w-full max-w-lg overflow-hidden rounded-lg border border-border bg-secondary/30">
        <MediaDisplay src={tip.media} alt={tip.title} isActive={active} />
      </div>

      {/* Tag */}
      {tip.tag && (
        <span className="rounded-full border border-border px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {tip.tag}
        </span>
      )}

      {/* Title & description */}
      <h3 className="text-balance font-sans text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {tip.title}
      </h3>
      <p className="max-w-lg text-balance font-sans text-sm leading-relaxed text-muted-foreground">
        {tip.description}
      </p>

      {/* Optional read-more link */}
      {tip.link && (
        <a
          href={tip.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
        >
          {tip.link.label}
        </a>
      )}
    </>
  )

  return (
    <div
      ref={containerRef}
      className="relative flex h-full items-center justify-center"
      role="region"
      aria-label="Tips and Tricks"
      aria-roledescription="carousel"
    >
      {/* Centered content */}
      <div className="relative w-full max-w-2xl px-6">
        {/* Exiting tip */}
        {prevIndex !== null && (
          <div
            key={`exit-${prevIndex}`}
            className="absolute inset-0 flex flex-col items-center gap-6 px-6 text-center animate-tip-exit"
            aria-hidden="true"
          >
            {renderTip(TIPS[prevIndex], false)}
          </div>
        )}

        {/* Active tip */}
        <div
          key={`enter-${activeIndex}`}
          className={`flex flex-col items-center gap-6 text-center ${
            prevIndex !== null ? "animate-tip-enter" : ""
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${activeIndex + 1} of ${count}`}
        >
          {renderTip(TIPS[activeIndex], true)}
        </div>
      </div>

    </div>
  )
}
