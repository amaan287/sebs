/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `latitute` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Venue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "latitute",
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "location" TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "address",
ADD COLUMN     "location" TEXT,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;
