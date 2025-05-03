"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from '@/context/AuthContext'; // <-- Import useAuth

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { checkAuth } = useAuth(); // <-- Get checkAuth from context

  useEffect(() => {
    // Wrap the logic in an async function to use await
    const handleAuthCallback = async () => {
      const token = params.get("token");
      console.log("Token received on callback:", token);

      if (token) {
        // 1. Store the token
        localStorage.setItem("fragly-token", token);

        // 2. ***Crucial: Notify AuthContext to update state***
        //    This will fetch /api/auth/me with the new token and update
        //    isAuthenticated, user, etc. globally.
        try {
          await checkAuth(); // Wait for the check to complete
        } catch (error) {
           // Even if checkAuth fails (e.g., network error), proceed to redirect.
           // The AuthProvider handles setting isAuthenticated to false in case of error.
           console.error("Error during checkAuth on callback:", error);
        }


        // 3. Decode token locally *only* to check needsSetup for immediate redirect
        //    (The actual auth validation is done by checkAuth)
        let needsSetup = false; // Default value
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          needsSetup = payload.needsSetup === true; // Ensure boolean comparison
        } catch (err) {
          // If decoding fails here, it suggests a malformed token was somehow stored.
          // checkAuth likely already failed or would fail.
          console.error("Error decoding token payload locally:", err);
          // Optional: Redirect to an error page, but checkAuth might have already handled state
          // router.replace("/?error=invalid_token_payload");
          // return; // Stop further processing if decoding fails
        }

        // 4. Redirect based on needsSetup
        if (needsSetup) {
          console.log("Redirecting to complete profile...");
          router.replace("/auth/complete-profile");
        } else {
          console.log("Redirecting to dashboard...");
          router.replace("/");
        }

      } else {
        // No token found in URL params
        console.log("No token found in URL, redirecting with error...");
        router.replace("/?error=missing_token");
      }
    };

    handleAuthCallback();

    // Add checkAuth to the dependency array. It's memoized via useCallback in the context provider.
  }, [params, router, checkAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <p>Processing login...</p> {/* Updated text slightly */}
    </div>
  );
}