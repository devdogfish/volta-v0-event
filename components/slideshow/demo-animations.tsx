"use client"

import { useEffect, useState } from "react"
import { Sparkles, Paintbrush, Database, GitBranch, RotateCcw, Rocket, Globe, Code, Download } from "lucide-react"

function useAnimationStep(steps: number, interval: number) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setStep((s) => (s + 1) % steps), interval)
    return () => clearInterval(timer)
  }, [steps, interval])
  return step
}

export function KickstartDemo() {
  const step = useAnimationStep(4, 1500)
  const prompts = [
    "Build me an app...",
    "A modern dashboard with auth",
    "Generating project scaffold...",
    "Ready to build!",
  ]
  const widths = ["w-[40%]", "w-[70%]", "w-[90%]", "w-full"]

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-widest">AI Prompt Enhancement</span>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
          </div>
          <p className="font-mono text-sm text-foreground transition-all duration-500">
            {prompts[step]}
            <span className="animate-pulse text-muted-foreground">|</span>
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-2 rounded-full bg-foreground/10 transition-all duration-700`}
            >
              <div
                className={`h-full rounded-full bg-foreground transition-all duration-700 ${
                  step > i ? widths[Math.min(step, 3)] : "w-0"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DesignModeDemo() {
  const step = useAnimationStep(3, 2000)
  const colors = [
    "bg-foreground text-background",
    "bg-blue-500 text-foreground",
    "bg-foreground text-background",
  ]
  const radii = ["rounded-md", "rounded-full", "rounded-lg"]
  const sizes = ["px-6 py-2", "px-8 py-3", "px-5 py-2"]

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <Paintbrush className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-widest">Design Mode</span>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-6">
          <div className="mb-6 flex flex-col gap-3">
            <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />
            <div className="h-4 w-1/2 rounded bg-muted-foreground/20" />
          </div>
          <button
            className={`font-sans text-sm font-medium transition-all duration-500 ${colors[step]} ${radii[step]} ${sizes[step]}`}
            aria-hidden="true"
            tabIndex={-1}
          >
            Get Started
          </button>
          <div className="mt-4 flex items-center gap-2">
            <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${step === 0 ? "bg-foreground" : step === 1 ? "bg-blue-500" : "bg-foreground"}`} />
            <span className="font-mono text-xs text-muted-foreground">0 credits used</span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-4">
          {["Color", "Radius", "Size"].map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <div className={`h-2 w-2 rounded-full transition-all duration-300 ${step === i ? "bg-foreground" : "bg-muted-foreground/40"}`} />
              <span className="font-mono text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function BackendDemo() {
  const step = useAnimationStep(4, 1800)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <Database className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-widest">Backend Integration</span>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { icon: Database, label: "Supabase", connected: step >= 1 },
            { icon: GitBranch, label: "GitHub", connected: step >= 2 },
            { icon: Sparkles, label: "AI Brainstorm", connected: step >= 3 },
          ].map(({ icon: Icon, label, connected }) => (
            <div
              key={label}
              className={`flex items-center gap-3 rounded-lg border p-3 transition-all duration-500 ${
                connected ? "border-foreground/30 bg-secondary/80" : "border-border bg-secondary/30"
              }`}
            >
              <Icon className={`h-4 w-4 transition-all duration-500 ${connected ? "text-foreground" : "text-muted-foreground/40"}`} />
              <span className={`font-mono text-sm transition-all duration-500 ${connected ? "text-foreground" : "text-muted-foreground/40"}`}>
                {label}
              </span>
              <span className={`ml-auto font-mono text-xs transition-all duration-500 ${connected ? "text-green-400" : "text-muted-foreground/30"}`}>
                {connected ? "connected" : "pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function VersioningDemo() {
  const step = useAnimationStep(5, 1400)
  const versions = ["v1", "v2", "v3", "v4", "v2"]
  const isRollback = step === 4

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <RotateCcw className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-widest">Auto-Versioning</span>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-sm text-foreground">
              Current: <span className={`font-bold transition-all duration-300 ${isRollback ? "text-amber-400" : "text-foreground"}`}>{versions[step]}</span>
            </span>
            {isRollback && (
              <span className="animate-pulse font-mono text-xs text-amber-400">
                rolled back
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {["v1", "v2", "v3", "v4"].map((v, i) => (
              <div
                key={v}
                className={`flex h-10 w-10 items-center justify-center rounded border font-mono text-xs transition-all duration-500 ${
                  versions[step] === v
                    ? "border-foreground bg-foreground text-background"
                    : i < step || (isRollback && i <= 1)
                    ? "border-border bg-secondary text-muted-foreground"
                    : "border-border/50 bg-transparent text-muted-foreground/30"
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DeployDemo() {
  const step = useAnimationStep(4, 1600)
  const stages = ["Building...", "Deploying...", "Live!", ""]

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-8">
      <div className="w-full max-w-sm">
        <div className="mb-4 flex items-center gap-2 text-muted-foreground">
          <Rocket className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-widest">One-Click Deploy</span>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50 p-4">
          <div className="mb-4 flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full transition-all duration-500 ${step >= 2 ? "bg-green-400" : step >= 1 ? "animate-pulse bg-amber-400" : "animate-pulse bg-muted-foreground"}`} />
            <span className="font-mono text-sm text-foreground">
              {step < 3 ? stages[step] : ""}
              {step === 3 && (
                <span className="text-foreground">your-app.vercel.app</span>
              )}
            </span>
          </div>
          {step >= 2 && (
            <div className="flex gap-2 transition-all duration-300">
              <div className="flex items-center gap-1.5 rounded border border-border bg-secondary px-3 py-1.5">
                <Globe className="h-3 w-3 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">Visit</span>
              </div>
              <div className="flex items-center gap-1.5 rounded border border-border bg-secondary px-3 py-1.5">
                <Code className="h-3 w-3 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">Export</span>
              </div>
              <div className="flex items-center gap-1.5 rounded border border-border bg-secondary px-3 py-1.5">
                <Download className="h-3 w-3 text-muted-foreground" />
                <span className="font-mono text-xs text-muted-foreground">Download</span>
              </div>
            </div>
          )}
        </div>
        {step >= 2 && (
          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-green-400 transition-all duration-700" style={{ width: "100%" }} />
          </div>
        )}
      </div>
    </div>
  )
}
