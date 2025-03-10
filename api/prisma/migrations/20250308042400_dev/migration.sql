-- AlterTable
ALTER TABLE "User" ADD COLUMN     "numberOfReferrals" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredId" TEXT NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
