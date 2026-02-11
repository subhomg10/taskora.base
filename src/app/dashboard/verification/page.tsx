
"use client"

import React, { useState } from 'react';
import { 
  UserCheck, 
  X, 
  Check, 
  Eye, 
  Clock, 
  FileText, 
  ShieldAlert,
  Search
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';

const mockVerifications = [
  {
    id: "v1",
    name: "James Wilson",
    email: "james.w@example.com",
    profileImage: "https://picsum.photos/seed/w2/200/200",
    idProof: "https://picsum.photos/seed/id1/600/400",
    requestedAt: "2 hours ago",
    type: "Personal Identity",
    status: "Pending"
  },
  {
    id: "v2",
    name: "Maria Rodriguez",
    email: "m.rodriguez@company.io",
    profileImage: "https://picsum.photos/seed/w3/200/200",
    idProof: "https://picsum.photos/seed/id2/600/400",
    requestedAt: "5 hours ago",
    type: "Professional Certification",
    status: "Pending"
  },
  {
    id: "v3",
    name: "Liam O'Connor",
    email: "liam.oc@web.com",
    profileImage: "https://picsum.photos/seed/w4/200/200",
    idProof: "https://picsum.photos/seed/id3/600/400",
    requestedAt: "Yesterday",
    type: "Personal Identity",
    status: "Pending"
  }
];

export default function WorkerVerificationPage() {
  const [verifications, setVerifications] = useState(mockVerifications);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAction = (id: string, approve: boolean) => {
    setVerifications(prev => prev.filter(v => v.id !== id));
    setIsModalOpen(false);
    toast({
      title: approve ? "Worker Verified" : "Request Rejected",
      description: approve 
        ? "The worker has been granted verified status successfully." 
        : "The verification request has been declined.",
      variant: approve ? "default" : "destructive"
    });
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Worker Verification</h1>
        <p className="text-muted-foreground">Review and validate identity proofs to maintain platform trust.</p>
      </div>

      <div className="flex items-center gap-4 mb-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search requests..." className="pl-9 bg-card border-none" />
        </div>
        <Button variant="outline" className="h-10">Filter</Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-[300px] font-bold py-4">Worker</TableHead>
              <TableHead className="font-bold">Type</TableHead>
              <TableHead className="font-bold">Requested</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold pr-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {verifications.length > 0 ? verifications.map((request) => (
              <TableRow key={request.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={request.profileImage} />
                      <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm leading-none mb-1">{request.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{request.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5 mr-2 opacity-60" />
                    {request.type}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-2 opacity-60" />
                    {request.requestedAt}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100/80 border-none font-bold text-[10px]">
                    PENDING
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-6">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 hover:bg-accent/10" 
                      title="View ID Proof"
                      onClick={() => handleViewDetails(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                      onClick={() => handleAction(request.id, true)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                      onClick={() => handleAction(request.id, false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="h-48 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <UserCheck className="h-10 w-10 opacity-20" />
                    <p className="font-medium">All caught up! No pending verification requests.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* ID Proof Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl border-none p-0 overflow-hidden shadow-2xl">
          {selectedRequest && (
            <div>
              <DialogHeader className="p-6 bg-card">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/10">
                    <AvatarImage src={selectedRequest.profileImage} />
                    <AvatarFallback>{selectedRequest.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <DialogTitle className="text-xl font-bold">{selectedRequest.name}</DialogTitle>
                    <DialogDescription className="font-mono text-xs">{selectedRequest.email}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between text-sm px-1">
                  <div className="flex items-center text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="font-medium">Document Type:</span>
                    <span className="ml-2 text-foreground font-semibold">{selectedRequest.type}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Requested {selectedRequest.requestedAt}</span>
                  </div>
                </div>

                <div className="relative aspect-[3/2] w-full rounded-lg overflow-hidden border-4 border-muted shadow-inner bg-muted">
                  <img 
                    src={selectedRequest.idProof} 
                    alt="Identity Document" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 backdrop-blur-md text-white border-none text-[10px] font-bold">IDENTITY PROOF</Badge>
                  </div>
                </div>

                <div className="bg-muted/40 p-4 rounded-lg flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Verify that the name on the ID document matches the registered worker name and the photo clearly identifies the user. Reject any blurred or suspicious documents.
                  </p>
                </div>
              </div>

              <DialogFooter className="bg-muted/30 p-4 px-6 gap-2">
                <Button variant="outline" className="flex-1" onClick={() => handleAction(selectedRequest.id, false)}>
                  Reject Request
                </Button>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => handleAction(selectedRequest.id, true)}>
                  Approve Verification
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
