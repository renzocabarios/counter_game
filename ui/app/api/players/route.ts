import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateUniqueId } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const players = await prisma.player.findMany({
      include: { referrals: true, referrer: true },
    });
    return NextResponse.json(players, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch players" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { address, referredBy } = await req.json();

    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json({ error: "Invalid EVM address" }, {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    let customId: string;
    let isUnique = false;
    do {
      customId = generateUniqueId();
      const existing = await prisma.player.findUnique({ where: { id: customId } });
      isUnique = !existing;
    } while (!isUnique);

    const player = await prisma.player.create({
      data: {
        address,
        id: customId,
        referredBy: referredBy || null,
      },
    });

    if (referredBy) {
      await prisma.player.update({
        where: { address: referredBy },
        data: { referralCount: { increment: 1 } },
      });
    }

    return NextResponse.json(player, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create player" }, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const revalidate = 0;