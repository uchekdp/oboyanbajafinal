-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Properties Table
create table if not exists public.properties (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  price numeric not null,
  location text not null,
  type text not null check (type in ('land', 'house', 'rental', 'commercial', 'development')),
  status text not null check (status in ('available', 'sold', 'rented')),
  features text[] not null default '{}',
  bedrooms integer,
  bathrooms integer,
  area text,
  images text[] not null default '{}',
  video_url text,
  featured boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Testimonials Table
create table if not exists public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  content text not null,
  avatar text,
  rating integer not null check (rating >= 1 and rating <= 5),
  video_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Messages Table
create table if not exists public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  inquiry_type text not null,
  message text not null,
  status text not null check (status in ('new', 'read', 'replied')) default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site Content Table (Singleton)
create table if not exists public.site_content (
  id integer primary key check (id = 1), -- Only allow one row
  hero_title text,
  hero_subtitle text,
  hero_image text,
  about_story text,
  about_mission text,
  about_vision text,
  founder_name text,
  founder_story text,
  founder_image text,
  social_facebook text,
  social_instagram text,
  social_tiktok text,
  social_linkedin text,
  social_whatsapp text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Initial Site Content Data
insert into public.site_content (id, hero_title, hero_subtitle, about_story, about_mission, about_vision, founder_name, founder_story, social_whatsapp)
values (
  1, 
  'Own Genuine Property With Confidence',
  'At OBOYANBAJA INVESTMENTS NIGERIA LIMITED, we help individuals, families, and investors acquire genuine landed properties.',
  'OBOYANBAJA INVESTMENTS NIGERIA LIMITED is a registered Nigerian real estate and investment company.',
  'To provide trusted, transparent, and profitable real estate solutions.',
  'To become one of Nigeria’s most respected and reliable real estate brands.',
  'Sunday Stephen Oyewo',
  'The company was founded by Sunday Stephen Oyewo, a highly experienced professional.',
  'https://wa.me/2348055982094'
) on conflict (id) do nothing;


-- Row Level Security (RLS) Setup

-- 1. Enable RLS on all tables
alter table public.properties enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_content enable row level security;

-- 2. Create policies for public access (Read-only for most, insert for messages)
create policy "Allow public read-only access to properties" on public.properties for select using (true);
create policy "Allow public read-only access to testimonials" on public.testimonials for select using (true);
create policy "Allow public read-only access to site content" on public.site_content for select using (true);
create policy "Allow public to insert contact messages" on public.contact_messages for insert with check (true);

-- 3. Create policies for authenticated admins (Full access)
-- Note: Assuming you are using Supabase Auth. Any authenticated user is treated as admin for this simple setup.
create policy "Allow authenticated full access to properties" on public.properties for all using (auth.role() = 'authenticated');
create policy "Allow authenticated full access to testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Allow authenticated full access to contact messages" on public.contact_messages for all using (auth.role() = 'authenticated');
create policy "Allow authenticated full access to site content" on public.site_content for all using (auth.role() = 'authenticated');

-- Storage Bucket for Images (Optional but recommended)
insert into storage.buckets (id, name, public) values ('images', 'images', true) on conflict (id) do nothing;

create policy "Allow public to read images" on storage.objects for select using (bucket_id = 'images');
create policy "Allow authenticated to upload images" on storage.objects for insert with check (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "Allow authenticated to update images" on storage.objects for update using (bucket_id = 'images' and auth.role() = 'authenticated');
create policy "Allow authenticated to delete images" on storage.objects for delete using (bucket_id = 'images' and auth.role() = 'authenticated');
