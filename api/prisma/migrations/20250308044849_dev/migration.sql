/*
  Warnings:

  - A unique constraint covering the columns `[referredById]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referredById" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_referredById_key" ON "User"("referredById");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("address") ON DELETE SET NULL ON UPDATE CASCADE;
