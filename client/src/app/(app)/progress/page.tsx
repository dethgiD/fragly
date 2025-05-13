// app/(app)/progress/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  getPillarDescription,
  getPillarExplanation,
  getStatAdvice,
  pillarIcons,
  pillarToStats,
} from '@/utils/reviewUtils';
import { formatStatName } from '@/utils/reviewUtils';
import { UserProgressApiResponse, ProgressEntry } from '@/types/progress';

export default function ProgressOverviewPage() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<UserProgressApiResponse>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const matchesToFetch = 20;

  // Fetch combined raw stats + precomputed scores
  useEffect(() => {
    const fetchProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('fragly-token');
        if (!token) throw new Error('Authentication token not found');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matches/user/progress?limit=${matchesToFetch}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(
            `Failed to load progress (${res.status})` + (body?.message ? `: ${body.message}` : '')
          );
        }
        const data: UserProgressApiResponse = await res.json();
        setProgressData(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [matchesToFetch]);

  // Calculate average pillar scores
  const pillarAverages = useMemo(() => {
    if (!progressData.length) return null;
    const sums = { firepower: 0, accuracy: 0, entryTrading: 0, clutch: 0 };
    progressData.forEach(entry => {
      const p = entry.score.pillars;
      sums.firepower += p.firepower;
      sums.accuracy += p.accuracy;
      sums.entryTrading += p.entryTrading;
      sums.clutch += p.clutching;
    });
    const N = progressData.length;
    return {
      firepower: sums.firepower / N,
      accuracy: sums.accuracy / N,
      entryTrading: sums.entryTrading / N,
      clutch: sums.clutch / N,
    };
  }, [progressData]);

  const averageDiffs = useMemo(() => {
    if (!progressData.length) return {};
  
    // Sum up all diffs
    const sums: Record<string, number> = {};
    progressData.forEach(entry => {
      Object.entries(entry.score.diffs).forEach(([stat, z]) => {
        sums[stat] = (sums[stat] || 0) + z;
      });
    });
  
    // Divide by N to get the mean
    const N = progressData.length;
    return Object.fromEntries(
      Object.entries(sums).map(([stat, total]) => [stat, total / N])
    ) as Record<string, number>;
  }, [progressData]);

  // Overview summary text
  const overviewSummary = useMemo(() => {
    if (!pillarAverages) return '';
    const sorted = Object.entries(pillarAverages) as [keyof typeof pillarAverages, number][];
    sorted.sort(([, a], [, b]) => b - a);
    const best = sorted[0][0];
    const worst = sorted[sorted.length - 1][0];
    return `Over your last ${progressData.length} matches, your strongest pillar is ${formatStatName(
      best
    )} and your weakest is ${formatStatName(worst)}.`;
  }, [pillarAverages, progressData.length]);

  if (loading) {
    return <div className="p-6 text-center text-neutral-400">Loading overview…</div>;
  }
  if (error) {
    return <div className="p-6 text-center text-red-400">Error: {error}</div>;
  }
  if (!progressData.length) {
    return (
      <div className="p-6 text-center text-neutral-400">
        No match data found. Play some matches to see your overview!
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-neutral-950 text-neutral-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-sky-200">
          Progress Overview
        </h1>
        <Link
          href="/progress/stats"
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-500"
        >
          Detailed Stats →
        </Link>
      </div>

      {pillarAverages && (
        <>
          <p className="text-sm text-neutral-400 mb-8">{overviewSummary}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.entries(pillarAverages) as [keyof typeof pillarAverages, number][]).map(
              ([pillarKey, avg]) => {
                const { label, colorClass, borderClass } = getPillarDescription(avg);
                const explanation = getPillarExplanation(pillarKey);
                // pick worst stat in this pillar from the most recent match
                const latestDiffs = progressData[0].score.diffs;
                const statsList = pillarToStats[pillarKey];
                const worstStat = Object.entries(latestDiffs)
                  .filter(([stat]) => statsList.includes(stat))
                  .sort(([, a], [, b]) => a - b)[0]?.[0] ?? '';
                const tip = getStatAdvice(worstStat, latestDiffs[worstStat]);

                return (
                  <div
                    key={pillarKey}
                    className={`border-l-4 ${borderClass} bg-neutral-800 p-4 rounded-lg`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="mr-2">{pillarIcons[pillarKey]}</span>
                      <h3 className="font-semibold">
                        {formatStatName(pillarKey)}
                      </h3>
                    </div>
                    <p className={`text-xl font-bold ${colorClass}`}>{label}</p>
                    <p className="text-xs text-neutral-400 mt-1">{explanation}</p>
                    {tip && (
                      <p className="mt-2 text-sm text-yellow-300 bg-yellow-900/30 p-2 rounded">
                        💡 {tip}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
          <div className="mt-10 bg-neutral-800 p-6 rounded-lg border border-neutral-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Average Stat Differences (last {progressData.length} matches)
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(averageDiffs)
                // sort by absolute z-score descending
                .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
                .map(([statKey, z]) => (
                  <li key={statKey} className="flex justify-between">
                    <span className="text-sm text-neutral-300">
                      {formatStatName(statKey)}
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        z > 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                      title={`${z.toFixed(2)}σ`}
                    >
                      {z.toFixed(2)}σ
                    </span>
                  </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
