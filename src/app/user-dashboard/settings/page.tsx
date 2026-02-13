"use client"

import React from 'react';
import { Bell, Shield, Globe, Lock, EyeOff, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function UserSettingsPage() {
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} preferences have been updated.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your dashboard preferences and security.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how you want to be notified about new jobs and payments.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">New Job Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified when a new task matches your skills.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Payment Confirmed</Label>
                <p className="text-xs text-muted-foreground">Receive instant alerts when a client pays your invoice.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Marketing Updates</Label>
                <p className="text-xs text-muted-foreground">Occasional news about platform features and tips.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
          <CardFooter className="bg-muted/5 py-4 flex justify-end">
            <Button size="sm" onClick={() => handleSave('Notification')}>Save Preferences</Button>
          </CardFooter>
        </Card>

        <Card className="border shadow-none">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Keep your account secure and manage access permissions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-pw">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input id="current-pw" type="password" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-pw">New Password</Label>
                <Input id="new-pw" type="password" />
              </div>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-dashed flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <EyeOff className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-bold">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground leading-tight">Add an extra layer of protection to your account.</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">Enable</Button>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/5 py-4 flex justify-end">
            <Button size="sm" onClick={() => handleSave('Security')}>Update Password</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
