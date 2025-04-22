"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SteamLoginButton from "@/components/auth/SteamLoginButton";

export default function Home() {
  const [user, setUser] = useState<{ userId: string; steamId: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("fragly-token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-4 font-sans">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-sky-400">Welcome to Fragly</h1>
        <p className="text-lg text-sky-200 max-w-xl mx-auto">
          Analyze your CS2 demos and gain insights into your aim and positioning.
        </p>

        {user ? (
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/matches"
              className="px-6 py-3 rounded-lg bg-sky-400 text-black font-semibold text-lg hover:bg-sky-300 transition"
            >
              View My Matches
            </Link>
            <Link
              href="/upload"
              className="px-6 py-3 rounded-lg border border-sky-400 text-sky-400 font-semibold text-lg hover:bg-sky-800 transition"
            >
              Upload a Match
            </Link>
          </div>
        ) : (
          <div className="mt-8">
            <SteamLoginButton />
          </div>
        )}
      </div>
    </div>
  );
}