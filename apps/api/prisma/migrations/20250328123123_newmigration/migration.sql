/*
  Warnings:

  - Added the required column `MapLink` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Venue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profilePicture" TEXT,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "latitute" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "MapLink" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "closingTime" TIMESTAMP(3),
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "openingTime" TIMESTAMP(3),
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "websiteUrl" TEXT;
