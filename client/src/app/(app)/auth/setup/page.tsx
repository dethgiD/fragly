"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import if needed for redirection on error

// Validation Regex Patterns
const GAME_AUTH_CODE_PATTERN = /^[A-Z0-9]{4}-[A-Z0-9]{5}-[A-Z0-9]{4}$/i; // Case-insensitive
const LAST_MATCH_CODE_PREFIX = "CSGO-";

export default function SetupAuthCodesPage() {
  const router = useRouter(); // Keep if you might redirect on critical errors

  // State for form inputs
  const [lastMatchCode, setLastMatchCode] = useState("");
  const [gameAuthCode, setGameAuthCode] = useState("");

  // State for validation errors
  const [lastMatchCodeError, setLastMatchCodeError] = useState<string | null>(null);
  const [gameAuthCodeError, setGameAuthCodeError] = useState<string | null>(null);

  // State for submission status and feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // State for auth token
  const [token, setToken] = useState<string | null>(null);

  // Get token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("fragly-token");
    if (!storedToken) {
      setSubmitMessage({ type: 'error', text: 'Authentication token not found. Please log in again.' });
      // Optionally redirect: router.replace('/login');
    }
    setToken(storedToken);
  }, [router]);

  // --- Validation Functions ---
  const validateLastMatchCode = useCallback((code: string): boolean => {
    if (!code) {
      setLastMatchCodeError("Last Match Code is required.");
      return false;
    }
    if (!code.startsWith(LAST_MATCH_CODE_PREFIX)) {
      setLastMatchCodeError(`Code must start with "${LAST_MATCH_CODE_PREFIX}".`);
      return false;
    }
    // Add more specific length/pattern checks if needed, e.g.:
    // const parts = code.split('-');
    // if (parts.length !== 6 || parts.some(part => part.length !== 5 && part !== 'CSGO')) { ... }
    setLastMatchCodeError(null);
    return true;
  }, []);

  const validateGameAuthCode = useCallback((code: string): boolean => {
    if (!code) {
      setGameAuthCodeError("Game Authentication Code is required.");
      return false;
    }
    if (!GAME_AUTH_CODE_PATTERN.test(code)) {
      setGameAuthCodeError("Format must be XXXX-XXXXX-XXXX (letters/numbers).");
      return false;
    }
    setGameAuthCodeError(null);
    return true;
  }, []);

  // --- Handlers ---
  const handleLastMatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setLastMatchCode(value);
    validateLastMatchCode(value); // Validate on change for immediate feedback
  };

  const handleGameAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to uppercase automatically for consistent format check
    const value = e.target.value.trim().toUpperCase();
    setGameAuthCode(value);
    validateGameAuthCode(value); // Validate on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null); // Clear previous submission messages

    // Final validation check before submitting
    const isLastMatchValid = validateLastMatchCode(lastMatchCode);
    const isGameAuthValid = validateGameAuthCode(gameAuthCode);

    if (!isLastMatchValid || !isGameAuthValid || !token || isSubmitting) {
        // Don't submit if validation fails, no token, or already submitting
        if (!token) setSubmitMessage({ type: 'error', text: 'Authentication required.' });
        return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            // Send original case for last match, uppercase for auth code
            lastMatchCode: lastMatchCode,
            gameAuthCode: gameAuthCode
        }),
      });

      const data = await res.json().catch(() => ({})); // Handle non-JSON responses gracefully

      if (res.ok) {
        setSubmitMessage({ type: 'success', text: 'Codes saved successfully! You can now sync matches.' });
        // Optionally clear fields or redirect after success
        // setLastMatchCode("");
        // setGameAuthCode("");
      } else {
        throw new Error(data.message || `Failed to save codes (${res.status})`);
      }
    } catch (error: any) {
      console.error("Settings update error:", error);
      setSubmitMessage({ type: 'error', text: `Error: ${error.message || "An unexpected error occurred."}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine if form is valid for enabling button
  const isFormValid = !lastMatchCodeError && !gameAuthCodeError && !!lastMatchCode && !!gameAuthCode;

  return (
    // Apply similar centering and background as other pages
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4">
      <div className="w-full max-w-lg p-8 bg-neutral-900 rounded-lg shadow-xl border border-neutral-700/50">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300 mb-3 text-center">
          Link Your CS2 Account
        </h1>
        <p className="text-neutral-400 text-sm mb-6 text-center leading-relaxed">
          To enable automatic match syncing, please provide your **Last Match Sharing Code** and your **Game Authentication Code** from the{" "}
          <a
            href="https://help.steampowered.com/en/wizard/HelpWithGameIssue/?appid=730&issueid=128" // More direct link if possible
            target="_blank"
            rel="noopener noreferrer" // Security best practice
            className="text-sky-400 hover:text-sky-300 underline transition duration-150"
          >
            Steam Support Game Authentication Page
          </a>{" "}
          (under CS:GO/CS2).
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Last Match Sharing Code */}
          <div>
            <label
              htmlFor="lastMatchCode"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Last Match Sharing Code <span className="text-red-500">*</span>
            </label>
            <input
              id="lastMatchCode"
              type="text"
              value={lastMatchCode}
              onChange={handleLastMatchChange}
              required
              className={`block w-full px-4 py-2 bg-neutral-800 border rounded-md shadow-sm placeholder-neutral-500 text-white focus:outline-none focus:ring-2 transition ${
                lastMatchCodeError
                  ? 'border-red-600 focus:ring-red-500 focus:border-red-500'
                  : 'border-neutral-600 focus:ring-sky-500 focus:border-sky-500'
              }`}
              placeholder="CSGO-xxxxx-xxxxx-xxxxx-xxxxx-xxxxx"
              aria-describedby="lastMatchCode-error" // Link error message for accessibility
              aria-invalid={!!lastMatchCodeError} // Indicate invalid state
            />
            {lastMatchCodeError && (
              <p id="lastMatchCode-error" className="mt-1 text-xs text-red-400">
                {lastMatchCodeError}
              </p>
            )}
          </div>

          {/* 2. Game Authentication Code */}
          <div>
            <label
              htmlFor="gameAuthCode"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Game Authentication Code <span className="text-red-500">*</span>
            </label>
            <input
              id="gameAuthCode"
              type="text"
              value={gameAuthCode}
              onChange={handleGameAuthChange}
              required
              className={`block w-full px-4 py-2 bg-neutral-800 border rounded-md shadow-sm placeholder-neutral-500 text-white focus:outline-none focus:ring-2 transition ${
                gameAuthCodeError
                  ? 'border-red-600 focus:ring-red-500 focus:border-red-500'
                  : 'border-neutral-600 focus:ring-sky-500 focus:border-sky-500'
              }`}
              placeholder="XXXX-XXXXX-XXXX"
              aria-describedby="gameAuthCode-error"
              aria-invalid={!!gameAuthCodeError}
            />
             {gameAuthCodeError && (
              <p id="gameAuthCode-error" className="mt-1 text-xs text-red-400">
                {gameAuthCodeError}
              </p>
            )}
          </div>

          {/* Submission Message Display */}
          {submitMessage && (
            <div className={`text-sm px-4 py-2 rounded-md border ${
              submitMessage.type === 'success'
                ? 'bg-green-900/30 border-green-700 text-green-300'
                : 'bg-red-900/30 border-red-700 text-red-300'
            }`}>
              {submitMessage.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isFormValid || !token} // Disable if submitting, invalid, or no token
            className={`w-full flex justify-center items-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-base font-medium
              ${!isFormValid || isSubmitting || !token
                ? 'bg-neutral-600 text-neutral-400 cursor-not-allowed'
                : 'bg-sky-500 text-black hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-sky-400'
              } transition duration-150 ease-in-out`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Codes'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}