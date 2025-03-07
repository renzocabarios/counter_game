import prisma from "@/lib/prisma";
// import { Request, Response } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return Response.json(error, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: Request) {
  try {
    const email = "mongoloid@gmail.com";
    const name = "bomm bakudan";

    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
      return Response.json(user, {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return Response.json(error, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return Response.json(error, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const revalidate = 0;
