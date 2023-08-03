import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const allProduct = await prisma.product.findMany();
    return NextResponse.json({ data: allProduct }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}

export async function POST(req) {
  const { name, slug, price, weight, productImages } = await req.json();
  const priceNumber = Number(price);
  const weightNumber = Number(weight);

  try {
    const createProduct = await prisma.product.create({
      data: {
        name,
        slug,
        price: priceNumber,
        weight: weightNumber,
        productImages,
      },
    });
    return NextResponse.json({ data: createProduct }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}
