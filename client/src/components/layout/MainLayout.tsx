"use client";

import Link from "next/link";
import React, { useEffect, useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    DocumentArrowUpIcon,
    Cog6ToothIcon,
    HomeIcon,
    ArrowLeftOnRectangleIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon
} from '@heroicons/react/24/outline';

const PROTECTED_ROUTES = ["/matches", "/upload", "/auth/setup", "/progress"];

const NAV_LINKS = [
  { href: "/", label: "Dashboard", icon: HomeIcon },
  { href: "/matches", label: "Matches", icon: ChartBarIcon },
  { href: "/progress", label: "Progress Report", icon: ArrowTrendingUpIcon },
  { href: "/upload", label: "Upload Demo", icon: DocumentArrowUpIcon },
  { href: "/auth/setup", label: "Settings", icon: Cog6ToothIcon },
];

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-neutral-300">
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span>Checking authentication...</span>
  </div>
);

const UnauthorizedState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white text-center px-4">
    <h1 className="text-2xl font-bold text-red-500 mb-3">Unauthorized Access</h1>
    <p className="text-base text-neutral-400 mb-6">You must be logged in to access this page.</p>
    <Link
      href="/"
      className="px-5 py-2 bg-sky-600 text-white font-medium rounded-md hover:bg-sky-500 transition-colors duration-150 shadow-sm"
    >
      Return to Home
    </Link>
  </div>
);

const NavLink = ({ href, icon: Icon, children, isActive, isCollapsed }: { href: string; icon: React.ElementType; children: React.ReactNode; isActive: boolean; isCollapsed: boolean }) => (
  <Link
    href={href}
    title={isCollapsed ? String(children) : undefined}
    className={`flex items-center px-3 py-2.5 rounded-md text-sm transition-all duration-200 group ${
      isActive
        ? "bg-neutral-800 text-sky-300 font-medium"
        : "text-neutral-300 hover:bg-neutral-800/50 hover:text-white"
    } ${isCollapsed ? 'justify-center' : ''}`}
  >
    <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-sky-400' : 'text-neutral-400 group-hover:text-neutral-300'} ${!isCollapsed ? 'mr-3' : ''}`} aria-hidden="true" />
    {!isCollapsed && <span className="truncate">{children}</span>}
  </Link>
);

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [hasMounted, setHasMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State for sidebar collapse
  const pathname = usePathname();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (href: string): boolean => {
    return pathname === href;
  };

  if (!hasMounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

  if (!isAuthenticated && isProtectedRoute) {
    return <UnauthorizedState />;
  }

   if (!isAuthenticated && !isProtectedRoute) {
       return <>{children}</>;
   }

  return (
    <div className="flex min-h-screen text-neutral-200 bg-neutral-950">
        <aside
            className={`sticky top-0 hidden md:flex flex-col flex-shrink-0
              h-screen
              bg-neutral-900 border-r border-neutral-800
              transition-all duration-300 ease-in-out
              ${isCollapsed ? 'w-20' : 'w-64'}`}
          >
            <div className={`flex items-center h-16 flex-shrink-0 px-4 border-b border-neutral-800 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isCollapsed && (
                    <Link href="/" className="inline-block text-xl font-bold text-sky-400 hover:text-sky-300 transition-colors">
                        Fragly
                    </Link>
                )}
                 <button
                    onClick={toggleSidebar}
                    title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                >
                     {isCollapsed ? <ChevronDoubleRightIcon className="h-5 w-5" /> : <ChevronDoubleLeftIcon className="h-5 w-5" />}
                </button>
            </div>

            <nav className={`flex-1 mt-4 px-2 space-y-1.5 overflow-y-auto overflow-x-hidden`}>
                {NAV_LINKS.map((item) => (
                    <NavLink key={item.label} href={item.href} icon={item.icon} isActive={isActive(item.href)} isCollapsed={isCollapsed}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className={`mt-auto p-2 border-t border-neutral-800/50`}>
                <button
                    onClick={handleLogout}
                    title={isCollapsed ? "Logout" : undefined}
                    className={`flex items-center w-full text-left px-3 py-2.5 rounded-md text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors group ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <ArrowLeftOnRectangleIcon className={`h-5 w-5 flex-shrink-0 text-red-500 group-hover:text-red-400 ${!isCollapsed ? 'mr-3' : ''}`} aria-hidden="true" />
                     {!isCollapsed && <span className="truncate">Logout</span>}
                </button>
            </div>
        </aside>

      <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${isAuthenticated ? (isCollapsed ? 'md:ml-20' : 'md:ml-64') : 'w-full'}`}>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}