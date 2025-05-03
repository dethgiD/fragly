"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import SyncButton from "@/components/button/SyncButton";
import MatchCard from "@/components/matches/MatchCard";
import { useAuth } from "@/context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Match = {
  id: string;
  matchId: string;
  playedAt: string;
  team1Score: number;
  team2Score: number;
  mapName: string;
  steamMatch: { id: string; mapUrl: string; reservationId: string | null } | null; // Updated to match actual structure
};

export default function MatchesPage() {
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const [showPremierOnly, setShowPremierOnly] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("fragly-token");
    if (!token) {
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch matches (${res.status})`);
      }
      const data = await res.json();
      const sortedMatches = data.sort((a: Match, b: Match) =>
        new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()
      );
      setAllMatches(sortedMatches);
    } catch (err: any) {
      console.error("Error fetching matches:", err);
      setError(err.message || "Failed to load matches.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const filteredMatches = useMemo(() => {
    return allMatches.filter(match => {
      const matchDate = new Date(match.playedAt);
      const isPremierMatch = !showPremierOnly || match.steamMatch != null; // Updated condition
      const isAfterStartDate = !startDate || matchDate >= startDate;
      const isBeforeEndDate = !endDate || matchDate <= new Date(endDate.setHours(23, 59, 59, 999));

      return isPremierMatch && isAfterStartDate && isBeforeEndDate;
    });
  }, [allMatches, showPremierOnly, startDate, endDate]);

  const resetFilters = () => {
    setShowPremierOnly(false);
    setStartDate(null);
    setEndDate(null);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ul className="space-y-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <li key={i} className="h-40 w-full bg-neutral-800 rounded-lg animate-pulse"></li>
          ))}
        </ul>
      );
    }

    if (error) {
      return <p className="mt-6 text-center text-red-400">{error}</p>;
    }

    if (allMatches.length === 0) {
      return (
        <div className="mt-6 text-center py-10 px-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
           <p className="text-lg text-neutral-300 mb-4">No matches analyzed yet.</p>
           <p className="text-sm text-neutral-400 mb-6">Click the "Sync Matches" button to fetch your latest games.</p>
           <SyncButton onSuccess={fetchMatches}/>
        </div>
      );
    }

    if (filteredMatches.length === 0) {
        return <p className="mt-6 text-center text-neutral-400">No matches found matching your filters.</p>;
    }

    const currentUserId = user?.steamId;

    return (
      <ul className="space-y-4 mt-6">
        {filteredMatches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            currentUserId={currentUserId}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-sky-300">Your Matches</h1>
            {!loading && !error && allMatches.length > 0 && (
                <SyncButton onSuccess={fetchMatches} />
            )}
        </div>

        {allMatches.length > 0 && (
            <div className="bg-neutral-800/60 p-4 rounded-lg border border-neutral-700 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <div className="flex items-center space-x-2 justify-center sm:justify-start">
                        <input
                            type="checkbox"
                            id="premierFilter"
                            checked={showPremierOnly}
                            onChange={(e) => setShowPremierOnly(e.target.checked)}
                            className="h-4 w-4 rounded border-neutral-600 bg-neutral-700 text-sky-500 focus:ring-sky-600 focus:ring-offset-neutral-800"
                        />
                        <label htmlFor="premierFilter" className="text-sm font-medium text-neutral-300">
                            Premier Only
                        </label>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="startDate" className="block text-xs font-medium text-neutral-400 mb-1">Start Date</label>
                        <DatePicker
                             selected={startDate}
                             onChange={(date: Date | null) => setStartDate(date)}
                             selectsStart
                             startDate={startDate}
                             endDate={endDate}
                             isClearable
                             placeholderText="Any"
                             dateFormat="yyyy-MM-dd"
                             className="w-full bg-neutral-700 border border-neutral-600 rounded-md shadow-sm py-1.5 px-3 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 placeholder-neutral-400"
                         />
                    </div>

                    <div className="flex flex-col">
                         <label htmlFor="endDate" className="block text-xs font-medium text-neutral-400 mb-1">End Date</label>
                         <DatePicker
                             selected={endDate}
                             onChange={(date: Date | null) => setEndDate(date)}
                             selectsEnd
                             startDate={startDate}
                             endDate={endDate}
                             isClearable
                             placeholderText="Any"
                             dateFormat="yyyy-MM-dd"
                             className="w-full bg-neutral-700 border border-neutral-600 rounded-md shadow-sm py-1.5 px-3 text-sm text-neutral-200 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 placeholder-neutral-400"
                         />
                    </div>

                     <div className="flex justify-center md:justify-end">
                         <button
                             onClick={resetFilters}
                             className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-neutral-300 bg-neutral-700 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-neutral-500 transition-colors"
                         >
                             Reset Filters
                         </button>
                     </div>
                </div>
            </div>
        )}

        {renderContent()}
    </div>
  );
}