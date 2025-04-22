/*
  Warnings:

  - You are about to drop the column `score` on the `Match` table. All the data in the column will be lost.
  - Added the required column `team1Score` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team2Score` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamNumber` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "score",
ADD COLUMN     "team1Score" INTEGER NOT NULL,
ADD COLUMN     "team2Score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PlayerMatchStats" ADD COLUMN     "teamNumber" INTEGER NOT NULL;
