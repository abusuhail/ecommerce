import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const category = await prisma.category.findMany();
    return NextResponse.json({ data: category }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}

export async function POST(req) {
  const { name } = await req.json();

  try {
    const createCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    return NextResponse.json({ data: createCategory }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}
