// app/api/leads/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../lib/prisma"; // Adjust path if needed

const leadSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1),
});

export async function GET() {
  try {
    const leads = await prisma.leads.findMany({
      orderBy: { createdat: "desc" },
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead = await prisma.leads.create({
      data: {
        firstname: parsed.data.firstName,
        lastname: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        service: parsed.data.service,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}