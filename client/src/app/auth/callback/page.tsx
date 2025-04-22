"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    console.log("Token received:", token);
    if (token) {
      localStorage.setItem("fragly-token", token);
      router.replace("/");
    } else {
      router.replace("/?error=missing_token");
    }
  }, [params, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-black">
      <p>Logging you in...</p>
    </div>
  );
}
