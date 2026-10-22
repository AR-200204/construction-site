// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import { Reveal, AnimatedCounter } from "../components/animations";
import { SERVICES } from "../lib/services";

/* ---------------- HERO SLIDER DATA ---------------- */
const HERO_SLIDES = [
  { image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", title: "Building the Future,", highlight: "Restoring the Past.", subtitle: "Premium residential and commercial construction services with a focus on safety, quality, and innovation." },
  { image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop", title: "Strong Foundations,", highlight: "Exceptional Results.", subtitle: "From concept to completion, we deliver projects on time and within budget." },
  { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", title: "Commercial Excellence,", highlight: "Built to Last.", subtitle: "Office complexes, retail spaces, and industrial facilities designed for performance." },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (hover) return;
    const t = setTimeout(() => setCurrent((p) => (p + 1) % HERO_SLIDES.length), 5000);
    return () => clearTimeout(t);
  }, [current, hover]);
  const pause = { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  return (
    <section id="home" className="relative h-screen min-h-[600px] overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <div key={s.image} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "z-10 opacity-100" : "z-0 opacity-0"}`} aria-hidden={i !== current}>
          <img src={s.image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
      ))}
      <div className="relative z-20 flex h-full items-center justify-center">
        <div key={current} className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {HERO_SLIDES[current].title}<br />
            <span className="text-amber-500">{HERO_SLIDES[current].highlight}</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl">{HERO_SLIDES[current].subtitle}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#contact" className="flex items-center justify-center gap-2 rounded-md bg-amber-500 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-amber-400">Start Your Project <ArrowRight className="h-5 w-5" /></a>
            <a href="#projects" className="rounded-md border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-slate-950">View Our Work</a>
          </div>
        </div>
      </div>
      <button type="button" aria-label="Previous" {...pause} onClick={() => setCurrent((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-amber-500 hover:text-slate-950 md:block"><ChevronLeft className="h-6 w-6" /></button>
      <button type="button" aria-label="Next" {...pause} onClick={() => setCurrent((p) => (p + 1) % HERO_SLIDES.length)} className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-amber-500 hover:text-slate-950 md:block"><ChevronRight className="h-6 w-6" /></button>
      <div {...pause} className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} type="button" aria-label={`Slide ${i + 1}`} onClick={() => setCurrent(i)} className={`h-3 rounded-full transition-all ${i === current ? "w-10 bg-amber-500" : "w-3 bg-white/60 hover:bg-white"}`} />
        ))}
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { target: 20, suffix: "+", label: "Years Experience" },
    { target: 350, suffix: "+", label: "Projects Completed" },
    { target: 120, suffix: "+", label: "Expert Workers" },
    { target: 100, suffix: "%", label: "Client Satisfaction" },
  ];
  return (
    <section className="bg-amber-500 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="mb-2 text-4xl font-bold text-slate-900 md:text-5xl"><AnimatedCounter target={s.target} suffix={s.suffix} replay /></div>
              <div className="font-medium text-slate-800">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 text-center">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600">What We Do</h2>
          <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">Our Core Services</h3>
        </Reveal>

        {/* desktop expanding panels */}
        <Reveal>
          <div className="hidden h-[520px] gap-3 md:flex">
            {SERVICES.map((service, index) => {
              const isActive = index === active;
              const Icon = service.icon;
              return (
                <div key={service.slug} role="button" tabIndex={0} aria-expanded={isActive} aria-label={service.title}
                  onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(index); } }}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-700 ease-in-out ${isActive ? "flex-[4_1_0%]" : "flex-[1_1_0%]"}`}>
                  <img src={service.heroImages[0]} alt={service.title} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isActive ? "scale-105" : "scale-100"}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/10" />
                  <div className={`absolute inset-0 bg-slate-950 transition-opacity duration-700 ${isActive ? "opacity-20" : "opacity-60"}`} />
                  <div className="absolute left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-amber-400 backdrop-blur-sm ring-1 ring-white/20"><Icon className="h-6 w-6" /></div>
                  <div className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}>
                    <span className="rotate-180 text-lg font-bold tracking-wide text-white [writing-mode:vertical-rl]">{service.title}</span>
                  </div>
                  <div className={`absolute inset-x-0 bottom-0 z-10 p-6 transition-all duration-700 ease-out ${isActive ? "translate-y-0 opacity-100 delay-150" : "translate-y-4 opacity-0"}`}>
                    <h4 className="mb-2 text-2xl font-bold text-white">{service.title}</h4>
                    <p className="max-w-md text-sm leading-relaxed text-slate-200">{service.shortDesc}</p>
                    <Link href={`/services/${service.slug}`} onClick={(e) => e.stopPropagation()} className="mt-4 inline-flex items-center gap-1 rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-400">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* mobile accordion */}
        <div className="space-y-3 md:hidden">
          {SERVICES.map((service, index) => {
            const isActive = index === active;
            const Icon = service.icon;
            return (
              <Reveal key={service.slug} delay={index * 100}>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <button type="button" onClick={() => setActive(isActive ? -1 : index)} aria-expanded={isActive} className="flex w-full items-center gap-4 p-4 text-left">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-amber-500 shadow-sm"><Icon className="h-6 w-6" /></span>
                    <span className="flex-1 text-lg font-bold text-slate-900">{service.title}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${isActive ? "rotate-180 text-amber-500" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-500 ease-in-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="relative h-56 w-full">
                        <img src={service.heroImages[0]} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="mb-3 text-sm leading-relaxed text-slate-100">{service.shortDesc}</p>
                          <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-1 rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950">Learn more <ArrowRight className="h-4 w-4" /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "Skyline Office Complex", category: "Commercial", slug: "commercial-building", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" },
    { title: "Modern Family Villa", category: "Residential", slug: "residential-construction", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" },
    { title: "Urban Renovation Project", category: "Renovation", slug: "residential-construction", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2089&auto=format&fit=crop" },
  ];
  return (
    <section id="projects" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-12 flex flex-col items-end justify-between md:flex-row">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600">Portfolio</h2>
            <h3 className="text-3xl font-bold text-slate-900 md:text-4xl">Featured Projects</h3>
          </div>
          <Link href="/#services" className="mt-4 hidden items-center gap-2 font-semibold text-slate-900 transition hover:text-amber-600 md:mt-0 md:flex">All Services <ArrowRight className="h-4 w-4" /></Link>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={i} delay={i * 120} className="h-full">
              <Link href={`/services/${p.slug}`} className="group relative block h-full overflow-hidden rounded-xl shadow-lg">
                <img src={p.img} alt={p.title} className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-1 text-sm font-medium text-amber-400">{p.category}</span>
                  <h4 className="text-xl font-bold text-white">{p.title}</h4>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="bg-white py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop" alt="Engineer reviewing plans" className="h-[500px] w-full rounded-2xl object-cover shadow-xl" />
          <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-slate-900 p-6 text-white shadow-2xl md:block">
            <div className="text-3xl font-bold text-amber-500">20+</div>
            <div className="font-medium">Years of Trusted Construction Excellence</div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-600">About Us</h2>
          <h3 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">We Turn Blueprints Into Landmarks</h3>
          <p className="mb-8 text-lg text-slate-600">Apex Build is a full-service construction company delivering residential, commercial, and renovation projects with uncompromising quality. Our experienced team manages every stage—from planning and permitting to execution and handover.</p>
          <ul className="space-y-4">
            {["Licensed and insured professionals","Transparent pricing and detailed estimates","On-time delivery with strict quality control","Dedicated project managers for every build"].map((it) => (
              <li key={it} className="flex items-start gap-3 text-slate-700"><CheckCircle2 className="h-6 w-6 shrink-0 text-amber-500" /><span>{it}</span></li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  };

  return (
    <section id="contact" className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <Reveal>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-amber-500">Get In Touch</h2>
            <h3 className="mb-6 text-3xl font-bold md:text-4xl">Let&apos;s Build Something Great Together</h3>
            <p className="mb-8 text-lg text-slate-400">Ready to start your next project? Contact us for a free consultation and estimate.</p>
            <div className="space-y-6">
              <div className="flex items-start gap-4"><div className="rounded-lg bg-slate-800 p-3"><MapPin className="h-6 w-6 text-amber-500" /></div><div><h4 className="text-lg font-bold">Our Office</h4><p className="text-slate-400">123 Construction Ave, Building District, City, 10001</p></div></div>
              <div className="flex items-start gap-4"><div className="rounded-lg bg-slate-800 p-3"><Phone className="h-6 w-6 text-amber-500" /></div><div><h4 className="text-lg font-bold">Phone</h4><p className="text-slate-400">+1 (555) 123-4567</p></div></div>
              <div className="flex items-start gap-4"><div className="rounded-lg bg-slate-800 p-3"><Mail className="h-6 w-6 text-amber-500" /></div><div><h4 className="text-lg font-bold">Email</h4><p className="text-slate-400">info@apexbuild.com</p></div></div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl bg-white p-8 text-slate-900 shadow-2xl">
              {status === "success" ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="mb-2 text-2xl font-bold text-slate-900">Message Sent!</h4>
                  <p className="mb-6 text-slate-600">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="font-semibold text-amber-600 hover:text-amber-700">Send another message</button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div><label className="mb-2 block text-sm font-semibold">First Name</label><input name="firstName" type="text" required className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" placeholder="John" /></div>
                    <div><label className="mb-2 block text-sm font-semibold">Last Name</label><input name="lastName" type="text" required className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" placeholder="Doe" /></div>
                  </div>
                  <div><label className="mb-2 block text-sm font-semibold">Email Address</label><input name="email" type="email" required className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" placeholder="john@example.com" /></div>
                  <div><label className="mb-2 block text-sm font-semibold">Project Details</label><textarea name="message" rows={4} required className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200" placeholder="Tell us about your project..." /></div>

                  {status === "error" && (
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-4 font-bold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Sending..." : (<>Send Message <ArrowRight className="h-5 w-5" /></>)}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <main className="min-h-screen">
    
      <HeroSlider />
      <Stats />
      <Services />
      <Projects />
      <About />
      <Contact />
     
    </main>
  );
}