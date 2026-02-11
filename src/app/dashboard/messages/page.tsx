
"use client"

import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Messages</h1>
        <p className="text-muted-foreground">Direct communications with workers and partners.</p>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[450px] rounded-xl border-2 border-dashed bg-muted/20 text-center p-12 shadow-inner">
        <div className="h-20 w-20 rounded-full bg-primary/5 flex items-center justify-center mb-6">
          <MessageSquare className="h-10 w-10 text-primary opacity-20" />
        </div>
        <h3 className="text-xl font-semibold italic text-foreground/80">Your inbox is quiet</h3>
        <p className="text-sm text-muted-foreground max-w-md mt-3 leading-relaxed">
          There are no active conversations at the moment. You can start a new secure chat channel by selecting "Contact" on any worker profile or job application.
        </p>
      </div>
    </div>
  );
}
