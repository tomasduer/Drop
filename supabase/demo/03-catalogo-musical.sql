-- Biblioteca con álbumes del catálogo (Deezer). Aplicado en Supabase el 2026-11-04 (migración catalogo_musical).
-- Además, drop_points_action acepta album_id que estén en user_albums del usuario (ver migración en Supabase).
CREATE TABLE IF NOT EXISTS public.user_albums (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  album_id text NOT NULL CHECK (album_id ~ '^dz-[0-9]{1,15}$'),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  artist text NOT NULL DEFAULT '' CHECK (char_length(artist) <= 200),
  year text NOT NULL DEFAULT '' CHECK (char_length(year) <= 4),
  cover text CHECK (cover IS NULL OR cover ~ '^https://[a-z0-9.-]*dzcdn\.net/'),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, album_id)
);
ALTER TABLE public.user_albums ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, DELETE ON public.user_albums TO authenticated;
CREATE POLICY "Read own albums" ON public.user_albums FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Add own albums" ON public.user_albums FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Remove own albums" ON public.user_albums FOR DELETE TO authenticated USING (user_id = auth.uid());
