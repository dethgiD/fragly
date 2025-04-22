/*
  Warnings:

  - The primary key for the `Match` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PlayerMatchStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `matchId` on table `Match` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PlayerMatchStats" DROP CONSTRAINT "PlayerMatchStats_matchId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerMatchStats" DROP CONSTRAINT "PlayerMatchStats_playerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_playerId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP CONSTRAINT "Match_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "matchId" SET NOT NULL,
ADD CONSTRAINT "Match_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Match_id_seq";

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Player_id_seq";

-- AlterTable
ALTER TABLE "PlayerMatchStats" DROP CONSTRAINT "PlayerMatchStats_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "playerId" SET DATA TYPE TEXT,
ALTER COLUMN "matchId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PlayerMatchStats_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PlayerMatchStats_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "playerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
