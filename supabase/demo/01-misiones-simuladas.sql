-- Misiones de streaming, QR y AR: validación simulada (completar = acreditar).
CREATE OR REPLACE FUNCTION public.drop_validate_mission_config()
 RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public'
AS $function$ BEGIN IF NEW.status='verified' AND NEW.kind NOT IN ('trivia','order','clue','stream','scan','ar') THEN RAISE EXCEPTION 'this activity has no supported validator'; END IF; RETURN NEW; END $function$;

CREATE OR REPLACE FUNCTION public.drop_mission_action(p_action text, p_payload jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
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
  ELSIF m.kind IN ('stream','scan','ar') AND p_action='check' THEN
   -- Prototipo: la experiencia se simula en la app y completarla acredita el premio.
   UPDATE public.mission_attempts SET checks=checks+1 WHERE id=a.id RETURNING * INTO a;
   PERFORM public.drop_complete_attempt(a.id,m.general_reward,m.campaign_reward);
  ELSE RAISE EXCEPTION 'unsupported action'; END IF;
 END IF;
 SELECT * INTO a FROM public.mission_attempts WHERE id=a.id;
 result:=jsonb_build_object('id',a.id,'status',a.status,'index',jsonb_array_length(a.answers),'checks',a.checks,'deadline',a.deadline,'general_award',a.general_award,'campaign_award',a.campaign_award);
 IF a.status='playing' AND m.kind='trivia' THEN idx:=jsonb_array_length(a.answers); result:=result||jsonb_build_object('question',(rules->'questions'->idx)-'correct','total',jsonb_array_length(rules->'questions')); END IF;
 RETURN result;
END $function$;

INSERT INTO public.mission_validation_rules(mission_id,rules) VALUES
 ('lali-stream','{"simulated":true,"plays":3}'),
 ('lali-order','{"sequence":[1,2,3,4],"penalty":40}'),
 ('lali-qr','{"simulated":true}'),
 ('lali-ar','{"simulated":true}')
ON CONFLICT (mission_id) DO UPDATE SET rules=EXCLUDED.rules;

UPDATE public.missions SET status='verified', general_reward=120, campaign_reward=240, repeat_period='daily', question_seconds=300 WHERE id='lali-stream';
UPDATE public.missions SET status='verified', general_reward=200, campaign_reward=400, repeat_period='once', max_checks=3, question_seconds=300 WHERE id='lali-order';
UPDATE public.missions SET status='verified', general_reward=500, campaign_reward=500, repeat_period='once', question_seconds=300 WHERE id='lali-qr';
UPDATE public.missions SET status='verified', general_reward=350, campaign_reward=500, repeat_period='once', question_seconds=300 WHERE id='lali-ar';
