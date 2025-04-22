"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

const TABS = ["General", "Accuracy", "Positioning"];

export default function MatchDetailPage() {
  const params = useParams();
  const matchId = params?.id as string;

  const [match, setMatch] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("General");

  useEffect(() => {
    fetch(`/api/matches/${matchId}`)
      .then((res) => res.json())
      .then((data) => setMatch(data))
      .catch(console.error);
  }, [matchId]);

  if (!match) return <div className="text-neutral-200 p-6">Loading...</div>;

  const team1 = match.stats.filter((p: any) => p.teamNumber === 2);
  const team2 = match.stats.filter((p: any) => p.teamNumber === 3);

  const renderStatRow = (player: any) => {
    const general = [
      player.totalKills,
      player.totalDeaths,
      (player.totalKills / (player.totalDeaths || 1)).toFixed(2),
    ];
    const accuracy = [
      player.accuracy.toFixed(1),
      player.accuracySpotted.toFixed(1),
      player.hsAccuracy.toFixed(1),
      (player.timeToDamage * 1000).toFixed(0) + "ms",
      player.crosshairPlacement.toFixed(1),
      (player.counterStrafing * 100).toFixed(1),
    ];
    const positioning = [
      player.openingKills,
      player.tradeKills,
      player.tradeKillPercentage.toFixed(2),
      player.tradedDeathPercentage.toFixed(2),
      player.multiKillRounds,
      player.multiKillPercentage.toFixed(2),
    ];

    const rows: Record<string, (string | number)[]> = {
      General: general,
      Accuracy: accuracy,
      Positioning: positioning,
    };

    return (
      <tr key={player.id} className="border-t border-neutral-700 text-center">
        <td className="p-2 text-sky-300 font-semibold font-sans text-left w-48">{player.username}</td>
        {rows[activeTab].map((stat, i) => (
          <td key={i} className="p-2 text-neutral-200 font-sans whitespace-nowrap">{stat}</td>
        ))}
      </tr>
    );
  };

  const renderTable = (team: any[], teamLabel: string) => (
    <div className="bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-sky-800 px-4 py-2 font-bold text-white font-sans">{teamLabel}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-neutral-800">
            <tr className="text-center">
              <th className="p-2 text-sky-300 font-sans text-left w-48">Player</th>
              {activeTab === "General" && (
                <>
                  <th className="p-2 text-sky-300 font-sans">Total Kills</th>
                  <th className="p-2 text-sky-300 font-sans">Total Deaths</th>
                  <th className="p-2 text-sky-300 font-sans">Kill/Death Ratio</th>
                </>
              )}
              {activeTab === "Accuracy" && (
                <>
                  <th className="p-2 text-sky-300 font-sans">Accuracy %</th>
                  <th className="p-2 text-sky-300 font-sans">Spotted Accuracy %</th>
                  <th className="p-2 text-sky-300 font-sans">Headshot Accuracy %</th>
                  <th className="p-2 text-sky-300 font-sans">Time to Damage</th>
                  <th className="p-2 text-sky-300 font-sans">Crosshair Placement °</th>
                  <th className="p-2 text-sky-300 font-sans">Counter Strafing</th>
                </>
              )}
              {activeTab === "Positioning" && (
                <>
                  <th className="p-2 text-sky-300 font-sans">Opening Kills</th>
                  <th className="p-2 text-sky-300 font-sans">Trade Kills</th>
                  <th className="p-2 text-sky-300 font-sans">Trade Kill %</th>
                  <th className="p-2 text-sky-300 font-sans">Traded Deaths %</th>
                  <th className="p-2 text-sky-300 font-sans">Multi-Kill Rounds</th>
                  <th className="p-2 text-sky-300 font-sans">Multi-Kill %</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>{team.map(renderStatRow)}</tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-neutral-950 min-h-screen text-white px-4 py-6 space-y-6 font-sans">
      <h1 className="text-2xl font-bold text-sky-400 mb-1">Match Details</h1>
      <p className="text-sm text-sky-200">
        {new Date(match.playedAt).toLocaleString()} — Final Score: {match.team1Score} - {match.team2Score}
      </p>

      <div className="flex gap-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              "px-4 py-2 text-sm rounded-full border font-sans",
              activeTab === tab
                ? "bg-sky-400 text-black border-sky-400"
                : "bg-neutral-800 text-sky-300 border-neutral-700 hover:bg-neutral-700"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {renderTable(team1, "Team 2")}
        {renderTable(team2, "Team 3")}
      </div>
    </div>
  );
}
