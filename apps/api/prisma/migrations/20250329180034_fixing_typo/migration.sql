-- CreateEnum
CREATE TYPE "VenueType" AS ENUM ('CAFE', 'BAR', 'CLUB', 'ROOFTOP');

-- CreateEnum
CREATE TYPE "MusicGenre" AS ENUM ('TECHNO', 'HOUSE', 'JAZZ', 'HIPHOP', 'ROCK', 'POP', 'CLASSICAL', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "premium_user" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT,
    "profilePicture" TEXT,
    "location" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "type" "VenueType" NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT,
    "description" TEXT,
    "phoneNumber" TEXT,
    "websiteUrl" TEXT,
    "image" TEXT[],
    "capacity" INTEGER,
    "location" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "mapLink" TEXT,
    "openingTime" TIMESTAMP(3),
    "closingTime" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "genre" "MusicGenre" NOT NULL,
    "venueId" TEXT NOT NULL,
    "Performer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
