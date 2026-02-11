
"use client"

import React from 'react';
import { ClipboardList, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const StatusBadge = ({ status }: { status: string }) => {
  const variant: "default" | "secondary" | "destructive" | "outline" =
    status === "Applied" ? "secondary" :
    status === "Selected" ? "default" :
    status === "Withdrawn" ? "destructive" :
    "outline";
  
  const color = 
    status === 'Selected' ? 'bg-emerald-100 text-emerald-700' :
    status === 'Withdrawn' ? 'bg-rose-100 text-rose-700' :
    status === 'Rejected' ? 'bg-rose-100 text-rose-700' : '';

  return (
    <Badge variant={variant} className={`text-[10px] font-bold uppercase tracking-wider border-none ${color}`}>
      {status}
    </Badge>
  );
};


export default function UserApplicationsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const applicationsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(collection(firestore, 'workers', user.uid, 'applications'), orderBy('appliedAt', 'desc'));
  }, [firestore, user?.uid]);

  const { data: myApplications, isLoading } = useCollection(applicationsQuery);

  const handleWithdraw = async (applicationId: string) => {
    if (!user || !firestore) return;
    const appRef = doc(firestore, 'workers', user.uid, 'applications', applicationId);
    try {
        await updateDoc(appRef, { status: 'Withdrawn' });
        toast({
            title: "Application Withdrawn",
            description: "You have withdrawn your application.",
        });
    } catch (error) {
        console.error("Error withdrawing application: ", error);
        toast({
            variant: 'destructive',
            title: "Error",
            description: "Could not withdraw application. Please try again.",
        });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">Track the status of your submitted job proposals.</p>
      </div>

      <div className="grid gap-4">
        {isLoading && (
          [1, 2].map(i => (
            <Card key={i} className="border shadow-none">
              <CardContent className="p-6 flex items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="h-9 w-24 rounded-md" />
              </CardContent>
            </Card>
          ))
        )}
        
        {!isLoading && myApplications && myApplications.length > 0 ? myApplications.map((app: any) => (
          <Card key={app.id} className="border shadow-none hover:bg-muted/30 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{app.jobTitle}</h3>
                  <StatusBadge status={app.status} />
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Applied on {app.appliedAt?.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <span className="font-medium text-foreground">Total Payout: {app.totalPayout} ({app.tenure})</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleWithdraw(app.id)}
                  disabled={app.status !== 'Applied'}
                >
                  {app.status === 'Applied' ? 'Withdraw' : 'Withdrawn'}
                </Button>
                <Button size="sm" className="text-xs">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/20">
              <ClipboardList className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground font-medium">No applications found.</p>
              <Button variant="link" className="mt-2 text-primary">Browse Jobs</Button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
