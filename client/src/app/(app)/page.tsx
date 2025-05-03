"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';
import SteamLoginButton from "@/components/auth/SteamLoginButton"; // Assuming this path is correct

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  // Simplified Action Button component for the dashboard
  const ActionButton = ({ href, icon: Icon, children }: { href: string, icon: React.ElementType, children: React.ReactNode }) => (
    <Link
      href={href}
      className="group flex flex-col items-center justify-center p-6 bg-neutral-800/60 rounded-lg border border-neutral-700/80 hover:bg-neutral-700/80 hover:border-sky-600/60 transition-all duration-200 ease-in-out transform hover:-translate-y-1 shadow-md hover:shadow-lg"
    >
      <Icon className="h-8 w-8 mb-3 text-sky-400 group-hover:text-sky-300 transition-colors" />
      <span className="text-sm font-medium text-neutral-200 group-hover:text-white text-center">{children}</span>
    </Link>
  );

  return (
    // Remove outer div with flex, centering, min-h-screen, and padding.
    // The content will now flow within the padded area provided by MainLayout.
    <div className="w-full max-w-3xl mx-auto"> {/* Center content horizontally with max-width */}

      {/* Logo/Title Area */}
      <div className="text-center mb-10 md:mb-12">
        {/* Optional: Placeholder for a logo */}
        {/* <img src="/logo.svg" alt="Fragly Logo" className="h-12 w-auto mx-auto mb-4" /> */}
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Fragly
          </span>
        </h1>
        <p className="text-lg text-neutral-400">
          Your CS2 Analysis Hub
        </p>
      </div>

      <div className="w-full p-6 md:p-8 bg-neutral-900 rounded-xl shadow-xl border border-neutral-800">
        {isAuthenticated ? (
          // --- Logged In State ---
          <div className="space-y-8 text-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-neutral-100">
                Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
              </h2>
              <p className="text-neutral-400 text-base">Ready to dive into your stats?</p>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              <ActionButton href="/matches" icon={ChartBarIcon}>
                View Matches
              </ActionButton>
              <ActionButton href="/progress" icon={ArrowTrendingUpIcon}>
                Track Progress
              </ActionButton>
              <ActionButton href="/upload" icon={DocumentArrowUpIcon}>
                Upload Demo
              </ActionButton>
            </div>
          </div>
        ) : (
          // --- Logged Out State ---
          <div className="space-y-8 text-center">
             <div>
                <h2 className="text-2xl font-semibold mb-2 text-neutral-100">
                    Unlock Your Potential
                </h2>
                <p className="text-neutral-400 text-base max-w-md mx-auto">
                    Analyze your Counter-Strike 2 performance, visualize trends, and identify areas for improvement.
                </p>
            </div>

            {/* Login Call to Action */}
            <div className="pt-4">
                <p className="text-lg text-neutral-300 mb-4">
                Connect with Steam to get started.
                </p>
                <SteamLoginButton />
                <p className="text-xs text-neutral-500 pt-5">
                    We utilize Steam for secure authentication only. Your credentials are never stored.
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}