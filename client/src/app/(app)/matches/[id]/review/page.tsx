"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { PlayerScore } from "@/types/player-score";
import { motion } from "framer-motion";
// Assuming utils are correctly imported, INCLUDING getPerformanceLabel
import { getPillarDescription, formatStatName, getStatAdvice, pillarIcons, getPerformanceLabel, getPillarExplanation } from "@/utils/reviewUtils";

// --- Type Definitions ---
// Updated for Labels instead of Formatted Z-Score string
type ProcessedPerformanceDiff = {
  key: string;
  name: string;
  zScoreValue: number;        // Keep numeric value for tooltips/logic
  label: string;              // User-friendly label (e.g., "Excellent")
  colorClass: string;         // Tailwind color class for the label
  improvementTip: string | null;
};

type PlayerReviewData = {
    playerScoreData: PlayerScore;
    topStrengths: ProcessedPerformanceDiff[];
    areasForImprovement: ProcessedPerformanceDiff[];
};

// --- Helper Functions ---
// Keep these for tooltips and the main score display
const safeToFixed = (num: number | undefined | null, digits: number, defaultValue: string = 'N/A'): string => {
    if (typeof num === 'number' && !isNaN(num)) return num.toFixed(digits);
    return defaultValue;
};
const formatZScore = (value: number | undefined | null, digits: number = 1, defaultValue: string = 'N/A'): string => {
    if (typeof value === 'number' && !isNaN(value)) {
        const fixedValue = value.toFixed(digits);
        const numValue = parseFloat(fixedValue);
        return `${numValue >= 0 ? '+' : ''}${fixedValue}σ`;
    }
    return defaultValue;
};


