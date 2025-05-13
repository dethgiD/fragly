-- CreateTable
CREATE TABLE "PlayerScore" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "bucket" TEXT NOT NULL,
    "firepower" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "entryTrading" DOUBLE PRECISION NOT NULL,
    "clutch" DOUBLE PRECISION NOT NULL,
    "diffs" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayerScore_playerId_idx" ON "PlayerScore"("playerId");

-- CreateIndex
CREATE INDEX "PlayerScore_matchId_idx" ON "PlayerScore"("matchId");

-- AddForeignKey
ALTER TABLE "PlayerScore" ADD CONSTRAINT "PlayerScore_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerScore" ADD CONSTRAINT "PlayerScore_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
