// app/(app)/progress/stats/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tab } from '@headlessui/react';
// Remove unused chart imports if they aren't used directly here
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import { formatStatValue } from '@/utils/formatting';
import { formatMapName } from '@/utils/mapImages';
import {
    UserProgressApiResponse, FormattedChartDataPoint, UserProgressStat, StatCategory, StatToPlot
} from '@/types/progress';
import SingleStatChart from '@/components/progress/SingleStatChart';
// Import the new style map along with other data

const STAT_CATEGORIES: StatCategory[] = [
    {
      title: 'General',
      stats: [
        { key: 'kdr', label: 'K/D Ratio' },
        { key: 'totalKills', label: 'Total Kills' },
        { key: 'totalDeaths', label: 'Total Deaths' },
        { key: 'totalAssists', label: 'Total Assists' },
        { key: 'totalDamage', label: 'Total Damage' },
        { key: 'headshotPercentage', label: 'Headshot Percentage (%)' },
      ],
    },
    {
      title: 'Accuracy',
      stats: [
        { key: 'accuracySpotted', label: 'Accuracy (Spotted)' },
        { key: 'headshotAccuracy', label: 'Headshot Accuracy' },
        { key: 'sprayAccuracy', label: 'Spray Accuracy' },
        { key: 'crosshairPlacement', label: 'Crosshair Placement (°)' },
        { key: 'counterStrafeRatio', label: 'Counter-Strafe Ratio' },
        { key: 'timeToDamage', label: 'Time to Damage (ms)' },
      ],
    },
    {
      title: 'Positioning',
      stats: [
        { key: 'openingKills', label: 'Opening Kills' },
        { key: 'openingAttempts', label: 'Opening Attempts' },
        { key: 'tradeKills', label: 'Trade Kills' },
        { key: 'tradeAttempts', label: 'Trade Attempts' },
        { key: 'tradeKillRate', label: 'Trade Kill Rate (%)' },       // ✅ added
        { key: 'tradedDeaths', label: 'Traded Deaths' },
        { key: 'tradedDeathAttempts', label: 'Traded Death Attempts' },
        { key: 'tradedDeathRate', label: 'Traded Death Rate (%)' },   // ✅ added
        { key: 'multiKillRate', label: 'Multi-Kill Round %' },        // ✅ already added
      ],
    },
  ];
  

export default function ProgressReportPage() {
    const { user } = useAuth();
    const [progressData, setProgressData] = useState<UserProgressApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const matchesToFetch = 20;

    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchProgress = async () => {
             try {
                const token = localStorage.getItem("fragly-token");
                if (!token) throw new Error("Authentication token not found.");
                const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/matches/user/progress?limit=${matchesToFetch}`;
                const res = await fetch(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
                if (!res.ok) {
                    let errorMsg = `Failed to fetch progress data (Status: ${res.status})`;
                    try { const errorBody = await res.json(); if (errorBody.message) errorMsg = `${errorMsg}: ${errorBody.message}`; } catch (_) { }
                    throw new Error(errorMsg);
                }
                const data: UserProgressApiResponse = await res.json();
                setProgressData(data);
            } catch (err: any) {
                console.error("Progress fetch error:", err);
                setError(err.message || "An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, [matchesToFetch]);

    const formattedChartData: FormattedChartDataPoint[] = useMemo(() => {
        if (!progressData) return [];
      
        return progressData.map((entry, index) => {
          const {
            twoKillRounds,
            threeKillRounds,
            fourKillRounds,
            fiveKillRounds,
            tradeKills,
            tradeAttempts,
            tradedDeaths,
            tradedDeathAttempts,
          } = entry.userStats;
      
          const totalRounds = entry.team1Score + entry.team2Score;
          console.log("Total Rounds:", totalRounds);
          const multiKillRounds =
            (twoKillRounds ?? 0) +
            (threeKillRounds ?? 0) +
            (fourKillRounds ?? 0) +
            (fiveKillRounds ?? 0);
      
          const multiKillRate = totalRounds > 0 ? multiKillRounds / totalRounds : null;
      
          const tradeKillRate =
            tradeAttempts && tradeAttempts > 0
                ? (tradeKills ?? 0) / tradeAttempts
                : null;

        const tradedDeathRate =
            tradedDeathAttempts && tradedDeathAttempts > 0
                ? (tradedDeaths ?? 0) / tradedDeathAttempts
                : null;
      
          return {
            matchIndex: index,
            mapName: entry.mapName,
            playedAt: entry.playedAt,
            ...entry.userStats,
            multiKillRate,
            tradeKillRate,
            tradedDeathRate
          };
        });
      }, [progressData]);


    if (loading) return <div className="p-6 text-center text-neutral-400">Loading progress report...</div>;
    if (error) return <div className="p-6 text-center text-red-400">Error: {error}</div>;
    if (!progressData || progressData.length === 0) return <div className="p-6 text-center text-neutral-400">No match data found. Play some matches to see your progress!</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 bg-neutral-950 text-neutral-200">
            <h1 className="text-3xl md:text-4xl font-bold text-sky-200 mb-6 text-center md:text-left">
                Your Progress (Last {progressData.length} Matches)
            </h1>


            <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
                <Tab.List className="flex space-x-1 rounded-xl bg-neutral-800 p-1 mb-6 shadow-sm max-w-md mx-auto">
                    {STAT_CATEGORIES.map((category) => (
                        <Tab
                            key={category.title}
                            className={({ selected }) =>
                                `w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5 transition-all duration-150
                                focus:outline-none focus:ring-2 ring-offset-2 ring-offset-neutral-900 ring-white ring-opacity-60
                                ${selected
                                    ? 'bg-sky-600 text-white shadow'
                                    : 'text-neutral-300 hover:bg-neutral-700/50 hover:text-white'
                                }`
                            }
                        >
                            {category.title}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {STAT_CATEGORIES.map((category, idx) => (
                        <Tab.Panel
                            key={idx}
                            className="rounded-xl focus:outline-none"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {category.stats.map((statInfo) => (
                                    <SingleStatChart
                                        key={statInfo.key}
                                        statKey={statInfo.key}
                                        statLabel={statInfo.label}
                                        chartData={formattedChartData}
                                    />
                                ))}
                            </div>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}