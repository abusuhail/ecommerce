import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, username, email, password } = await req.json();

  return NextResponse.json({ name, username, email, password });
}
