import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(_, { params }) {
  const { id: categoryId } = params;
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return NextResponse.json({ data: category }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}

export async function PATCH(req, { params }) {
  const { id: categoryId } = params;
  const { name } = await req.json();

  try {
    const updateCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json({ data: updateCategory }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}
