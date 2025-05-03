"use client";
import { useState, useEffect } from "react";
import { ArrowPathIcon } from '@heroicons/react/24/solid'; // Or ArrowSyncIcon, etc.

// Define props, adding isPrimary for visual hierarchy
type SyncButtonProps = {
  onSuccess?: () => void;
  isPrimary?: boolean; // To make it stand out more if needed (e.g., on empty state)
  className?: string; // Allow passing extra classes for layout
};

export default function SyncButton({ onSuccess, isPrimary = false, className = '' }: SyncButtonProps) {
  const [loading, setLoading] = useState(false);
  // Store message type along with text for styling
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Clear message after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000); // Clear after 5 seconds
      return () => clearTimeout(timer); // Cleanup timer on unmount or if message changes
    }
  }, [message]);

  const syncMatches = async () => {
    console.log("🔄 Sync button clicked");
    setLoading(true);
    setMessage(null); // Clear previous message immediately

    const token = localStorage.getItem("fragly-token");
    if (!token) {
      setMessage({ type: 'error', text: '❌ Error: Not logged in.' });
      setLoading(false);
      return;
    }

    try {
      // Construct URL safely
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }
      const syncUrl = `${apiUrl}/matches/sync`;
      console.log(`Attempting to sync via: ${syncUrl}`);

      const res = await fetch(syncUrl, {
        method: "GET", // Usually GET for triggering a sync, but could be POST
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json' // Add if it were a POST with body
        },
      });

      // Attempt to parse JSON regardless of status code for potential error messages
      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        // Handle cases where the response is not JSON (e.g., server error page)
        console.error("Failed to parse JSON response:", e);
        if (!res.ok) {
          // If response failed and wasn't JSON, throw generic error based on status
          throw new Error(`Sync failed with status ${res.status}`);
        }
        // If response was ok but not JSON (unlikely for an API), treat as success but maybe log warning
        console.warn("Sync response was OK but not valid JSON.");
      }


      if (res.ok) {
        // Access data safely with optional chaining and default values
        const syncedCount = (data as any)?.syncedMatches?.length ?? 0;
        setMessage({ type: 'success', text: `✅ Synced ${syncedCount} new match${syncedCount !== 1 ? 'es' : ''}.` });
        onSuccess?.(); // Call the success callback if provided
      } else {
        // Prioritize error message from API response body
        const errorMessage = (data as any)?.message || `Sync failed with status ${res.status}`;
        setMessage({ type: 'error', text: `❌ Error: ${errorMessage}` });
      }
    } catch (err: any) {
      console.error("Sync fetch error:", err);
      // Display caught error message
      setMessage({ type: 'error', text: `❌ Error: ${err.message || "Failed to sync matches."}` });
    } finally {
      setLoading(false);
    }
  };

  // Define base and conditional styles
  const baseStyles = "inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 transition ease-in-out duration-150 disabled:opacity-60 disabled:cursor-not-allowed";

  const primaryStyles = "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500";
  const secondaryStyles = "bg-neutral-700 text-neutral-100 hover:bg-neutral-600 focus:ring-neutral-500";

  return (
    // Render button directly, allow parent to control layout via className prop
    // Also render the message right after the button
    <div className={`flex flex-col items-end ${className}`}> {/* Wrapper to keep message aligned with button */}
        <button
            type="button" // Explicit type
            onClick={syncMatches}
            disabled={loading}
            className={`${baseStyles} ${isPrimary ? primaryStyles : secondaryStyles}`}
        >
            {loading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Syncing...
                </>
            ) : (
                 <>
                    <ArrowPathIcon className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
                    Sync Matches
                </>
            )}
        </button>

        {/* Feedback Message */}
        {/* Use transition for smooth appearance/disappearance */}
        <div className="h-5 mt-1"> {/* Reserve space for message to prevent layout shift */}
            {message && (
                <p
                    className={`text-xs transition-opacity duration-300 ${
                        message.type === 'success' ? 'text-green-400' : 'text-red-400'
                    }`}
                    role="status" // Announce changes to screen readers
                >
                    {message.text}
                </p>
            )}
        </div>
    </div>
  );
}