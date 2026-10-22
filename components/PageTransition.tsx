// components/PageTransition.tsx
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // key={pathname} forces a fresh mount on every route change,
  // which re-triggers the CSS enter-animation below.
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}