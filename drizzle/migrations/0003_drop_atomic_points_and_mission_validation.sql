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