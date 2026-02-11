
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserSidebarNav } from "@/components/user-dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { ShieldCheck } from "lucide-react"
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const workerRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'workers', user.uid);
  }, [firestore, user?.uid]);

  const { data: workerProfile, isLoading: isProfileLoading } = useDoc(workerRef);

  useEffect(() => {
    // Only perform redirection logic once auth and profile loading states are settled
    if (!isUserLoading && !isProfileLoading) {
      if (!user) {
        router.replace('/login');
      } else if (user.email === 'subhomghosh06@gmail.com') {
        router.replace('/dashboard');
      } else if (!workerProfile?.profileCompleted) {
        // If the profile isn't marked as completed, send them back to setup
        router.replace('/profile-setup');
      }
    }
  }, [user, isUserLoading, workerProfile, isProfileLoading, router]);

  // Show loading while we determine the user's destination
  if (isUserLoading || isProfileLoading || (!user || (!workerProfile?.profileCompleted && user.email !== 'subhomghosh06@gmail.com'))) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r bg-card hidden md:block">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>Taskora</span>
          </div>
        </div>
        <UserSidebarNav />
      </aside>

      <div className="flex flex-1 flex-col md:pl-64">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
