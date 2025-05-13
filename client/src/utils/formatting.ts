import { PlayerStatEntry } from '@/types/match';

export function formatStatValue(key: keyof PlayerStatEntry, value: any): string {
  if (value == null) return '-';

  const numValue = Number(value);
  if (isNaN(numValue)) return String(value);

  switch (key) {
    // Percentages (originally decimals)
    case 'accuracySpotted':
    case 'headshotAccuracy':
    case 'counterStrafeRatio':
    case 'sprayAccuracy':
    case 'headshotPercentage':
      return `${(numValue * 100).toFixed(1)}%`;

    case 'crosshairPlacement':
        return `${numValue.toFixed(2)}°`;

    case 'timeToDamage':
      return `${Math.round(numValue)}ms`;

    case 'kdr':
      return numValue.toFixed(2);

    // Round counts
    case 'twoKillRounds':
    case 'threeKillRounds':
    case 'fourKillRounds':
    case 'fiveKillRounds':
    case 'openingKills':
    case 'openingAttempts':
    case 'tradeKills':
    case 'tradeAttempts':
    case 'tradedDeaths':
    case 'tradedDeathAttempts':
    case 'totalKills':
    case 'totalDeaths':
    case 'totalAssists':
    case 'totalDamage':
      return numValue.toFixed(0);

    default:
      return String(value);
  }
}

export function calculateKDR(kills: number, deaths: number): number {
  return deaths === 0 ? kills : kills / deaths;
}
