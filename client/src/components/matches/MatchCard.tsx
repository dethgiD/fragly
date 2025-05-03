// components/matches/MatchCard.tsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMapImageUrl, formatMapName } from '@/utils/mapImages';
// Import the modified rank utility and its type
import { getRankBadgeStyle, RankBadgeStyle } from '@/utils/rankUtils';

// --- Types (ensure PlayerStatEntry has rank: number | null) ---
type PlayerStatEntry = {
    id: string;
    playerId: string;
    matchId: string;
    steamId: string;
    username: string;
    teamNumber: number;
    rank: number | null; // Crucial: must allow null
    totalKills: number;
    totalDeaths: number;
};

type SteamMatchInfo = {
    id: string;
    mapUrl: string;
    reservationId: string | null;
} | null;

type MatchDetailsResponse = {
    id: string;
    matchId: string;
    mapName: string;
    team1Score: number;
    team2Score: number;
    playedAt: string;
    stats: PlayerStatEntry[];
    steamMatch: SteamMatchInfo;
};

type CurrentPlayerStats = {
    kills: number;
    deaths: number;
    teamNumber: number;
} | null;

type Match = {
    id: string;
    playedAt: string;
    team1Score: number;
    team2Score: number;
    mapName: string;
    steamMatch: SteamMatchInfo;
};

type MatchCardProps = {
    match: Match;
    currentUserId: string | null | undefined;
};

