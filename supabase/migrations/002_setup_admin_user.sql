-- Setup script to create/update admin user
-- Replace 'your-email@example.com' with your actual email address

-- Step 1: Find your user ID (run this first to get your user ID)
-- SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Step 2: Create or update admin profile
-- Replace 'YOUR_USER_ID_HERE' with the ID from Step 1
-- Or use the email-based approach below

-- Method 1: Using user ID directly
/*
INSERT INTO public.profiles (id, role, created_at, updated_at)
SELECT 
  id,
  'admin',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  updated_at = NOW();
*/

-- Method 2: Update existing profile
/*
UPDATE public.profiles
SET 
  role = 'admin',
  updated_at = NOW()
WHERE id IN (
  SELECT id FROM auth.users WHERE email = 'your-email@example.com'
);
*/

-- Method 3: Create profile if doesn't exist, update if exists
/*
INSERT INTO public.profiles (id, role, created_at, updated_at)
SELECT 
  id,
  'admin',
  COALESCE((SELECT created_at FROM public.profiles WHERE id = auth.users.id), NOW()),
  NOW()
FROM auth.users
WHERE email = 'your-email@example.com'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  updated_at = NOW();
*/

-- Verify admin was set correctly
-- SELECT id, role, username, full_name FROM public.profiles WHERE role = 'admin';

