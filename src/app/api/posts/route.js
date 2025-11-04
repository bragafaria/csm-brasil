import { NextResponse } from "next/server";
import { createPost } from "@/app/lib/neon";

export async function POST(request) {
  const body = await request.json();
  const post = await createPost(body);
  return NextResponse.json(post, { status: 201 });
}
