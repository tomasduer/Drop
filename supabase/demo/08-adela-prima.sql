-- Drop nuevo (tipo show): Adela presenta PRIMA en un sideshow de Lollapalooza en el Teatro Vorterix.
INSERT INTO public.campaigns(id,artist,title,status) VALUES ('adela-prima','Adela','PRIMA en el Teatro Vorterix','active')
ON CONFLICT (id) DO UPDATE SET status='active', title=EXCLUDED.title;

INSERT INTO public.missions(id,campaign_id,title,kind,status,general_reward,campaign_reward,repeat_period,max_checks,question_seconds) VALUES
 ('adela-trivia','adela-prima','Trivia diaria de PRIMA','trivia','verified',100,200,'daily',1,20),
 ('adela-previa','adela-prima','Trivia: la previa del sideshow','trivia','verified',100,200,'once',1,20),
 ('adela-frase','adela-prima','Completá: "Sideshow de Lolla en el Teatro…"','clue','verified',60,120,'once',3,20)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.mission_validation_rules(mission_id,rules) VALUES
 ('adela-trivia','{"per_round":5,"pool":[
  {"q":"¿Cómo se llama el nuevo álbum de Adela?","options":["PRIMA","Quimera","Brava"],"correct":0},
  {"q":"¿En qué teatro presenta PRIMA?","options":["Teatro Gran Rex","Teatro Vorterix","Teatro Colón"],"correct":1},
  {"q":"¿De qué festival es este sideshow?","options":["Lollapalooza","Cosquín Rock","Primavera Sound"],"correct":0},
  {"q":"¿De qué color es el pelo de Adela en la era PRIMA?","options":["Fucsia","Azul","Rubio platino"],"correct":0},
  {"q":"¿Qué forma tiene el glitter de su maquillaje?","options":["Un corazón","Una estrella","Un rayo"],"correct":1},
  {"q":"¿Qué palabra está escrita en el auto rosa de la sesión de fotos?","options":["ADELA","PRIMA","LOLLA"],"correct":1},
  {"q":"¿Cómo aparece escrito PRIMA en la tapa del disco?","options":["En marcador negro, a mano","En letras doradas","En neón rosa"],"correct":0},
  {"q":"¿De qué color es el auto de la sesión de PRIMA?","options":["Negro","Rosa","Blanco"],"correct":1}
 ]}'::jsonb),
 ('adela-previa','{"questions":[
  {"q":"¿Qué tipo de drop es el de Adela en DROP?","options":["Nuevo single","Show","Novedad"],"correct":1},
  {"q":"¿Qué presenta Adela en el Teatro Vorterix?","options":["Su nuevo álbum PRIMA","Un single","Un documental"],"correct":0},
  {"q":"¿Cómo se llama un show extra de un artista del festival fuera del predio?","options":["Sideshow","Backstage","Soundcheck"],"correct":0},
  {"q":"¿Cómo se llama el fandom del drop de Adela?","options":["Primas","Adeladores","Fucsias"],"correct":0},
  {"q":"¿Dónde tiene glitter Adela en la tapa de PRIMA?","options":["El pelo y la cara","Las manos","Nada, no hay glitter"],"correct":0}]}'::jsonb),
 ('adela-frase','{"codes":["vorterix"]}'::jsonb)
ON CONFLICT (mission_id) DO NOTHING;

DO $$
DECLARE f record; d int; ts timestamptz; k int;
BEGIN
  PERFORM setseed(0.67);
  FOR f IN SELECT user_id, activity FROM public.demo_fans LOOP
    IF random() < 0.2 + f.activity*0.6 THEN
      FOR d IN 1..4 LOOP
        IF random() < 0.08 + f.activity*0.6 THEN
          ts := now() - make_interval(days => d, hours => floor(random()*12)::int);
          k := 1+floor(random()*5)::int;
          PERFORM public.drop_demo_complete(f.user_id,'adela-trivia',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,100*k/5,200*k/5,ts);
        END IF;
      END LOOP;
      IF random() < 0.25 + f.activity*0.6 THEN
        k := 2+floor(random()*4)::int;
        PERFORM public.drop_demo_complete(f.user_id,'adela-previa','once',100*k/5,200*k/5,now() - make_interval(days => 1+floor(random()*3)::int));
      END IF;
      IF random() < 0.2 + f.activity*0.5 THEN
        PERFORM public.drop_demo_complete(f.user_id,'adela-frase','once',60,120,now() - make_interval(days => 1+floor(random()*3)::int));
      END IF;
    END IF;
  END LOOP;
END $$;
