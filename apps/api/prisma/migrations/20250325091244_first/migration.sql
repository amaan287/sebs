-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL,
    "premium_user" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barlounge" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "barlounge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooftop" (
    "id" TEXT NOT NULL,

    CONSTRAINT "rooftop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafe" (
    "id" TEXT NOT NULL,

    CONSTRAINT "cafe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "barlounge_id_key" ON "barlounge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "club_id_key" ON "club"("id");

-- CreateIndex
CREATE UNIQUE INDEX "rooftop_id_key" ON "rooftop"("id");

-- CreateIndex
CREATE UNIQUE INDEX "cafe_id_key" ON "cafe"("id");
