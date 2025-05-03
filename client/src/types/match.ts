// types/match.ts
export type PlayerStatEntry = {
    id: string;
    playerId: string;
    matchId: string;
    steamId: string;
    rank: number;
    username: string;
    teamNumber: number;
    accuracy: number;         // Already %
    accuracySpotted: number;  // Already %
    hsAccuracy: number;       // Already %
    timeToDamage: number;     // Seconds (convert to ms)
    crosshairPlacement: number;// Degrees
    counterStrafing: number;  // Decimal % (convert to %)
    totalKills: number;
    totalDeaths: number;
    openingKills: number;
    tradeKills: number;
    tradeKillPercentage: number; // Decimal % (convert to %)
    tradedDeaths: number;
    tradedDeathPercentage: number;// Decimal % (convert to %)
    multiKillRounds: number;
    multiKillPercentage: number;// Decimal % (convert to %)
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