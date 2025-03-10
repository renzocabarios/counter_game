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
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "deposit" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinFlipSession" (
    "id" SERIAL NOT NULL,
    "status" "GameStatus" NOT NULL DEFAULT 'PENDING',

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

-- AddForeignKey
ALTER TABLE "CoinFlip" ADD CONSTRAINT "CoinFlip_coinFlipSessionId_fkey" FOREIGN KEY ("coinFlipSessionId") REFERENCES "CoinFlipSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiceGameFlip" ADD CONSTRAINT "DiceGameFlip_diceFlipSessionId_fkey" FOREIGN KEY ("diceFlipSessionId") REFERENCES "DiceGameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LuckyNumberDraw" ADD CONSTRAINT "LuckyNumberDraw_luckyNumberSessionId_fkey" FOREIGN KEY ("luckyNumberSessionId") REFERENCES "LuckyNumberSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
