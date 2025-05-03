"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Renamed for clarity
  const [isSubmitting, setIsSubmitting] = useState(false); // For submission state
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null); // Store token locally

  // Get token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("fragly-token");
    if (!storedToken) {
      // If no token, shouldn't be here ideally. Redirect or show error.
      setErrorMessage("Authentication token not found. Please log in again.");
      setIsLoading(false);
      // Consider redirecting: router.replace('/login');
      return;
    }
    setToken(storedToken);
  }, [router]); // Added router dependency

  // Fetch profile data once token is confirmed
  useEffect(() => {
    if (!token) {
      // Don't fetch if token wasn't found in the first effect
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true); // Ensure loading state is true while fetching
      setErrorMessage(null); // Clear previous errors
      try {
        const res = await fetch("/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          // Handle invalid/expired token specifically
          setErrorMessage("Your session seems invalid. Please log in again.");
          // Consider clearing token and redirecting
          localStorage.removeItem("fragly-token");
          // router.replace('/login');
          setIsLoading(false);
          return;
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch user profile (${res.status})`);
        }

        const userData = await res.json();
        setDisplayName(userData.displayName || "");
        setEmail(userData.email || "");
      } catch (error: any) {
        console.error("Error fetching profile data:", error);
        setErrorMessage(error.message || "Error fetching profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]); // Depend on token state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || isSubmitting) return; // Prevent submit if no token or already submitting

    setIsSubmitting(true);
    setErrorMessage(null); // Clear previous errors

    try {
      const res = await fetch("/api/auth/complete-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, displayName }),
      });

      if (!res.ok) {
         // Try to get error message from response body
        let errorData;
        try {
            errorData = await res.json();
        } catch (_) {
             // Ignore if response is not JSON
        }
        throw new Error(errorData?.message || `Failed to update profile (${res.status})`);
      }

      // Profile updated successfully, now trigger auth check in context *if possible*
      // Since this page is outside (app), calling useAuth() directly might not work
      // unless AuthProvider wraps the *entire* app in the root layout.
      // If AuthProvider only wraps (app), the state won't update automatically here.
      // The redirect to "/" which *is* in (app) will trigger the check anyway.
      router.push("/"); // Redirect to home

    } catch (error: any) {
      console.error("Profile update error:", error);
      setErrorMessage(error.message || "Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="flex items-center space-x-2">
           {/* Simple Spinner */}
          <svg className="animate-spin h-5 w-5 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading profile...</span>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4">
      <div className="w-full max-w-md p-8 bg-neutral-900 rounded-lg shadow-xl border border-neutral-700/50">
        <h1 className="text-2xl font-bold text-sky-300 mb-2 text-center">
          Almost There!
        </h1>
        <p className="text-neutral-400 text-sm mb-6 text-center">
          Please provide a display name and email address to complete your registration.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Display Name Input */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required // Add basic HTML validation
              className="block w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-md shadow-sm placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              placeholder="Choose a unique name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required // Add basic HTML validation
              className="block w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded-md shadow-sm placeholder-neutral-500 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              placeholder="you@example.com"
            />
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-2 rounded-md text-sm">
               {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !token} // Disable if submitting or no token
            className={`w-full flex justify-center items-center px-6 py-2.5 border border-transparent rounded-md shadow-sm text-base font-medium 
              ${isSubmitting || !token
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
              'Save and Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}