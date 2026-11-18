-- Desempate del ranking (términos y condiciones, nov 2026).
-- A igual puntaje queda arriba quien llegó primero a ese puntaje: se toma el momento del último
-- movimiento de puntos que lo llevó a su puntaje actual (en el semanal, dentro de esa semana).
-- Cada fan tiene un puesto único (row_number), ya no hay puestos compartidos.

CREATE OR REPLACE FUNCTION public.drop_ranking(p_campaign text, p_scope text DEFAULT 'Global'::text)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE uid uuid:=auth.uid(); week_start timestamptz; week_end timestamptz;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'authentication required'; END IF;
 IF p_scope NOT IN ('Global','Amigos','Semanal') THEN RAISE EXCEPTION 'invalid scope'; END IF;
 week_start:=date_trunc('week',now() AT TIME ZONE 'America/Argentina/Buenos_Aires') AT TIME ZONE 'America/Argentina/Buenos_Aires'; week_end:=week_start+interval '7 days';
 RETURN (WITH scores AS (
  SELECT p.id,p.display_name,p.avatar_url,
   coalesce(CASE WHEN p_scope='Semanal' THEN (SELECT sum(m.campaign_delta) FROM public.point_movements m WHERE m.user_id=p.id AND m.campaign_id=p_campaign AND m.evidence_type='drop_verified' AND m.created_at>=week_start AND m.created_at<week_end) ELSE b.score END,0) AS score,
   (SELECT max(m.created_at) FROM public.point_movements m WHERE m.user_id=p.id AND m.campaign_id=p_campaign AND m.campaign_delta<>0
      AND (p_scope<>'Semanal' OR (m.evidence_type='drop_verified' AND m.created_at>=week_start AND m.created_at<week_end))) AS reached_at,
   coalesce(b.completed_missions,0) AS missions,
   EXISTS(SELECT 1 FROM public.fan_follows f WHERE f.user_id=uid AND f.followed_id=p.id) AS following
  FROM public.profiles p LEFT JOIN public.campaign_balances b ON b.user_id=p.id AND b.campaign_id=p_campaign
  WHERE (b.user_id IS NOT NULL OR p.id=uid) AND (p_scope<>'Amigos' OR p.id=uid OR EXISTS(SELECT 1 FROM public.fan_follows f WHERE f.user_id=uid AND f.followed_id=p.id))
 ), ranked AS (SELECT *,row_number() OVER(ORDER BY score DESC, reached_at ASC NULLS LAST, id) AS rank FROM scores)
 SELECT jsonb_build_object('rows',coalesce((SELECT jsonb_agg(x ORDER BY x.rank) FROM (SELECT * FROM ranked ORDER BY rank LIMIT 50) x),'[]'),'me',(SELECT to_jsonb(x) FROM ranked x WHERE id=uid),'week_start',week_start,'week_end',week_end));
END $function$;

CREATE OR REPLACE FUNCTION public.drop_public_ranking(p_campaign text)
 RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $function$
  SELECT jsonb_build_object('rows', coalesce(jsonb_agg(x ORDER BY x.rank), '[]'::jsonb), 'me', NULL)
  FROM (
    SELECT * FROM (
      SELECT p.id, p.display_name, p.avatar_url, b.score, b.completed_missions AS missions, false AS following,
             row_number() OVER (ORDER BY b.score DESC,
               (SELECT max(m.created_at) FROM public.point_movements m WHERE m.user_id=b.user_id AND m.campaign_id=p_campaign AND m.campaign_delta<>0) ASC NULLS LAST,
               p.id) AS rank
      FROM public.campaign_balances b JOIN public.profiles p ON p.id=b.user_id
      WHERE b.campaign_id=p_campaign AND b.score>0
    ) r ORDER BY rank LIMIT 50
  ) x;
$function$;
