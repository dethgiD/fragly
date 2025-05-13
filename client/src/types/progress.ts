import { PlayerScore } from "./player-score";

// types/progress.ts (Ensure this is up-to-date with backend stats)
export type UserProgressStat = {
    // General
    kdr: number | null;
    totalKills: number | null;
    totalDeaths: number | null;
    totalAssists: number | null;
    totalDamage: number | null;
    headshotPercentage: number | null;
  
    // Accuracy
    accuracySpotted: number | null;
    headshotAccuracy: number | null;
    sprayAccuracy: number | null;
    crosshairPlacement: number | null;
    counterStrafeRatio: number | null;
    timeToDamage: number | null;
  
    // Positioning / Trading
    openingKills: number | null;
    openingAttempts: number | null;
    tradeKills: number | null;
    tradeAttempts: number | null;
    tradedDeaths: number | null;
    tradedDeathAttempts: number | null;
  
    // Impact
    multiKillRate: number | null; // % of rounds with ≥2 kills
  
    // Raw counts (used for derived stats)
    twoKillRounds: number | null;
    threeKillRounds: number | null;
    fourKillRounds: number | null;
    fiveKillRounds: number | null;
  
    // Derived percentages
    openingKillRate: number | null;
    tradeKillRate: number | null;
    tradedDeathRate: number | null;
  };

export type BackendProgressEntry = {
    matchId: string;
    mapName: string;
    playedAt: string;
    team1Score: number;
    team2Score: number;
    userStats: UserProgressStat;
    score:      PlayerScore;
};

export type FormattedChartDataPoint = {
    matchIndex: number;
    mapName: string;
    playedAt: string;
} & UserProgressStat;

export interface ProgressEntry {
    matchId:    string;
    mapName:    string;
    playedAt:   string;
    team1Score: number;
    team2Score: number;
    userStats:  Record<string, number>;   // raw stats
    score:      PlayerScore;              // precomputed { pillars, diffs, bucket, matchScore }
  }

export type UserProgressApiResponse = BackendProgressEntry[];

export type StatToPlot = {
    key: keyof UserProgressStat; 
    label: string;              
};

export type StatCategory = {
    title: string;             
    stats: StatToPlot[];       
};

