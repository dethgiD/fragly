/*
  Warnings:

  - Made the column `rank` on table `PlayerMatchStats` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PlayerMatchStats" ALTER COLUMN "rank" SET NOT NULL;
