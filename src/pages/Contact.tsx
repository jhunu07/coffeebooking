
import React from 'react';
import { ContactForm } from '@/components/ContactForm';
import { MessageCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-cream py-16 px-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-coffee-medium rounded-full mb-6">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-coffee-darkest mb-4">
            Contact Us
          </h1>
          <p className="text-coffee-dark max-w-xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Send us a message
            and we'll respond as soon as possible.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
