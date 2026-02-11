
"use client"

import React, { useState } from 'react';
import { User, Mail, Briefcase, Calendar, MapPin, Plus, X, Camera, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function UserProfilePage() {
  const [skills, setSkills] = useState(['React', 'Next.js', 'TypeScript', 'UI Design']);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your professional information has been saved successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Professional Profile</h1>
        <p className="text-muted-foreground">Manage your identity and showcase your expertise to clients.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-1 border shadow-none h-fit sticky top-24">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="relative inline-block group">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg mx-auto">
                <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-1 right-1 h-8 w-8 rounded-full shadow-md">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Professional Developer</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Badge variant="secondary" className="justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none font-bold">
                VERIFIED WORKER
              </Badge>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Calendar className="h-3 w-3" />
                Joined Oct 2023
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card className="border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="worker@taskora.com" disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="location" className="pl-9" defaultValue="San Francisco, CA" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Summary</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell clients about your background and expertise..." 
                  className="min-h-[120px] resize-none"
                  defaultValue="Full-stack developer with 5+ years of experience building modern web applications. Specialized in React and high-performance backend systems."
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">Skills & Expertise</CardTitle>
              <CardDescription>Add the technologies and services you offer.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <Input 
                  placeholder="Add a skill (e.g. AWS, Python)..." 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <Button type="submit" variant="secondary" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </form>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="pl-3 pr-1 py-1.5 flex items-center gap-2 bg-muted text-foreground border shadow-none"
                  >
                    {skill}
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="h-4 w-4 rounded-full hover:bg-foreground/10 flex items-center justify-center transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/5 py-4">
              <Button onClick={handleSave} className="ml-auto flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Profile Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
