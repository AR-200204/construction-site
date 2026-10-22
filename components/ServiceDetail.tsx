// components/ServiceDetail.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Phone,
  X,
  ShieldCheck,
  Clock,
  BadgeCheck,
  Headphones,
  Quote,
  Star,
  Award,
  Users,
  Wallet,
  Sparkles,
} from "lucide-react";
import { Reveal, AnimatedCounter } from "./animations";
import { getService, type Service } from "../lib/services";

/* ---------------- AUTO IMAGE SLIDER (position-conflict FIXED) -------------- */
/* Root is NEVER absolute; the parent supplies positioning. overlay={false}
   lets the hero add its own richer gradient without double-darkening.        */
function ImageSlider({
  images,
  captions,
  overlay = true,
  className = "",
}: {
  images: string[];
  captions?: string[];
  overlay?: boolean;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (hover) return;
    const t = setTimeout(() => setI((p) => (p + 1) % images.length), 4500);
    return () => clearTimeout(t);
  }, [i, hover, images.length]);

  const pause = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {images.map((src, idx) => (
        <img
          key={src + idx}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
            idx === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
          }`}
        />
      ))}

      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
      )}

      {captions && (
        <div className="absolute bottom-5 left-5 right-16 z-10">
          <span className="inline-block rounded-md bg-amber-500 px-3 py-1 text-sm font-semibold text-slate-950 shadow-lg">
            {captions[i]}
          </span>
        </div>
      )}

      <button
        type="button"
        aria-label="Previous"
        {...pause}
        onClick={() => setI((p) => (p - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-amber-500 hover:text-slate-950"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next"
        {...pause}
        onClick={() => setI((p) => (p + 1) % images.length)}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-2 text-white backdrop-blur-sm transition hover:bg-amber-500 hover:text-slate-950"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div {...pause} className="absolute bottom-5 right-5 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === i ? "w-7 bg-amber-500" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- FADE-SWITCH (replays when dep changes) ------------------- */
function FadeSwitch({
  dep,
  children,
  className = "",
}: {
  dep: unknown;
  children: React.ReactNode;
  className?: string;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShow(true))
    );
    return () => cancelAnimationFrame(r);
  }, [dep]);
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------- LIGHTBOX ------------------------------------------------- */
function Lightbox({
  items,
  index,
  onClose,
  onNav,
}: {
  items: { src: string; caption: string }[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNav]);

  const item = items[index];
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-amber-500 hover:text-slate-950"
      >
        <X className="h-6 w-6" />
      </button>
      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-amber-500 hover:text-slate-950"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <figure className="max-h-[85vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={item.caption} className="max-h-[78vh] w-auto rounded-lg object-contain shadow-2xl" />
        <figcaption className="mt-3 text-center text-sm text-slate-300">
          {item.caption} · {index + 1} / {items.length}
        </figcaption>
      </figure>
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => { e.stopPropagation(); onNav(1); }}
        className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition hover:bg-amber-500 hover:text-slate-950"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

/* ---------------- PROCESS STEPPER (interactive) ---------------------------- */
function ProcessStepper({ service }: { service: Service }) {
  const [step, setStep] = useState(0);
  const active = service.process[step];
  const ActiveIcon = active.icon;

  return (
    <div>
      {/* progress rail */}
      <div className="relative mb-8 hidden h-1 w-full rounded-full bg-slate-200 md:block">
        <div
          className="absolute left-0 top-0 h-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700 ease-out"
          style={{ width: `${((step + 1) / service.process.length) * 100}%` }}
        />
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {service.process.map((p, idx) => {
          const Icon = p.icon;
          const on = idx === step;
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => setStep(idx)}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                on
                  ? "scale-105 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-amber-300"
              }`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${on ? "bg-slate-950 text-amber-400" : "bg-slate-100 text-slate-500"}`}>
                {idx + 1}
              </span>
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{p.title}</span>
            </button>
          );
        })}
      </div>

      <FadeSwitch dep={step}>
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-xl md:grid-cols-2 md:p-8">
          <div>
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30">
              <ActiveIcon className="h-7 w-7" />
            </div>
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-amber-600">
              Step {step + 1} of {service.process.length}
            </span>
            <h4 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">{active.title}</h4>
            <p className="mb-5 text-slate-600">{active.desc}</p>
            <ul className="space-y-2">
              {active.points.map((pt) => (
                <li key={pt} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-500" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 blur-xl" />
            <img
              src={active.image}
              alt={active.title}
              className="relative h-64 w-full rounded-2xl object-cover shadow-2xl md:h-80"
            />
          </div>
        </div>
      </FadeSwitch>
    </div>
  );
}

/* ---------------- FAQ ACCORDION (interactive) ------------------------------ */
function FaqAccordion({ service }: { service: Service }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {service.faq.map((f, idx) => {
        const on = open === idx;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 ${
              on ? "border-amber-300 shadow-lg shadow-amber-500/10" : "border-slate-200"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(on ? null : idx)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className={`font-semibold transition-colors ${on ? "text-amber-700" : "text-slate-900"}`}>{f.q}</span>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${on ? "rotate-180 bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-500"}`}>
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <p className="border-l-2 border-amber-400 px-5 pb-5 pl-4 text-slate-600">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================ MAIN PAGE BODY ============================== */
export default function ServiceDetail({ slug }: { slug: string }) {
  const service = getService(slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!service) return null;
  const Icon = service.icon;

  const navLightbox = (dir: 1 | -1) =>
    setLightbox((p) =>
      p === null ? p : (p + dir + service.gallery.length) % service.gallery.length
    );

  const trust = [
    { icon: ShieldCheck, label: "Licensed & Insured" },
    { icon: Clock, label: "24-Hour Response" },
    { icon: BadgeCheck, label: "Fixed, Transparent Quotes" },
    { icon: Headphones, label: "Dedicated Project Manager" },
  ];

  const promise = [
    { icon: Users, title: "One point of contact", desc: "A dedicated manager owns your build from kickoff to handover." },
    { icon: Camera, title: "Weekly photo updates", desc: "See progress every week — no chasing, no guesswork." },
    { icon: Wallet, title: "No-surprise pricing", desc: "Line-item quotes with a clear variation process." },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* breadcrumb */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white pt-20">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 text-sm sm:px-6 lg:px-8">
          <Link href="/" className="text-slate-500 transition-colors hover:text-amber-600">Home</Link>
          <span className="text-amber-400">/</span>
          <Link href="/#services" className="text-slate-500 transition-colors hover:text-amber-600">Services</Link>
          <span className="text-amber-400">/</span>
          <span className="font-semibold text-slate-900">{service.title}</span>
        </div>
      </div>

      {/* ============================= HERO ============================= */}
      <section className="relative min-h-[90vh] overflow-hidden bg-slate-950">
        {/* guaranteed dark base so text is readable even if a photo fails */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        {/* image slider (parent provides absolute positioning → no conflict) */}
        <div className="absolute inset-0">
          <ImageSlider images={service.heroImages} overlay={false} />
        </div>
        {/* color glow blobs */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 animate-pulse rounded-full bg-amber-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl" />
        {/* legibility overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/70" />

        <div className="relative z-20 mx-auto flex min-h-[90vh] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 shadow-xl shadow-amber-500/30">
              <Icon className="h-8 w-8" />
            </div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber-300 ring-1 ring-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> Apex Build · {service.title}
            </span>
            <h1 className="mb-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            <div className="mb-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            <p className="mb-9 max-w-2xl text-lg text-slate-200 md:text-xl">
              {service.tagline}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/#contact" className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:shadow-xl hover:shadow-amber-500/40">
                Get a Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#work" className="rounded-xl border-2 border-white/40 bg-white/5 px-8 py-4 text-center font-bold text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-slate-950">
                See Our Work
              </a>
            </div>
          </Reveal>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown className="h-6 w-6" />
        </div>
      </section>

      {/* ============================ TRUST STRIP ======================= */}
      <section className="relative z-30 -mt-px bg-slate-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trust.map((t, idx) => {
            const TIcon = t.icon;
            return (
              <Reveal key={t.label} delay={idx * 100}>
                <div className="flex items-center gap-3 border-white/5 px-2 py-6 lg:border-l lg:first:border-l-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30">
                    <TIcon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-200 md:text-base">{t.label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================ OVERVIEW ========================== */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="relative order-2 lg:order-1">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl border-2 border-amber-400/40" />
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-amber-500/10" />
            <img src={service.introImage} alt={service.title} className="relative h-[460px] w-full rounded-3xl object-cover shadow-2xl transition-transform duration-500 hover:scale-[1.02]" />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-2xl ring-1 ring-white/10 md:block">
              <div className="text-4xl font-extrabold text-amber-500">{service.badge.value}</div>
              <div className="font-medium text-slate-300">{service.badge.label}</div>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-amber-600">Overview</span>
            <h3 className="mb-6 text-3xl font-extrabold text-slate-900 md:text-4xl">What we deliver</h3>
            {service.intro.map((p) => (
              <p key={p} className="mb-5 text-lg leading-relaxed text-slate-600">{p}</p>
            ))}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.slice(0, 4).map((f) => (
                <li key={f.title} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-500" />
                  <span className="text-sm font-medium">{f.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============================ STATS BAND ======================== */}
      <section className="relative overflow-hidden bg-slate-950 py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 text-center sm:px-6 md:grid-cols-3 lg:px-8">
          {service.stats.map((s, idx) => (
            <Reveal key={s.label} delay={idx * 140}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:border-amber-500/40 hover:bg-white/10">
                <div className="mb-2 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-5xl font-extrabold text-transparent md:text-6xl">
                  <AnimatedCounter target={s.target} suffix={s.suffix} replay />
                </div>
                <div className="font-medium text-slate-300">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ FEATURES ========================== */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-amber-600">Capabilities</span>
            <h3 className="text-3xl font-extrabold text-slate-900 md:text-4xl">What&apos;s included</h3>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f, idx) => {
              const FIcon = f.icon;
              return (
                <Reveal key={f.title} delay={idx * 100} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-500/10">
                    <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-amber-500 to-orange-500 transition-transform duration-500 group-hover:scale-x-100" />
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/15 to-orange-500/15 text-amber-600 ring-1 ring-amber-500/20 transition-all duration-300 group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-slate-950">
                      <FIcon className="h-8 w-8" />
                    </div>
                    <h4 className="mb-2 text-xl font-bold text-slate-900">{f.title}</h4>
                    <p className="leading-relaxed text-slate-600">{f.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================== IMAGE QUOTE BREAK ======================= */}
      <section className="relative overflow-hidden">
        <img src={service.gallery[0]?.src || service.heroImages[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
        <div className="pointer-events-none absolute -left-10 top-10 h-72 w-72 animate-pulse rounded-full bg-amber-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <Quote className="mb-6 h-12 w-12 text-amber-500" />
            <p className="mb-6 text-2xl font-bold leading-snug text-white md:text-4xl">
              We don&apos;t just build structures — we build the trust that lasts long after the scaffolding comes down.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-amber-300">Rated 5.0 by clients across {service.title.toLowerCase()} projects</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ PROCESS =========================== */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-amber-600">How we work</span>
            <h3 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Our process, step by step</h3>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">Click any stage to see what happens and what you can expect from us.</p>
          </Reveal>
          <Reveal>
            <ProcessStepper service={service} />
          </Reveal>
        </div>
      </section>

      {/* ============================ PROMISE =========================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-amber-600">Our promise</span>
            <h3 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Why builders choose Apex</h3>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {promise.map((p, idx) => {
              const PIcon = p.icon;
              return (
                <Reveal key={p.title} delay={idx * 120} className="h-full">
                  <div className="flex h-full flex-col items-start rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                    <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-slate-950">
                      <PIcon className="h-7 w-7" />
                    </span>
                    <h4 className="mb-2 text-xl font-bold">{p.title}</h4>
                    <p className="text-slate-300">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ GALLERY =========================== */}
      <section id="work" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-amber-600">Portfolio</span>
            <h3 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Recent {service.title} work</h3>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">Tap any image to view it full screen. Use arrow keys or buttons to browse.</p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.gallery.map((g, idx) => (
              <Reveal
                key={g.src + idx}
                delay={idx * 90}
                className={idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(idx)}
                  className="group relative block h-56 w-full overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200 transition hover:shadow-2xl sm:h-full"
                >
                  <img src={g.src} alt={g.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-block rounded-md bg-amber-500 px-3 py-1 text-sm font-semibold text-slate-950">{g.caption}</span>
                  </div>
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                    <Sparkles className="h-4 w-4" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ FAQ =============================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14 text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-widest text-amber-600">Questions</span>
            <h3 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Frequently asked</h3>
          </Reveal>
          <Reveal>
            <FaqAccordion service={service} />
          </Reveal>
        </div>
      </section>

      {/* ============================ CTA =============================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 text-white">
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 animate-pulse rounded-full bg-amber-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-10 h-96 w-96 rounded-full bg-orange-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber-300 ring-1 ring-white/20">
              <Award className="h-4 w-4" /> Free consultation
            </span>
            <h3 className="mb-4 text-3xl font-extrabold md:text-5xl">
              Ready to start your <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{service.title.toLowerCase()}</span> project?
            </h3>
            <p className="mb-9 text-lg text-slate-300">Talk to our team for a free consultation and a clear, fixed estimate.</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/#contact" className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 font-bold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:shadow-xl">
                Request a Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="tel:+15551234567" className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-8 py-4 font-bold text-white transition hover:bg-white hover:text-slate-950">
                <Phone className="h-5 w-5" /> Call Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {lightbox !== null && (
        <Lightbox
          items={service.gallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onNav={navLightbox}
        />
      )}
    </main>
  );
}

/* local icon used in the promise band (kept here to avoid extra imports churn) */
function Camera({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}