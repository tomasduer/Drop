-- Drop nuevo (tipo show): Ricardo Arjona · Seco Tour, 12 fechas en el Movistar Arena.
-- Premios: top 60 del ranking ganan dos entradas; top 10, además, un meet & greet.
INSERT INTO public.campaigns(id,artist,title,status) VALUES ('arjona-seco','Ricardo Arjona','Seco Tour en el Movistar Arena','active')
ON CONFLICT (id) DO UPDATE SET status='active', title=EXCLUDED.title, artist=EXCLUDED.artist;

INSERT INTO public.missions(id,campaign_id,title,kind,status,general_reward,campaign_reward,repeat_period,max_checks,question_seconds) VALUES
 ('arjona-trivia','arjona-seco','Trivia diaria de Arjona','trivia','verified',100,200,'daily',1,20),
 ('arjona-tour','arjona-seco','Trivia: todo sobre el Seco Tour','trivia','verified',100,200,'once',1,20),
 ('arjona-frase','arjona-seco','Completá: "Lo que el ___ no dijo"','clue','verified',60,120,'once',3,20)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.mission_validation_rules(mission_id,rules) VALUES
 ('arjona-trivia','{"per_round":5,"pool":[
  {"q":"¿De qué país es Ricardo Arjona?","options":["México","Guatemala","Panamá"],"correct":1},
  {"q":"¿Qué canción de Arjona cuenta la historia de un taxista?","options":["Historia de taxi","El problema","Mujeres"],"correct":0},
  {"q":"¿Qué deporte jugó Arjona en la selección de su país?","options":["Fútbol","Tenis","Básquet"],"correct":2},
  {"q":"¿Cómo se llaman los dos discos que sacó en 2021?","options":["Adentro y Afuera","Blanco y Negro","Sol y Luna"],"correct":1},
  {"q":"¿Qué foto hay en la tapa de Seco?","options":["Él de chico junto a un río","Un auto rojo en la ruta","Un escenario vacío"],"correct":0},
  {"q":"¿De qué color está escrito SECO en la tapa?","options":["Dorado","Blanco","Rojo"],"correct":2},
  {"q":"Completá la canción: \"Señora de las cuatro…\"","options":["Estaciones","Décadas","Esquinas"],"correct":1},
  {"q":"¿Cómo se llama el disco que acompaña a Seco?","options":["Lo que el Seco no dijo","Seco en vivo","Seco: lado B"],"correct":0},
  {"q":"¿Qué aparece de fondo en las fotos de la era Seco?","options":["Partituras","Letras escritas a mano, como cartas","Un mapa"],"correct":1}
 ]}'::jsonb),
 ('arjona-tour','{"questions":[
  {"q":"¿Cuántas fechas hace Arjona en el Movistar Arena?","options":["6","12","20"],"correct":1},
  {"q":"¿Cómo se llama la gira?","options":["Seco Tour","Circo Soledad Tour","Blanco y Negro Tour"],"correct":0},
  {"q":"¿Qué ganan los primeros 60 del ranking de este drop?","options":["Un vinilo firmado","Dos entradas","Una remera"],"correct":1},
  {"q":"¿Y qué se suma para los primeros 10?","options":["Un meet & greet con Arjona","Una guitarra","Un viaje a Guatemala"],"correct":0},
  {"q":"¿Cómo se llama el fandom de este drop?","options":["Arjonistas","Secos","Trovadores"],"correct":0}]}'::jsonb),
 ('arjona-frase','{"codes":["seco"]}'::jsonb)
ON CONFLICT (mission_id) DO NOTHING;

-- Actividad de los fans de ejemplo para que el ranking arranque con movimiento.
DO $$
DECLARE f record; d int; ts timestamptz; k int;
BEGIN
  PERFORM setseed(0.71);
  FOR f IN SELECT user_id, activity FROM public.demo_fans LOOP
    IF random() < 0.25 + f.activity*0.6 THEN
      FOR d IN 1..5 LOOP
        IF random() < 0.1 + f.activity*0.6 THEN
          ts := now() - make_interval(days => d, hours => floor(random()*12)::int);
          k := 1+floor(random()*5)::int;
          PERFORM public.drop_demo_complete(f.user_id,'arjona-trivia',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,100*k/5,200*k/5,ts);
        END IF;
      END LOOP;
      IF random() < 0.3 + f.activity*0.6 THEN
        k := 2+floor(random()*4)::int;
        PERFORM public.drop_demo_complete(f.user_id,'arjona-tour','once',100*k/5,200*k/5,now() - make_interval(days => 1+floor(random()*4)::int));
      END IF;
      IF random() < 0.25 + f.activity*0.5 THEN
        PERFORM public.drop_demo_complete(f.user_id,'arjona-frase','once',60,120,now() - make_interval(days => 1+floor(random()*4)::int));
      END IF;
    END IF;
  END LOOP;
END $$;
