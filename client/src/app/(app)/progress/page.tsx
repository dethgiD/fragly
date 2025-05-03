// app/(app)/progress/page.tsx
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
import {
    RANK_AVERAGES, RANK_TIERS_FOR_SELECTION, RankTierKey, RankTierAverages, TIER_BADGE_STYLES
} from '@/data/rankAverages'; // Import TIER_BADGE_STYLES

const STAT_CATEGORIES: StatCategory[] = [
    {
        title: 'General',
        stats: [
            { key: 'kdr', label: 'K/D Ratio' },
            { key: 'totalKills', label: 'Kills' },
            { key: 'totalDeaths', label: 'Deaths' },
        ],
    },
    {
        title: 'Accuracy',
        stats: [
            { key: 'accuracy', label: 'Accuracy (%)' },
            { key: 'hsAccuracy', label: 'Headshot Accuracy (%)' },
            { key: 'timeToDamage', label: 'Time to Damage (ms)' },
            { key: 'crosshairPlacement', label: 'Crosshair Placement (°)' },
            { key: 'counterStrafing', label: 'Counter-Strafing (%)' },
        ],
    },
    {
        title: 'Positioning',
        stats: [
            { key: 'openingKills', label: 'Opening Kills' },
            { key: 'tradeKills', label: 'Trade Kills' },
            { key: 'tradeKillPercentage', label: 'Trade Kill (%)' },
            { key: 'tradedDeaths', label: 'Traded Deaths' },
            { key: 'tradedDeathPercentage', label: 'Traded Death (%)' },
            { key: 'multiKillRounds', label: 'Multi-Kill Rounds' },
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
    const [selectedRankTiers, setSelectedRankTiers] = useState<RankTierKey[]>([]);

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
        return progressData.map((entry, index) => ({
            matchIndex: index,
            mapName: entry.mapName,
            playedAt: entry.playedAt,
            ...entry.userStats
        }));
    }, [progressData]);

    // --- Modified Handler: Now toggles selection directly ---
    const toggleRankTierSelection = (tierKey: RankTierKey) => {
        setSelectedRankTiers(prev =>
            prev.includes(tierKey)
                ? prev.filter(key => key !== tierKey) // Remove if present
                : [...prev, tierKey] // Add if not present
        );
    };

    if (loading) return <div className="p-6 text-center text-neutral-400">Loading progress report...</div>;
    if (error) return <div className="p-6 text-center text-red-400">Error: {error}</div>;
    if (!progressData || progressData.length === 0) return <div className="p-6 text-center text-neutral-400">No match data found. Play some matches to see your progress!</div>;

    return (
        <div className="min-h-screen p-4 md:p-8 bg-neutral-950 text-neutral-200">
            <h1 className="text-3xl md:text-4xl font-bold text-sky-200 mb-6 text-center md:text-left">
                Your Progress (Last {progressData.length} Matches)
            </h1>

             {/* --- Rank Tier Selection UI - Using Badges --- */}
             <div className="mb-6 p-4 bg-neutral-800/60 rounded-lg border border-neutral-700">
                 <label className="block text-sm font-medium text-neutral-300 mb-3">
                     Compare with Average Rank Tiers:
                 </label>
                 <div className="flex flex-wrap gap-2 sm:gap-3">
                     {RANK_TIERS_FOR_SELECTION.map(tier => {
                        const isSelected = selectedRankTiers.includes(tier.key);
                        const style = TIER_BADGE_STYLES[tier.key]; // Get style for this tier

                        return (
                         <button
                             key={tier.key}
                             type="button"
                             onClick={() => toggleRankTierSelection(tier.key)}
                             title={`Toggle comparison for ${tier.label} tier`}
                             // Apply base styles + conditional styles for selection
                             className={`
                                 inline-flex items-center rounded px-2.5 py-1 text-xs font-bold shadow-sm
                                 border-l-4 transition-all duration-150 ease-in-out
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-white/60
                                 ${style.bgColor} ${style.textColor} ${style.borderColor}
                                 ${isSelected ? 'opacity-100 ring-2 ring-offset-1 ring-offset-neutral-800 ring-white/50' : 'opacity-60 hover:opacity-100'}
                             `}
                         >
                             {/* Optional double bar visual */}
                             {/* <span className={`block h-full w-px ${style.borderColor.replace('border-l-4','bg')} mr-1 opacity-50`}></span> */}
                             {/* <span className={`block h-full w-px ${style.borderColor.replace('border-l-4','bg')} mr-1.5 opacity-50`}></span> */}
                              <span className="leading-none">{tier.label}</span>
                         </button>
                         );
                     })}
                 </div>
             </div>
             {/* --- End Rank Tier Selection --- */}

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
                                        averageRankData={RANK_AVERAGES}
                                        selectedRankTiers={selectedRankTiers}
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