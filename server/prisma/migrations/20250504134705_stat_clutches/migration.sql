/*
  Warnings:

  - Added the required column `clutchAttempts` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clutchSuccesses` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerMatchStats" ADD COLUMN     "clutchAttempts" JSONB NOT NULL,
ADD COLUMN     "clutchSuccesses" JSONB NOT NULL;
