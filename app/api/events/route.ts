// app/api/events/route.ts
import { NextResponse } from "next/server";
import { events } from "@/data/events";

export async function GET() {
  return NextResponse.json(events);
}