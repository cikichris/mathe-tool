-- =====================================================================
--  Mathe-Tool: Datenbank-Struktur
--
--  Diese Datei kann beliebig oft komplett ausgeführt werden.
--  Vorhandene Daten bleiben dabei erhalten.
--
--  Gespeichert wird nur der Lernstand. Die Lerninhalte selbst liegen
--  im GitHub-Repository (Ordner content/).
-- =====================================================================

-- Aktueller Stand jeder Karte (wann fällig, wie gut gekonnt)
create table if not exists public.card_state (
  user_id       uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  card_id       text        not null,
  due           date        not null,
  interval_days integer     not null default 0,
  ease          real        not null default 2.5,
  reps          integer     not null default 0,
  lapses        integer     not null default 0,
  first_seen    date,
  last_review   date,
  updated_at    timestamptz not null default now(),
  primary key (user_id, card_id)
);

-- Verlauf aller Bewertungen (für spätere Statistiken)
create table if not exists public.reviews (
  id          uuid        primary key,
  user_id     uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  card_id     text        not null,
  rating      smallint    not null check (rating between 1 and 4),
  mode        text,
  reviewed_at timestamptz not null default now()
);
create index if not exists reviews_user_time_idx on public.reviews (user_id, reviewed_at);

-- Einstellungen und Formelblatt-Auswahl
create table if not exists public.user_data (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  key        text        not null,
  value      jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

-- ---------------------------------------------------------------------
--  Zugriff: Nur angemeldete Nutzer, und jeder nur auf die eigenen Zeilen
-- ---------------------------------------------------------------------
alter table public.card_state enable row level security;
alter table public.reviews    enable row level security;
alter table public.user_data  enable row level security;

revoke all on public.card_state, public.reviews, public.user_data from anon;
grant select, insert, update, delete on public.card_state, public.reviews, public.user_data to authenticated;

drop policy if exists "eigene Zeilen" on public.card_state;
create policy "eigene Zeilen" on public.card_state
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "eigene Zeilen" on public.reviews;
create policy "eigene Zeilen" on public.reviews
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "eigene Zeilen" on public.user_data;
create policy "eigene Zeilen" on public.user_data
  for all to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
