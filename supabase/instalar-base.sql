-- DROP: estructura completa de la base. Pegalo entero en Supabase → SQL Editor → Run.
-- Generado a partir de drizzle/migrations (0000 a 0007).

-- ===== 0000_create_drop_profiles.sql =====
CREATE TABLE public.profiles (
 id uuid PRIMARY KEY,
 display_name text NOT NULL DEFAULT '',
 avatar_url text,
 favorite_artists text[] NOT NULL DEFAULT '{}',
 listened_albums text[] NOT NULL DEFAULT '{}',
 general_points integer NOT NULL DEFAULT 0,
 active_drop text NOT NULL DEFAULT 'lali',
 ranking_points jsonb NOT NULL DEFAULT '{}',
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- ===== 0001_real_auth_points.sql =====
CREATE TABLE public.point_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount integer NOT NULL CHECK (amount BETWEEN -500 AND 500 AND amount <> 0),
  reason text NOT NULL CHECK (reason IN ('album_listened','album_unlistened','ranking_redeem')),
  artist text,
  reference text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.point_movements TO authenticated;
GRANT ALL ON public.point_movements TO service_role;
ALTER TABLE public.point_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own movements" ON public.point_movements FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Insert own movements" ON public.point_movements FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE INDEX point_movements_user_idx ON public.point_movements(user_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.apply_point_movement() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE bal integer;
BEGIN
  SELECT general_points INTO bal FROM profiles WHERE id = NEW.user_id FOR UPDATE;
  IF bal IS NULL THEN RAISE EXCEPTION 'profile missing'; END IF;
  IF NEW.reason = 'ranking_redeem' THEN
    IF NEW.amount >= 0 OR NEW.artist IS NULL THEN RAISE EXCEPTION 'invalid redeem'; END IF;
    IF bal + NEW.amount < 0 THEN RAISE EXCEPTION 'insufficient points'; END IF;
    UPDATE profiles SET general_points = general_points + NEW.amount,
      ranking_points = jsonb_set(ranking_points, ARRAY[NEW.artist], to_jsonb(COALESCE((ranking_points->>NEW.artist)::int,0) - NEW.amount))
      WHERE id = NEW.user_id;
  ELSE
    IF (NEW.reason = 'album_listened' AND NEW.amount <> 120) OR (NEW.reason = 'album_unlistened' AND NEW.amount <> -120) THEN RAISE EXCEPTION 'invalid album amount'; END IF;
    UPDATE profiles SET general_points = GREATEST(0, general_points + NEW.amount) WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER point_movements_apply AFTER INSERT ON public.point_movements FOR EACH ROW EXECUTE FUNCTION public.apply_point_movement();

REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (display_name, avatar_url, favorite_artists, listened_albums, active_drop) ON public.profiles TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (NEW.id, COALESCE(NULLIF(NEW.raw_user_meta_data->>'display_name',''), NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1), 'Fan DROP'), NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===== 0002_drop_campaign_mission_foundation.sql =====
CREATE TABLE public.campaigns (id text PRIMARY KEY,artist text NOT NULL,title text NOT NULL,status text NOT NULL DEFAULT 'pending' CHECK(status IN ('active','pending','closed')));
GRANT SELECT ON public.campaigns TO authenticated; GRANT ALL ON public.campaigns TO service_role;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read campaigns" ON public.campaigns FOR SELECT TO authenticated USING(true);
CREATE TABLE public.missions (id text PRIMARY KEY,campaign_id text NOT NULL REFERENCES public.campaigns(id),title text NOT NULL,kind text NOT NULL CHECK(kind IN ('trivia','order','clue','stream','scan','ar')),status text NOT NULL DEFAULT 'demo' CHECK(status IN ('verified','demo','pending')),general_reward integer NOT NULL DEFAULT 0 CHECK(general_reward BETWEEN 0 AND 500),campaign_reward integer NOT NULL DEFAULT 0 CHECK(campaign_reward BETWEEN 0 AND 500),repeat_period text NOT NULL DEFAULT 'once' CHECK(repeat_period IN ('once','daily')),max_checks integer NOT NULL DEFAULT 1 CHECK(max_checks BETWEEN 1 AND 20),question_seconds integer NOT NULL DEFAULT 20 CHECK(question_seconds BETWEEN 5 AND 300),opens_at timestamptz,closes_at timestamptz);
GRANT SELECT ON public.missions TO authenticated; GRANT ALL ON public.missions TO service_role;
ALTER TABLE public.missions ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read missions" ON public.missions FOR SELECT TO authenticated USING(true);
CREATE TABLE public.mission_validation_rules (mission_id text PRIMARY KEY REFERENCES public.missions(id),rules jsonb NOT NULL);
GRANT ALL ON public.mission_validation_rules TO service_role; ALTER TABLE public.mission_validation_rules ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.mission_attempts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES public.profiles(id),mission_id text NOT NULL REFERENCES public.missions(id),period_key text NOT NULL,status text NOT NULL DEFAULT 'playing' CHECK(status IN ('playing','completed')),answers jsonb NOT NULL DEFAULT '[]',checks integer NOT NULL DEFAULT 0,deadline timestamptz NOT NULL,general_award integer NOT NULL DEFAULT 0,campaign_award integer NOT NULL DEFAULT 0,created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(user_id,mission_id,period_key));
GRANT SELECT ON public.mission_attempts TO authenticated; GRANT ALL ON public.mission_attempts TO service_role;
ALTER TABLE public.mission_attempts ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read own attempts" ON public.mission_attempts FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE TABLE public.mission_completions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),attempt_id uuid NOT NULL UNIQUE REFERENCES public.mission_attempts(id),user_id uuid NOT NULL REFERENCES public.profiles(id),mission_id text NOT NULL REFERENCES public.missions(id),period_key text NOT NULL,general_award integer NOT NULL,campaign_award integer NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(user_id,mission_id,period_key));
GRANT SELECT ON public.mission_completions TO authenticated; GRANT ALL ON public.mission_completions TO service_role;
ALTER TABLE public.mission_completions ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read own completions" ON public.mission_completions FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE TABLE public.mission_clue_discoveries (attempt_id uuid NOT NULL REFERENCES public.mission_attempts(id),clue_key text NOT NULL,PRIMARY KEY(attempt_id,clue_key));
GRANT ALL ON public.mission_clue_discoveries TO service_role; ALTER TABLE public.mission_clue_discoveries ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.campaign_balances (user_id uuid NOT NULL REFERENCES public.profiles(id),campaign_id text NOT NULL REFERENCES public.campaigns(id),score integer NOT NULL DEFAULT 0 CHECK(score>=0),completed_missions integer NOT NULL DEFAULT 0,PRIMARY KEY(user_id,campaign_id));
GRANT SELECT ON public.campaign_balances TO authenticated; GRANT ALL ON public.campaign_balances TO service_role;
ALTER TABLE public.campaign_balances ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read own balances" ON public.campaign_balances FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE TABLE public.fan_follows (user_id uuid NOT NULL REFERENCES public.profiles(id),followed_id uuid NOT NULL REFERENCES public.profiles(id),PRIMARY KEY(user_id,followed_id),CHECK(user_id<>followed_id));
GRANT SELECT ON public.fan_follows TO authenticated; GRANT ALL ON public.fan_follows TO service_role;
ALTER TABLE public.fan_follows ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read own follows" ON public.fan_follows FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE TABLE public.reward_catalog (id text PRIMARY KEY,title text NOT NULL,cost integer NOT NULL CHECK(cost BETWEEN 1 AND 500),active boolean NOT NULL DEFAULT false,available integer CHECK(available>=0));
GRANT SELECT ON public.reward_catalog TO authenticated; GRANT ALL ON public.reward_catalog TO service_role;
ALTER TABLE public.reward_catalog ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read active rewards" ON public.reward_catalog FOR SELECT TO authenticated USING(active);
CREATE TABLE public.reward_redemptions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(),user_id uuid NOT NULL REFERENCES public.profiles(id),reward_id text NOT NULL REFERENCES public.reward_catalog(id),cost integer NOT NULL,title text NOT NULL,created_at timestamptz NOT NULL DEFAULT now(),UNIQUE(user_id,reward_id));
GRANT SELECT ON public.reward_redemptions TO authenticated; GRANT ALL ON public.reward_redemptions TO service_role;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY; CREATE POLICY "Read own redemptions" ON public.reward_redemptions FOR SELECT TO authenticated USING(user_id=auth.uid());
ALTER TABLE public.point_movements ADD COLUMN campaign_id text REFERENCES public.campaigns(id),ADD COLUMN campaign_delta integer NOT NULL DEFAULT 0,ADD COLUMN evidence_type text NOT NULL DEFAULT 'legacy',ADD COLUMN completion_id uuid UNIQUE REFERENCES public.mission_completions(id),ADD COLUMN redemption_id uuid UNIQUE REFERENCES public.reward_redemptions(id),ADD COLUMN idempotency_key text UNIQUE;
ALTER TABLE public.point_movements DROP CONSTRAINT point_movements_reason_check;
ALTER TABLE public.point_movements ADD CONSTRAINT point_movements_reason_check CHECK(reason IN ('album_listened','album_unlistened','ranking_redeem','mission_reward','reward_redeem'));
ALTER TABLE public.point_movements DROP CONSTRAINT point_movements_amount_check;
ALTER TABLE public.point_movements ADD CONSTRAINT point_movements_amount_check CHECK(amount BETWEEN -500 AND 500 AND (amount<>0 OR campaign_delta>0));
COMMENT ON COLUMN public.profiles.ranking_points IS 'DEPRECATED: preserved historical artist totals; new mission participation uses campaign_balances';
CREATE INDEX point_movements_campaign_idx ON public.point_movements(campaign_id,created_at);
CREATE INDEX fan_follows_target_idx ON public.fan_follows(followed_id);

