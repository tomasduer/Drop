-- Dashboard analítico para administradoras: métricas reales por drop.
-- Solo responde a cuentas de drop_admins (is_drop_admin); a cualquier otra le tira error.

-- Resumen de todos los drops (una fila por campaña).
CREATE OR REPLACE FUNCTION public.drop_admin_overview() RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_drop_admin() THEN RAISE EXCEPTION 'solo administradoras'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
      'campaign_id', c.id,
      'participants', (SELECT count(*) FROM campaign_balances b WHERE b.campaign_id = c.id AND b.score > 0),
      'points', (SELECT coalesce(sum(b.score), 0) FROM campaign_balances b WHERE b.campaign_id = c.id),
      'completions', (SELECT count(*) FROM mission_completions mc JOIN missions m ON m.id = mc.mission_id WHERE m.campaign_id = c.id),
      'active_7d', (SELECT count(DISTINCT mc.user_id) FROM mission_completions mc JOIN missions m ON m.id = mc.mission_id WHERE m.campaign_id = c.id AND mc.created_at >= now() - interval '7 days'),
      'saves', (SELECT count(*) FROM drop_saves s WHERE s.campaign_id = c.id)
    ) ORDER BY c.id)
    FROM campaigns c
  ), '[]'::jsonb);
END $$;

-- Detalle de un drop.
CREATE OR REPLACE FUNCTION public.drop_admin_stats(p_campaign text) RETURNS jsonb
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE
  v_participants int;
BEGIN
  IF NOT public.is_drop_admin() THEN RAISE EXCEPTION 'solo administradoras'; END IF;
  SELECT count(*) INTO v_participants FROM campaign_balances WHERE campaign_id = p_campaign AND score > 0;
  RETURN jsonb_build_object(
    'participants', v_participants,
    'points', (SELECT coalesce(sum(score), 0) FROM campaign_balances WHERE campaign_id = p_campaign),
    'saves', (SELECT count(*) FROM drop_saves WHERE campaign_id = p_campaign),
    'completions', (SELECT count(*) FROM mission_completions mc JOIN missions m ON m.id = mc.mission_id WHERE m.campaign_id = p_campaign),
    'active_7d', (SELECT count(DISTINCT mc.user_id) FROM mission_completions mc JOIN missions m ON m.id = mc.mission_id WHERE m.campaign_id = p_campaign AND mc.created_at >= now() - interval '7 days'),
    'new_7d', (SELECT count(*) FROM (
        SELECT mc.user_id FROM mission_completions mc JOIN missions m ON m.id = mc.mission_id
        WHERE m.campaign_id = p_campaign GROUP BY mc.user_id HAVING min(mc.created_at) >= now() - interval '7 days') x),
    'posts', (SELECT count(*) FROM community_posts WHERE campaign_id = p_campaign),
    'likes', (SELECT count(*) FROM post_likes l WHERE l.post_key LIKE 'seed:' || p_campaign || ':%'
                OR l.post_key IN (SELECT 'p:' || p.id FROM community_posts p WHERE p.campaign_id = p_campaign)),
    'missions', coalesce((
      SELECT jsonb_agg(jsonb_build_object(
        'id', m.id, 'title', m.title, 'kind', m.kind,
        'completions', (SELECT count(*) FROM mission_completions mc WHERE mc.mission_id = m.id),
        'fans', (SELECT count(DISTINCT mc.user_id) FROM mission_completions mc WHERE mc.mission_id = m.id)
      ) ORDER BY m.id)
      FROM missions m WHERE m.campaign_id = p_campaign AND m.status = 'verified'), '[]'::jsonb),
    'daily', coalesce((
      SELECT jsonb_agg(jsonb_build_object('day', d::date, 'completions',
        (SELECT count(*) FROM mission_completions mc JOIN missions m ON m.id = mc.mission_id
          WHERE m.campaign_id = p_campaign AND mc.created_at >= d AND mc.created_at < d + interval '1 day')) ORDER BY d)
      FROM generate_series(date_trunc('day', now()) - interval '13 days', date_trunc('day', now()), interval '1 day') d), '[]'::jsonb),
    'top', coalesce((
      SELECT jsonb_agg(t ORDER BY t.score DESC) FROM (
        SELECT pr.display_name, pr.avatar_url, b.score, b.completed_missions AS missions
        FROM campaign_balances b JOIN profiles pr ON pr.id = b.user_id
        WHERE b.campaign_id = p_campaign AND b.score > 0
        ORDER BY b.score DESC LIMIT 10) t), '[]'::jsonb)
  );
END $$;

REVOKE ALL ON FUNCTION public.drop_admin_overview() FROM public, anon;
REVOKE ALL ON FUNCTION public.drop_admin_stats(text) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.drop_admin_overview() TO authenticated;
GRANT EXECUTE ON FUNCTION public.drop_admin_stats(text) TO authenticated;
