-- Panel de administración de drops.
-- Quién es admin: tabla drop_admins (se agrega a mano desde el SQL Editor o por el panel).
CREATE TABLE IF NOT EXISTS public.drop_admins (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.drop_admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.drop_admins FROM anon, authenticated;
GRANT SELECT ON public.drop_admins TO authenticated;
GRANT ALL ON public.drop_admins TO service_role;
CREATE POLICY "Admins see themselves" ON public.drop_admins FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.is_drop_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (SELECT 1 FROM public.drop_admins WHERE user_id = auth.uid());
$$;
REVOKE ALL ON FUNCTION public.is_drop_admin() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.is_drop_admin() TO authenticated;

-- Contenido editorial y estética de cada drop (lo que antes estaba solo en el código).
CREATE TABLE IF NOT EXISTS public.drop_content (
  campaign_id text PRIMARY KEY REFERENCES public.campaigns(id) ON DELETE CASCADE,
  kind text NOT NULL DEFAULT 'album' CHECK (kind IN ('album','single','show','noticia')),
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  dates text NOT NULL DEFAULT '',
  fandom text NOT NULL DEFAULT '',
  cover_url text,
  hero_url text,
  album_url text,
  theme jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.drop_content ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.drop_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.drop_content TO authenticated;
GRANT ALL ON public.drop_content TO service_role;
CREATE POLICY "Public read drop content" ON public.drop_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write drop content" ON public.drop_content FOR ALL TO authenticated USING (public.is_drop_admin()) WITH CHECK (public.is_drop_admin());

-- Los admins pueden crear y editar campañas, misiones y respuestas.
GRANT INSERT, UPDATE ON public.campaigns TO authenticated;
CREATE POLICY "Admins write campaigns" ON public.campaigns FOR INSERT TO authenticated WITH CHECK (public.is_drop_admin());
CREATE POLICY "Admins update campaigns" ON public.campaigns FOR UPDATE TO authenticated USING (public.is_drop_admin()) WITH CHECK (public.is_drop_admin());

GRANT INSERT, UPDATE, DELETE ON public.missions TO authenticated;
CREATE POLICY "Admins insert missions" ON public.missions FOR INSERT TO authenticated WITH CHECK (public.is_drop_admin());
CREATE POLICY "Admins update missions" ON public.missions FOR UPDATE TO authenticated USING (public.is_drop_admin()) WITH CHECK (public.is_drop_admin());
CREATE POLICY "Admins delete missions" ON public.missions FOR DELETE TO authenticated USING (public.is_drop_admin());

-- Las respuestas siguen ocultas para los fans: solo los admins las leen o escriben.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mission_validation_rules TO authenticated;
CREATE POLICY "Admins manage rules" ON public.mission_validation_rules FOR ALL TO authenticated USING (public.is_drop_admin()) WITH CHECK (public.is_drop_admin());

-- Imágenes de los drops: bucket público, solo los admins suben.
INSERT INTO storage.buckets (id, name, public) VALUES ('drop-imagenes', 'drop-imagenes', true)
ON CONFLICT (id) DO UPDATE SET public = true;
CREATE POLICY "Admins upload drop images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'drop-imagenes' AND public.is_drop_admin());
CREATE POLICY "Admins update drop images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'drop-imagenes' AND public.is_drop_admin());
CREATE POLICY "Admins delete drop images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'drop-imagenes' AND public.is_drop_admin());