-- ===== 0003_drop_atomic_points_and_mission_validation.sql =====
CREATE OR REPLACE FUNCTION public.apply_point_movement() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE bal integer; a public.mission_completions; r public.reward_redemptions;
BEGIN
 SELECT general_points INTO bal FROM public.profiles WHERE id=NEW.user_id FOR UPDATE;
 IF bal IS NULL THEN RAISE EXCEPTION 'profile missing'; END IF;
 IF NEW.evidence_type='legacy' THEN RAISE EXCEPTION 'legacy movements are read only'; END IF;
 IF NEW.reason='mission_reward' THEN
  SELECT * INTO a FROM public.mission_completions WHERE id=NEW.completion_id;
  IF a.id IS NULL OR a.user_id<>NEW.user_id OR a.general_award<>NEW.amount OR a.campaign_award<>NEW.campaign_delta OR NEW.campaign_id IS DISTINCT FROM (SELECT campaign_id FROM public.missions WHERE id=a.mission_id) OR NEW.evidence_type<>'drop_verified' THEN RAISE EXCEPTION 'invalid mission reward'; END IF;
  INSERT INTO public.campaign_balances(user_id,campaign_id,score,completed_missions) VALUES(NEW.user_id,NEW.campaign_id,NEW.campaign_delta,1) ON CONFLICT(user_id,campaign_id) DO UPDATE SET score=public.campaign_balances.score+EXCLUDED.score,completed_missions=public.campaign_balances.completed_missions+1;
 ELSIF NEW.reason='reward_redeem' THEN
  SELECT * INTO r FROM public.reward_redemptions WHERE id=NEW.redemption_id;
  IF r.id IS NULL OR r.user_id<>NEW.user_id OR NEW.amount<>-r.cost OR NEW.campaign_delta<>0 THEN RAISE EXCEPTION 'invalid redemption'; END IF;
 ELSIF NEW.reason IN ('album_listened','album_unlistened') THEN
  IF NEW.amount<>(CASE WHEN NEW.reason='album_listened' THEN 120 ELSE -120 END) OR NEW.evidence_type<>'self_reported' OR NEW.campaign_delta<>0 THEN RAISE EXCEPTION 'invalid album reward'; END IF;
 ELSE RAISE EXCEPTION 'ranking exchanges retired'; END IF;
 IF bal+NEW.amount<0 THEN RAISE EXCEPTION 'insufficient points'; END IF;
 UPDATE public.profiles SET general_points=general_points+NEW.amount WHERE id=NEW.user_id;
 RETURN NEW;
