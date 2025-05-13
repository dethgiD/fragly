// src/utils/reviewutils.ts

export type PillarKey = 'firepower' | 'accuracy' | 'entryTrading' | 'clutch';

export const pillarToStats: Record<PillarKey, string[]> = {
  firepower:    ['dmgShare', 'killShare', 'multiKillRate'],
  accuracy:     ['accuracySpotted', 'headshotAccuracy', 'sprayAccuracy', 'crosshairPlacement', 'counterStrafeRatio', 'timeToDamage'],
  entryTrading: ['openingRate', 'tradeRate', 'tradedDeathRate'],
  clutch:       ['clutchScore'],
};


// Function to get a descriptive label for pillar averages
export function getPillarDescription(
  averageZScore: number | undefined | null
): { label: string; colorClass: string; borderClass: string } {
  const defaultResult = {
    label: "On Par",
    colorClass: "text-neutral-300",
    borderClass: "border-neutral-500",
  };

  if (typeof averageZScore !== 'number' || isNaN(averageZScore)) {
    return defaultResult;
  }

  if (averageZScore > 1.3)  return { label: "Elite",       colorClass: "text-teal-400",   borderClass: "border-teal-500" };
  if (averageZScore > 0.8)  return { label: "Excellent",   colorClass: "text-green-400",  borderClass: "border-green-500" };
  if (averageZScore > 0.3)  return { label: "Good",        colorClass: "text-lime-400",   borderClass: "border-lime-500" };
  if (averageZScore >= -0.3) return { label: "On Par",     colorClass: "text-neutral-300", borderClass: "border-neutral-500" };
  if (averageZScore >= -0.8) return { label: "Weak",        colorClass: "text-amber-500",  borderClass: "border-amber-500" };
  return                     { label: "Very Weak",  colorClass: "text-red-500",    borderClass: "border-red-500" };
}

// Function to get overall performance label for individual stats
export function getPerformanceLabel(
  zScore: number | undefined | null
): { label: string; colorClass: string } {
  const defaultResult = { label: "On Par", colorClass: "text-neutral-300" };

  if (typeof zScore !== 'number' || isNaN(zScore)) {
    return defaultResult;
  }

  if (zScore > 1.5)  return { label: "Elite",            colorClass: "text-teal-400" };
  if (zScore > 1.0)  return { label: "Excellent",        colorClass: "text-green-400" };
  if (zScore > 0.5)  return { label: "Good",             colorClass: "text-lime-400" };
  if (zScore > 0.15) return { label: "Above Average",    colorClass: "text-green-600" };
  if (zScore >= -0.15) return { label: "On Par",        colorClass: "text-neutral-300" };
  if (zScore >= -0.5) return { label: "Below Average",    colorClass: "text-yellow-500" };
  if (zScore >= -1.0) return { label: "Weak",             colorClass: "text-amber-500" };
  return               { label: "Very Weak",        colorClass: "text-red-500" };
}

// Human-readable stat names
export function formatStatName(statKey: string): string {
  const names: Record<string, string> = {
    dmgShare:           "Damage Share",
    killShare:          "Kill Share",
    multiKillRate:      "Multi-Kill Rate",
    accuracySpotted:    "Spotted Accuracy",
    headshotAccuracy:   "Headshot Accuracy",
    sprayAccuracy:      "Spray Accuracy",
    crosshairPlacement: "Crosshair Placement",
    counterStrafeRatio: "Counter-Strafe Ratio",
    timeToDamage:       "Time To Damage",
    openingRate:        "Opening Kill Rate",
    tradeRate:          "Trade Kill Rate",
    tradedDeathRate:    "Deaths Traded Rate",
    clutchScore:        "Clutch Score",
    entryTrading:       "Entrying & Trading",
  };

  const fallback = statKey
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());

  return names[statKey] || fallback;
}

// Simple actionable advice for negative stats
export function getStatAdvice(statKey: string, zScore: number): string | null {
  if (zScore >= 0) return null;
  switch (statKey) {
    case 'timeToDamage':
      return "Focus on quicker reactions and smoother target acquisition when you spot an enemy.";
    case 'crosshairPlacement':
      return "Practice pre-aiming common angles and keeping your crosshair at head level.";
    case 'headshotAccuracy':
      return "Work on placing your first shot at the head; consider slower bursts for better control.";
    case 'accuracySpotted':
      return "Improve your aim under pressure; try deathmatch with random duels to sharpen reactions.";
    case 'openingRate':
      return "Look for safe entry angles and practice timing peeks to secure more opening kills.";
    case 'tradeRate':
      return "Practice positioning so you can immediately trade teammates; avoid isolated peeks.";
    case 'tradedDeathRate':
      return "Stay closer to teammates or communicate to ensure your death is traded.";
    case 'clutchScore':
      return "Review 1vX situations in your demos to improve decision-making under pressure.";
    default:
      return "Watch your demo focusing on rounds where this stat matters to spot mistakes.";
  }
}

// Icons for each pillar (emojis as placeholders)
export const pillarIcons: Record<PillarKey, string> = {
  firepower:    "🔥",
  accuracy:     "🎯",
  entryTrading: "🔁",
  clutch:       "🏆",
};

// Explanations for each pillar
export function getPillarExplanation(pillarKey: PillarKey): string {
  switch (pillarKey) {
    case 'firepower':
      return "Your kill and damage impact in the match—how often you secure kills, multi-kills, and apply pressure.";
    case 'accuracy':
      return "Your mechanical skill—aim precision, recoil control, crosshair placement, and reaction speed.";
    case 'entryTrading':
      return "Your teamwork in fights—securing opening kills, trading teammates, and being traded when you die.";
    case 'clutch':
      return "Your performance in late-round 1vX situations—staying calm and winning clutch opportunities.";
    default:
      return "Key aspect of your performance relative to other players.";
  }
}
