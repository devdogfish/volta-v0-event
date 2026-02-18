"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { CoverSlide, PresenterSlide, FeaturesSlide, TipsSlide } from "./slides";

const SLIDES = [
  { id: "cover", label: "Welcome", Component: CoverSlide },
  { id: "presenter", label: "About Me", Component: PresenterSlide },
  { id: "features", label: "Features", Component: FeaturesSlide },
  { id: "tips", label: "Tips & Tricks", Component: TipsSlide },
];

function slideIndexFromHash(): number {
  const id = window.location.hash.slice(1);
  const index = SLIDES.findIndex((s) => s.id === id);
  return index >= 0 ? index : 0;
}

export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Restore slide from URL hash on mount
  useEffect(() => {
    setCurrentSlide(slideIndexFromHash());
  }, []);

  // Sync URL hash when slide changes
  useEffect(() => {
    const id = SLIDES[currentSlide]?.id;
    if (id) window.location.hash = id;
  }, [currentSlide]);

  // Handle browser back / forward
  useEffect(() => {
    const onPopState = () => setCurrentSlide(slideIndexFromHash());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goToSlide = useCallback(
    (index: number, dir?: "left" | "right") => {
      if (isAnimating || index === currentSlide) return;
      if (index < 0 || index >= SLIDES.length) return;
      setDirection(dir || (index > currentSlide ? "right" : "left"));
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [currentSlide, isAnimating],
  );

  const goNext = useCallback(
    () => goToSlide(currentSlide + 1, "right"),
    [currentSlide, goToSlide],
  );
  const goPrev = useCallback(
    () => goToSlide(currentSlide - 1, "left"),
    [currentSlide, goToSlide],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInFeaturesList = activeEl?.closest('[role="listbox"]');
      const isOnTipsSlide = SLIDES[currentSlide]?.id === "tips";

      // Tips slide handles its own keys — don't interfere
      if (isOnTipsSlide) return;

      if (
        (e.key === "ArrowRight" || e.key === "ArrowDown") &&
        !isInFeaturesList
      ) {
        e.preventDefault();
        goNext();
      } else if (
        (e.key === "ArrowLeft" || e.key === "ArrowUp") &&
        !isInFeaturesList
      ) {
        e.preventDefault();
        goPrev();
      }
    };

    const handlePrevRequest = () => goPrev();
    const handleNextRequest = () => goNext();

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("slideshow:prev", handlePrevRequest);
    window.addEventListener("slideshow:next", handleNextRequest);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("slideshow:prev", handlePrevRequest);
      window.removeEventListener("slideshow:next", handleNextRequest);
    };
  }, [goNext, goPrev, currentSlide]);

  const SlideComponent = SLIDES[currentSlide].Component;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background">
      {/* Slide Content */}
      <main
        ref={slideContainerRef}
        className="relative flex-1 overflow-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        <div
          data-slide-active="true"
          className={`absolute inset-0 p-6 transition-all duration-500 ease-out md:p-12 ${
            isAnimating
              ? direction === "right"
                ? "translate-x-0 animate-slide-in-right"
                : "translate-x-0 animate-slide-in-left"
              : ""
          }`}
        >
          <SlideComponent />
        </div>
      </main>

      {/* Minimal Bottom Bar */}
      <footer className="flex shrink-0 items-center justify-between px-6 py-3">
        {SLIDES[currentSlide]?.id === "tips" ? (
          <button
            onClick={goPrev}
            className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Back to previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back
          </button>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/images/v0-logo.jpeg"
            alt="v0 logo"
            width={32}
            height={32}
            className="rounded-md"
            fetchPriority="high"
          />
        )}

        <div className="flex items-center gap-4">
          
          <a
            href="https://v0-halifax.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Slideshow available at
            https://v0-halifax.vercel.app
          </a>
          <span
            className="font-mono text-xs text-muted-foreground"
            aria-label={`Slide ${currentSlide + 1} of ${SLIDES.length}`}
          >
            {currentSlide + 1} / {SLIDES.length}
          </span>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
