"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Link as LinkIcon, 
  ArrowRight, 
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const STEPS = [
  { id: 'personal', title: 'Personal', icon: User },
  { id: 'education', title: 'Professional', icon: GraduationCap },
  { id: 'role', title: 'Interests', icon: Briefcase },
  { id: 'skills', title: 'Expertise', icon: Wrench },
  { id: 'portfolio', title: 'Links', icon: LinkIcon },
];

const DEGREES = [
  "B.Tech", "B.E.", "BCA", "B.Sc", "M.Tech", "MCA", "M.Sc", 
  "B.Com", "M.Com", "B.A.", "M.A.", "MBA", "PhD", "Other"
];

const SEMESTERS = [
  "1st Semester", "2nd Semester", "3rd Semester", "4th Semester", 
  "5th Semester", "6th Semester", "7th Semester", "8th Semester", 
  "Completed"
];

const ROLE_CATEGORIES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Android Developer",
  "iOS Developer",
  "Web Developer",
  "Game Developer",
  "Software Engineer",
  "Data Scientist",
  "DevOps Engineer",
  "UI/UX Designer",
  "Graphic Designer",
  "PPT Designer",
  "Video Editor",
  "Photo Editor",
  "Photographer",
  "Other"
];

const TECH_SKILLS = {
  languages: ["C", "C++", "C#", "Python", "Java", "Rust", "Go", "PHP", "Ruby", "Swift", "Kotlin", "TypeScript"],
  frontend: ["HTML", "CSS", "JS", "React", "Next", "Tailwind", "Angular", "Vue", "Svelte", "Redux", "Zustand"],
  backend: ["Node", "Express", "Django", "Flask", "Spring", "FastAPI", "Laravel", "Ruby on Rails"],
  database: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle", "SQLite"],
  devops: ["Git", "Docker", "Linux", "AWS", "GCP", "Azure", "Kubernetes", "CI/CD"],
  creative: ["Canva", "Photoshop", "Illustrator", "Figma", "Premiere Pro", "After Effects", "DaVinci", "Lightroom", "PowerPoint", "Blender", "Unity", "Unreal Engine"]
};

