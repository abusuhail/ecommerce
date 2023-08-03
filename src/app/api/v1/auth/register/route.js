import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { hash } from "bcrypt";

export async function POST(req) {
  const { name, username, email, password } = await req.json();
  const hashPassword = await hash(password, 13);

  try {
    const createUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json({ data: createUser }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}
