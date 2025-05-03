/*
  Warnings:

  - You are about to drop the column `playedAt` on the `Match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "playedAt";

-- CreateTable
CREATE TABLE "SteamMatch" (
    "id" TEXT NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SteamMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedMatch" (
    "id" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedMatch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SteamMatch" ADD CONSTRAINT "SteamMatch_id_fkey" FOREIGN KEY ("id") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedMatch" ADD CONSTRAINT "UploadedMatch_id_fkey" FOREIGN KEY ("id") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
