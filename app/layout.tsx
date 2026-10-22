// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Apex Construction | Building Tomorrow's Landmarks",
  description:
    "Premium residential and commercial construction services with over 20 years of excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.variable} font-sans antialiased bg-white text-slate-800`}>
        {/* Persistent chrome — does NOT animate between routes */}
        <Navbar />

        {/* Only the page body cross-fades / slides */}
        <PageTransition>{children}</PageTransition>

        <Footer />
      </body>
    </html>
  );
}

import type { ReactNode } from "react";