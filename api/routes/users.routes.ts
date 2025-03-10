import { Hono } from "hono";
import { prisma } from "../database";
import { generateReferralCode } from "../utils";

const app = new Hono();

app.get("/address/:id", async (ctx) => {
  const address = ctx.req.param("id");

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: {
        address,
      },
    });

    return ctx.json(
      {
        data: [user],
      },
      201
    );
  } catch (e) {
    return ctx.json({}, 500);
  }
});

app.get("/name/:id", async (ctx) => {
  const username = ctx.req.param("id");

  try {
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    return ctx.json(
      {
        data: [user],
      },
      201
    );
  } catch (e) {
    return ctx.json({}, 500);
  }
});

async function getUniqueReferralCode(): Promise<string> {
  const referralCode = generateReferralCode();
  const existingUser = await prisma.user.findUnique({
    where: { referralCode },
  });

  if (existingUser) {
    return getUniqueReferralCode();
  }

  return referralCode;
}

app.post("/", async (ctx) => {
  const { address, username, referralCode, profilePic } = await ctx.req.json();

  try {
    if (!referralCode) {
      const user = await prisma.user.create({
        data: {
          address,
          username,
          referralCode: await getUniqueReferralCode(),
          profilePic,
        },
      });

      return ctx.json(
        {
          data: [user],
        },
        201
      );
    }

    const user = await prisma.$transaction(async (tx) => {
      const referrer = await tx.user.findFirstOrThrow({
        where: {
          referralCode,
        },
      });

      await tx.user.update({
        where: {
          address: referrer.address,
        },
        data: {
          numberOfReferrals: {
            increment: 1,
          },
        },
      });

      const user = await tx.user.create({
        data: {
          address,
          username,
          referralCode: await getUniqueReferralCode(),
          referredById: referrer.address,
          profilePic,
        },
      });

      await tx.referral.create({
        data: {
          referrerId: referrer.address,
          referredId: user.address,
        },
      });
      return user;
    });

    return ctx.json(
      {
        data: [user],
      },
      201
    );
  } catch (e) {
    return ctx.json({}, 500);
  }
});

export default app;
