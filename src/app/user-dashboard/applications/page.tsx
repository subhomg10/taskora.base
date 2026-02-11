"use client"

import React from 'react';
import { ClipboardList, ExternalLink, Clock, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const myApplications = [
  {
    id: "app1",
    jobTitle: "Senior Software Engineer",
    appliedDate: "Oct 24, 2025",
    status: "Selected",
    company: "Techora Systems",
    totalPayout: "₹28,00,000",
    tenure: "12 Months"
  },
  {
    id: "app2",
    jobTitle: "UI/UX Designer",
    appliedDate: "Oct 20, 2025",
    status: "Applied",
    company: "Creative Studio",
    totalPayout: "₹8,50,000",
    tenure: "6 Months"
  }
];

export default function UserApplicationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">Track the status of your submitted job proposals.</p>
      </div>

      <div className="grid gap-4">
        {myApplications.length > 0 ? myApplications.map((app) => (
          <Card key={app.id} className="border shadow-none hover:bg-muted/30 transition-colors">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg">{app.jobTitle}</h3>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">{app.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Applied on {app.appliedDate}
                  </span>
                  <span className="font-medium text-foreground">Total Payout: {app.totalPayout} ({app.tenure})</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="text-xs">
                  Withdraw
                </Button>
                <Button size="sm" className="text-xs">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/20">
            <ClipboardList className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
            <p className="text-muted-foreground font-medium">No applications found.</p>
            <Button variant="link" className="mt-2 text-primary">Browse Jobs</Button>
          </div>
        )}
      </div>
    </div>
  );
}
