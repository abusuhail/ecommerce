import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const isPasswordMatched = await compare(password, user.password);

      if (isPasswordMatched) {
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          no_hp: user.no_hp,
        };

        const token = sign(userData, process.env.TOKEN_SECRET_KEY);
        cookies().set("token", token);

        return NextResponse.json({ record: userData, token }, { status: 200 });
      }
      return NextResponse.json(
        { message: "email dan password salah!" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: error.status });
  }
}
