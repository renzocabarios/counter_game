import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const tasks = await prisma.task.findMany({
      include: { player: true },
    });
    return NextResponse.json(tasks, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { playerAddress, title, description, type, points } = await req.json();

    if (!playerAddress || !title || !type || !points) {
      return NextResponse.json({ error: "Missing required fields" }, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const task = await prisma.task.create({
      data: {
        playerAddress,
        title,
        description,
        type, // "DAILY" or "WEEKLY"
        points,
      },
    });

    return NextResponse.json(task, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const revalidate = 0;