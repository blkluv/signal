-- Spirit Signal – Full Schema
-- Run this in Supabase SQL Editor

-- ─────────────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  display_name text,
  gender_identity text,
  relationship_status text,
  country text,
  timezone text,
  marketing_consent boolean default false,
  terms_accepted boolean default false,
  privacy_accepted boolean default false,
  onboarding_completed boolean default false,
  onboarding_completed_at timestamptz,
  current_plan text default 'free',
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- BIRTH PROFILES
-- ─────────────────────────────────────────
create table if not exists public.birth_profiles (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  birth_date date not null,
  birth_time time,
  birth_time_unknown boolean default false,
  birth_city text,
  birth_state_region text,
  birth_country text,
  current_city text,
  current_state_region text,
  current_country text,
  symbolic_sun_sign text,
  symbolic_birth_signal text,
  symbolic_profile_summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- USER PREFERENCES
-- ─────────────────────────────────────────
create table if not exists public.user_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  main_intention text,
  top_questions text[],
  current_life_challenge text,
  desired_tone text,
  preferred_persona text,
  belief_style text,
  fear_level text,
  topics_to_avoid text[],
  emotional_sensitivity text,
  interested_topics text[],
  content_preferences text[],
  email_frequency text,
  sms_consent boolean default false,
  phone text,
  affiliate_offer_consent boolean default false,
  personalized_offer_consent boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- READINGS
-- ─────────────────────────────────────────
create table if not exists public.readings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  question text not null,
  answer text not null,
  mood text,
  persona text,
  user_context_snapshot jsonb,
  ai_model text,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- USAGE EVENTS
-- ─────────────────────────────────────────
create table if not exists public.usage_events (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  event_name text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- PURCHASES
-- ─────────────────────────────────────────
create table if not exists public.purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  stripe_customer_id text,
  stripe_session_id text,
  price_id text,
  plan_key text,
  status text,
  amount_total integer,
  currency text,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- CREDITS
-- ─────────────────────────────────────────
create table if not exists public.credits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  plan_key text,
  credits_total integer default 0,
  credits_used integer default 0,
  renews_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- EMAIL SEGMENTS
-- ─────────────────────────────────────────
create table if not exists public.email_segments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  segment_key text,
  source text,
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.birth_profiles enable row level security;
alter table public.user_preferences enable row level security;
alter table public.readings enable row level security;
alter table public.usage_events enable row level security;
alter table public.purchases enable row level security;
alter table public.credits enable row level security;
alter table public.email_segments enable row level security;

-- profiles
create policy "profiles: users own rows" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- birth_profiles
create policy "birth_profiles: users own rows" on public.birth_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- user_preferences
create policy "user_preferences: users own rows" on public.user_preferences
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- readings
create policy "readings: users own rows" on public.readings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- usage_events: users can insert their own, service role can insert all
create policy "usage_events: users insert own" on public.usage_events
  for insert with check (auth.uid() = user_id);
create policy "usage_events: users select own" on public.usage_events
  for select using (auth.uid() = user_id);

-- purchases: service role inserts via webhook; users read own
create policy "purchases: users read own" on public.purchases
  for select using (auth.uid() = user_id);

-- credits
create policy "credits: users own rows" on public.credits
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- email_segments
create policy "email_segments: users own rows" on public.email_segments
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ─────────────────────────────────────────
-- AUTO-CREATE PROFILE ON SIGNUP
-- ─────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- UPDATED_AT TRIGGERS
-- ─────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
create trigger set_birth_profiles_updated_at before update on public.birth_profiles
  for each row execute procedure public.set_updated_at();
create trigger set_user_preferences_updated_at before update on public.user_preferences
  for each row execute procedure public.set_updated_at();
create trigger set_credits_updated_at before update on public.credits
  for each row execute procedure public.set_updated_at();
