
import { useState, useEffect } from 'react';
import { checkUserProfile } from '@/utils/userUtils';
import { User } from '@supabase/supabase-js';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

export const useUserProfile = (user: User | null) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setIsLoading(true);
        const userProfile = await checkUserProfile(user.id);
        setProfile(userProfile);
        setIsLoading(false);
      } else {
        setProfile(null);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, isLoading };
};
