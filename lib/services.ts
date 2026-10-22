// lib/services.ts
import {
  type LucideIcon,
  Home,
  Building2,
  ClipboardList,
  PencilRuler,
  ShieldCheck,
  Clock,
  Wallet,
  TrendingUp,
  Users,
  Hammer,
  Truck,
  Award,
  HardHat,
  Layers,
  CalendarCheck,
  Palette,
  Box,
  Zap,
} from "lucide-react";

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=1600&auto=format&fit=crop`;

// known-good image pool (replace with your own photos later)
const IMG = {
  workers: U("1541888946425-d81bb19240f5"),
  building: U("1503387762-592deb58ef4e"),
  office: U("1486406146926-c627a92ad1ab"),
  house: U("1568605114967-8130f3a36994"),
  officeInt: U("1497366216548-37526070297c"),
  hardhat: U("1504307651254-35680f356dfd"),
  plans: U("1581094794329-c8112a89af12"),
  villa: U("1600596542815-ffad4c1539a9"),
};

export type GalleryItem = { src: string; caption: string };
export type Feature = { icon: LucideIcon; title: string; desc: string };
export type ProcessStep = {
  icon: LucideIcon;
  title: string;
  desc: string;
  points: string[];
  image: string;
};
export type Stat = { target: number; suffix?: string; label: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  tagline: string;
  icon: LucideIcon;
  heroImages: string[];
  introImage: string;
  intro: string[];
  badge: { value: string; label: string };
  stats: Stat[];
  features: Feature[];
  process: ProcessStep[];
  gallery: GalleryItem[];
  faq: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: "residential-construction",
    title: "Residential Construction",
    shortDesc:
      "Custom homes, renovations, and extensions built to your exact specifications and lifestyle.",
    tagline:
      "From first sketch to final handover, we build homes that feel like yours — on time, on budget, built to last.",
    icon: Home,
    heroImages: [IMG.house, IMG.villa, IMG.workers],
    introImage: IMG.villa,
    intro: [
      "We specialise in bespoke family homes, high-end villas, and whole-property renovations. Every project begins with a deep understanding of how you live, so the finished home works as beautifully as it looks.",
      "Our in-house crews and vetted specialists handle structure, services, finishes and landscaping under one contract — meaning one point of contact and zero finger-pointing when it matters most.",
    ],
    badge: { value: "250+", label: "Homes Delivered" },
    stats: [
      { target: 250, suffix: "+", label: "Homes Built" },
      { target: 15, suffix: " yrs", label: "Avg. Crew Experience" },
      { target: 98, suffix: "%", label: "On-Time Handover" },
    ],
    features: [
      { icon: Home, title: "Custom Home Builds", desc: "Ground-up residences tailored to your plot, budget and dream." },
      { icon: Hammer, title: "Renovations & Extensions", desc: "Reimagine existing spaces without losing their character." },
      { icon: ShieldCheck, title: "Structural Assurance", desc: "Engineered foundations and framing with full compliance." },
      { icon: Wallet, title: "Fixed, Transparent Quotes", desc: "Line-item pricing you can read — no surprise variations." },
    ],
    process: [
      { icon: PencilRuler, title: "Design & Feasibility", desc: "We review your land, brief and budget, then shape a buildable concept.", points: ["Site survey", "Concept drawings", "Budget framing"], image: IMG.plans },
      { icon: ClipboardList, title: "Approvals & Permits", desc: "We manage council submissions and certifications so you don't chase paperwork.", points: ["Planning application", "Engineering sign-off", "Permit tracking"], image: IMG.officeInt },
      { icon: HardHat, title: "Construction", desc: "Groundbreaking to lock-up, with weekly progress reports and site photos.", points: ["Foundation & frame", "Services & envelope", "Interior fit-out"], image: IMG.workers },
      { icon: Award, title: "Handover & Aftercare", desc: "Snagging, walkthrough, manuals and a 10-year structural warranty.", points: ["Final inspection", "Client walkthrough", "Warranty registration"], image: IMG.villa },
    ],
    gallery: [
      { src: IMG.house, caption: "Suburban family home" },
      { src: IMG.villa, caption: "Coastal luxury villa" },
      { src: IMG.workers, caption: "Framing in progress" },
      { src: IMG.plans, caption: "On-site planning review" },
    ],
    faq: [
      { q: "How long does a custom home take?", a: "Typically 8–14 months depending on size and approvals. We give a dated programme before groundbreaking." },
      { q: "Can you build on my existing plot?", a: "Yes. We start with a feasibility check on your land so there are no surprises after signing." },
      { q: "Do you offer fixed prices?", a: "We provide a fixed lump-sum contract with a clear variation process, so your budget is protected." },
    ],
  },
  {
    slug: "commercial-building",
    title: "Commercial Building",
    shortDesc:
      "Office spaces, retail stores, and industrial facilities delivered on time and within budget.",
    tagline:
      "Workplaces, retail and industrial builds engineered for performance, compliance and the way your business actually operates.",
    icon: Building2,
    heroImages: [IMG.office, IMG.officeInt, IMG.building],
    introImage: IMG.officeInt,
    intro: [
      "Commercial projects demand precision: tight programmes, strict codes, and minimal disruption to your trading. We deliver offices, showrooms, F&B fit-outs and warehouses with a single accountable team.",
      "From shell-and-core to fully fitted interiors, we coordinate MEP, fire, acoustics and finishes so your space is operational the day you take the keys.",
    ],
    badge: { value: "80+", label: "Commercial Handovers" },
    stats: [
      { target: 80, suffix: "+", label: "Commercial Projects" },
      { target: 1.2, suffix: "M sq ft", label: "Built Nationwide" },
      { target: 100, suffix: "%", label: "Code Compliance" },
    ],
    features: [
      { icon: Building2, title: "Offices & Workplaces", desc: "Productive, brand-aligned environments from shell to fit-out." },
      { icon: Layers, title: "Retail & F&B", desc: "Customer-first storefronts and kitchens built to trade fast." },
      { icon: Truck, title: "Industrial & Warehouse", desc: "Durable structures engineered for logistics and load." },
      { icon: TrendingUp, title: "Value Engineering", desc: "We cut cost without cutting quality or lifespan." },
    ],
    process: [
      { icon: ClipboardList, title: "Brief & Feasibility", desc: "We translate business goals into a buildable, costed programme.", points: ["Space planning", "Cost model", "Phasing strategy"], image: IMG.officeInt },
      { icon: PencilRuler, title: "Detailed Design", desc: "Coordinated architectural, structural and MEP drawings.", points: ["BIM coordination", "Code review", "Tender package"], image: IMG.plans },
      { icon: HardHat, title: "Construction", desc: "Safe, supervised delivery with live progress dashboards.", points: ["Shell & core", "MEP first fix", "Fit-out & finishes"], image: IMG.building },
      { icon: Award, title: "Commissioning", desc: "Testing, balancing and certification before you move in.", points: ["Systems commissioning", "Compliance certs", "Occupation ready"], image: IMG.office },
    ],
    gallery: [
      { src: IMG.office, caption: "Corporate headquarters" },
      { src: IMG.officeInt, caption: "Open-plan workspace" },
      { src: IMG.building, caption: "Facade under construction" },
      { src: IMG.hardhat, caption: "Supervised site works" },
    ],
    faq: [
      { q: "Can you work around our trading hours?", a: "Yes. We phase works and schedule noisy activities to keep your business running." },
      { q: "Do you handle MEP and fire systems?", a: "We self-perform or manage all MEP, fire and specialist trades under one contract." },
      { q: "What about certifications?", a: "We deliver full compliance documentation and assist with green-building ratings." },
    ],
  },
  {
    slug: "project-management",
    title: "Project Management",
    shortDesc:
      "End-to-end oversight, ensuring quality control, safety compliance, and seamless execution.",
    tagline:
      "Already have a designer or contractor? Our independent project managers protect your budget, programme and quality from day one.",
    icon: ClipboardList,
    heroImages: [IMG.hardhat, IMG.plans, IMG.building],
    introImage: IMG.plans,
    intro: [
      "We act as your single point of accountability — coordinating designers, contractors and authorities so nothing slips. You get clarity, control and weekly reporting you can actually act on.",
      "Whether it's a single build or a multi-site programme, our managers enforce quality gates, safety standards and cost discipline at every milestone.",
    ],
    badge: { value: "Rs 4B+", label: "Value Managed" },
    stats: [
      { target: 300, suffix: "+", label: "Projects Managed" },
      { target: 0, suffix: "", label: "Compensation Claims*" },
      { target: 97, suffix: "%", label: "Within Budget" },
    ],
    features: [
      { icon: CalendarCheck, title: "Programme Control", desc: "Realistic schedules with critical-path tracking and alerts." },
      { icon: Wallet, title: "Cost Management", desc: "Budgets, valuations and variation control, line by line." },
      { icon: ShieldCheck, title: "Quality & Safety", desc: "Inspection regimes and HSE compliance on every visit." },
      { icon: Users, title: "Stakeholder Coordination", desc: "One voice aligning client, design and construction teams." },
    ],
    process: [
      { icon: ClipboardList, title: "Set-Up & Governance", desc: "We establish reporting cadence, gates and the master programme.", points: ["Kick-off & roles", "Master schedule", "Reporting framework"], image: IMG.officeInt },
      { icon: PencilRuler, title: "Design Coordination", desc: "We clash-check drawings and align consultants before build.", points: ["Design reviews", "Value engineering", "Permit coordination"], image: IMG.plans },
      { icon: HardHat, title: "Construction Oversight", desc: "Site supervision, quality gates and safety audits.", points: ["Weekly site walks", "QA/QC inspections", "HSE audits"], image: IMG.hardhat },
      { icon: Award, title: "Close-Out", desc: "Defects lists, as-builts and a clean handover pack.", points: ["Snag management", "As-built docs", "Final account"], image: IMG.building },
    ],
    gallery: [
      { src: IMG.hardhat, caption: "Site supervision" },
      { src: IMG.plans, caption: "Design coordination meeting" },
      { src: IMG.building, caption: "Programme in delivery" },
      { src: IMG.workers, caption: "Quality gate inspection" },
    ],
    faq: [
      { q: "Can you replace our current contractor?", a: "Yes. We can step in mid-project, assess status and re-baseline the programme." },
      { q: "How do you report progress?", a: "Weekly dashboards with photos, earned-value, risks and a 4-week look-ahead." },
      { q: "*What does '0 claims' mean?", a: "Across managed projects we've had zero compensation claims from contractors." },
    ],
  },
  {
    slug: "architecture-design",
    title: "Architecture & Design",
    shortDesc:
      "Collaborative design services to bring your visionary blueprints to life before breaking ground.",
    tagline:
      "Award-minded architects and interior designers crafting spaces that balance beauty, budget and buildability.",
    icon: PencilRuler,
    heroImages: [IMG.plans, IMG.house, IMG.office],
    introImage: IMG.plans,
    intro: [
      "Great buildings start with great drawings. Our studio handles concept, schematic and detailed design, plus interiors and 3D visualisation, so you see and feel the space before a single brick is laid.",
      "We design with construction in mind — every line is checked for cost, code and buildability, eliminating expensive changes on site.",
    ],
    badge: { value: "40+", label: "Design Awards" },
    stats: [
      { target: 40, suffix: "+", label: "Design Awards" },
      { target: 600, suffix: "+", label: "Concepts Rendered" },
      { target: 100, suffix: "%", label: "Buildable Drawings" },
    ],
    features: [
      { icon: PencilRuler, title: "Architectural Design", desc: "Concept to construction-ready, code-compliant drawing sets." },
      { icon: Palette, title: "Interior Design", desc: "Materials, lighting and furniture specified to your brand." },
      { icon: Box, title: "3D Visualisation", desc: "Photoreal renders and walkthroughs to sell the vision early." },
      { icon: Zap, title: "Sustainability", desc: "Passive design and energy strategies baked into the plan." },
    ],
    process: [
      { icon: PencilRuler, title: "Concept", desc: "We explore massing, orientation and story in sketch form.", points: ["Brief workshop", "Mood & massing", "Concept sketches"], image: IMG.plans },
      { icon: Box, title: "Schematic Design", desc: "The concept is developed into coordinated plans and 3D.", points: ["Plan development", "3D model", "Material palette"], image: IMG.officeInt },
      { icon: Layers, title: "Detailed Design", desc: "Full drawing set, specs and consultant coordination.", points: ["Construction docs", "Specifications", "MEP coordination"], image: IMG.house },
      { icon: Award, title: "Design Support", desc: "We stay on during build to protect the design intent.", points: ["Site responses", "Sample approvals", "Snag review"], image: IMG.villa },
    ],
    gallery: [
      { src: IMG.plans, caption: "Studio design review" },
      { src: IMG.house, caption: "Residential concept" },
      { src: IMG.office, caption: "Commercial facade study" },
      { src: IMG.villa, caption: "Interior mood direction" },
    ],
    faq: [
      { q: "Do you only design, or build too?", a: "Both. We're a design studio inside a construction firm, so drawings are always buildable." },
      { q: "Can you work with our existing architect?", a: "Yes — we can take over, co-author, or provide detailed design and interiors only." },
      { q: "Do you provide 3D walkthroughs?", a: "Every project includes photoreal stills; animated walkthroughs are available on request." },
    ],
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);