import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { signUpUserSchema } from "@/types/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = signUpUserSchema.parse(body);

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // check if user exists
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (userExists) {
      return NextResponse.json(
        { user: {}, message: "user Exists with this email or username" },
        { status: 409 }
      );
    }

    // hash the password
    const hashedPassword = await hash(password, 10);
    //prepare data to post
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    // return user details ecept password
    return NextResponse.json(
      {
        user: { ...newUser, password: undefined },
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
