-- Drop nuevo: Dillom · La nueva violencia (activo). Por cesárea pasa al Archivo.
INSERT INTO public.campaigns(id,artist,title,status) VALUES ('dillom-lnv','Dillom','La nueva violencia','active')
ON CONFLICT (id) DO UPDATE SET status='active', title=EXCLUDED.title;

INSERT INTO public.missions(id,campaign_id,title,kind,status,general_reward,campaign_reward,repeat_period,max_checks,question_seconds) VALUES
 ('lnv-trivia','dillom-lnv','Trivia diaria de La nueva violencia','trivia','verified',100,200,'daily',1,20),
 ('lnv-universo','dillom-lnv','Trivia: el universo de Dillom','trivia','verified',100,200,'once',1,20),
 ('lnv-frase','dillom-lnv','Completá el título: "La nueva…"','clue','verified',60,120,'once',3,20)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.mission_validation_rules(mission_id,rules) VALUES
 ('lnv-trivia','{"per_round":5,"pool":[
  {"q":"¿Cómo se llama el nuevo álbum de Dillom?","options":["La nueva violencia","Por cesárea","Post mortem"],"correct":0},
  {"q":"¿Cómo se llama la gira del nuevo disco?","options":["La gira violenta","Gira cesárea","Tour mortem"],"correct":0},
  {"q":"¿Cuál fue el disco anterior a La nueva violencia?","options":["Post mortem","Por cesárea","Animal"],"correct":1},
  {"q":"¿Cuál fue el primer álbum de Dillom?","options":["Post mortem","Por cesárea","La nueva violencia"],"correct":0},
  {"q":"¿Qué color manda en la estética de La nueva violencia?","options":["Verde","Rosa","Azul"],"correct":1},
  {"q":"¿Qué aparece en la tapa de La nueva violencia?","options":["Muñecos en un living","Un auto en la ruta","Un estadio lleno"],"correct":0},
  {"q":"¿En qué sala de Mendoza toca La gira violenta?","options":["Auditorio Ángel Bustelo","Teatro Colón","Estadio Obras"],"correct":0},
  {"q":"¿En qué ciudad de México se presenta la gira?","options":["Monterrey","CDMX","Guadalajara"],"correct":1},
  {"q":"¿Qué accesorio no falta en la estética de Dillom en esta era?","options":["Gorra","Anteojos de sol","Bufanda"],"correct":1},
  {"q":"¿Qué lleva Dillom con el traje en las fotos de esta era?","options":["Corbata","Moño","Pañuelo"],"correct":0}
 ]}'::jsonb),
 ('lnv-universo','{"questions":[
  {"q":"¿Cómo se llama el drop de Dillom que está activo en DROP?","options":["Por cesárea","La nueva violencia","Quimera"],"correct":1},
  {"q":"¿Cuál de estos discos es de Dillom?","options":["Por cesárea","LIBRA","Quimera"],"correct":0},
  {"q":"¿De qué ciudad es Dillom?","options":["Buenos Aires","Rosario","Córdoba"],"correct":0},
  {"q":"¿Cuál es el orden de sus discos?","options":["Post mortem → Por cesárea → La nueva violencia","Por cesárea → Post mortem → La nueva violencia","La nueva violencia → Post mortem → Por cesárea"],"correct":0},
  {"q":"¿Cómo se llama la gira de La nueva violencia?","options":["La gira violenta","Tour rosa","Gira mortem"],"correct":0}]}'::jsonb),
 ('lnv-frase','{"codes":["violencia"]}'::jsonb)
ON CONFLICT (mission_id) DO NOTHING;

-- Actividad simulada de los últimos días para que el ranking arranque con fans.
DO $$
DECLARE f record; d int; ts timestamptz; k int;
BEGIN
  PERFORM setseed(0.53);
  FOR f IN SELECT user_id, activity FROM public.demo_fans LOOP
    IF random() < 0.25 + f.activity*0.6 THEN
      FOR d IN 1..5 LOOP
        IF random() < 0.08 + f.activity*0.6 THEN
          ts := now() - make_interval(days => d, hours => floor(random()*12)::int);
          k := 1+floor(random()*5)::int;
          PERFORM public.drop_demo_complete(f.user_id,'lnv-trivia',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,100*k/5,200*k/5,ts);
        END IF;
      END LOOP;
      IF random() < 0.25 + f.activity*0.6 THEN
        k := 2+floor(random()*4)::int;
        PERFORM public.drop_demo_complete(f.user_id,'lnv-universo','once',100*k/5,200*k/5,now() - make_interval(days => 1+floor(random()*4)::int));
      END IF;
      IF random() < 0.2 + f.activity*0.5 THEN
        PERFORM public.drop_demo_complete(f.user_id,'lnv-frase','once',60,120,now() - make_interval(days => 1+floor(random()*4)::int));
      END IF;
    END IF;
  END LOOP;
END $$;

UPDATE public.campaigns SET status='closed' WHERE id='dillom';
