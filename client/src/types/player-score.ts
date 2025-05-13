// src/types/player-score.ts

export type PerformanceBucket =
  | 'Severely Underperforming'
  | 'Underperforming'
  | 'Poor'
  | 'Average'
  | 'Good'
  | 'Overperforming'
  | 'Legendary Performance';

export interface PillarScores {
  firepower:   number;  // z‐score aggregate for damage/multikills/clutch
  accuracy:    number;  // z‐score aggregate for all accuracy stats
  entryTrading: number;
  clutching: number;  // z‐score aggregate for open/trade/death rates
}

export interface PlayerScore {
  steamId:    string;
  username:   string;
  matchScore: number;               // overall blended z‐score
  bucket:     PerformanceBucket;    // one of the seven categories
  pillars:    PillarScores;         // individual pillar scores
  diffs:      Record<string,number>;// raw per‐stat z‐scores for narrative
}
