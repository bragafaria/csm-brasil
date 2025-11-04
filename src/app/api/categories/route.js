import { NextResponse } from "next/server";
import { getCategories } from "@/app/lib/neon";

export async function GET() {
  const cats = await getCategories();
  return NextResponse.json(cats);
}
