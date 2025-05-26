
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactRequests } from '@/components/admin/ContactRequests';
import { OrderRequests } from '@/components/admin/OrderRequests';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Loader } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const { profile, isLoading: isProfileLoading } = useUserProfile(user);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setIsAuthChecking(false);
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Check if user is admin
  const isAdmin = profile?.role === 'admin';

  // If authentication check is complete and user is not authenticated, redirect to auth page
  useEffect(() => {
    if (!isAuthChecking && !user) {
      navigate('/auth');
    }
  }, [isAuthChecking, user, navigate]);

  // If profile is loaded and user is not admin, redirect to home
  useEffect(() => {
    if (!isProfileLoading && profile && !isAdmin) {
      navigate('/');
    }
  }, [isProfileLoading, profile, isAdmin, navigate]);

  if (isAuthChecking || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-coffee-medium" />
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will be redirected
  }

  return (
    <div className="min-h-screen bg-cream py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-coffee-darkest mb-4">
            Admin Dashboard
          </h1>
          <p className="text-coffee-dark max-w-2xl mx-auto">
            Manage contact requests and orders from customers.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Tabs defaultValue="contacts">
            <TabsList className="mb-6">
              <TabsTrigger value="contacts">Contact Requests</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="contacts">
              <ContactRequests />
            </TabsContent>
            <TabsContent value="orders">
              <OrderRequests />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
