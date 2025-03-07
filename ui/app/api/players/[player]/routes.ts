import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// export async function GET(req: NextRequest) {
//   try {

// const { searchParams } = new URL(req.url);
// const address = searchParams.get("address");

// if (!address) {
// return NextResponse.json({ error: "Address is required" }, {
// status: 400,
// headers: { "Content-Type": "application/json" },
// });
// }

// const player = await prisma.player.findUnique({
// where: { address },
// include: { referrals: true, referrer: true, tasks: true },
// });

export async function GET(
  req: NextRequest,
  { params }: { params: { player: string } },
) {
  const address = params.player;
  try {
    const player = await prisma.player.findUnique({
      where: { address: address },
      include: { referrals: true, referrer: true, tasks: true },
    });

    if (!player) {
      return NextResponse.json(
        { error: "Player not found" },
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return NextResponse.json(player, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch player" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { address, points } = await req.json();

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const player = await prisma.player.update({
      where: { address },
      data: { points },
    });

    return NextResponse.json(player, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update player" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    await prisma.player.delete({ where: { address } });

    return NextResponse.json(
      { message: "Player deleted" },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete player" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export const revalidate = 0;
