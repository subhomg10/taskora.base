
"use client"

import React from 'react';
import { 
  Briefcase, 
  Users, 
  CheckCircle2, 
  ClipboardList,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

const stats = [
  {
    title: "Total Jobs Posted",
    value: "1,284",
    icon: Briefcase,
    change: "+12.5%",
    trend: "up"
  },
  {
    title: "Total Workers Registered",
    value: "8,492",
    icon: Users,
    change: "+8.2%",
    trend: "up"
  },
  {
    title: "Total Tasks Completed",
    value: "45,219",
    icon: CheckCircle2,
    change: "+14.1%",
    trend: "up"
  },
  {
    title: "Total Applications",
    value: "12,943",
    icon: ClipboardList,
    change: "-2.4%",
    trend: "down"
  }
];

export default function DashboardOverview() {
  const firestore = useFirestore();

  const activityLogsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'activityLogs'), orderBy('timestamp', 'desc'), limit(5));
  }, [firestore]);

  const { data: activityLogs, isLoading } = useCollection(activityLogsQuery);

  const getActivityMessage = (log: any) => {
    switch (log.actionType) {
      case 'login':
        return <><span className="font-semibold text-foreground">{log.userName}</span> just logged in.</>;
      case 'job_application':
        return <><span className="font-semibold text-foreground">{log.userName}</span> {log.details.toLowerCase()}.</>;
      case 'verification_request':
        return <><span className="font-semibold text-foreground">{log.userName}</span> submitted a verification request.</>;
      default:
        return <><span className="font-semibold text-foreground">{log.userName}</span> performed an action.</>;
    }
  };
  
  const dummyActivities = [
      { id: 'd1', userName: 'Priya Sharma', actionType: 'verification_request', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
      { id: 'd2', userName: 'John Smith', actionType: 'job_application', details: 'Applied for "UI/UX Designer"', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
      { id: 'd3', userName: 'Aarav Patel', actionType: 'login', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { id: 'd4', userName: 'Emily White', actionType: 'verification_request', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) },
  ];

  const combinedLogs = [...(activityLogs || [])]
    .sort((a, b) => (b.timestamp?.toDate?.() || b.timestamp) - (a.timestamp?.toDate?.() || a.timestamp))
    .slice(0, 5);

  const displayLogs = (activityLogs && activityLogs.length > 0) ? combinedLogs : dummyActivities;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-muted-foreground">Platform health and key performance indicators.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center mt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-500 text-xs font-medium" : "text-rose-500 text-xs font-medium"}>
                  {stat.change}
                </span>
                <span className="text-[10px] text-muted-foreground ml-1 uppercase">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions or Secondary Info */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading && [1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <p className="flex-1 bg-muted h-4 w-3/4 rounded-md animate-pulse"></p>
                  <span className="text-xs bg-muted h-3 w-1/4 rounded-md animate-pulse"></span>
                </div>
              ))}
              {!isLoading && displayLogs.map((log: any) => (
                <div key={log.id} className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <p className="flex-1 text-muted-foreground">
                    {getActivityMessage(log)}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {log.timestamp ? formatDistanceToNow(log.timestamp.toDate ? log.timestamp.toDate() : log.timestamp, { addSuffix: true }) : ''}
                  </span>
                </div>
              ))}
               {!isLoading && displayLogs.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No recent activity.</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Platform Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span>Server Uptime</span>
                  <span className="text-foreground">99.9%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[99.9%]" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span>Verification Backlog</span>
                  <span className="text-foreground">12 Cases</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-amber-500 w-[35%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
