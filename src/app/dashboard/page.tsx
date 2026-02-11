
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
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <p className="flex-1">
                    <span className="font-semibold text-foreground">New worker verification request</span> from Mark Johnson.
                  </p>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
              ))}
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
