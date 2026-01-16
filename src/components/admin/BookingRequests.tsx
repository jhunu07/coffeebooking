
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader, Calendar } from 'lucide-react';
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
} from "@/components/ui/dialogs";
import type { Tables } from '@/integrations/supabase/types';

type Booking = Tables<'bookings'>;

type BookingWithUser = Booking & {
  user_email?: string;
};

export const BookingRequests = () => {
  const [bookings, setBookings] = useState<BookingWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<BookingWithUser | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('date', { ascending: false })
        .order('time', { ascending: false });

      if (bookingsError) throw bookingsError;

      // Get user emails for bookings with user_id
      // Note: admin.getUserById requires service role key, so we'll use profiles table instead
      const bookingsWithUsers = await Promise.all((bookingsData || []).map(async (booking) => {
        if (booking.user_id) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', booking.user_id)
            .single();
          
          // Try to get email from auth.users via a query
          // Since we can't use admin API, we'll just use the booking email
          return {
            ...booking,
            user_email: profileData?.username || booking.email
          };
        }
        return booking;
      }));

      setBookings(bookingsWithUsers);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    // Set up real-time listeners
    const channel = supabase
      .channel('bookings_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'bookings' 
        }, 
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Booking status updated to ${status}`);
      fetchBookings();
      
      if (selectedBooking && selectedBooking.id === id) {
        setSelectedBooking({
          ...selectedBooking,
          status
        });
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const handleViewDetails = (booking: BookingWithUser) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
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
        Booking Requests
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-10 text-coffee-dark">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">No bookings found</p>
          <p className="text-sm text-gray-500 mt-2">Bookings will appear here when customers make reservations</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>List of customer bookings - Total: {bookings.length}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{formatDate(booking.date)}</TableCell>
                  <TableCell>{formatTime(booking.time)}</TableCell>
                  <TableCell>{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell className="text-sm">{booking.email}</TableCell>
                  <TableCell className="text-sm">{booking.phone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(booking)}
                      >
                        View
                      </Button>
                      {booking.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="bg-green-50 hover:bg-green-100 border-green-200"
                        >
                          Confirm
                        </Button>
                      )}
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                          className="bg-blue-50 hover:bg-blue-100 border-blue-200"
                        >
                          Complete
                        </Button>
                      )}
                      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="bg-red-50 hover:bg-red-100 text-red-700 border-red-200"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Details
            </DialogTitle>
            <DialogDescription>
              {selectedBooking && `Booking for ${formatDate(selectedBooking.date)}`}
            </DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Booking ID</h3>
                <p className="mt-1 font-mono">{selectedBooking.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date & Time</h3>
                <p className="mt-1">{formatDate(selectedBooking.date)} at {formatTime(selectedBooking.time)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Guests</h3>
                <p className="mt-1">{selectedBooking.guests} {selectedBooking.guests === 1 ? 'guest' : 'guests'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                <p className="mt-1">{selectedBooking.name}</p>
                <p className="mt-1">{selectedBooking.email}</p>
                <p className="mt-1">{selectedBooking.phone}</p>
              </div>
              {selectedBooking.notes && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Special Requests</h3>
                  <p className="mt-1">{selectedBooking.notes}</p>
                </div>
              )}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">{selectedBooking.status}</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                {selectedBooking.status === 'pending' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'confirmed');
                      setDialogOpen(false);
                    }}
                    className="bg-green-50 hover:bg-green-100"
                  >
                    Mark Confirmed
                  </Button>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <Button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'completed');
                      setDialogOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Mark Completed
                  </Button>
                )}
                {selectedBooking.status !== 'cancelled' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'cancelled');
                      setDialogOpen(false);
                    }}
                    className="bg-red-50 hover:bg-red-100 text-red-700"
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

