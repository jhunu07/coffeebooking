
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  status: string;
};

export const ContactRequests = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();

    // Set up real-time listeners for contact_submissions table
    const channel = supabase
      .channel('contact_submissions_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'contact_submissions' 
        }, 
        () => {
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Status updated to ${status}`);
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleViewDetails = (submission: ContactSubmission) => {
    setSelectedSubmission(submission);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="py-10 flex justify-center">
        <Loader className="h-6 w-6 animate-spin text-coffee-medium" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-coffee-darkest mb-6">
        Contact Submissions
      </h2>

      {submissions.length === 0 ? (
        <div className="text-center py-10 text-coffee-dark">
          No contact submissions found
        </div>
      ) : (
        <Table>
          <TableCaption>List of customer contact submissions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{formatDate(submission.created_at)}</TableCell>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    submission.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : submission.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {submission.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(submission)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(submission.id, 'in-progress')}
                    disabled={submission.status === 'in-progress'}
                  >
                    Mark In-Progress
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(submission.id, 'completed')}
                    disabled={submission.status === 'completed'}
                  >
                    Mark Completed
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Request Details
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedSubmission && formatDate(selectedSubmission.created_at)}
            </DialogDescription>
          </DialogHeader>

          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1">{selectedSubmission.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{selectedSubmission.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <p className="mt-1 whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">{selectedSubmission.status}</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedSubmission.id, 'in-progress')}
                  disabled={selectedSubmission.status === 'in-progress'}
                >
                  Mark In-Progress
                </Button>
                <Button
                  onClick={() => updateStatus(selectedSubmission.id, 'completed')}
                  disabled={selectedSubmission.status === 'completed'}
                >
                  Mark Completed
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
