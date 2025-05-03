// app/(app)/layout.tsx
"use client"; // Necessary because MainLayout uses client hooks

import MainLayout from '@/components/layout/MainLayout'; // Adjust the import path to where your MainLayout.tsx lives
                                                      // e.g., '../components/layout/MainLayout' or similar

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // This layout component simply wraps its children (the pages within the (app) group)
  // with your MainLayout. MainLayout itself will use the AuthContext.
  return <MainLayout>{children}</MainLayout>;
}