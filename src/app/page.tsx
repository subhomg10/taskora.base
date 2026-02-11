"use client"
 
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function Home() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    console.log("AUTH USER OBJECT:", user);
    console.log("AUTH UID:", user?.uid);
    console.log("AUTH EMAIL:", user?.email);
  }, [user]);


  const workerRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'workers', user.uid);
  }, [firestore, user?.uid]);

  const { data: workerProfile, isLoading: isProfileLoading } = useDoc(workerRef);

  useEffect(() => {
    if (!isUserLoading && !isProfileLoading) {
      if (!user) {
        router.replace('/login');
        return;
      }

      // Admin logic
      if (user.email === 'subhomghosh06@gmail.com') {
        router.replace('/dashboard');
        return;
      }

      // Worker profile completion check
      // If we have profile data and it's completed, go to dashboard
      if (workerProfile?.profileCompleted) {
        router.replace('/user-dashboard');
      } else {
        // Otherwise, they need to set up their profile
        router.replace('/profile-setup');
      }
    }
  }, [user, isUserLoading, workerProfile, isProfileLoading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
