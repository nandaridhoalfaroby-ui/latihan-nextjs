import { NextRequest } from "next/server";

// Ganti import ini sesuai project lu di langkah sebelumnya
// biasanya di lib/events.ts atau data/events.ts
import { events } from "@/data/events";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  const event = events.find((e) => String(e.id) === id);

  if (!event) {
    return Response.json({ pesan: "Event tidak ditemukan" }, { status: 404 });
  }

  return Response.json(event);
}
