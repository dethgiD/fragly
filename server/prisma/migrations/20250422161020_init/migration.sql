-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "playerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "steamId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "matchId" TEXT,
    "score" TEXT,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMatchStats" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "steamId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "accuracySpotted" DOUBLE PRECISION NOT NULL,
    "hsAccuracy" DOUBLE PRECISION NOT NULL,
    "timeToDamage" DOUBLE PRECISION NOT NULL,
    "crosshairPlacement" DOUBLE PRECISION NOT NULL,
    "counterStrafing" DOUBLE PRECISION NOT NULL,
    "totalKills" INTEGER NOT NULL,
    "totalDeaths" INTEGER NOT NULL,
    "openingKills" INTEGER NOT NULL,
    "tradeKills" INTEGER NOT NULL,
    "tradeKillPercentage" DOUBLE PRECISION NOT NULL,
    "tradedDeaths" INTEGER NOT NULL,
    "tradedDeathPercentage" DOUBLE PRECISION NOT NULL,
    "multiKillRounds" INTEGER NOT NULL,
    "multiKillPercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PlayerMatchStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_playerId_key" ON "User"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_steamId_key" ON "Player"("steamId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_matchId_key" ON "Match"("matchId");

-- CreateIndex
CREATE INDEX "PlayerMatchStats_playerId_idx" ON "PlayerMatchStats"("playerId");

-- CreateIndex
CREATE INDEX "PlayerMatchStats_matchId_idx" ON "PlayerMatchStats"("matchId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
