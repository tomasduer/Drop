-- Drop nuevo: Airbag · El Club de la Pelea I (activo).
INSERT INTO public.campaigns(id,artist,title,status) VALUES ('airbag','Airbag','El Club de la Pelea I','active')
ON CONFLICT (id) DO UPDATE SET status='active', title=EXCLUDED.title;

INSERT INTO public.missions(id,campaign_id,title,kind,status,general_reward,campaign_reward,repeat_period,max_checks,question_seconds) VALUES
 ('airbag-trivia','airbag','Trivia diaria de El Club de la Pelea','trivia','verified',100,200,'daily',1,20),
 ('airbag-discografia','airbag','Trivia: ¿cuánto sabés del disco?','trivia','verified',100,200,'once',1,20),
 ('airbag-frase','airbag','Completá el tema: "Anarquía en Buenos…"','clue','verified',60,120,'once',3,20)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.mission_validation_rules(mission_id,rules) VALUES
 ('airbag-trivia','{"per_round":5,"pool":[
  {"q":"¿Cuál es el primer tema de El Club de la Pelea I?","options":["Verte de cerca","No confíes en tu suerte","Corazón lunático"],"correct":1},
  {"q":"¿Cuántos temas tiene El Club de la Pelea I?","options":["7","10","12"],"correct":0},
  {"q":"¿Con qué tema cierra el disco?","options":["Verte de cerca","Nunca lo olvides","Extrañas intenciones"],"correct":0},
  {"q":"Completá: \"Anarquía en…\"","options":["Rosario","Buenos Aires","la ciudad"],"correct":1},
  {"q":"Completá: \"Corazón…\"","options":["Lunático","Salvaje","Delator"],"correct":0},
  {"q":"Completá: \"Extrañas…\"","options":["Noches","Intenciones","Razones"],"correct":1},
  {"q":"¿Cuál es el tema 2 del disco?","options":["Por eso nadie recordará tu nombre","Nunca lo olvides","Anarquía en Buenos Aires"],"correct":0},
  {"q":"¿Qué número de tema es \"Nunca lo olvides\"?","options":["3","5","7"],"correct":1},
  {"q":"¿Cuál de estos temas NO está en El Club de la Pelea I?","options":["Corazón lunático","Por mil noches","Extrañas intenciones"],"correct":1},
  {"q":"¿En qué género aparece Airbag en Explorar?","options":["Rock","Indie","Pop punk"],"correct":0},
  {"q":"¿Qué número de tema es \"Anarquía en Buenos Aires\"?","options":["2","4","6"],"correct":2},
  {"q":"¿Qué tema viene justo después de \"Extrañas intenciones\"?","options":["Corazón lunático","Verte de cerca","No confíes en tu suerte"],"correct":0}
 ]}'::jsonb),
 ('airbag-discografia','{"questions":[
  {"q":"¿Cómo se llama el drop de Airbag en DROP?","options":["Por cesárea","El Club de la Pelea I","Quimera"],"correct":1},
  {"q":"¿Cuál de estos temas es de Airbag?","options":["Por mil noches","Fanático","Ojitos lindos"],"correct":0},
  {"q":"¿Qué tienen en común los integrantes de Airbag?","options":["Son hermanos","Son primos","Son de Córdoba"],"correct":0},
  {"q":"¿Cuántos temas tiene El Club de la Pelea I?","options":["5","7","11"],"correct":1},
  {"q":"¿Con qué tema abre el disco?","options":["No confíes en tu suerte","Verte de cerca","Corazón lunático"],"correct":0}]}'::jsonb),
 ('airbag-frase','{"codes":["aires"]}'::jsonb)
ON CONFLICT (mission_id) DO NOTHING;

-- Actividad simulada de la última semana para que el ranking arranque con fans.
DO $$
DECLARE f record; d int; ts timestamptz; k int;
BEGIN
  PERFORM setseed(0.31);
  FOR f IN SELECT user_id, activity FROM public.demo_fans LOOP
    IF random() < 0.15 + f.activity*0.6 THEN
      FOR d IN 1..7 LOOP
        IF random() < 0.05 + f.activity*0.6 THEN
          ts := now() - make_interval(days => d, hours => floor(random()*12)::int);
          k := 1+floor(random()*5)::int;
          PERFORM public.drop_demo_complete(f.user_id,'airbag-trivia',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,100*k/5,200*k/5,ts);
        END IF;
      END LOOP;
      IF random() < 0.2 + f.activity*0.6 THEN
        k := 2+floor(random()*4)::int;
        PERFORM public.drop_demo_complete(f.user_id,'airbag-discografia','once',100*k/5,200*k/5,now() - make_interval(days => 1+floor(random()*6)::int));
      END IF;
      IF random() < 0.15 + f.activity*0.5 THEN
        PERFORM public.drop_demo_complete(f.user_id,'airbag-frase','once',60,120,now() - make_interval(days => 1+floor(random()*6)::int));
      END IF;
    END IF;
  END LOOP;
END $$;
