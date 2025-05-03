// data/rankAverages.ts (Create this new file)
import { UserProgressStat } from '@/types/progress'; // Import your stat keys type
import { RankBadgeStyle } from '@/utils/rankUtils'

// Use string keys for easier mapping from selection UI
export type RankTierKey = '0' | '5k' | '10k' | '15k' | '20k' | '25k' | '30k';

export type RankTierAverages = Partial<Record<keyof UserProgressStat, number>>;

export const TIER_BADGE_STYLES: Record<RankTierKey, RankBadgeStyle> = {
    '0':   { bgColor: 'bg-neutral-600/80', textColor: 'text-neutral-100', borderColor: 'border-neutral-400' },
    '5k':  { bgColor: 'bg-sky-600/80',    textColor: 'text-sky-100',    borderColor: 'border-sky-400'    },
    '10k': { bgColor: 'bg-blue-600/80',   textColor: 'text-blue-100',   borderColor: 'border-blue-400'   },
    '15k': { bgColor: 'bg-purple-600/80', textColor: 'text-purple-100', borderColor: 'border-purple-400' },
    '20k': { bgColor: 'bg-fuchsia-600/80',textColor: 'text-fuchsia-100',borderColor: 'border-fuchsia-400'},
    '25k': { bgColor: 'bg-red-600/80',    textColor: 'text-red-100',    borderColor: 'border-red-400'    },
    '30k': { bgColor: 'bg-yellow-600/80', textColor: 'text-yellow-100', borderColor: 'border-yellow-400' }
};


export const RANK_AVERAGES: Record<RankTierKey, RankTierAverages> = {
    '0': { // Below 5k
        accuracy: 18.0, hsAccuracy: 35.0, timeToDamage: 0.650,
        crosshairPlacement: 5.5, counterStrafing: 0.60, openingKills: 0.8,
        tradeKillPercentage: 0.40, tradedDeathPercentage: 0.35, multiKillRounds: 0.15,
    },
    '5k': { // 5k - 9,999
        accuracy: 20.0, hsAccuracy: 38.0, timeToDamage: 0.600,
        crosshairPlacement: 4.8, counterStrafing: 0.65, openingKills: 0.9,
        tradeKillPercentage: 0.45, tradedDeathPercentage: 0.33, multiKillRounds: 0.18,
    },
    '10k': { // 10k - 14,999
        accuracy: 22.0, hsAccuracy: 41.0, timeToDamage: 0.550,
        crosshairPlacement: 4.2, counterStrafing: 0.70, openingKills: 1.0,
        tradeKillPercentage: 0.50, tradedDeathPercentage: 0.30, multiKillRounds: 0.21,
    },
    '15k': { // 15k - 19,999
        accuracy: 24.0, hsAccuracy: 44.0, timeToDamage: 0.500,
        crosshairPlacement: 3.8, counterStrafing: 0.75, openingKills: 1.1,
        tradeKillPercentage: 0.55, tradedDeathPercentage: 0.28, multiKillRounds: 0.24,
    },
    '20k': { // 20k - 24,999
        accuracy: 26.0, hsAccuracy: 47.0, timeToDamage: 0.475,
        crosshairPlacement: 3.5, counterStrafing: 0.80, openingKills: 1.2,
        tradeKillPercentage: 0.60, tradedDeathPercentage: 0.26, multiKillRounds: 0.27,
    },
    '25k': { // 25k - 29,999
        accuracy: 28.0, hsAccuracy: 50.0, timeToDamage: 0.450,
        crosshairPlacement: 3.2, counterStrafing: 0.83, openingKills: 1.3,
        tradeKillPercentage: 0.63, tradedDeathPercentage: 0.24, multiKillRounds: 0.30,
    },
    '30k': { // 30k+
        accuracy: 30.0, hsAccuracy: 53.0, timeToDamage: 0.425,
        crosshairPlacement: 3.0, counterStrafing: 0.85, openingKills: 1.4,
        tradeKillPercentage: 0.65, tradedDeathPercentage: 0.22, multiKillRounds: 0.33,
    }
};

// Helper array for generating UI elements
export const RANK_TIERS_FOR_SELECTION: { key: RankTierKey; label: string }[] = [
    { key: '0', label: '< 5k' },
    { key: '5k', label: '5k-10k' },
    { key: '10k', label: '10k-15k' },
    { key: '15k', label: '15k-20k' },
    { key: '20k', label: '20k-25k' },
    { key: '25k', label: '25k-30k' },
    { key: '30k', label: '30k+' },
];

// Define colors for the reference lines
export const REFERENCE_LINE_COLORS = [
    "#a3a3a3", // neutral-400
    "#f87171", // red-400
    "#fb923c", // orange-400
    "#facc15", // yellow-400
    "#4ade80", // green-400
    "#2dd4bf", // teal-400
    "#60a5fa", // blue-400
    "#c084fc", // purple-400
];