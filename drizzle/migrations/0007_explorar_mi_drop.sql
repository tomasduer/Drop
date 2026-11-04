-- Explorar + Mi DROP: perfil extendido, colección personal de drops, reseñas persistentes y shows.
-- Todo aditivo: no se borra ni se modifica ningún dato existente.

-- Perfil: nombre de usuario y biografía opcionales.
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists bio text;

-- Mis DROPS: colección personal de lanzamientos guardados por cada usuario.
create table public.drop_saves (
  user_id uuid not null references public.profiles(id) on delete cascade,
  campaign_id text not null references public.campaigns(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, campaign_id)
);
grant select, insert, delete on public.drop_saves to authenticated;
grant all on public.drop_saves to service_role;
alter table public.drop_saves enable row level security;
create policy "Read own drop saves" on public.drop_saves for select to authenticated using (user_id = auth.uid());
create policy "Save own drops" on public.drop_saves for insert to authenticated with check (user_id = auth.uid());
create policy "Unsave own drops" on public.drop_saves for delete to authenticated using (user_id = auth.uid());

-- Reseñas persistentes de álbumes, artistas y shows.
create table public.reviews (
  id uuid not null default gen_random_uuid() primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  author_name text not null default '',
  subject_type text not null,
  subject_id text not null,
  subject_title text not null,
  subject_artist text not null default '',
  subject_image text,
  rating integer not null,
  text text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, subject_type, subject_id)
);
alter table public.reviews add constraint reviews_rating_range check (rating between 1 and 5);
alter table public.reviews add constraint reviews_subject_type check (subject_type in ('album', 'artist', 'show'));
grant select, insert, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "Read community reviews" on public.reviews for select to authenticated using (true);
create policy "Write own reviews" on public.reviews for insert to authenticated with check (user_id = auth.uid());
create policy "Update own reviews" on public.reviews for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "Delete own reviews" on public.reviews for delete to authenticated using (user_id = auth.uid());

-- Catálogo de shows y eventos configurables.
create table public.shows (
  id text primary key,
  title text not null,
  artist text not null,
  event_date timestamptz,
  city text not null default '',
  venue text not null default '',
  image_url text,
  created_at timestamptz not null default now()
);
grant select on public.shows to authenticated;
grant all on public.shows to service_role;
alter table public.shows enable row level security;
create policy "Read shows" on public.shows for select to authenticated using (true);

insert into public.shows (id, title, artist, event_date, city, venue) values
  ('listening-nvaa', 'Listening party · No vayas a atender cuando el demonio llama', 'LALI', null, 'Buenos Aires', 'Complejo Art Media');

-- Registro de asistencia a shows por usuario.
create table public.user_shows (
  user_id uuid not null references public.profiles(id) on delete cascade,
  show_id text not null references public.shows(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, show_id)
);
grant select, insert, delete on public.user_shows to authenticated;
grant all on public.user_shows to service_role;
alter table public.user_shows enable row level security;
create policy "Read own show attendance" on public.user_shows for select to authenticated using (user_id = auth.uid());
create policy "Add own show attendance" on public.user_shows for insert to authenticated with check (user_id = auth.uid());
create policy "Remove own show attendance" on public.user_shows for delete to authenticated using (user_id = auth.uid());

-- Seguidores: permitir contar quién sigue al usuario actual (las políticas existentes solo cubren los seguimientos propios).
create policy "Read own followers" on public.fan_follows for select to authenticated using (followed_id = auth.uid());