export default function ReviewPage() {
  // --- Hooks ---
  const params = useParams();
  const matchId = params?.id as string;
  const router = useRouter();
  const { isAuthenticated, user: authenticatedUser } = useAuth();

  // --- State ---
  const [allPlayerScores, setAllPlayerScores] = useState<PlayerScore[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [playerReviewDetails, setPlayerReviewDetails] = useState<PlayerReviewData | null>(null);

  // --- Fetch Logic (useCallback) ---
  const loadReviewData = useCallback(async (currentMatchId: string, currentUserSteamId: string, token: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setPlayerReviewDetails(null);
    console.log(`Fetching review data for match: ${currentMatchId}`);
    try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matches/${currentMatchId}/scores`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(`Fetch response status: ${response.status}`);
        if (!response.ok) {
            if (response.status === 401) throw new Error("Authentication failed (401). Please log in again.");
            if (response.status === 404) throw new Error("Review data not found for this match (404).");
            const errorText = await response.text().catch(() => `Status ${response.status}`);
            throw new Error(`Failed to load review (${response.status}): ${errorText}`);
        };

        const fetchedScores: PlayerScore[] = await response.json();
        console.log("Fetched scores:", fetchedScores);
        if (!Array.isArray(fetchedScores)) {
            throw new Error("API response is not a valid list of player scores.");
        }
        setAllPlayerScores(fetchedScores);

        const currentUserScoreData = fetchedScores.find(
            (score) => score && typeof score === 'object' && score.steamId === currentUserSteamId
        );

        if (!currentUserScoreData) {
             if (fetchedScores.length > 0) {
                 console.warn("Current user score data not found. User SteamID:", currentUserSteamId);
                 throw new Error("Your specific score data was not found in this match review.");
             } else {
                 throw new Error("No player score data available for this match.");
             }
        } else {
             console.log("Found current user score data:", currentUserScoreData);
             const diffsData = currentUserScoreData.diffs ?? {};
             const performanceDiffs = Object.entries(diffsData)
               .map(([statKey, diffValue]) => ({
                   key: statKey, value: (typeof diffValue === 'number' && !isNaN(diffValue)) ? diffValue : 0
               }))
               .sort((a, b) => b.value - a.value);

             // --- Process Diffs with Labels (INSTEAD OF ZScoreFormatted) ---
             const processedDiffs: ProcessedPerformanceDiff[] = performanceDiffs.map(({ key, value }) => {
               const { label, colorClass } = getPerformanceLabel(value); // Get label and color HERE
               return {
                 key: key,
                 name: formatStatName(key),
                 zScoreValue: value,    // Keep numeric value
                 label: label,          // Store the descriptive label
                 colorClass: colorClass,// Store the color class
                 improvementTip: getStatAdvice(key, value),
               };
             });
             // --- End Processing ---

             console.log("Processed diffs with labels:", processedDiffs);
             setPlayerReviewDetails({
               playerScoreData: currentUserScoreData,
               topStrengths: processedDiffs.slice(0, 2).filter(d => d.zScoreValue > 0.15),
               areasForImprovement: processedDiffs.slice(-2).reverse().filter(d => d.zScoreValue < -0.15),
             });
             setErrorMessage(null);
         }
    } catch (error: any) {
        console.error("Error loading or processing review:", error);
        setErrorMessage(error.message || "An unknown error occurred while loading the review.");
        setPlayerReviewDetails(null);
    } finally {
        console.log("Setting loading to false.");
        setIsLoading(false);
    }
  }, []); // End useCallback

  // --- Effect Hook ---
  useEffect(() => {
    if (!matchId) { setErrorMessage("Match ID is missing from URL."); setIsLoading(false); return; }
    if (!isAuthenticated || !authenticatedUser?.steamId) { if (!isLoading) router.replace("/auth/setup"); return; }
    const token = localStorage.getItem("fragly-token");
    if (!token) { setErrorMessage("Authentication token not found. Please log in."); setIsLoading(false); return; }
    loadReviewData(matchId, authenticatedUser.steamId, token);
  }, [matchId, isAuthenticated, authenticatedUser, loadReviewData, router, isLoading]);


  // --- Summary Generation Logic (useCallback) ---
  const generateSummary = useCallback(() => {
     // This remains mostly the same, as it uses Pillar labels from getPillarDescription
     if (!playerReviewDetails?.playerScoreData) return "Performance summary unavailable.";

     const { playerScoreData } = playerReviewDetails;
     const pillars = playerScoreData.pillars ?? {};
     const bucket = playerScoreData.bucket ?? 'N/A';

     if (Object.keys(pillars).length === 0) {
          return `Your overall performance was rated ${bucket.toLowerCase()} compared to others in this match. Detailed pillar breakdown is unavailable.`;
     }

     // Use getPillarDescription which should return descriptive labels now
     const pillarDetails = Object.entries(pillars).map(([key, score]) => {
          const scoreNum = (typeof score === 'number' && !isNaN(score)) ? score : 0;
          // Assuming getPillarDescription returns { label: "Excellent", ... } etc.
          return { key: key, name: formatStatName(key).toLowerCase(), score: scoreNum, description: getPillarDescription(scoreNum) };
      });

    const groupedPillars: { [label: string]: string[] } = {};
     pillarDetails.forEach(p => {
         const label = p.description.label; // Get the label ("Excellent", "On Par", "Weak")
         if (!groupedPillars[label]) groupedPillars[label] = [];
         groupedPillars[label].push(p.name);
     });

    const listFormatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
    let summaryParts: string[] = [];
     summaryParts.push(`Your overall performance was rated ${bucket.toLowerCase()} compared to others in this match.`);

    // Define levels based on EXPECTED LABELS from getPillarDescription
    // ** Make sure these keys match the 'label' strings returned by getPillarDescription **
    const elite = groupedPillars["Elite"] || [];
    const excellent = groupedPillars["Excellent"] || [];
    const good = groupedPillars["Good"] || [];
    // Add other positive labels if defined in getPillarDescription (e.g., "Strong", "Solid")
    // const strong = groupedPillars["Strong"] || [];
    // const solid = groupedPillars["Solid"] || [];

     const positiveMentions: string[] = [];
     if (elite.length > 0) positiveMentions.push(`elite in ${listFormatter.format(elite)}`);
     if (excellent.length > 0) positiveMentions.push(`excellent in ${listFormatter.format(excellent)}`);
     if (good.length > 0) positiveMentions.push(`good in ${listFormatter.format(good)}`);
     // if (strong.length > 0) positiveMentions.push(`strong in ${listFormatter.format(strong)}`);
     // if (solid.length > 0) positiveMentions.push(`solid in ${listFormatter.format(solid)}`);


    if (positiveMentions.length > 0) {
        summaryParts.push(`You performed particularly well in ${listFormatter.format(positiveMentions)} relative to the lobby.`);
    }

    // Define negative levels based on EXPECTED LABELS from getPillarDescription
    // ** Make sure these keys match the 'label' strings returned by getPillarDescription **
    const veryWeak = groupedPillars["Very Weak"] || [];
    const weak = groupedPillars["Weak"] || [];
    // Add other negative labels if defined (e.g., "Poor", "Needs Work", "Struggling")
    // const poor = groupedPillars["Poor"] || [];
    // const needsWork = groupedPillars["Needs Work"] || [];
    // const struggling = groupedPillars["Struggling"] || [];

     const negativeMentions: string[] = [];
     if (veryWeak.length > 0) negativeMentions.push(`very weak in ${listFormatter.format(veryWeak)}`);
     if (weak.length > 0) negativeMentions.push(`weak in ${listFormatter.format(weak)}`);
     // if (poor.length > 0) negativeMentions.push(`poor in ${listFormatter.format(poor)}`);
     // if (needsWork.length > 0) negativeMentions.push(`needing work in ${listFormatter.format(needsWork)}`);
     // if (struggling.length > 0) negativeMentions.push(`struggling in ${listFormatter.format(struggling)}`);


    if (negativeMentions.length > 0) {
         const prefix = positiveMentions.length > 0 ? "However, you were also " : "You were ";
         summaryParts.push(`${prefix}${listFormatter.format(negativeMentions)} compared to the lobby average.`);
    }

    const onPar = groupedPillars["On Par"] || []; // Or "Average" if that's the label used
    if (onPar.length > 0) {
        const totalPillars = pillarDetails.length;
        if (onPar.length === totalPillars && positiveMentions.length === 0 && negativeMentions.length === 0) {
             summaryParts = [`Your overall performance was rated ${bucket.toLowerCase()} compared to others in this match.`, `All key pillar areas were on par with the lobby average.`];
        } else if (positiveMentions.length > 0 || negativeMentions.length > 0) {
            summaryParts.push(`Performance in ${listFormatter.format(onPar)} was about average for the match.`);
        } else if(onPar.length > 0 && onPar.length < totalPillars) {
             summaryParts.push(`Performance in ${listFormatter.format(onPar)} was about average for the match.`);
         }
    }

    return summaryParts.join(' ');
  }, [playerReviewDetails]); // Depend only on the data


  // --- Conditional Returns ---
  if (isLoading) {
    return <div className="p-8 text-center text-neutral-400 animate-pulse">Loading game review…</div>;
  }
  if (errorMessage) {
    return (
        <div className="p-8 text-center">
            <p className="text-red-400 mb-4">Error loading review: {errorMessage}</p>
            {matchId && ( <Link href={`/matches/${matchId}`} className="text-sky-400 hover:underline">Back to Match Details</Link> )}
            <button onClick={() => window.location.reload()} className={`px-3 py-1 bg-sky-600 hover:bg-sky-500 rounded text-white text-sm ${matchId ? 'ml-4' : ''}`}>Retry</button>
        </div>
    );
  }
  if (!playerReviewDetails) {
    return <div className="p-8 text-center text-neutral-400">Review data could not be prepared. Please check back later.</div>;
  }

  // --- Data Destructuring and Final JSX ---
  const { playerScoreData, topStrengths, areasForImprovement } = playerReviewDetails;
  const finalSummary = generateSummary();

  // Animation variants
   const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
   const itemVariants = { hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 15 } } };

  return (
    <motion.div
      className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto text-neutral-200"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-6">
          <Link href={`/matches/${matchId ?? '#'}`} className="inline-flex items-center text-sky-400 hover:text-sky-300 transition-colors mb-4 text-sm">
              ← Back to Match Details
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Game Review</h1>
      </motion.div>

      {/* Overall Performance Summary */}
      <motion.div variants={itemVariants} className="bg-gradient-to-br from-neutral-800 via-neutral-800 to-neutral-700 p-5 md:p-6 rounded-xl shadow-lg mb-8 border border-neutral-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
              <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-1">{playerScoreData.bucket}</h2>
                  <p className="text-sm uppercase text-neutral-400 tracking-wider">Overall Performance Rating</p>
              </div>          
          </div>
          <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              {finalSummary}
          </p>
      </motion.div>

      {/* Performance Pillars */}
      <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Performance Pillars</h3>
          {playerScoreData?.pillars && Object.keys(playerScoreData.pillars).length > 0 ? (
              <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {Object.entries(playerScoreData.pillars).map(([pillarKey, pillarScoreValue]) => {
                      const scoreNum = (typeof pillarScoreValue === 'number' && !isNaN(pillarScoreValue)) ? pillarScoreValue : 0;
                      // Use updated getPillarDescription
                      const { label: pillarLabel, colorClass: pillarColorClass, borderClass } = getPillarDescription(scoreNum);
                      const pillarNameFormatted = formatStatName(pillarKey);
                      const pillarIcon = pillarKey in pillarIcons ? pillarIcons[pillarKey as keyof typeof pillarIcons] : '📊';
                      const pillarExplanationText = getPillarExplanation(pillarKey as keyof typeof getPillarExplanation);
                      return (
                        <motion.div
                          key={pillarKey}
                          variants={itemVariants}
                          className={`bg-neutral-800 p-4 rounded-lg shadow border-l-4 ${borderClass} flex flex-col justify-between transition-all duration-150 hover:shadow-md hover:-translate-y-1`}
                        >
                            <div className="flex items-center mb-2">
                               <span className="text-2xl mr-3" aria-hidden="true">{pillarIcon}</span>
                               <h4 className="text-lg font-medium text-neutral-100">{pillarNameFormatted}</h4>
                            </div>
                             {/* DISPLAY PILLAR LABEL */}
                             <p className={`text-xl font-semibold ${pillarColorClass}`}>{pillarLabel}</p>

                            {/* ADD EXPLANATION TEXT - Added mt-2 for spacing */}
                            <p className="text-xs text-neutral-400 mt-2">
                                {pillarExplanationText}
                            </p>
                        </motion.div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-neutral-500 mt-3 text-center italic">Pillars rated relative to others in this match.</p>
              </>
          ) : (
               <motion.div variants={itemVariants} className="text-neutral-400 text-center italic bg-neutral-800 p-4 rounded-lg">
                   Pillar performance data is unavailable for this match.
               </motion.div>
          )}
      </motion.div>

      {/* Strengths and Weaknesses - USING LABELS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strengths */}
          <motion.div variants={itemVariants} className="bg-neutral-800 p-5 rounded-lg shadow border border-neutral-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-green-400 mr-2">▲</span> Top Strengths
              </h3>
              <p className="text-xs text-neutral-400 mb-3 italic">Your highest performing stats compared to others in this match.</p>
              {topStrengths.length > 0 ? (
                  <ul className="space-y-3">
                      {topStrengths.map((strength) => (
                          <li key={strength.key}>
                              <div className="flex justify-between items-center gap-2">
                                  <span className="font-medium text-neutral-100 flex-shrink">{strength.name}</span>
                                  {/* Display LABEL with COLOR */}
                                  <span
                                      className={`font-semibold whitespace-nowrap ${strength.colorClass}`}
                                      title={`Score: ${formatZScore(strength.zScoreValue, 2)} (relative to match average)`}
                                  >
                                      {strength.label}
                                  </span>
                              </div>
                        
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-neutral-400 italic">No stats stood out significantly above the match average.</p>
              )}
          </motion.div>

          {/* Areas for Improvement */}
          <motion.div variants={itemVariants} className="bg-neutral-800 p-5 rounded-lg shadow border border-neutral-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-red-400 mr-2">▼</span> Areas for Improvement
              </h3>
              <p className="text-xs text-neutral-400 mb-3 italic">Your lowest performing stats compared to others in this match.</p>
              {areasForImprovement.length > 0 ? (
                  <ul className="space-y-4">
                      {areasForImprovement.map((improvementArea) => (
                          <li key={improvementArea.key}>
                              <div className="flex justify-between items-center mb-1 gap-2">
                                  <span className="font-medium text-neutral-100 flex-shrink">{improvementArea.name}</span>
                                  {/* Display LABEL with COLOR */}
                                  <span
                                      className={`font-semibold whitespace-nowrap ${improvementArea.colorClass}`}
                                      title={`Score: ${formatZScore(improvementArea.zScoreValue, 2)} (relative to match average)`}
                                  >
                                      {improvementArea.label}
                                  </span>
                              </div>
                              {improvementArea.improvementTip && (
                                  <p className="text-sm text-yellow-300 bg-yellow-900/30 px-2 py-1 rounded border border-yellow-700/50 mt-1">
                                      💡 <span className="font-medium">Tip:</span> {improvementArea.improvementTip}
                                  </p>
                              )}
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p className="text-neutral-400 italic">No stats stood out significantly below the match average.</p>
              )}
          </motion.div>
      </motion.div>

      {/* Concluding remark */}
      <motion.div variants={itemVariants} className="mt-8 text-center text-neutral-500 text-xs italic">
          Performance is evaluated relative to the players in this specific match.
      </motion.div>

    </motion.div>
  );
}