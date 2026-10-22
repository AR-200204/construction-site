// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { SERVICES, getService } from "../../../lib/services";
import ServiceDetail from "../../../components/ServiceDetail";


export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Not Found" };
  return {
    title: `${service.title} | Apex Build`,
    description: service.shortDesc,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getService(slug)) notFound();

    return <ServiceDetail slug={slug} />;
}