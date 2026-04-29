create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  ip_address text,
  spirit text,
  question text,
  answer text,
  created_at timestamptz default now()
);
create index on sessions(ip_address, created_at);

create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  plan text,
  stripe_customer_id text,
  stripe_subscription_id text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
