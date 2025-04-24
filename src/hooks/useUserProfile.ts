
import { useState, useEffect } from 'react';
import { checkUserProfile } from '@/utils/userUtils';
import { User } from '@supabase/supabase-js';

export const useUserProfile = (user: User | null) => {
  const [profile, setProfile] = useState<any>(null);
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