END $$;
CREATE FUNCTION public.drop_complete_attempt(p_id uuid,p_general integer,p_campaign integer) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE a public.mission_attempts; cid uuid; campaign text;
BEGIN
 SELECT * INTO a FROM public.mission_attempts WHERE id=p_id FOR UPDATE;
 IF a.status='completed' THEN RETURN; END IF;
 UPDATE public.mission_attempts SET status='completed',general_award=p_general,campaign_award=p_campaign WHERE id=p_id;
 INSERT INTO public.mission_completions(attempt_id,user_id,mission_id,period_key,general_award,campaign_award) VALUES(a.id,a.user_id,a.mission_id,a.period_key,p_general,p_campaign) RETURNING id INTO cid;
 SELECT campaign_id INTO campaign FROM public.missions WHERE id=a.mission_id;
 IF p_general<>0 OR p_campaign<>0 THEN
 INSERT INTO public.point_movements(user_id,amount,reason,campaign_id,campaign_delta,evidence_type,completion_id,reference,idempotency_key) VALUES(a.user_id,p_general,'mission_reward',campaign,p_campaign,'drop_verified',cid,a.mission_id,'mission:'||a.id::text);
 ELSE INSERT INTO public.campaign_balances(user_id,campaign_id,completed_missions) VALUES(a.user_id,campaign,1) ON CONFLICT(user_id,campaign_id) DO UPDATE SET completed_missions=public.campaign_balances.completed_missions+1;
 END IF;
