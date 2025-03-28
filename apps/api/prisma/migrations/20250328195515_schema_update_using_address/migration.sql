/*
  Warnings:

  - You are about to drop the column `location` on the `Venue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "location",
ADD COLUMN     "address" TEXT;
