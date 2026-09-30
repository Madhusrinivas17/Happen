create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  date date not null,
  time text not null,
  venue text not null,
  building text,
  room text,
  category text not null,
  image text,
  capacity integer,
  registered_count integer not null default 0,
  contact_email text,
  tags jsonb not null default '[]'::jsonb,
  status text not null default 'Upcoming' check (status in ('Upcoming', 'Registration Open', 'Starting Soon', 'Live', 'Completed')),
  organizer text not null,
  organizer_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('image', 'video')),
  url text not null,
  storage_path text,
  uploaded_by text not null,
  created_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('happen-media', 'happen-media', true)
on conflict (id) do update set public = true;

alter table public.events enable row level security;
alter table public.media enable row level security;

create policy "service role can manage events" on public.events for all to service_role using (true) with check (true);
create policy "service role can manage media" on public.media for all to service_role using (true) with check (true);
create policy "public can read media" on public.media for select to anon, authenticated using (true);
create policy "public can read events" on public.events for select to anon, authenticated using (true);
