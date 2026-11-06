-- Notificaciones generales: likes y comentarios en tus posteos y seguidores nuevos.
ALTER TABLE public.fan_follows ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

CREATE OR REPLACE FUNCTION public.drop_notifications()
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  WITH mine AS (
    SELECT id, campaign_id, text FROM community_posts WHERE user_id = auth.uid()
  ), ev AS (
    SELECT 'like'::text AS kind, l.user_id AS actor_id, l.created_at, m.campaign_id, m.text AS post_text, NULL::text AS comment
      FROM post_likes l JOIN mine m ON l.post_key = 'p:' || m.id
     WHERE l.user_id <> auth.uid()
    UNION ALL
    SELECT 'comment', c.user_id, c.created_at, m.campaign_id, m.text, c.text
      FROM post_comments c JOIN mine m ON c.post_key = 'p:' || m.id
     WHERE c.user_id <> auth.uid()
    UNION ALL
    SELECT 'follow', f.user_id, f.created_at, NULL, NULL, NULL
      FROM fan_follows f WHERE f.followed_id = auth.uid()
  )
  SELECT coalesce(jsonb_agg(jsonb_build_object(
    'kind', e.kind, 'actor_id', e.actor_id, 'actor', coalesce(p.display_name, 'Un fan'), 'avatar', p.avatar_url,
    'created_at', e.created_at, 'campaign_id', e.campaign_id, 'post_text', left(e.post_text, 80), 'comment', left(e.comment, 120)
  ) ORDER BY e.created_at DESC), '[]'::jsonb)
  FROM (SELECT * FROM ev WHERE auth.uid() IS NOT NULL AND created_at > now() - interval '60 days' ORDER BY created_at DESC LIMIT 50) e
  LEFT JOIN profiles p ON p.id = e.actor_id;
$$;
REVOKE ALL ON FUNCTION public.drop_notifications() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.drop_notifications() TO authenticated;
