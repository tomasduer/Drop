-- DROP demo: varios drops a la vez.
-- LALI y Dillom activos, TINI próximamente, María Becerra finalizado (archivo con ranking final).

INSERT INTO public.campaigns(id,artist,title,status) VALUES ('tini','TINI','Nueva era','pending')
ON CONFLICT (id) DO NOTHING;
UPDATE public.campaigns SET status='active' WHERE id IN ('maria','dillom');

-- Preguntas de María: se reemplaza la de año por una más segura.
UPDATE public.mission_validation_rules SET rules='{"questions":[
 {"q":"¿Cómo se llama el drop de María Becerra en DROP?","options":["Quimera","BRAVA","Soy"],"correct":0},
 {"q":"¿De qué ciudad es María Becerra?","options":["Rosario","Quilmes","Mendoza"],"correct":1},
 {"q":"¿Cuál de estos álbumes es de María Becerra?","options":["La Nena de Argentina","LIBRA","Por cesárea"],"correct":0}]}'::jsonb
WHERE mission_id='maria-trivia';

INSERT INTO public.missions(id,campaign_id,title,kind,status,general_reward,campaign_reward,repeat_period,max_checks,question_seconds) VALUES
 ('maria-discografia','maria','Trivia: el universo de María','trivia','verified',100,200,'once',1,20),
 ('maria-frase','maria','Completá el apodo: "La Nena de…"','clue','verified',60,120,'once',3,20),
 ('dillom-discografia','dillom','Trivia: ¿cuánto sabés de Dillom?','trivia','verified',100,200,'once',1,20),
 ('dillom-frase','dillom','Completá el título: "Post…"','clue','verified',60,120,'once',3,20)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.mission_validation_rules(mission_id,rules) VALUES
 ('maria-discografia','{"questions":[
  {"q":"¿Cuál fue el primer álbum de estudio de María Becerra?","options":["Animal","Quimera","Brava"],"correct":0},
  {"q":"¿Cuál es su apodo más conocido?","options":["La Reina del Pop","La Nena de Argentina","La Diosa"],"correct":1},
  {"q":"¿De qué ciudad es María?","options":["Quilmes","Córdoba","La Plata"],"correct":0},
  {"q":"¿Cómo se llama su drop en DROP?","options":["Animal","Quimera","Fanático"],"correct":1},
  {"q":"¿Cuál de estos discos NO es de María?","options":["Animal","La Nena de Argentina","LIBRA"],"correct":2}]}'::jsonb),
 ('maria-frase','{"codes":["argentina"]}'::jsonb),
 ('dillom-discografia','{"questions":[
  {"q":"¿Cómo se llama el primer álbum de Dillom?","options":["Post mortem","Por cesárea","Animal"],"correct":0},
  {"q":"¿Cómo se llama su drop en DROP?","options":["Quimera","Por cesárea","Brava"],"correct":1},
  {"q":"¿De qué ciudad es Dillom?","options":["Buenos Aires","Rosario","Mendoza"],"correct":0},
  {"q":"¿Cuál de estos discos NO es de Dillom?","options":["Post mortem","Por cesárea","LIBRA"],"correct":2},
  {"q":"¿En qué año salió \"Por cesárea\"?","options":["2019","2021","2023"],"correct":2}]}'::jsonb),
 ('dillom-frase','{"codes":["mortem"]}'::jsonb)
ON CONFLICT (mission_id) DO NOTHING;

-- Actividad simulada: el drop de María corrió hace 22-40 días, el de Dillom en los últimos 12.
DO $$
DECLARE f record; d int; ts timestamptz; k int;
BEGIN
  PERFORM setseed(0.77);
  FOR f IN SELECT user_id, activity FROM public.demo_fans LOOP
    IF random() < 0.35 + f.activity*0.6 THEN
      FOR d IN 22..40 LOOP
        IF random() < 0.05 + f.activity*0.7 THEN
          ts := now() - make_interval(days => d, hours => floor(random()*12)::int);
          k := 1+floor(random()*3)::int;
          PERFORM public.drop_demo_complete(f.user_id,'maria-trivia',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,100*k/3,200*k/3,ts);
        END IF;
      END LOOP;
      IF random() < 0.3 + f.activity*0.6 THEN
        k := 2+floor(random()*4)::int;
        PERFORM public.drop_demo_complete(f.user_id,'maria-discografia','once',100*k/5,200*k/5,now() - make_interval(days => 23+floor(random()*16)::int));
      END IF;
      IF random() < 0.2 + f.activity*0.7 THEN
        PERFORM public.drop_demo_complete(f.user_id,'maria-frase','once',60,120,now() - make_interval(days => 23+floor(random()*16)::int));
      END IF;
    END IF;
    IF random() < 0.15 + f.activity*0.6 THEN
      FOR d IN 1..12 LOOP
        IF random() < 0.05 + f.activity*0.6 THEN
          ts := now() - make_interval(days => d, hours => floor(random()*12)::int);
          k := 1+floor(random()*3)::int;
          PERFORM public.drop_demo_complete(f.user_id,'dillom-trivia',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,100*k/3,200*k/3,ts);
        END IF;
      END LOOP;
      IF random() < 0.2 + f.activity*0.6 THEN
        k := 2+floor(random()*4)::int;
        PERFORM public.drop_demo_complete(f.user_id,'dillom-discografia','once',100*k/5,200*k/5,now() - make_interval(days => 1+floor(random()*11)::int));
      END IF;
    END IF;
  END LOOP;
END $$;

UPDATE public.campaigns SET status='closed' WHERE id='maria';

-- El catálogo de drops y misiones es público para que los invitados puedan explorarlo.
GRANT SELECT ON public.campaigns, public.missions TO anon;
CREATE POLICY "Public read campaigns" ON public.campaigns FOR SELECT TO anon USING (true);
CREATE POLICY "Public read missions" ON public.missions FOR SELECT TO anon USING (true);
