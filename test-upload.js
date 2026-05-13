import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://uyyzaoqvwvubpgdukmdh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eXphb3F2d3Z1YnBnZHVrbWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MjkxNTQsImV4cCI6MjA5MzAwNTE1NH0.-yteVAWmh20F308wBwT7Cvgsp1aimfqkOvZf2fgkmBI');

async function test() {
  const { data, error } = await supabase.storage.from('images').upload('test.txt', 'hello');
  console.log('data:', data, 'error:', error);
}
test();
