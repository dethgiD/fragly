// src/analysis/helpers/review.ts

import { PlayerMatchStats } from "generated/prisma/client";

// --- Updated Pillar Definitions ---
export interface PillarScores {
  firepower: number;
  accuracy: number;
  entryTrading: number;  // combined opening/trade/traded-death
  clutch: number;        // 1vX late-round performance
}

export type PerformanceBucket =
  | 'Struggling'
  | 'Weak'
  | 'Fair'
  | 'Average'
  | 'Solid'
  | 'Excellent'
  | 'Legendary';

export interface PlayerScoreDto {
  steamId:    string;
  username:   string;
  matchScore: number;
  bucket:     PerformanceBucket;
  pillars:    PillarScores;
  diffs:      Record<string, number>;  // per-stat z-scores
}

// --- basic stats helpers ---
function mean(arr: number[]): number {
  return arr.reduce((sum, v) => sum + v, 0) / arr.length;
}

function stdDev(arr: number[], μ: number): number {
  return Math.sqrt(arr.reduce((sum, v) => sum + (v - μ) ** 2, 0) / arr.length);
}

// --- main computeScores function ---
/**
 * @param stats       Array of PlayerMatchStats for one match (all 10 players)
 * @param totalRounds Total number of rounds in the match (team1Score + team2Score)
 */
export function computeScores(
  stats: PlayerMatchStats[],
  totalRounds: number
): PlayerScoreDto[] {
  // 1) match-wide totals
  const matchTotals = stats.reduce(
    (acc, s) => {
      acc.damage += s.totalDamage;
      acc.kills  += s.totalKills;
      return acc;
    },
    { damage: 0, kills: 0 }
  );

  // clutch weighting config
  const clutchWeights: Record<number, number> = { 1:1, 2:2, 3:4, 4:6, 5:10 };
  const shrinkAlpha = 2;
  const shrinkBeta  = 10;

  // 2) derive raw metrics for each player
  const working = stats.map(s => {
    const dmgShare = s.totalDamage / (matchTotals.damage || 1);
    const killShare = s.totalKills / (matchTotals.kills || 1);

    const multiKillScore =
      (s.twoKillRounds   * clutchWeights[1]) +
      (s.threeKillRounds * clutchWeights[2]) +
      (s.fourKillRounds  * clutchWeights[3]) +
      (s.fiveKillRounds  * clutchWeights[4]);
    const multiKillRate = multiKillScore / (totalRounds || 1);

    // clutch attempts & successes JSON fields
    const attempts  = s.clutchAttempts  as Record<string, number>;
    const successes = s.clutchSuccesses as Record<string, number>;
    let Wtot = 0, Otot = 0;
    for (let n = 1; n <= 5; n++) {
      const a = attempts[String(n)] ?? 0;
      const w = successes[String(n)] ?? 0;
      const weight = clutchWeights[n];
      Otot += a * weight;
      Wtot += w * weight;
    }
    const clutchScore = (shrinkAlpha + Wtot) / (shrinkBeta + Otot);

    // entry & trading rates
    const openingRate     = s.openingAttempts      ? s.openingKills      / s.openingAttempts      : 0;
    const tradeRate       = s.tradeAttempts        ? s.tradeKills        / s.tradeAttempts        : 0;
    const tradedDeathRate = s.tradedDeathAttempts ? s.tradedDeaths      / s.tradedDeathAttempts : 0;

    return {
      steamId:            s.steamId,
      username:           s.username,
      dmgShare,
      killShare,
      multiKillRate,
      clutchScore,
      accuracySpotted:    s.accuracySpotted,
      headshotAccuracy:   s.headshotAccuracy,
      sprayAccuracy:      s.sprayAccuracy,
      crosshairPlacement: s.crosshairPlacement,
      counterStrafeRatio: s.counterStrafeRatio,
      timeToDamage:       s.timeToDamage,
      openingRate,
      tradeRate,
      tradedDeathRate,
    };
  });

  // 3) keys to z-score
  const keysToZ = [
    'dmgShare', 'killShare', 'multiKillRate', 'clutchScore',
    'accuracySpotted', 'headshotAccuracy', 'sprayAccuracy',
    'crosshairPlacement', 'counterStrafeRatio', 'timeToDamage',
    'openingRate', 'tradeRate', 'tradedDeathRate'
  ] as const;

  // compute means & stddevs
  const statsMap: Record<string, { mean: number; std: number }> = {};
  for (const key of keysToZ) {
    const vals = working.map(w => (w as any)[key] as number);
    const μ = mean(vals);
    const σ = stdDev(vals, μ);
    statsMap[key] = { mean: μ, std: σ };
  }

  // 4) assemble final PlayerScoreDto list
  return working.map(w => {
    // compute z-scores
    const z: Record<string, number> = {};
    for (const key of keysToZ) {
      const { mean: μ, std: σ } = statsMap[key];
      const val = (w as any)[key] as number;
      z[key] = σ > 0 ? (val - μ) / σ : 0;
    }

    // compute pillars
    const firepower     = (z.dmgShare + z.killShare + z.multiKillRate) / 3;
    const accuracy      = (
      z.accuracySpotted +
      z.headshotAccuracy +
      z.sprayAccuracy -
      z.crosshairPlacement +
      z.counterStrafeRatio -
      z.timeToDamage
    ) / 6;
    const entryTrading  = (z.openingRate + z.tradeRate + z.tradedDeathRate) / 3;
    const clutch        = z.clutchScore;

    // overall match score (weights are adjustable)
    const matchScore =
      0.3 * firepower +
      0.25 * accuracy +
      0.25 * entryTrading +
      0.2 * clutch;

    // assign performance bucket
    let bucket: PerformanceBucket;
    if      (matchScore <= -1.5) bucket = 'Struggling';
    else if (matchScore <= -1.0) bucket = 'Weak';
    else if (matchScore <= -0.5) bucket = 'Fair';
    else if (matchScore <=  0.5) bucket = 'Average';
    else if (matchScore <=  1.0) bucket = 'Solid';
    else if (matchScore <=  1.5) bucket = 'Excellent';
    else                          bucket = 'Legendary';

    // diffs for narrative
    const diffs: Record<string, number> = {};
    for (const key of keysToZ) diffs[key] = z[key];

    return {
      steamId:    w.steamId,
      username:   w.username,
      matchScore,
      bucket,
      pillars:    { firepower, accuracy, entryTrading, clutch },
      diffs,
    };
  });
}
