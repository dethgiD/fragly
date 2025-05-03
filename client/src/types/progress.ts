// types/progress.ts (Ensure this is up-to-date with backend stats)
export type UserProgressStat = {
    accuracy: number | null;
    accuracySpotted: number | null;
    hsAccuracy: number | null;
    timeToDamage: number | null;
    crosshairPlacement: number | null;
    counterStrafing: number | null;
    totalKills: number | null;
    totalDeaths: number | null;
    openingKills: number | null;
    tradeKills: number | null;
    tradeKillPercentage: number | null;
    tradedDeaths: number | null;
    tradedDeathPercentage: number | null;
    multiKillRounds: number | null;
    multiKillPercentage: number | null;
    kdr: number | null;
};

export type BackendProgressEntry = {
    matchId: string;
    mapName: string;
    playedAt: string;
    userStats: UserProgressStat;
};

export type FormattedChartDataPoint = {
    matchIndex: number;
    mapName: string;
    playedAt: string;
} & UserProgressStat;

export type UserProgressApiResponse = BackendProgressEntry[];

export type StatToPlot = {
    key: keyof UserProgressStat; 
    label: string;              
};

export type StatCategory = {
    title: string;             
    stats: StatToPlot[];       
};