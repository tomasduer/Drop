-- Comunidad real: posteos de los fans, likes, comentarios y búsqueda de fans para seguir.
CREATE TABLE IF NOT EXISTS public.community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id text NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  text text NOT NULL DEFAULT '' CHECK (char_length(text) <= 500),
  sticker text CHECK (sticker IS NULL OR char_length(sticker) <= 500),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (char_length(text) > 0 OR sticker IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS community_posts_campaign_idx ON public.community_posts(campaign_id, created_at DESC);

-- post_key: 'p:<uuid>' para posteos de fans, 'seed:<drop>:<n>' para los posteos de ejemplo del drop.
CREATE TABLE IF NOT EXISTS public.post_likes (
  post_key text NOT NULL CHECK (char_length(post_key) <= 120),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_key, user_id)
);
CREATE TABLE IF NOT EXISTS public.post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_key text NOT NULL CHECK (char_length(post_key) <= 120),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  text text NOT NULL CHECK (char_length(trim(text)) BETWEEN 1 AND 300),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS post_comments_key_idx ON public.post_comments(post_key, created_at);

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.community_posts, public.post_likes, public.post_comments FROM anon, authenticated;
GRANT SELECT, INSERT, DELETE ON public.community_posts, public.post_likes, public.post_comments TO authenticated;
GRANT ALL ON public.community_posts, public.post_likes, public.post_comments TO service_role;

CREATE POLICY "Read posts" ON public.community_posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Write own posts" ON public.community_posts FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Delete own posts" ON public.community_posts FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Read likes" ON public.post_likes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Like as me" ON public.post_likes FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Unlike as me" ON public.post_likes FOR DELETE TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Read comments" ON public.post_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Comment as me" ON public.post_comments FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Delete own comments" ON public.post_comments FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Feed de un drop: posteos de fans con autor, likes y comentarios, más los contadores de los posteos de ejemplo.
-- Solo expone nombre y foto de los autores (lo mismo que ya muestra el ranking).
CREATE OR REPLACE FUNCTION public.drop_feed(p_campaign text, p_seed_keys text[] DEFAULT '{}')
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT jsonb_build_object(
    'posts', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'key', 'p:' || p.id, 'id', p.id, 'user_id', p.user_id, 'text', p.text, 'sticker', p.sticker, 'created_at', p.created_at,
        'author', coalesce(pr.display_name, 'fan'), 'avatar', pr.avatar_url,
        'likes', (SELECT count(*) FROM post_likes l WHERE l.post_key = 'p:' || p.id),
        'comments', (SELECT count(*) FROM post_comments c WHERE c.post_key = 'p:' || p.id),
        'liked', EXISTS (SELECT 1 FROM post_likes l WHERE l.post_key = 'p:' || p.id AND l.user_id = auth.uid()),
        'following', EXISTS (SELECT 1 FROM fan_follows f WHERE f.user_id = auth.uid() AND f.followed_id = p.user_id),
        'mine', p.user_id = auth.uid()
      ) ORDER BY p.created_at DESC)
      FROM (SELECT * FROM community_posts WHERE campaign_id = p_campaign ORDER BY created_at DESC LIMIT 100) p
      LEFT JOIN profiles pr ON pr.id = p.user_id), '[]'::jsonb),
    'stats', coalesce((
      SELECT jsonb_object_agg(k, jsonb_build_object(
        'likes', (SELECT count(*) FROM post_likes l WHERE l.post_key = k),
        'comments', (SELECT count(*) FROM post_comments c WHERE c.post_key = k),
        'liked', EXISTS (SELECT 1 FROM post_likes l WHERE l.post_key = k AND l.user_id = auth.uid())))
      FROM unnest(p_seed_keys[1:50]) k), '{}'::jsonb));
$$;

CREATE OR REPLACE FUNCTION public.drop_post_comments(p_post_key text)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', c.id, 'user_id', c.user_id, 'text', c.text, 'created_at', c.created_at,
    'author', coalesce(pr.display_name, 'fan'), 'avatar', pr.avatar_url,
    'following', EXISTS (SELECT 1 FROM fan_follows f WHERE f.user_id = auth.uid() AND f.followed_id = c.user_id),
    'mine', c.user_id = auth.uid()
  ) ORDER BY c.created_at), '[]'::jsonb)
  FROM (SELECT * FROM post_comments WHERE post_key = p_post_key ORDER BY created_at LIMIT 200) c
  LEFT JOIN profiles pr ON pr.id = c.user_id;
$$;

-- Buscar fans por nombre para seguirlos (solo cuentas reales; devuelve nombre, foto y si ya lo seguís).
CREATE OR REPLACE FUNCTION public.drop_search_fans(p_query text)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'id', pr.id, 'display_name', pr.display_name, 'avatar_url', pr.avatar_url, 'points', pr.general_points,
    'following', EXISTS (SELECT 1 FROM fan_follows f WHERE f.user_id = auth.uid() AND f.followed_id = pr.id)
  )), '[]'::jsonb)
  FROM (
    SELECT id, display_name, avatar_url, general_points FROM profiles
    WHERE auth.uid() IS NOT NULL AND id <> auth.uid()
      AND char_length(trim(p_query)) >= 2
      AND display_name ILIKE '%' || replace(replace(trim(p_query), '%', ''), '_', '') || '%'
    ORDER BY general_points DESC LIMIT 20
  ) pr;
$$;

REVOKE ALL ON FUNCTION public.drop_feed(text, text[]), public.drop_post_comments(text), public.drop_search_fans(text) FROM public;
GRANT EXECUTE ON FUNCTION public.drop_feed(text, text[]), public.drop_post_comments(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.drop_search_fans(text) TO authenticated;
