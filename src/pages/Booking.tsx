
import React from 'react';
import BookingForm from '@/components/BookingForm';
import { Calendar, MapPin, Clock, Phone } from 'lucide-react';

const Booking = () => {
  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-coffee-darkest mb-4">
            Reserve Your Table
          </h1>
          <p className="text-coffee-dark max-w-2xl mx-auto">
            Book your perfect coffee experience in our cozy atmosphere. 
            Whether it's a casual meet-up or a special occasion, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-serif font-semibold text-coffee-darkest mb-6">
                Book Your Visit
              </h2>
              <BookingForm />
            </div>
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-coffee-dark text-white rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-2xl font-serif font-semibold mb-6 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Reservation Information
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Why Reserve?</h3>
                  <p className="text-coffee-light">
                    Secure your preferred seating, avoid waiting times, and enjoy a personalized coffee experience with our attentive staff.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Location
                  </h3>
                  <p className="text-coffee-light">
                    Rajkot Gujarat 360003
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-2 flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    Opening Hours
                  </h3>
                  <ul className="text-coffee-light space-y-1">
                    <li>Monday - Friday: 9am - 10pm</li>
                    <li>Saturday - Sunday: 10am - 12pm</li>
                  </ul>
                </div>

              

                <div className="pt-4 border-t border-coffee-medium">
                  <h3 className="font-medium mb-2">Note</h3>
                  <p className="text-coffee-light text-sm">
                    Reservations are held for 15 minutes past the reservation time. 
                    Please call us if you're running late to keep your table.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
