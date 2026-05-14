import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uyyzaoqvwvubpgdukmdh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eXphb3F2d3Z1YnBnZHVrbWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MjkxNTQsImV4cCI6MjA5MzAwNTE1NH0.-yteVAWmh20F308wBwT7Cvgsp1aimfqkOvZf2fgkmBI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
