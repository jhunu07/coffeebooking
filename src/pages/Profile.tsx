
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/form-inputs';
import { User, ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useUserProfile } from '@/hooks/useUserProfile';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  const { profile } = useUserProfile(user);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setUsername(profile.username || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          username: username,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading profile..." />;
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="container mx-auto max-w-2xl">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center text-coffee-dark hover:text-coffee-darkest mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-serif font-bold text-coffee-darkest">My Profile</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-coffee-darkest" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-semibold text-coffee-darkest">
                {profile?.full_name || user?.email}
              </h2>
              <p className="text-coffee-dark">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-gray-50"
              />
              <p className="text-sm text-coffee-dark">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSave}
                className="bg-coffee-darkest hover:bg-black"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFullName(profile?.full_name || '');
                  setUsername(profile?.username || '');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-coffee-light">
            <h3 className="text-lg font-serif font-semibold text-coffee-darkest mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" asChild className="justify-start">
                <Link to="/orders">
                  View Orders
                </Link>
              </Button>
              <Button variant="outline" asChild className="justify-start">
                <Link to="/bookings">
                  View Bookings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

