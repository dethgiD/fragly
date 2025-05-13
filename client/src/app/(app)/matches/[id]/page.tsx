"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getMapImageUrl, formatMapName } from "@/utils/mapImages";
import { formatStatValue, calculateKDR } from "@/utils/formatting";
import ScoreboardHeader from "@/components/matches/ScoreboardHeader";
import ScoreboardRow from "@/components/matches/ScoreboardRow";
import { MatchDetailsResponse, PlayerStatEntry, SortConfig, RawMatchDetailsResponse } from '@/types/match';
import { Tab } from '@headlessui/react';
import { StatRanges } from '@/utils/colorUtils'; // Import StatRanges type
import Link from "next/link";

// Define which numeric stats should be color-coded
const COLOR_CODED_STATS: Set<keyof PlayerStatEntry> = new Set([
    'accuracySpotted',
    'headshotAccuracy',
    'timeToDamage',
    'crosshairPlacement',
    'counterStrafeRatio',
    'sprayAccuracy',
    'headshotPercentage'
  ]);


const GENERAL_COLUMNS: { key: keyof PlayerStatEntry; label: string; sortable: boolean, numeric?: boolean }[] = [
    { key: 'username', label: 'Player', sortable: true },
    { key: 'totalKills', label: 'K', sortable: true, numeric: true },
    { key: 'totalDeaths', label: 'D', sortable: true, numeric: true },
    { key: 'totalAssists', label: 'A', sortable: true, numeric: true },
    { key: 'totalDamage', label: 'DMG', sortable: true, numeric: true },
    { key: 'headshotPercentage', label: 'HS %', sortable: true, numeric: true },
    { key: 'kdr', label: 'KDR', sortable: true, numeric: true },
];

const ACCURACY_COLUMNS: { key: keyof PlayerStatEntry; label: string; sortable: boolean; numeric?: boolean }[] = [
    { key: 'username', label: 'Player', sortable: true },
    { key: 'accuracySpotted', label: 'Accuracy (Spotted)', sortable: true, numeric: true },
    { key: 'headshotAccuracy', label: 'HS Accuracy', sortable: true, numeric: true },
    { key: 'timeToDamage', label: 'Time to Damage (ms)', sortable: true, numeric: true },
    { key: 'crosshairPlacement', label: 'Crosshair Placement', sortable: true, numeric: true },
    { key: 'counterStrafeRatio', label: 'Counter-Strafe Ratio', sortable: true, numeric: true },
    { key: 'sprayAccuracy', label: 'Spray Accuracy', sortable: true, numeric: true }
  ];

  const POSITIONING_COLUMNS: { key: keyof PlayerStatEntry; label: string; sortable: boolean; numeric?: boolean }[] = [
    { key: 'username', label: 'Player', sortable: true },
    { key: 'openingKills', label: 'Opening Kills', sortable: true, numeric: true },
    { key: 'openingAttempts', label: 'Opening Attempts', sortable: true, numeric: true },
    { key: 'tradeKills', label: 'Trade Kills', sortable: true, numeric: true },
    { key: 'tradeAttempts', label: 'Trade Attempts', sortable: true, numeric: true },
    { key: 'tradedDeaths', label: 'Traded Deaths', sortable: true, numeric: true },
    { key: 'tradedDeathAttempts', label: 'Traded Death Attempts', sortable: true, numeric: true }
  ];
  const MULTIKILL_COLUMNS: { key: keyof PlayerStatEntry; label: string; sortable: boolean; numeric?: boolean }[] = [
    { key: 'username', label: 'Player', sortable: true },
    { key: 'twoKillRounds', label: '2K Rounds', sortable: true, numeric: true },
    { key: 'threeKillRounds', label: '3K Rounds', sortable: true, numeric: true },
    { key: 'fourKillRounds', label: '4K Rounds', sortable: true, numeric: true },
    { key: 'fiveKillRounds', label: '5K Rounds', sortable: true, numeric: true }
  ];

const TAB_COLUMNS = [
    GENERAL_COLUMNS,
    POSITIONING_COLUMNS,
    ACCURACY_COLUMNS,
    MULTIKILL_COLUMNS
];

const TABS = ['General', 'Positioning', 'Accuracy', 'Impact'];

