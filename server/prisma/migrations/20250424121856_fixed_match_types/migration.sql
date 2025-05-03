/*
  Warnings:

  - You are about to drop the column `playedAt` on the `SteamMatch` table. All the data in the column will be lost.
  - Added the required column `playedAt` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mapUrl` to the `SteamMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "playedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SteamMatch" DROP COLUMN "playedAt",
ADD COLUMN     "mapUrl" TEXT NOT NULL,
ADD COLUMN     "reservationId" TEXT;
