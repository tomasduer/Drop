-- Trivia diaria rotativa: cada día se eligen 5 preguntas de un pozo de 20.
CREATE OR REPLACE FUNCTION public.drop_round_questions(p_rules jsonb, p_period text)
RETURNS jsonb LANGUAGE sql IMMUTABLE SET search_path TO 'public' AS $$
  SELECT CASE WHEN p_rules ? 'pool' THEN (
    SELECT coalesce(jsonb_agg(x.q ORDER BY md5(p_period || ':' || x.i::text)), '[]'::jsonb) FROM (
      SELECT q, i FROM jsonb_array_elements(p_rules->'pool') WITH ORDINALITY t(q, i)
      ORDER BY md5(p_period || ':' || i::text) LIMIT coalesce((p_rules->>'per_round')::int, 5)
    ) x)
  ELSE p_rules->'questions' END;
$$;

CREATE OR REPLACE FUNCTION public.drop_mission_action(p_action text, p_payload jsonb DEFAULT '{}'::jsonb)
 RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE uid uuid:=auth.uid(); m public.missions; a public.mission_attempts; rules jsonb; qs jsonb; period text; n integer; idx integer; ans integer; right_count integer; ga integer; ca integer; result jsonb; clue text;
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
   qs:=public.drop_round_questions(rules,a.period_key);
   idx:=jsonb_array_length(a.answers); n:=jsonb_array_length(qs);
   IF (p_payload->>'index')::integer IS DISTINCT FROM idx THEN RAISE EXCEPTION 'answer out of sequence'; END IF;
   ans:=(p_payload->>'answer')::integer;
   IF ans IS NULL OR ans < -1 OR ans>=jsonb_array_length(qs->idx->'options') THEN RAISE EXCEPTION 'invalid answer'; END IF;
   IF now()>a.deadline THEN ans:=-1; END IF;
   UPDATE public.mission_attempts SET answers=answers||jsonb_build_array(ans),deadline=now()+make_interval(secs=>m.question_seconds) WHERE id=a.id RETURNING * INTO a;
   IF idx+1=n THEN
    SELECT count(*) INTO right_count FROM jsonb_array_elements(a.answers) WITH ORDINALITY x(value,pos) WHERE (x.value::text)::integer=(qs->((x.pos-1)::integer)->>'correct')::integer;
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
   UPDATE public.mission_attempts SET checks=checks+1 WHERE id=a.id RETURNING * INTO a;
   PERFORM public.drop_complete_attempt(a.id,m.general_reward,m.campaign_reward);
  ELSE RAISE EXCEPTION 'unsupported action'; END IF;
 END IF;
 SELECT * INTO a FROM public.mission_attempts WHERE id=a.id;
 result:=jsonb_build_object('id',a.id,'status',a.status,'index',jsonb_array_length(a.answers),'checks',a.checks,'deadline',a.deadline,'general_award',a.general_award,'campaign_award',a.campaign_award);
 IF a.status='playing' AND m.kind='trivia' THEN qs:=public.drop_round_questions(rules,a.period_key); idx:=jsonb_array_length(a.answers); result:=result||jsonb_build_object('question',(qs->idx)-'correct','total',jsonb_array_length(qs)); END IF;
 RETURN result;
END $function$;

UPDATE public.mission_validation_rules SET rules = $json${"pool": [{"q": "¿En qué año salió A Bailar, el primer álbum solista de LALI?", "options": ["2012", "2014", "2016"], "correct": 1}, {"q": "¿Cuál es el nombre completo de LALI?", "options": ["Mariana Espósito", "Mariela Esposito", "Mariana Espinoza"], "correct": 0}, {"q": "¿En qué tira juvenil se hizo conocida LALI?", "options": ["Patito Feo", "Casi Ángeles", "Floricienta"], "correct": 1}, {"q": "¿Cómo se llamaba la banda que nació de Casi Ángeles?", "options": ["Teen Angels", "Erreway", "Bandana"], "correct": 0}, {"q": "¿Qué personaje interpretaba LALI en Casi Ángeles?", "options": ["Mar", "Cielo", "Jazmín"], "correct": 0}, {"q": "¿En qué año salió el álbum Soy?", "options": ["2015", "2016", "2018"], "correct": 1}, {"q": "¿Qué disco de LALI incluye \"Una na\"?", "options": ["Soy", "BRAVA", "LIBRA"], "correct": 1}, {"q": "¿Con quién canta LALI \"100 grados\"?", "options": ["A.CHAL", "CNCO", "Mau y Ricky"], "correct": 0}, {"q": "¿Con qué grupo grabó LALI \"Como así\"?", "options": ["CNCO", "Reik", "Morat"], "correct": 0}, {"q": "¿En qué año salió el álbum LIBRA?", "options": ["2018", "2020", "2022"], "correct": 1}, {"q": "¿Qué tema de LALI se volvió un himno en 2022?", "options": ["Disciplina", "Boomerang", "Soy"], "correct": 0}, {"q": "¿En qué serie española de Netflix actuó LALI?", "options": ["Élite", "Sky Rojo", "La casa de papel"], "correct": 1}, {"q": "¿Qué personaje hizo LALI en Sky Rojo?", "options": ["Wendy", "Coral", "Gina"], "correct": 0}, {"q": "¿En qué telenovela de 2015 LALI fue protagonista?", "options": ["Esperanza mía", "Solamente vos", "Guapas"], "correct": 0}, {"q": "¿De qué disco es \"Mil años luz\"?", "options": ["A Bailar", "Soy", "BRAVA"], "correct": 0}, {"q": "¿Cómo se llama el álbum de LALI de 2023?", "options": ["LALI", "LIBRA", "Quiénes son"], "correct": 0}, {"q": "¿Qué single anticipó No vayas a atender cuando el demonio llama?", "options": ["Fanático", "Disciplina", "Ego"], "correct": 0}, {"q": "¿En qué programa fue coach LALI en 2021?", "options": ["La Voz Argentina", "Bailando por un sueño", "MasterChef"], "correct": 0}, {"q": "¿Cómo se les dice a los fans de LALI?", "options": ["Lalitas", "Laliers", "Espositos"], "correct": 0}, {"q": "¿Cuántos álbumes de estudio solistas sacó LALI antes de 2025?", "options": ["Cuatro", "Cinco", "Seis"], "correct": 1}], "per_round": 5}$json$::jsonb WHERE mission_id='lali-trivia';