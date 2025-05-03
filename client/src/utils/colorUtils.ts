// utils/colorUtils.ts
import { PlayerStatEntry } from "@/types/match"; // Adjust path

// Define which stats are "lower is better"
const LOWER_IS_BETTER_STATS: Set<keyof PlayerStatEntry> = new Set([
    'totalDeaths',
    'timeToDamage',
    'crosshairPlacement',
]);

// Define color steps (Tailwind classes)
// Using text colors for less visual noise than backgrounds
const COLOR_STEPS = [
    'text-red-400',       // Worst (0.0 - 0.2)
    'text-orange-400',    // Below Average (0.2 - 0.4)
    'text-yellow-400',    // Average (0.4 - 0.6) - Consider text-neutral-300/400 if yellow is too much
    'text-lime-400',      // Above Average (0.6 - 0.8)
    'text-green-400'      // Best (0.8 - 1.0)
];
const DEFAULT_COLOR = 'text-neutral-200'; // Default/fallback color

export function getStatColorClass(
    statKey: keyof PlayerStatEntry,
    value: number | null | undefined,
    min: number | undefined,
    max: number | undefined
): string {
    if (value == null || min == null || max == null || min === max) {
        return DEFAULT_COLOR; // Cannot normalize or no range
    }

    // Normalize the value between 0 and 1
    let normalizedValue = (value - min) / (max - min);

    // Invert normalization for stats where lower is better
    if (LOWER_IS_BETTER_STATS.has(statKey)) {
        normalizedValue = 1 - normalizedValue;
    }

    // Clamp value just in case of floating point issues
    normalizedValue = Math.max(0, Math.min(1, normalizedValue));

    // Determine the color based on the normalized value
    // Handle the top boundary explicitly (normalizedValue === 1)
    if (normalizedValue >= 0.8) return COLOR_STEPS[4];
    if (normalizedValue >= 0.6) return COLOR_STEPS[3];
    if (normalizedValue >= 0.4) return COLOR_STEPS[2];
    if (normalizedValue >= 0.2) return COLOR_STEPS[1];
    return COLOR_STEPS[0]; // normalizedValue < 0.2
}

// Type for the object holding min/max for each stat
export type StatRanges = {
    [key in keyof PlayerStatEntry]?: { min: number; max: number };
};