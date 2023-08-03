import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(_, { params }) {
  const { productSlug } = params;
  // const { searchParams } = new URL(req.url);
  // const productSlug = searchParams.get("slug");
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: productSlug,
      },
    });
    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}

export async function PATCH(req, { params }) {
  const { id: productId } = params;
  const { name, slug, price, weight, productImages } = await req.json();
  const priceNumber = Number(price);
  const weightNumber = Number(weight);

  try {
    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        slug,
        price: priceNumber,
        weight: weightNumber,
        productImages,
      },
    });
    return NextResponse.json({ data: updateProduct }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}
