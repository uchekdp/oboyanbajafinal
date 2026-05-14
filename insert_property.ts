import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://uyyzaoqvwvubpgdukmdh.supabase.co';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eXphb3F2d3Z1YnBnZHVrbWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MjkxNTQsImV4cCI6MjA5MzAwNTE1NH0.-yteVAWmh20F308wBwT7Cvgsp1aimfqkOvZf2fgkmBI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addProp() {
  const newProp = {
    id: Date.now().toString(),
    title: '4 Bedroom Semi Detached Duplex',
    description: 'A beautiful 4 bedroom semi-detached duplex located in Golden Park Estate, Sangotedo.',
    price: 230000000,
    location: 'Golden Park Estate, Sangotedo',
    type: 'house',
    status: 'available',
    features: ['Security', 'Ample Parking', 'Modern Finish'],
    bedrooms: 4,
    bathrooms: 4,
    images: ['https://i.ibb.co/4gjmsNRQ/Whats-App-Image-2026-05-08-at-1-39-17-AM.jpg'],
    featured: true,
  };

  const { data, error } = await supabase.from('properties').insert(newProp);
  console.log('Error:', error);
  console.log('Success:', data);
}

addProp().catch(console.error);
