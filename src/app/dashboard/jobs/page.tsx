
"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Mail, 
  Tag
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { suggestJobTags } from '@/ai/flows/suggest-job-tags';

// Mock Data
const mockJobs = [
  {
    id: "j1",
    title: "Senior Software Engineer",
    description: "Develop scalable microservices and lead the frontend transition to Next.js. We need someone who understands clean architecture and has experience with high-load systems.",
    requirements: ["8+ years React experience", "Deep knowledge of TypeScript", "Experience with AWS"],
    coverImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1080",
    applicantsCount: 12,
    location: "Remote / Bangalore, Karnataka",
    postedAt: "2 days ago",
    deadline: "2026-03-15",
    tags: ["Full-time", "React", "Senior"],
    applicants: [
      { id: "a1", name: "Alex Rivera", skills: "React, Node.js, TS", rating: 4.8, photo: "https://picsum.photos/seed/w1/200/200" },
      { id: "a2", name: "Sarah Chen", skills: "AWS, Docker, Python", rating: 4.9, photo: "https://picsum.photos/seed/w3/200/200" }
    ]
  },
  {
    id: "j2",
    title: "UI/UX Product Designer",
    description: "Create stunning user experiences for our next generation mobile application. Focus on accessibility and user-centric design principles.",
    requirements: ["Portfolio of web apps", "Figma mastery", "Design systems experience"],
    coverImage: "https://images.unsplash.com/photo-1650387220683-f9720bd98b55?auto=format&fit=crop&q=80&w=1080",
    applicantsCount: 24,
    location: "Mumbai, Maharashtra",
    postedAt: "5 days ago",
    deadline: "2026-03-22",
    tags: ["Contract", "Design", "Figma"],
    applicants: [
      { id: "a4", name: "Emma Watson", skills: "UI, UX, Prototyping", rating: 4.7, photo: "https://picsum.photos/seed/w4/200/200" }
    ]
  },
  {
    id: "j3",
    title: "DevOps Architect",
    description: "Build and maintain our CI/CD pipelines and Kubernetes infrastructure. Automate everything and ensure system reliability.",
    requirements: ["Kubernetes", "Terraform", "Jenkins/GitHub Actions"],
    coverImage: "https://images.unsplash.com/photo-1636673341470-54f37c461457?auto=format&fit=crop&q=80&w=1080",
    applicantsCount: 8,
    location: "Remote / Hyderabad, Telangana",
    postedAt: "1 week ago",
    deadline: "2026-03-05",
    tags: ["Part-time", "Cloud", "Security"],
    applicants: []
  },
  {
    id: "j4",
    title: "Full Stack Developer",
    description: "Join our core product team to build and scale features using React and Node.js. You'll be responsible for end-to-end feature development.",
    requirements: ["Proficiency in React/Next.js", "Node.js/Express experience", "Familiarity with PostgreSQL"],
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1080",
    applicantsCount: 15,
    location: "Pune, Maharashtra",
    postedAt: "1 day ago",
    deadline: "2026-03-28",
    tags: ["Full-time", "Next.js", "Node"],
    applicants: []
  },
  {
    id: "j5",
    title: "Mobile App Developer (Flutter)",
    description: "Develop high-performance cross-platform mobile applications for iOS and Android using Flutter.",
    requirements: ["Flutter & Dart mastery", "Experience with Firebase", "Published apps on Store"],
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1080",
    applicantsCount: 9,
    location: "Remote / Noida, UP",
    postedAt: "3 days ago",
    deadline: "2026-03-10",
    tags: ["Contract", "Mobile", "Flutter"],
    applicants: []
  },
  {
    id: "j6",
    title: "Data Scientist",
    description: "Apply machine learning models to solve complex business problems and extract insights from large datasets.",
    requirements: ["Python & R proficiency", "TensorFlow/PyTorch experience", "Strong Statistics background"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bbda38a5f9ce?auto=format&fit=crop&q=80&w=1080",
    applicantsCount: 5,
    location: "Chennai, Tamil Nadu",
    postedAt: "4 days ago",
    deadline: "2026-03-18",
    tags: ["Full-time", "AI", "Data"],
    applicants: []
  },
  {
    id: "j7",
    title: "Cloud Security Engineer",
    description: "Secure our cloud infrastructure and manage identity access across AWS and GCP environments.",
    requirements: ["Security certifications (CISSP/CCSP)", "Hands-on AWS/Azure Security", "Network auditing experience"],
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1080",
    applicantsCount: 4,
    location: "Remote / Ahmedabad, Gujarat",
    postedAt: "6 days ago",
    deadline: "2026-03-30",
    tags: ["Full-time", "Security", "Cloud"],
    applicants: []
  }
];

export default function JobListingsPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

  const handleOpenJob = (job: any) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setSuggestedTags([]); // Reset AI suggestions
  };

  const handleSuggestTags = async () => {
    if (!selectedJob) return;
    setIsSuggesting(true);
    try {
      const tags = await suggestJobTags({ jobDescription: selectedJob.description });
      setSuggestedTags(tags);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Failed",
        description: "Could not generate tags at this time."
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSelectWorker = (workerName: string) => {
    toast({
      title: "Worker Selected",
      description: `${workerName} has been shortlisted for this position.`,
    });
  };

  const handleDMWorker = (workerName: string) => {
    toast({
      title: "Chat Initialized",
      description: `Opening secure channel with ${workerName}...`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-muted-foreground">Manage and track active employment opportunities.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Job Post
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockJobs.map((job) => (
          <Card 
            key={job.id} 
            className="overflow-hidden border-none shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col"
            onClick={() => handleOpenJob(job)}
          >
            <div className="relative h-48 w-full bg-muted">
              <Image 
                src={job.coverImage} 
                alt={job.title} 
                fill 
                className="object-cover" 
                data-ai-hint="job cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                  {job.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] font-bold uppercase">{tag}</Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{job.postedAt}</span>
              </div>
              <CardTitle className="text-xl line-clamp-1">{job.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{job.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-2" />
                  {job.location}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Users className="h-3 w-3 mr-2" />
                  {job.applicantsCount} Applicants
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t mt-4 px-6 py-4">
              <Button variant="outline" className="w-full text-xs font-semibold uppercase tracking-wider">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none">
          {selectedJob && (
            <div className="flex flex-col">
              <div className="relative h-64 w-full">
                <Image 
                  src={selectedJob.coverImage} 
                  alt={selectedJob.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-8 text-white">
                  <h2 className="text-3xl font-bold">{selectedJob.title}</h2>
                  <div className="flex gap-2 mt-2">
                    {selectedJob.tags.map((t: string) => <Badge key={t} className="bg-white/20 hover:bg-white/30 text-white border-none">{t}</Badge>)}
                  </div>
                </div>
              </div>

              <div className="p-8 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-3 flex items-center">
                      Job Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">Requirements</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {selectedJob.requirements.map((req: string, idx: number) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">Applicants ({selectedJob.applicants?.length || 0})</h3>
                      <Button variant="ghost" size="sm" className="text-xs">Export List</Button>
                    </div>
                    {selectedJob.applicants?.length > 0 ? (
                      <div className="space-y-3">
                        {selectedJob.applicants.map((app: any) => (
                          <div key={app.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10 border">
                                <AvatarImage src={app.photo} />
                                <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm">{app.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] bg-accent/10 text-accent font-bold px-1.5 py-0.5 rounded uppercase">{app.skills}</span>
                                  <div className="flex items-center text-amber-500">
                                    <Star className="h-3 w-3 fill-current" />
                                    <span className="text-xs font-medium ml-1">{app.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => handleDMWorker(app.name)}>
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button size="sm" className="h-8 px-3 text-xs" onClick={() => handleSelectWorker(app.name)}>
                                Select
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl bg-muted/20">
                        <Users className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                        <p className="text-muted-foreground font-medium">No applications yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <Card className="border shadow-none">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">AI Toolbelt</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        variant="secondary" 
                        className="w-full justify-start gap-2 h-10" 
                        onClick={handleSuggestTags}
                        disabled={isSuggesting}
                      >
                        <Tag className="h-4 w-4" />
                        {isSuggesting ? "Analyzing..." : "Suggest Tags"}
                      </Button>
                      
                      {suggestedTags.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <p className="text-xs font-bold mb-2 uppercase text-muted-foreground">Suggested Tags:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {suggestedTags.map(tag => (
                              <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-1">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">ACTIVE</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">{selectedJob.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Applicants</span>
                      <span className="font-medium">{selectedJob.applicantsCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deadline</span>
                      <span className="font-medium">{selectedJob.deadline}</span>
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