export default function ProfileSetupPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({
    id: '',
    email: '',
    name: '',
    phone: '',
    username: '',
    profileType: 'Student',
    location: { country: '', state: '', city: '', pinCode: '' },
    currentStatus: 'College',
    statusDetails: {
      collegeName: '', degree: '', branch: '', semester: '',
      companyName: '', role: '', years: ''
    },
    primaryRole: '',
    skills: [],
    experienceLevel: 'Beginner',
    yearsOfExperience: 0,
    portfolio: { github: '', linkedin: '', portfolioUrl: '' },
    availability: 'Full-time',
    profileCompleted: false
  });

  const workerRef = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return doc(firestore, 'workers', user.uid);
  }, [firestore, user?.uid]);

  const { data: existingProfile } = useDoc(workerRef);

  useEffect(() => {
    if (user) {
      setFormData((prev: any) => ({
        ...prev,
        id: user.uid,
        email: user.email || prev.email
      }));
    }
  }, [user]);

  useEffect(() => {
    if (existingProfile) {
      setFormData((prev: any) => ({ ...prev, ...existingProfile }));
    }
  }, [existingProfile]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      if (workerRef) {
        setDocumentNonBlocking(workerRef, formData, { merge: true });
      }
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!workerRef) return;
    setIsSubmitting(true);
    try {
      const finalData = { ...formData, profileCompleted: true };
      // Explicitly set the document and wait for it before redirecting
      await setDoc(workerRef, finalData, { merge: true });
      toast({ title: "Profile Completed", description: "Welcome to Taskora!" });
      // Direct replacement of route to the user dashboard
      router.replace('/user-dashboard');
    } catch (error: any) {
      toast({ variant: "destructive", title: "Setup Error", description: error.message });
      setIsSubmitting(false);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter((s: string) => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  if (isUserLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const isDeveloper = formData.primaryRole.toLowerCase().includes('developer') || 
                      formData.primaryRole.toLowerCase().includes('engineer') ||
                      formData.primaryRole === 'Software Engineer' ||
                      formData.primaryRole === 'Data Scientist';

  const isCreative = formData.primaryRole.toLowerCase().includes('designer') || 
                     formData.primaryRole.toLowerCase().includes('editor') || 
                     formData.primaryRole === 'Photographer';

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Complete Your Profile</h1>
          <p className="text-muted-foreground">Join the Taskora professional community.</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex flex-col items-center gap-1">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors ${idx <= currentStep ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'}`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle>{STEPS[currentStep].title} Information</CardTitle>
            <CardDescription>Step {currentStep + 1} of {STEPS.length}</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {currentStep === 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={user?.email || ''} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Profile Type</Label>
                  <Select value={formData.profileType} onValueChange={(val) => setFormData({...formData, profileType: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Working Professional">Working Professional</SelectItem>
                      <SelectItem value="Freelancer">Freelancer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Current Status</Label>
                  <Select value={formData.currentStatus} onValueChange={(val) => setFormData({...formData, currentStatus: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="College">In College</SelectItem>
                      <SelectItem value="Job">Working a Job</SelectItem>
                      <SelectItem value="Freelancer">Full-time Freelancer</SelectItem>
                      <SelectItem value="Unemployed">Searching for Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.currentStatus === 'College' ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 space-y-2">
                      <Label>College Name</Label>
                      <Input value={formData.statusDetails.collegeName} onChange={(e) => setFormData({...formData, statusDetails: {...formData.statusDetails, collegeName: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Select value={formData.statusDetails.degree} onValueChange={(val) => setFormData({...formData, statusDetails: {...formData.statusDetails, degree: val}})}>
                        <SelectTrigger><SelectValue placeholder="Select Degree" /></SelectTrigger>
                        <SelectContent>
                          {DEGREES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Semester</Label>
                      <Select value={formData.statusDetails.semester} onValueChange={(val) => setFormData({...formData, statusDetails: {...formData.statusDetails, semester: val}})}>
                        <SelectTrigger><SelectValue placeholder="Select Semester" /></SelectTrigger>
                        <SelectContent>
                          {SEMESTERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : formData.currentStatus === 'Job' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 space-y-2">
                      <Label>Company Name</Label>
                      <Input value={formData.statusDetails.companyName} onChange={(e) => setFormData({...formData, statusDetails: {...formData.statusDetails, companyName: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input value={formData.statusDetails.role} onChange={(e) => setFormData({...formData, statusDetails: {...formData.statusDetails, role: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Years of Experience</Label>
                      <Input type="number" value={formData.statusDetails.years} onChange={(e) => setFormData({...formData, statusDetails: {...formData.statusDetails, years: e.target.value}})} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Role of Interest</Label>
                  <Select value={formData.primaryRole} onValueChange={(val) => setFormData({...formData, primaryRole: val})}>
                    <SelectTrigger><SelectValue placeholder="Select a path" /></SelectTrigger>
                    <SelectContent>
                      {ROLE_CATEGORIES.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select value={formData.experienceLevel} onValueChange={(val) => setFormData({...formData, experienceLevel: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="Intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="Advanced">Advanced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                <div className="grid gap-6">
                  {isDeveloper && (
                    <>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase text-muted-foreground">Languages</Label>
                        <div className="flex flex-wrap gap-2">
                          {TECH_SKILLS.languages.map(skill => (
                            <Badge key={skill} variant={formData.skills.includes(skill) ? "default" : "outline"} className="cursor-pointer py-1.5 px-3" onClick={() => toggleSkill(skill)}>{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase text-muted-foreground">Frontend Stack</Label>
                        <div className="flex flex-wrap gap-2">
                          {TECH_SKILLS.frontend.map(skill => (
                            <Badge key={skill} variant={formData.skills.includes(skill) ? "default" : "outline"} className="cursor-pointer py-1.5 px-3" onClick={() => toggleSkill(skill)}>{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase text-muted-foreground">Backend & Database</Label>
                        <div className="flex flex-wrap gap-2">
                          {[...TECH_SKILLS.backend, ...TECH_SKILLS.database].map(skill => (
                            <Badge key={skill} variant={formData.skills.includes(skill) ? "default" : "outline"} className="cursor-pointer py-1.5 px-3" onClick={() => toggleSkill(skill)}>{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase text-muted-foreground">DevOps</Label>
                        <div className="flex flex-wrap gap-2">
                          {TECH_SKILLS.devops.map(skill => (
                            <Badge key={skill} variant={formData.skills.includes(skill) ? "default" : "outline"} className="cursor-pointer py-1.5 px-3" onClick={() => toggleSkill(skill)}>{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {isCreative && (
                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase text-muted-foreground">Creative & Design Tools</Label>
                      <div className="flex flex-wrap gap-2">
                        {TECH_SKILLS.creative.map(skill => (
                          <Badge key={skill} variant={formData.skills.includes(skill) ? "default" : "outline"} className="cursor-pointer py-1.5 px-3" onClick={() => toggleSkill(skill)}>{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isDeveloper && !isCreative && (
                     <div className="space-y-4">
                        <Label>Add Your Skills</Label>
                        <Input placeholder="Enter skills separated by commas..." onKeyDown={(e: any) => {
                          if (e.key === 'Enter') {
                            const newSkills = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean);
                            setFormData((prev: any) => ({ ...prev, skills: Array.from(new Set([...prev.skills, ...newSkills])) }));
                            e.target.value = '';
                          }
                        }} />
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill: string) => (
                            <Badge key={skill} className="px-3 py-1.5">{skill}</Badge>
                          ))}
                        </div>
                     </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>LinkedIn Profile URL</Label>
                  <Input value={formData.portfolio.linkedin} onChange={(e) => setFormData({...formData, portfolio: {...formData.portfolio, linkedin: e.target.value}})} placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="space-y-2">
                  <Label>GitHub / Portfolio URL</Label>
                  <Input value={formData.portfolio.github} onChange={(e) => setFormData({...formData, portfolio: {...formData.portfolio, github: e.target.value}})} placeholder="https://github.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select value={formData.availability} onValueChange={(val) => setFormData({...formData, availability: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0 || isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Next'}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
