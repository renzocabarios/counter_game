import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email = "mongoloid@gmail.com", name = "bomm bakudan" } = req.body;

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
      return NextResponse.json(user, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return NextResponse.json(error, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return NextResponse.json(error, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const revalidate = 0;