export default function MatchPage() {
    const params = useParams();
    const matchId = params.id as string;
    const { user } = useAuth();
    const [matchData, setMatchData] = useState<MatchDetailsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'totalKills', direction: 'desc' });
    const [viewMode, setViewMode] = useState<'byTeam' | 'all'>('byTeam');
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const currentUserId = user?.steamId;

    useEffect(() => {
        if (!matchId) return;
        setLoading(true);
        setError(null);
        const fetchDetails = async () => {
            try {
                const token = localStorage.getItem("fragly-token");
                if (!token) throw new Error("Authentication required.");
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${matchId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!res.ok) throw new Error(`Failed to fetch match details (${res.status})`);

                const rawData: RawMatchDetailsResponse = await res.json();
                const processedStats: PlayerStatEntry[] = rawData.stats.map(stat => ({
                    ...stat,
                    kdr: calculateKDR(stat.totalKills, stat.totalDeaths)
                }));
                setMatchData({ ...rawData, stats: processedStats });
            } catch (err: any) {
                setError(err.message || "Could not load match details.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [matchId]);

    const sortedPlayers = useMemo(() => {
        if (!matchData?.stats) return [];
        const sortableStats = [...matchData.stats];
        if (sortConfig.key) {
            sortableStats.sort((a, b) => {
                const aValue = a[sortConfig.key!];
                const bValue = b[sortConfig.key!];
                if (aValue == null && bValue == null) return 0;
                if (aValue == null) return 1;
                if (bValue == null) return -1;
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableStats;
    }, [matchData?.stats, sortConfig]);

    // --- Calculate Min/Max for each stat ---
    const statRanges = useMemo<StatRanges>(() => {
        if (!matchData?.stats || matchData.stats.length === 0) return {};

        const ranges: StatRanges = {};
        const allStats = matchData.stats;

        COLOR_CODED_STATS.forEach(key => {
            let min = Infinity;
            let max = -Infinity;
            let foundValue = false;

            allStats.forEach(player => {
                const value = player[key] as number | undefined;
                if (value != null && typeof value === 'number' && isFinite(value)) {
                    min = Math.min(min, value);
                    max = Math.max(max, value);
                    foundValue = true;
                }
            });

            if (foundValue) {
                ranges[key] = { min, max };
            }
        });
        return ranges;
    }, [matchData?.stats]);
    // --- End Min/Max Calculation ---

    const team2Players = useMemo(() => sortedPlayers.filter(p => p.teamNumber === 2), [sortedPlayers]);
    const team3Players = useMemo(() => sortedPlayers.filter(p => p.teamNumber === 3), [sortedPlayers]);

    const handleSort = useCallback((key: keyof PlayerStatEntry) => {
        setSortConfig(currentConfig => ({
            key,
            direction: currentConfig.key === key && currentConfig.direction === 'desc' ? 'asc' : 'desc'
        }));
    }, []);

    const renderScoreboardTable = (
        players: PlayerStatEntry[],
        columns: { key: keyof PlayerStatEntry; label: string; sortable: boolean, numeric?: boolean }[],
        statRanges: StatRanges, // Accept statRanges
        title?: string
    ) => (
        <div className="overflow-x-auto relative rounded-lg border border-neutral-800 shadow-md bg-neutral-900 w-full">
            {title && <h3 className="text-lg font-semibold p-3 bg-neutral-800 text-sky-300 border-b border-neutral-700">{title}</h3>}
            <table className="w-full text-sm text-left text-neutral-300">
                <ScoreboardHeader columns={columns} sortConfig={sortConfig} onSort={handleSort} />
                <tbody>
                    {players.length > 0 ? (
                        players.map((player) => (
                            <ScoreboardRow
                                key={player.steamId}
                                player={player}
                                columns={columns}
                                isCurrentUser={player.steamId === currentUserId}
                                statRanges={statRanges}
                            />
                        ))
                    ) : (
                        <tr><td colSpan={columns.length} className="text-center py-6 text-neutral-500 italic">No player data available.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );

    if (loading) return <div className="p-6 text-center text-neutral-400">Loading match details...</div>;
    if (error) return <div className="p-6 text-center text-red-400">Error: {error}</div>;
    if (!matchData) return <div className="p-6 text-center text-neutral-400">Match data not found.</div>;

    const mapImageUrl = getMapImageUrl(matchData.mapName);
    const currentColumns = TAB_COLUMNS[selectedTabIndex];

    return (
        <div className="min-h-screen">
            <div
                className="relative py-10 px-4 md:px-8 text-white bg-cover bg-center w-full"
                 style={{ backgroundImage: `linear-gradient(to bottom, rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.9)), url(${mapImageUrl})` }}
            >
                <div className="max-w-6xl mx-auto relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-sky-200 mb-1">
                        {formatMapName(matchData.mapName)}
                    </h1>
                    <p className="text-sm text-neutral-300 mb-4">
                        Played on: {new Date(matchData.playedAt).toLocaleString()}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4 text-center">
                         <span className="text-2xl md:text-3xl font-bold text-green-400">{matchData.team2Score}</span>
                         <span className="text-xl md:text-2xl text-neutral-400">:</span>
                         <span className="text-2xl md:text-3xl font-bold text-red-400">{matchData.team1Score}</span>
                         <Link
                            href={`/matches/${matchId}/review`}
                            className="ml-8 inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
                            >
                            Game Review
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 -mt-8 relative z-20">
                 <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
                         <Tab.List className="flex space-x-1 rounded-xl bg-neutral-800 p-1 shadow-sm">
                            {TABS.map((tabName) => (
                                <Tab key={tabName} className={({ selected }) => `w-full rounded-lg py-2 px-5 text-sm font-medium leading-5 transition-all duration-150 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-neutral-900 ring-white ring-opacity-60 ${selected ? 'bg-sky-600 text-white shadow' : 'text-neutral-300 hover:bg-neutral-700/50 hover:text-white'}`}>
                                    {tabName}
                                </Tab>
                            ))}
                        </Tab.List>
                         <div className="flex items-center space-x-1 rounded-lg bg-neutral-800 p-1 shadow-sm">
                            <button onClick={() => setViewMode('byTeam')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'byTeam' ? 'bg-sky-600 text-white' : 'text-neutral-300 hover:bg-neutral-700/50'}`}>
                                By Team
                            </button>
                            <button onClick={() => setViewMode('all')} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'all' ? 'bg-sky-600 text-white' : 'text-neutral-300 hover:bg-neutral-700/50'}`}>
                                All Players
                            </button>
                        </div>
                    </div>
                     <Tab.Panels className="mt-4">
                         {TAB_COLUMNS.map((columns, idx) => (
                             <Tab.Panel key={idx} className="focus:outline-none rounded-lg">
                                {viewMode === 'byTeam' ? (
                                    <div className="space-y-6">
                                        {renderScoreboardTable(team2Players, columns, statRanges, "Team 1")}
                                        {renderScoreboardTable(team3Players, columns, statRanges, "Team 2")}
                                    </div>
                                ) : (
                                    renderScoreboardTable(sortedPlayers, columns, statRanges)
                                )}
                            </Tab.Panel>
                         ))}
                     </Tab.Panels>
                 </Tab.Group>
            </div>
        </div>
    );
}