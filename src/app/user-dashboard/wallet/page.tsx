
"use client"

import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const transactions = [
  { id: "tx1", date: "Oct 25, 2023", description: "Payment for 'Landing Page Design'", amount: 1500, type: "Income" },
  { id: "tx2", date: "Oct 22, 2023", description: "Withdrawal to Bank Account", amount: -2000, type: "Withdrawal" },
  { id: "tx3", date: "Oct 15, 2023", description: "Bonus: Early Completion", amount: 200, type: "Income" },
];

export default function UserWalletPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your earnings and payout history.</p>
        </div>
        <Button className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Withdraw Funds
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border shadow-none bg-primary text-primary-foreground overflow-hidden relative">
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Wallet className="h-32 w-32" />
          </div>
          <CardHeader>
            <CardTitle className="text-sm font-medium uppercase tracking-widest opacity-80">Total Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-4xl font-bold">$4,250.00</div>
            <p className="text-xs opacity-70">Available for immediate withdrawal</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Recent Earnings Summary</CardTitle>
            <CardDescription>Your financial performance over the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase mb-1">Total Income</p>
                <p className="text-2xl font-bold text-emerald-900">$1,700.00</p>
              </div>
              <ArrowUpRight className="h-8 w-8 text-emerald-500 opacity-40" />
            </div>
            <div className="p-4 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-rose-700 uppercase mb-1">Total Withdrawals</p>
                <p className="text-2xl font-bold text-rose-900">$2,000.00</p>
              </div>
              <ArrowDownRight className="h-8 w-8 text-rose-500 opacity-40" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5" />
              Transaction History
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-xs uppercase font-bold text-muted-foreground">Export CSV</Button>
        </CardHeader>
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-none">
              <TableHead className="font-bold py-4">Description</TableHead>
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="text-right font-bold pr-6">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="font-medium py-4">{tx.description}</TableCell>
                <TableCell className="text-muted-foreground text-xs">{tx.date}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={tx.amount > 0 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-rose-600 bg-rose-50 border-rose-100"}>
                    {tx.type}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right pr-6 font-bold ${tx.amount > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}.00
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