export default function MatchCard({ match, currentUserId }: MatchCardProps) {
    const [currentPlayerStats, setCurrentPlayerStats] = useState<CurrentPlayerStats>(null);
    const [averageRank, setAverageRank] = useState<number | null>(null);
    // State now holds only the style information
    const [rankBadgeStyle, setRankBadgeStyle] = useState<RankBadgeStyle | null>(null);
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState<string | null>(null);

    const mapImageUrl = getMapImageUrl(match.mapName);
    const isPremier = match.steamMatch != null;

    useEffect(() => {
        setCurrentPlayerStats(null);
        setAverageRank(null);
        setRankBadgeStyle(null); // Reset style state
        setStatsLoading(true);
        setStatsError(null);

        if (!currentUserId) {
            setStatsLoading(false);
            setStatsError("Could not identify current user.");
            return;
        }

        const fetchMatchDetails = async () => {
            try {
                const token = localStorage.getItem("fragly-token");
                if (!token) throw new Error("Not authenticated");

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${match.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch match details (${res.status})`);
                }

                const matchDetails: MatchDetailsResponse = await res.json();

                if (!matchDetails.stats || matchDetails.stats.length === 0) {
                   throw new Error("No player stats found for this match.");
                }

                const currentPlayer = matchDetails.stats.find(
                    (playerStat) => playerStat.steamId === currentUserId
                );

                if (currentPlayer) {
                    setCurrentPlayerStats({
                        kills: currentPlayer.totalKills,
                        deaths: currentPlayer.totalDeaths,
                        teamNumber: currentPlayer.teamNumber,
                    });
                } else {
                   setStatsError("Your stats not found in this match data.");
                }

                if (isPremier) {
                    let totalRank = 0;
                    let playerCountWithRank = 0;
                    matchDetails.stats.forEach(player => {
                        // Exclude null AND rank 0 or less
                        if (player.rank != null && player.rank > 0) {
                            totalRank += player.rank;
                            playerCountWithRank++;
                        }
                    });

                    if (playerCountWithRank > 0) {
                        const avgRank = totalRank / playerCountWithRank;
                        setAverageRank(avgRank);
                        // Get badge STYLE info based on the calculated average
                        setRankBadgeStyle(getRankBadgeStyle(avgRank));
                    } else {
                        console.warn(`Match ${match.id} is Premier but no valid player ranks (>0) found.`);
                        setAverageRank(null); // Ensure average is null if no valid ranks
                        setRankBadgeStyle(null);
                    }
                }

            } catch (err: any) {
                console.error(`Error processing match ${match.id}:`, err);
                setStatsError(err.message || "Error loading match data.");
                setCurrentPlayerStats(null);
                setAverageRank(null);
                setRankBadgeStyle(null);
            } finally {
                setStatsLoading(false);
            }
        };

        fetchMatchDetails();
    }, [match.id, currentUserId, isPremier]);

    const getResult = (): { text: string; color: string } => {
        if (!currentPlayerStats) return { text: 'N/A', color: 'text-neutral-500' };
        const { teamNumber } = currentPlayerStats;
        const { team1Score, team2Score } = match;
        if (team1Score === team2Score) return { text: 'Tie', color: 'text-neutral-400' };
        if (teamNumber === 2) return team1Score > team2Score ? { text: 'Win', color: 'text-green-400' } : { text: 'Loss', color: 'text-red-400' };
        if (teamNumber === 3) return team2Score > team1Score ? { text: 'Win', color: 'text-green-400' } : { text: 'Loss', color: 'text-red-400' };
        return { text: 'Unknown', color: 'text-neutral-500' };
    };

    const result = getResult();

    return (
        <Link href={`/matches/${match.id}`} className="block group" aria-label={`View match details for ${formatMapName(match.mapName)} played on ${new Date(match.playedAt).toLocaleDateString()}`}>
            <li
                className="relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-md transition-all duration-300 ease-in-out group-hover:border-sky-600/50 group-hover:shadow-lg group-hover:scale-[1.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.85), rgba(17, 24, 39, 0.95)), url(${mapImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            >
                <div className="p-4 sm:p-5 relative z-10">
                    <div className="flex justify-between items-start mb-3 gap-4">
                        <div className='flex-1 min-w-0'>
                            <p className="text-lg font-semibold text-white leading-tight truncate">
                                {formatMapName(match.mapName)}
                            </p>
                            <p className="text-xs text-neutral-400">
                                {new Date(match.playedAt).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}
                            </p>
                             {/* Premier Rank Badge Area - Updated */}
                             {!statsLoading && isPremier && rankBadgeStyle && averageRank != null && (
                                <div
                                    title={`Avg. Premier Rank: ${averageRank.toFixed(0)}`}
                                    // Apply styles using rankBadgeStyle
                                    className={`mt-2 inline-flex items-center rounded px-2.5 py-1 shadow-sm ${rankBadgeStyle.bgColor} ${rankBadgeStyle.textColor} border-l-4 ${rankBadgeStyle.borderColor}`}
                                >
                                    {/* Display the actual calculated average rank, formatted */}
                                    <span className="text-sm font-semibold leading-none">
                                        {averageRank.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                    </span>
                                </div>
                            )}
                            {/* Placeholder */}
                             {!statsLoading && isPremier && (!rankBadgeStyle || averageRank == null) && !statsError && (
                                 <div className="mt-2 inline-block h-7 w-16 animate-pulse bg-neutral-700 rounded"></div>
                             )}
                        </div>
                        <div className="text-right flex-shrink-0">
                            <p className={`text-xl font-bold ${result.color}`}>
                                {match.team1Score} : {match.team2Score}
                            </p>
                            <span className={`block text-xs font-normal text-center ${result.color}`}>
                                {result.text}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-neutral-700/50">
                         <p className="text-sm text-neutral-300 mb-1">Your Performance:</p>
                         {statsLoading ? (
                            <div className="flex items-center space-x-4">
                                <div className="h-5 w-16 bg-neutral-700 rounded animate-pulse"></div>
                                <div className="h-5 w-16 bg-neutral-700 rounded animate-pulse"></div>
                                {isPremier && <div className="mt-2 inline-block h-7 w-16 animate-pulse bg-neutral-700 rounded"></div>}
                            </div>
                         ) : statsError && !currentPlayerStats ? (
                             <p className="text-xs text-amber-400">{statsError}</p>
                         ) : currentPlayerStats ? (
                             <div className="flex items-center space-x-4">
                                 <p className="text-base font-medium text-white">
                                     K/D: <span className="text-sky-300">{currentPlayerStats.kills}</span> / <span className="text-sky-300">{currentPlayerStats.deaths}</span>
                                 </p>
                                 <p className="text-xs text-neutral-400">
                                     ({(currentPlayerStats.deaths === 0 ? currentPlayerStats.kills : (currentPlayerStats.kills / currentPlayerStats.deaths)).toFixed(2)})
                                 </p>
                             </div>
                         ) : (
                            <p className="text-xs text-neutral-500">Stats unavailable.</p>
                         )}
                         {!statsLoading && statsError && currentPlayerStats === null && (
                              <p className="text-xs text-amber-400 mt-1">{statsError}</p>
                         )}
                    </div>
                </div>
            </li>
        </Link>
    );
}