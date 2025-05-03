"use client";

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any; // Replace 'any' with your actual user type if available
  checkAuth: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start loading until check is done
  const [user, setUser] = useState<any>(null); // Store user data if needed
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem("fragly-token");

    if (token) {
      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const userData = await res.json();
          setIsAuthenticated(true);
          setUser(userData); // Store user data
        } else {
          // Token exists but is invalid/expired
          localStorage.removeItem("fragly-token");
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("fragly-token");
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      // No token
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
  }, []); // No dependencies needed for the function definition itself

  // Run checkAuth on initial mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // checkAuth is memoized by useCallback

  const logout = () => {
    localStorage.removeItem("fragly-token");
    setIsAuthenticated(false);
    setUser(null);
    // Optionally redirect on logout, or let consuming components handle it
    // router.push('/'); // Maybe redirect from the component calling logout
    console.log("User logged out via context");
    router.push('/');
  };

  // Re-check auth if the token potentially changes (e.g., after login elsewhere)
  // This listens to storage events, which works across tabs/windows but maybe not
  // reliably within the same tab immediately after setting the item.
  // Calling checkAuth() manually after login is usually more reliable.
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
        if (event.key === "fragly-token") {
            console.log("Token changed in storage, re-checking auth...");
            checkAuth();
        }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};