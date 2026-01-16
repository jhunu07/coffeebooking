import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://yfkmrulfxbfkjfwhqxgj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlma21ydWxmeGJma2pmd2hxeGdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0ODg4MTksImV4cCI6MjA2MTA2NDgxOX0.ow78h9_C7pqf0BqnNczG9fDBo09bhpRLimc64ttwhHI";

if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);