// components/animations.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";

/* ---------- SCROLL REVEAL (fades in from bottom on scroll-down,
   from top on scroll-up, replays every time by default) ---------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  y = 36,
  once = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [offset, setOffset] = useState(y);
  const directionRef = useRef<"up" | "down">("down");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const cur = window.scrollY;
      directionRef.current = cur >= lastY ? "down" : "up";
      lastY = cur;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      setOffset(0);
      return;
    }
    const clear = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    const obs = new IntersectionObserver(
      ([entry]) => {
        clear();
        if (entry.isIntersecting) {
          const fromBelow = directionRef.current === "down";
          setOffset(fromBelow ? y : -y);
          setVisible(false);
          timerRef.current = window.setTimeout(() => {
            setVisible(true);
            timerRef.current = null;
          }, 30);
          if (once) obs.disconnect();
        } else if (!once) {
          setOffset(entry.boundingClientRect.bottom < 0 ? -y : y);
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clear();
    };
  }, [once, y]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? "translateY(0)" : `translateY(${offset}px)`,
      }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* ---------- ANIMATED COUNTER (replays on scroll by default) ---------- */

type CounterProps = {
  target: number;
  suffix?: string;
  duration?: number;
  replay?: boolean;
};

export const AnimatedCounter = ({
  target,
  suffix = "",
  duration = 2000,
  replay = true,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const stop = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      runningRef.current = false;
    };
    const run = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(eased * target * 10) / 10 === target ? Math.round(eased * target) : Math.round(eased * target));
        if (p < 1) frameRef.current = requestAnimationFrame(tick);
        else {
          frameRef.current = null;
          runningRef.current = false;
        }
      };
      frameRef.current = requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!replay && startedRef.current) return;
          startedRef.current = true;
          run();
        } else if (replay) {
          stop();
          setValue(0);
          startedRef.current = false;
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      stop();
    };
  }, [target, duration, replay]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};