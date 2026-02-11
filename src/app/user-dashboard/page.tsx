"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  MapPin, 
  Users, 
  Clock,
  ArrowRight,
  Banknote,
  CalendarCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

// Mock Data updated to show Total Amount based on Tenure
const mockJobs = [
  {
    id: "j1",
    title: "Senior Software Engineer",
    shortDescription: "Develop scalable microservices and lead the frontend transition to Next.js.",
    fullDescription: "Develop scalable microservices and lead the frontend transition to Next.js. We need someone who understands clean architecture and has experience with high-load systems. You will be working with a high-performance team focusing on low-latency transactions.",
    requirements: ["8+ years React experience", "Deep knowledge of TypeScript", "Experience with AWS"],
    totalPayout: "₹28,00,000",
    tenure: "12 Months (Full-time)",
    location: "Remote / Bangalore, Karnataka",
    deadline: "2026-03-15",
    applicantsCount: 12,
    coverImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1080",
    tags: ["Full-time", "React"]
  },
  {
    id: "j2",
    title: "UI/UX Product Designer",
    shortDescription: "Create stunning user experiences for our next generation mobile application.",
    fullDescription: "Create stunning user experiences for our next generation mobile application. Focus on accessibility and user-centric design principles. You will be responsible for creating prototypes and conducting user testing.",
    requirements: ["Portfolio of web apps", "Figma mastery", "Design systems experience"],
    totalPayout: "₹8,50,000",
    tenure: "6 Months (Contract)",
    location: "Mumbai, Maharashtra",
    deadline: "2026-03-22",
    applicantsCount: 24,
    coverImage: "https://images.unsplash.com/photo-1650387220683-f9720bd98b55?auto=format&fit=crop&q=80&w=1080",
    tags: ["Contract", "Design"]
  },
  {
    id: "j3",
    title: "DevOps Architect",
    shortDescription: "Build and maintain our CI/CD pipelines and Kubernetes infrastructure.",
    fullDescription: "Build and maintain our CI/CD pipelines and Kubernetes infrastructure. Automate everything and ensure system reliability. You will work closely with development teams to ensure smooth deployments.",
    requirements: ["Kubernetes", "Terraform", "Jenkins/GitHub Actions"],
    totalPayout: "₹32,00,000",
    tenure: "12 Months (Full-time)",
    location: "Remote / Hyderabad, Telangana",
    deadline: "2026-03-05",
    applicantsCount: 8,
    coverImage: "https://images.unsplash.com/photo-1636673341470-54f37c461457?auto=format&fit=crop&q=80&w=1080",
    tags: ["Part-time", "Cloud"]
  },
  {
    id: "j4",
    title: "Full Stack Developer",
    shortDescription: "Join our core product team to build and scale features using React and Node.js.",
    fullDescription: "Join our core product team to build and scale features using React and Node.js. You'll be responsible for end-to-end feature development, from database schema design to frontend implementation. Focus on building high-performance APIs.",
    requirements: ["Proficiency in React/Next.js", "Node.js/Express experience", "Familiarity with PostgreSQL"],
    totalPayout: "₹18,50,000",
    tenure: "12 Months (Full-time)",
    location: "Pune, Maharashtra",
    deadline: "2026-03-28",
    applicantsCount: 15,
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1080",
    tags: ["Full-time", "Next.js", "Node"]
  },
  {
    id: "j5",
    title: "Mobile App Developer (Flutter)",
    shortDescription: "Develop high-performance cross-platform mobile applications.",
    fullDescription: "Develop high-performance cross-platform mobile applications for iOS and Android using Flutter. Focus on smooth animations, responsive UI, and robust state management for our consumer app.",
    requirements: ["Flutter & Dart mastery", "Experience with Firebase", "Published apps on Play Store/App Store"],
    totalPayout: "₹3,50,000",
    tenure: "3 Months (Contract)",
    location: "Remote / Noida, UP",
    deadline: "2026-03-10",
    applicantsCount: 9,
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1080",
    tags: ["Contract", "Mobile", "Flutter"]
  }
];

export default function UserJobFeed() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();

  const handleApply = (jobTitle: string) => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setSelectedJob(null);
      toast({
        title: "Application Submitted",
        description: `You have successfully applied for the ${jobTitle} position.`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Available Opportunities</h1>
        <p className="text-muted-foreground">Find and apply for tasks that match your skill set.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-all flex flex-col group">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={job.coverImage} 
                alt={job.title} 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
                data-ai-hint="job cover"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex gap-2 mb-2">
                {job.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">{tag}</Badge>
                ))}
              </div>
              <CardTitle className="text-xl line-clamp-1">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.shortDescription}</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Users className="h-3 w-3 mr-2" />
                  {job.applicantsCount} Applicants
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-2" />
                  Deadline: {job.deadline}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/5 p-4">
              <Button 
                variant="ghost" 
                className="w-full text-xs font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedJob(job)}
              >
                View Details
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 border-none">
          {selectedJob && (
            <div className="flex flex-col">
              <div className="relative h-56 w-full">
                <Image 
                  src={selectedJob.coverImage} 
                  alt={selectedJob.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-6 left-8 text-white">
                  <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-sm font-medium">
                      <MapPin className="h-4 w-4" />
                      {selectedJob.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-muted-foreground text-xs">Full Description</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedJob.fullDescription}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-3 uppercase tracking-wider text-muted-foreground text-xs">Requirements</h3>
                      <ul className="grid gap-2">
                        {selectedJob.requirements.map((req: string, idx: number) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card className="border shadow-none bg-muted/20">
                      <CardContent className="p-6 space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              <Banknote className="h-3 w-3" />
                              Total Project Value
                            </div>
                            <p className="text-2xl font-bold">{selectedJob.totalPayout}</p>
                            <p className="text-[10px] text-muted-foreground leading-tight">Amount paid after completion of tenure</p>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                              <CalendarCheck className="h-3 w-3" />
                              Job Duration
                            </div>
                            <p className="text-sm font-semibold">{selectedJob.tenure}</p>
                          </div>
                        </div>

                        <Separator />

                        <Button 
                          className="w-full" 
                          onClick={() => handleApply(selectedJob.title)}
                          disabled={isApplying}
                        >
                          {isApplying ? "Submitting..." : "Apply Now"}
                        </Button>
                        <p className="text-[10px] text-center text-muted-foreground leading-tight">
                          By applying, you agree to our terms of service and project completion policies.
                        </p>
                      </CardContent>
                    </Card>

                    <div className="space-y-4 px-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Applications</span>
                        <span className="font-bold">{selectedJob.applicantsCount}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Project Status</span>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-bold text-[10px]">OPEN</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