END $$;
REVOKE ALL ON FUNCTION public.drop_complete_attempt(uuid,integer,integer) FROM PUBLIC,anon,authenticated;
CREATE FUNCTION public.drop_mission_action(p_action text,p_payload jsonb DEFAULT '{}') RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE uid uuid:=auth.uid(); m public.missions; a public.mission_attempts; rules jsonb; period text; n integer; idx integer; ans integer; right_count integer; ga integer; ca integer; result jsonb; clue text;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'authentication required'; END IF;
 IF p_action='start' THEN SELECT * INTO m FROM public.missions WHERE id=p_payload->>'mission_id';
 ELSE SELECT * INTO a FROM public.mission_attempts WHERE id=(p_payload->>'attempt_id')::uuid AND user_id=uid FOR UPDATE; SELECT * INTO m FROM public.missions WHERE id=a.mission_id; END IF;
 IF m.id IS NULL OR m.status<>'verified' OR NOT EXISTS(SELECT 1 FROM public.campaigns WHERE id=m.campaign_id AND status='active') THEN RAISE EXCEPTION 'mission unavailable'; END IF;
 IF (m.opens_at IS NOT NULL AND now()<m.opens_at) OR (m.closes_at IS NOT NULL AND now()>=m.closes_at) THEN RAISE EXCEPTION 'mission outside availability'; END IF;
 SELECT v.rules INTO rules FROM public.mission_validation_rules v WHERE mission_id=m.id;
 IF rules IS NULL THEN RAISE EXCEPTION 'validation unavailable'; END IF;
 IF p_action='start' THEN
  period:=CASE WHEN m.repeat_period='daily' THEN (now() AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text ELSE 'once' END;
  INSERT INTO public.mission_attempts(user_id,mission_id,period_key,deadline) VALUES(uid,m.id,period,now()+make_interval(secs=>m.question_seconds)) ON CONFLICT(user_id,mission_id,period_key) DO NOTHING;
  SELECT * INTO a FROM public.mission_attempts WHERE user_id=uid AND mission_id=m.id AND period_key=period FOR UPDATE;
 ELSIF a.status<>'completed' THEN
  IF m.kind='trivia' AND p_action='answer' THEN
   idx:=jsonb_array_length(a.answers); n:=jsonb_array_length(rules->'questions');
   IF (p_payload->>'index')::integer IS DISTINCT FROM idx THEN RAISE EXCEPTION 'answer out of sequence'; END IF;
   ans:=(p_payload->>'answer')::integer;
   IF ans IS NULL OR ans < -1 OR ans>=jsonb_array_length(rules->'questions'->idx->'options') THEN RAISE EXCEPTION 'invalid answer'; END IF;
   IF now()>a.deadline THEN ans:=-1; END IF;
   UPDATE public.mission_attempts SET answers=answers||jsonb_build_array(ans),deadline=now()+make_interval(secs=>m.question_seconds) WHERE id=a.id RETURNING * INTO a;
   IF idx+1=n THEN
    SELECT count(*) INTO right_count FROM jsonb_array_elements(a.answers) WITH ORDINALITY x(value,pos) WHERE (x.value::text)::integer=(rules->'questions'->((x.pos-1)::integer)->>'correct')::integer;
    PERFORM public.drop_complete_attempt(a.id,m.general_reward*right_count/n,m.campaign_reward*right_count/n);
   END IF;
  ELSIF m.kind='order' AND p_action='check' THEN
   UPDATE public.mission_attempts SET checks=checks+1 WHERE id=a.id RETURNING * INTO a;
   IF p_payload->'sequence'=rules->'sequence' THEN
    ga:=greatest(0,m.general_reward-(a.checks-1)*coalesce((rules->>'penalty')::integer,40)); ca:=greatest(0,m.campaign_reward-(a.checks-1)*coalesce((rules->>'penalty')::integer,40));
    PERFORM public.drop_complete_attempt(a.id,ga,ca);
   ELSIF a.checks>=m.max_checks THEN PERFORM public.drop_complete_attempt(a.id,0,0); END IF;
  ELSIF m.kind='clue' AND p_action='check' THEN
   UPDATE public.mission_attempts SET checks=checks+1 WHERE id=a.id RETURNING * INTO a; clue:=p_payload->>'code';
   IF EXISTS(SELECT 1 FROM jsonb_array_elements_text(rules->'codes') c WHERE lower(trim(c.value))=lower(trim(clue))) THEN
    INSERT INTO public.mission_clue_discoveries(attempt_id,clue_key) VALUES(a.id,lower(trim(clue))) ON CONFLICT DO NOTHING;
    IF (SELECT count(*) FROM public.mission_clue_discoveries WHERE attempt_id=a.id)>=jsonb_array_length(rules->'codes') THEN PERFORM public.drop_complete_attempt(a.id,m.general_reward,m.campaign_reward); END IF;
   END IF;
   IF a.checks>=m.max_checks AND (SELECT status FROM public.mission_attempts WHERE id=a.id)<>'completed' THEN PERFORM public.drop_complete_attempt(a.id,0,0); END IF;
  ELSE RAISE EXCEPTION 'unsupported action'; END IF;
 END IF;
 SELECT * INTO a FROM public.mission_attempts WHERE id=a.id;
 result:=jsonb_build_object('id',a.id,'status',a.status,'index',jsonb_array_length(a.answers),'checks',a.checks,'deadline',a.deadline,'general_award',a.general_award,'campaign_award',a.campaign_award);
 IF a.status='playing' AND m.kind='trivia' THEN idx:=jsonb_array_length(a.answers); result:=result||jsonb_build_object('question',(rules->'questions'->idx)-'correct','total',jsonb_array_length(rules->'questions')); END IF;
 RETURN result;
END $$;
REVOKE ALL ON FUNCTION public.drop_mission_action(text,jsonb) FROM PUBLIC,anon; GRANT EXECUTE ON FUNCTION public.drop_mission_action(text,jsonb) TO authenticated;
CREATE FUNCTION public.drop_points_action(p_action text,p_payload jsonb DEFAULT '{}') RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE uid uuid:=auth.uid(); p public.profiles; r public.reward_catalog; rid uuid; ref text; done boolean; target boolean;
BEGIN
 IF uid IS NULL THEN RAISE EXCEPTION 'authentication required'; END IF;
 SELECT * INTO p FROM public.profiles WHERE id=uid FOR UPDATE;
 IF p.id IS NULL THEN RAISE EXCEPTION 'profile missing'; END IF;
 IF p_action='album' THEN
  ref:=p_payload->>'album_id'; target:=(p_payload->>'listened')::boolean;
  IF ref IS NULL OR target IS NULL OR ref NOT IN ('nvaa','lali','libra','brava','soy','abailar','nena','mechon') THEN RAISE EXCEPTION 'album unavailable'; END IF;
  done:=ref=ANY(p.listened_albums);
  IF done<>target THEN
   IF NOT target AND p.general_points<120 THEN RAISE EXCEPTION 'insufficient points'; END IF;
   UPDATE public.profiles SET listened_albums=CASE WHEN target THEN array_append(listened_albums,ref) ELSE array_remove(listened_albums,ref) END WHERE id=uid;
   INSERT INTO public.point_movements(user_id,amount,reason,reference,evidence_type) VALUES(uid,CASE WHEN target THEN 120 ELSE -120 END,CASE WHEN target THEN 'album_listened' ELSE 'album_unlistened' END,ref,'self_reported');
  END IF;
 ELSIF p_action='redeem' THEN
  SELECT * INTO r FROM public.reward_catalog WHERE id=p_payload->>'reward_id' AND active FOR UPDATE;
  IF r.id IS NULL OR r.available=0 THEN RAISE EXCEPTION 'reward unavailable'; END IF;
  IF EXISTS(SELECT 1 FROM public.reward_redemptions WHERE user_id=uid AND reward_id=r.id) THEN RETURN jsonb_build_object('already_redeemed',true); END IF;
  IF p.general_points<r.cost THEN RAISE EXCEPTION 'insufficient points'; END IF;
  INSERT INTO public.reward_redemptions(user_id,reward_id,cost,title) VALUES(uid,r.id,r.cost,r.title) RETURNING id INTO rid;
  INSERT INTO public.point_movements(user_id,amount,reason,evidence_type,redemption_id,reference,idempotency_key) VALUES(uid,-r.cost,'reward_redeem','reward_redemption',rid,r.id,'reward:'||rid::text);
  IF r.available IS NOT NULL THEN UPDATE public.reward_catalog SET available=available-1 WHERE id=r.id; END IF;
 ELSE RAISE EXCEPTION 'unsupported points action'; END IF;
 RETURN jsonb_build_object('ok',true);
END $$;
REVOKE ALL ON FUNCTION public.drop_points_action(text,jsonb) FROM PUBLIC,anon; GRANT EXECUTE ON FUNCTION public.drop_points_action(text,jsonb) TO authenticated;
REVOKE ALL ON public.point_movements FROM anon,authenticated; GRANT SELECT ON public.point_movements TO authenticated; GRANT ALL ON public.point_movements TO service_role;
DROP POLICY "Insert own movements" ON public.point_movements;
REVOKE ALL ON public.profiles FROM anon,authenticated; GRANT SELECT ON public.profiles TO authenticated; GRANT UPDATE(display_name,avatar_url,favorite_artists,active_drop) ON public.profiles TO authenticated; GRANT ALL ON public.profiles TO service_role;
DROP POLICY "Create own profile" ON public.profiles;
REVOKE ALL ON FUNCTION public.apply_point_movement(),public.handle_new_user() FROM PUBLIC,anon,authenticated;

-- ===== 0004_drop_private_state_and_real_rankings.sql =====
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

-- ===== 0005_drop_narrow_private_table_grants.sql =====
REVOKE ALL ON public.mission_validation_rules,public.mission_clue_discoveries FROM anon,authenticated; GRANT ALL ON public.mission_validation_rules,public.mission_clue_discoveries TO service_role;
REVOKE ALL ON public.campaigns,public.missions,public.mission_attempts,public.mission_completions,public.campaign_balances,public.fan_follows,public.reward_catalog,public.reward_redemptions FROM anon,authenticated;
GRANT SELECT ON public.campaigns,public.missions,public.mission_attempts,public.mission_completions,public.campaign_balances,public.fan_follows,public.reward_catalog,public.reward_redemptions TO authenticated;
GRANT ALL ON public.campaigns,public.missions,public.mission_attempts,public.mission_completions,public.campaign_balances,public.fan_follows,public.reward_catalog,public.reward_redemptions TO service_role;

-- ===== 0006_drop_mission_supported_validation_guards.sql =====
CREATE FUNCTION public.drop_validate_mission_config() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN IF NEW.status='verified' AND NEW.kind NOT IN ('trivia','order','clue') THEN RAISE EXCEPTION 'this activity has no supported validator'; END IF; RETURN NEW; END $$;
REVOKE ALL ON FUNCTION public.drop_validate_mission_config() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER mission_config_validation BEFORE INSERT OR UPDATE ON public.missions FOR EACH ROW EXECUTE FUNCTION public.drop_validate_mission_config();
CREATE FUNCTION public.drop_validate_attempt_period() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN IF NEW.status='playing' AND EXISTS(SELECT 1 FROM public.missions m WHERE m.id=NEW.mission_id AND m.repeat_period='daily') AND NEW.period_key<>(now() AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text THEN RAISE EXCEPTION 'daily attempt expired'; END IF; RETURN NEW; END $$;
REVOKE ALL ON FUNCTION public.drop_validate_attempt_period() FROM PUBLIC,anon,authenticated;
CREATE TRIGGER mission_attempt_period BEFORE UPDATE ON public.mission_attempts FOR EACH ROW EXECUTE FUNCTION public.drop_validate_attempt_period();
REVOKE ALL ON FUNCTION public.drop_complete_attempt(uuid,integer,integer) FROM service_role;

-- ===== 0007_explorar_mi_drop.sql =====
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

