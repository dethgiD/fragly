// utils/formatting.ts
import { PlayerStatEntry } from '@/types/match'; // Adjust path

export function formatStatValue(key: keyof PlayerStatEntry, value: any): string {
    if (value == null) return '-'; // Handle null or undefined

    const numValue = Number(value);
    if (isNaN(numValue)) return String(value); // Return original if not a number (like username)

    switch (key) {
        case 'accuracy':
        case 'accuracySpotted':
        case 'hsAccuracy':
            return `${numValue.toFixed(1)}%`; // Already a percentage value

        case 'counterStrafing':
        case 'tradeKillPercentage':
        case 'tradedDeathPercentage':
        case 'multiKillPercentage':
            return `${(numValue * 100).toFixed(1)}%`; // Convert decimal to percentage

        case 'timeToDamage':
            return `${Math.round(numValue * 1000)}ms`; // Convert seconds to milliseconds

        case 'crosshairPlacement':
            return `${numValue.toFixed(2)}°`; // Degrees

        case 'kdr':
            return numValue.toFixed(2); // K/D Ratio

        // General numeric values (kills, deaths, etc.)
        case 'totalKills':
        case 'totalDeaths':
        case 'openingKills':
        case 'tradeKills':
        case 'tradedDeaths':
        case 'multiKillRounds':
            return numValue.toFixed(0);

        default:
            // Fallback for any other numeric types or string types (like username)
            return String(value);
    }
}

export function calculateKDR(kills: number, deaths: number): number {
    return deaths === 0 ? kills : kills / deaths; // Avoid division by zero
}