// Create this file: app/api/shorten/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { originalURL } = await request.json();

    const response = await fetch("https://api.short.io/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.SHORTIO_API_KEY,
      },
      body: JSON.stringify({
        originalURL: originalURL,
        domain: "go.csmdynamics.com",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Short.io error:", data);
      return NextResponse.json({ error: "Failed to create short link" }, { status: response.status });
    }

    return NextResponse.json({
      secureShortURL: data.secureShortURL,
      shortURL: data.shortURL,
    });
  } catch (error) {
    console.error("Error creating short link:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
