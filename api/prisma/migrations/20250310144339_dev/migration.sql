-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PENDING', 'WON', 'LOSE');

-- CreateEnum
CREATE TYPE "CoinFlipType" AS ENUM ('HEADS', 'TAILS');

-- CreateEnum
CREATE TYPE "CoinFlipStatus" AS ENUM ('WON', 'LOSE');

-- CreateEnum
CREATE TYPE "DiceGameFlipType" AS ENUM ('OVER', 'UNDER');

-- CreateEnum
CREATE TYPE "DiceGameFlipStatus" AS ENUM ('OVER', 'UNDER');

-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "deposit" INTEGER NOT NULL DEFAULT 0,
    "numberOfReferrals" INTEGER NOT NULL DEFAULT 0,
    "referredById" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredId" TEXT NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinFlipSession" (
    "id" SERIAL NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'PENDING',
    "address" TEXT NOT NULL,
    "bet" INTEGER NOT NULL,

    CONSTRAINT "CoinFlipSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinFlip" (
    "id" SERIAL NOT NULL,
    "userGuess" "CoinFlipType" NOT NULL,
    "houseAnswer" "CoinFlipType" NOT NULL,
    "status" "CoinFlipStatus" NOT NULL,
    "coinFlipSessionId" INTEGER NOT NULL,

    CONSTRAINT "CoinFlip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiceGameSession" (
    "id" SERIAL NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "DiceGameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiceGameFlip" (
    "id" SERIAL NOT NULL,
    "flipType" "DiceGameFlipType" NOT NULL,
    "userGuess" INTEGER NOT NULL,
    "houseInput" INTEGER NOT NULL,
    "status" "DiceGameFlipStatus" NOT NULL,
    "diceFlipSessionId" INTEGER NOT NULL,

    CONSTRAINT "DiceGameFlip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuckyNumberSession" (
    "id" SERIAL NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "LuckyNumberSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LuckyNumberDraw" (
    "id" SERIAL NOT NULL,
    "userGuess" INTEGER NOT NULL,
    "houseInput" INTEGER NOT NULL,
    "luckyNumberSessionId" INTEGER NOT NULL,

    CONSTRAINT "LuckyNumberDraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_referralCode_key" ON "User"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "User_referredById_key" ON "User"("referredById");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("address") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinFlip" ADD CONSTRAINT "CoinFlip_coinFlipSessionId_fkey" FOREIGN KEY ("coinFlipSessionId") REFERENCES "CoinFlipSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiceGameFlip" ADD CONSTRAINT "DiceGameFlip_diceFlipSessionId_fkey" FOREIGN KEY ("diceFlipSessionId") REFERENCES "DiceGameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuckyNumberDraw" ADD CONSTRAINT "LuckyNumberDraw_luckyNumberSessionId_fkey" FOREIGN KEY ("luckyNumberSessionId") REFERENCES "LuckyNumberSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
