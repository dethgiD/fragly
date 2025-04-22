"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Match = {
  id: string;
  matchId: string;
  playedAt: string;
  team1Score: number;
  team2Score: number;
};

export default function HomePage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching matches:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="p-6 text-white font-sans">Loading matches...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-10 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-400 mb-6">Your Analyzed Matches</h1>

      <ul className="space-y-4">
        {matches.map((match) => (
          <li
            key={match.id}
            className="p-4 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors"
          >
            <Link href={`/matches/${match.id}`}>
              <div className="space-y-1 cursor-pointer">
                <p className="text-sm text-sky-200">
                  {new Date(match.playedAt).toLocaleString()}
                </p>
                <p className="text-lg font-medium text-white">
                  Match Hash: <span className="text-sky-400">{match.matchId.slice(0, 8)}...</span>
                </p>
                <p className="text-sm text-gray-400">
                  Score: {match.team1Score} - {match.team2Score}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
