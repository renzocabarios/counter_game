import { Hono } from "hono";
import { prisma } from "../database";
import { generateReferralCode } from "../utils";
import { CoinFlipStatus, CoinFlipType } from "@prisma/client";

const app = new Hono();
// enum CoinFlipType {
//   HEADS
//   TAILS
// }
app.post("/start", async (ctx) => {
  const { address, bet } = await ctx.req.json();

  try {
    const session = await prisma.coinFlipSession.create({
      data: {
        address,
        bet,
      },
    });

    return ctx.json(
      {
        data: [session],
      },
      200
    );
  } catch (e) {
    return ctx.json({}, 500);
  }
});

function getRandomCoinFlip(): CoinFlipType {
  return Math.random() < 0.5 ? CoinFlipType.HEADS : CoinFlipType.TAILS;
}

function getWinStatus(
  userGuess: CoinFlipType,
  houseGuess: CoinFlipType
): CoinFlipStatus {
  if (userGuess == houseGuess) {
    return CoinFlipStatus.WON;
  }
  return CoinFlipStatus.LOSE;
}

app.post("/flip", async (ctx) => {
  const { address, userGuess, coinFlipSessionId } = await ctx.req.json();

  try {
    const session = await prisma.$transaction(async (tx) => {
      const houseInput = getRandomCoinFlip();

      const currentFlip = await tx.coinFlip.create({
        data: {
          coinFlipSessionId: coinFlipSessionId,
          userGuess: userGuess,
          houseAnswer: houseInput,
          status: getWinStatus(userGuess as CoinFlipType, houseInput),
        },
      });

      const coinFlipSession = await tx.coinFlipSession.findFirst({
        where: {
          id: coinFlipSessionId,
        },
        include: {
          flips: true,
        },
      });

      return { coinFlipSession, currentFlip };
    });

    return ctx.json(
      {
        data: [session],
      },
      200
    );
  } catch (e) {
    return ctx.json({}, 500);
  }
});

export default app;
