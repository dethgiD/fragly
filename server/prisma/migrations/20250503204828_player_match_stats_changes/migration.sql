/*
  Warnings:

  - You are about to drop the column `accuracy` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - You are about to drop the column `counterStrafing` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - You are about to drop the column `hsAccuracy` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - You are about to drop the column `multiKillPercentage` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - You are about to drop the column `multiKillRounds` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - You are about to drop the column `tradeKillPercentage` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - You are about to drop the column `tradedDeathPercentage` on the `PlayerMatchStats` table. All the data in the column will be lost.
  - Added the required column `counterStrafeRatio` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fiveKillRounds` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fourKillRounds` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headshotAccuracy` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headshotPercentage` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openingAttempts` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sprayAccuracy` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `threeKillRounds` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAssists` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDamage` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeAttempts` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradedDeathAttempts` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twoKillRounds` to the `PlayerMatchStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerMatchStats" DROP COLUMN "accuracy",
DROP COLUMN "counterStrafing",
DROP COLUMN "hsAccuracy",
DROP COLUMN "multiKillPercentage",
DROP COLUMN "multiKillRounds",
DROP COLUMN "tradeKillPercentage",
DROP COLUMN "tradedDeathPercentage",
ADD COLUMN     "counterStrafeRatio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fiveKillRounds" INTEGER NOT NULL,
ADD COLUMN     "fourKillRounds" INTEGER NOT NULL,
ADD COLUMN     "headshotAccuracy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "headshotPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "openingAttempts" INTEGER NOT NULL,
ADD COLUMN     "sprayAccuracy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "threeKillRounds" INTEGER NOT NULL,
ADD COLUMN     "totalAssists" INTEGER NOT NULL,
ADD COLUMN     "totalDamage" INTEGER NOT NULL,
ADD COLUMN     "tradeAttempts" INTEGER NOT NULL,
ADD COLUMN     "tradedDeathAttempts" INTEGER NOT NULL,
ADD COLUMN     "twoKillRounds" INTEGER NOT NULL;
