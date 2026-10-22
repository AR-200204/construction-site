// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, Building2 } from "lucide-react";

const LINKS = ["Home", "Services", "Projects", "About", "Contact"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const anchor = (id: string) =>
    isHome ? `#${id.toLowerCase()}` : `/#${id.toLowerCase()}`;

  // scrollYProgress = 0..1 across the whole page (the "fill" value)
  // scrollY = raw pixels (used to decide when to elevate)
  const { scrollY, scrollYProgress } = useScroll();

  // Flip the elevate state once past 24px. CSS transition smooths it,
  // and because the initial value is false on both server & client,
  // there is no hydration mismatch.
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-out ${
        scrolled
          ? "border-slate-200/80 bg-white/95 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.18)] backdrop-blur-xl"
          : "border-transparent bg-white/70 backdrop-blur-md shadow-none"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-300 ease-out sm:px-6 lg:px-8 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Building2
            className={`h-8 w-8 text-amber-500 transition-transform duration-300 ${
              scrolled ? "scale-95" : "scale-100"
            }`}
          />
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            APEX<span className="text-amber-500">BUILD</span>
          </span>
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {LINKS.map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : anchor(item)}
              className="font-medium text-slate-600 transition-colors hover:text-amber-600"
            >
              {item}
            </Link>
          ))}
          <Link
            href={anchor("Contact")}
            className="rounded-md bg-slate-900 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-amber-500"
          >
            Get a Quote
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-900"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* THE FILLING ANIMATION: amber line scales with page scroll,
          drains when you scroll back up. initial={false} stops any
          first-paint flash / hydration diff. origin-left so it grows
          from the left edge. */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        initial={false}
        className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
      />

      {isOpen && (
        <div className="absolute w-full border-t border-slate-100 bg-white md:hidden">
          <div className="space-y-2 px-4 pb-6 pt-2">
            {LINKS.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : anchor(item)}
                onClick={() => setIsOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600"
              >
                {item}
              </Link>
            ))}
            <Link
              href={anchor("Contact")}
              onClick={() => setIsOpen(false)}
              className="block rounded-md bg-slate-900 px-3 py-3 text-center font-semibold text-white"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}