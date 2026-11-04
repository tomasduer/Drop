CREATE FUNCTION public.drop_account_state() RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE uid uuid:=auth.uid();
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'authentication required'; END IF;
 RETURN jsonb_build_object('profile',(SELECT to_jsonb(p) FROM public.profiles p WHERE id=uid),'campaigns',coalesce((SELECT jsonb_agg(c) FROM public.campaigns c),'[]'),'missions',coalesce((SELECT jsonb_agg(m) FROM public.missions m),'[]'),'balances',coalesce((SELECT jsonb_agg(b) FROM public.campaign_balances b WHERE user_id=uid),'[]'),'attempts',coalesce((SELECT jsonb_agg(a) FROM public.mission_attempts a WHERE user_id=uid),'[]'),'movements',coalesce((SELECT jsonb_agg(t ORDER BY t.created_at DESC) FROM (SELECT * FROM public.point_movements WHERE user_id=uid ORDER BY created_at DESC LIMIT 100) t),'[]'),'rewards',coalesce((SELECT jsonb_agg(r) FROM public.reward_catalog r WHERE active),'[]'),'redemptions',coalesce((SELECT jsonb_agg(r) FROM public.reward_redemptions r WHERE user_id=uid),'[]'));
END $$;
REVOKE ALL ON FUNCTION public.drop_account_state() FROM PUBLIC,anon; GRANT EXECUTE ON FUNCTION public.drop_account_state() TO authenticated;
CREATE FUNCTION public.drop_ranking(p_campaign text,p_scope text DEFAULT 'Global') RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE uid uuid:=auth.uid(); week_start timestamptz; week_end timestamptz;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'authentication required'; END IF;
 IF p_scope NOT IN ('Global','Amigos','Semanal') THEN RAISE EXCEPTION 'invalid scope'; END IF;
 week_start:=date_trunc('week',now() AT TIME ZONE 'America/Argentina/Buenos_Aires') AT TIME ZONE 'America/Argentina/Buenos_Aires'; week_end:=week_start+interval '7 days';
 RETURN (WITH scores AS (
 SELECT p.id,p.display_name,p.avatar_url,coalesce(CASE WHEN p_scope='Semanal' THEN (SELECT sum(m.campaign_delta) FROM public.point_movements m WHERE m.user_id=p.id AND m.campaign_id=p_campaign AND m.evidence_type='drop_verified' AND m.created_at>=week_start AND m.created_at<week_end) ELSE b.score END,0) AS score,coalesce(b.completed_missions,0) AS missions,EXISTS(SELECT 1 FROM public.fan_follows f WHERE f.user_id=uid AND f.followed_id=p.id) AS following
 FROM public.profiles p LEFT JOIN public.campaign_balances b ON b.user_id=p.id AND b.campaign_id=p_campaign
 WHERE (b.user_id IS NOT NULL OR p.id=uid) AND (p_scope<>'Amigos' OR p.id=uid OR EXISTS(SELECT 1 FROM public.fan_follows f WHERE f.user_id=uid AND f.followed_id=p.id))
 ), ranked AS (SELECT *,dense_rank() OVER(ORDER BY score DESC) AS rank FROM scores)
 SELECT jsonb_build_object('rows',coalesce((SELECT jsonb_agg(x ORDER BY x.score DESC,x.id) FROM (SELECT * FROM ranked ORDER BY score DESC,id LIMIT 50) x),'[]'),'me',(SELECT to_jsonb(x) FROM ranked x WHERE id=uid),'week_start',week_start,'week_end',week_end));
END $$;
REVOKE ALL ON FUNCTION public.drop_ranking(text,text) FROM PUBLIC,anon; GRANT EXECUTE ON FUNCTION public.drop_ranking(text,text) TO authenticated;
CREATE FUNCTION public.drop_follow(p_followed uuid,p_follow boolean) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'authentication required'; END IF;
 IF p_followed=auth.uid() THEN RAISE EXCEPTION 'cannot follow self'; END IF;
 IF p_follow THEN INSERT INTO public.fan_follows(user_id,followed_id) VALUES(auth.uid(),p_followed) ON CONFLICT DO NOTHING;
 ELSE DELETE FROM public.fan_follows WHERE user_id=auth.uid() AND followed_id=p_followed; END IF;
 RETURN p_follow;
END $$;
REVOKE ALL ON FUNCTION public.drop_follow(uuid,boolean) FROM PUBLIC,anon; GRANT EXECUTE ON FUNCTION public.drop_follow(uuid,boolean) TO authenticated;