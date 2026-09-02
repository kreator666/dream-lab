-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "RaffleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'FINISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "discordId" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropFirm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "website" TEXT NOT NULL,
    "dataPlatform" TEXT,
    "pricingNote" TEXT,
    "difficulty" INTEGER NOT NULL DEFAULT 3,
    "summary" TEXT NOT NULL,
    "rules" JSONB,
    "discountCode" TEXT,
    "commissionRate" DECIMAL(5,2),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropFirm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "cover" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propFirmId" TEXT,
    "discountCode" TEXT NOT NULL,
    "orderProof" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaffleEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "prize" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" "RaffleStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaffleEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RaffleEntry" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "propFirmId" TEXT,
    "orderProof" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RaffleEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "PropFirm_slug_key" ON "PropFirm"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registration" ADD CONSTRAINT "Registration_propFirmId_fkey" FOREIGN KEY ("propFirmId") REFERENCES "PropFirm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleEntry" ADD CONSTRAINT "RaffleEntry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "RaffleEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleEntry" ADD CONSTRAINT "RaffleEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RaffleEntry" ADD CONSTRAINT "RaffleEntry_propFirmId_fkey" FOREIGN KEY ("propFirmId") REFERENCES "PropFirm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
