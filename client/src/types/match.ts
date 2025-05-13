// types/match.ts
export type PlayerStatEntry = {
    id: string;
    playerId: string;
    matchId: string;
    steamId: string;
    rank: number;
    username: string;
    teamNumber: number;

    accuracySpotted: number;
    headshotAccuracy: number;       
    timeToDamage: number;    
    crosshairPlacement: number;
    counterStrafeRatio: number; 
    sprayAccuracy: number;

    openingKills: number;
    openingAttempts: number;
    tradeKills: number;
    tradeAttempts: number;
    tradedDeaths: number;
    tradedDeathAttempts: number;

    totalKills: number;
    totalDeaths: number;
    totalAssists: number;
    totalDamage: number;
    headshotPercentage: number;

    twoKillRounds: number;
    threeKillRounds: number;
    fourKillRounds: number;
    fiveKillRounds: number;

    // Derived/Calculated fields
    kdr: number; // Kill/Death Ratio
};

export type MatchDetailsResponse = {
    id: string;
    matchId: string;
    mapName: string;
    team1Score: number;
    team2Score: number;
    playedAt: string;
    stats: PlayerStatEntry[]; // This will hold the processed stats including KDR
};

export type SortConfig = {
    key: keyof PlayerStatEntry | null;
    direction: 'asc' | 'desc';
};

// Type for raw stats before processing (optional, but good practice)
export type RawPlayerStatEntry = Omit<PlayerStatEntry, 'kdr'>;
export type RawMatchDetailsResponse = Omit<MatchDetailsResponse, 'stats'> & {
    stats: RawPlayerStatEntry[];
};