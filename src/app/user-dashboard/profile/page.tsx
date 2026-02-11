
"use client"

import React, { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Calendar, MapPin, Plus, X, Camera, Save, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';

export default function UserProfilePage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const workerRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'workers', user.uid);
  }, [firestore, user?.uid]);

  const { data: profile, isLoading } = useDoc(workerRef);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    professionalSummary: '',
    skills: [] as string[]
  });
  const [newSkill, setNewSkill] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      // Generate a dynamic summary if one doesn't exist
      const generatedSummary = profile.professionalSummary || 
        (profile.primaryRole && profile.skills?.length 
          ? `${profile.primaryRole} with expertise in ${profile.skills.slice(0, 5).join(', ')}. Passionate about building high-quality solutions.` 
          : '');

      setFormData({
        name: profile.name || '',
        location: profile.location?.city || '', // Showing city as a simple location string
        professionalSummary: generatedSummary,
        skills: profile.skills || []
      });
    }
  }, [profile]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSave = () => {
    if (!workerRef) return;
    setIsSaving(true);
    
    // Simplistic update for location city
    const updateData = {
      name: formData.name,
      professionalSummary: formData.professionalSummary,
      skills: formData.skills,
      location: {
        ...(profile?.location || {}),
        city: formData.location
      }
    };

    updateDocumentNonBlocking(workerRef, updateData);
    
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your professional information has been saved successfully.",
      });
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const userInitials = formData.name.substring(0, 2).toUpperCase() || user?.email?.substring(0, 2).toUpperCase() || 'TR';

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
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg mx-auto bg-accent flex items-center justify-center">
                <AvatarFallback className="text-3xl font-bold">{userInitials}</AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-1 right-1 h-8 w-8 rounded-full shadow-md">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-bold">{formData.name || 'Set your name'}</h3>
              <p className="text-sm text-muted-foreground">{profile?.primaryRole || 'Set your role'}</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Badge variant="secondary" className="justify-center bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none font-bold">
                {profile?.verified ? 'VERIFIED WORKER' : 'PROFILE ACTIVE'}
              </Badge>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Calendar className="h-3 w-3" />
                Member since 2026
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
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" value={user?.email || ''} disabled />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location (City)</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="location" 
                    className="pl-9" 
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Summary</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell clients about your background and expertise..." 
                  className="min-h-[120px] resize-none text-sm"
                  value={formData.professionalSummary}
                  onChange={(e) => setFormData({...formData, professionalSummary: e.target.value})}
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
                {formData.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="pl-3 pr-1 py-1.5 flex items-center gap-2 bg-muted text-foreground border shadow-none"
                  >
                    {skill}
                    <button 
                      type="button"
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
              <Button onClick={handleSave} disabled={isSaving} className="ml-auto flex items-center gap-2">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Profile Changes
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
