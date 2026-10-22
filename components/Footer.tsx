// components/Footer.tsx
"use client"; // Ensure this is at the top

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2 } from "lucide-react";
import { Reveal } from "./animations";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  // Calculate year ONLY on the client side after mount
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400">
      <Reveal className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-amber-500" />
          <span className="text-xl font-bold tracking-tight text-white">
            APEX<span className="text-amber-500">BUILD</span>
          </span>
        </Link>

        <p className="text-sm">
          © {year ?? new Date().getFullYear()} Apex Construction. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a href="#" className="transition-colors hover:text-amber-500">Privacy</a>
          <a href="#" className="transition-colors hover:text-amber-500">Terms</a>
          <a href="#" className="transition-colors hover:text-amber-500">Sitemap</a>
        </div>
      </Reveal>
    </footer>
  );
}