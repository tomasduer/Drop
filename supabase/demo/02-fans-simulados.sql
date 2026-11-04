-- DROP demo: fans simulados, actividad, reseñas, shows, seguidores y recompensas.
-- Los fans simulados son usuarios sin contraseña (no pueden iniciar sesión) con email @fans.drop.demo.

CREATE TABLE IF NOT EXISTS public.demo_fans (
  user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity real NOT NULL
);
ALTER TABLE public.demo_fans ENABLE ROW LEVEL SECURITY;
GRANT ALL ON public.demo_fans TO service_role;

-- Completa una misión para un fan simulado en una fecha dada (mismo camino que un fan real).
CREATE OR REPLACE FUNCTION public.drop_demo_complete(p_user uuid, p_mission text, p_period text, p_general integer, p_campaign integer, p_at timestamptz)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE aid uuid;
BEGIN
  INSERT INTO public.mission_attempts(user_id,mission_id,period_key,deadline,created_at)
  VALUES (p_user,p_mission,p_period,p_at,p_at)
  ON CONFLICT (user_id,mission_id,period_key) DO NOTHING RETURNING id INTO aid;
  IF aid IS NULL THEN RETURN; END IF;
  PERFORM public.drop_complete_attempt(aid,p_general,p_campaign);
  UPDATE public.mission_completions SET created_at=p_at WHERE attempt_id=aid;
  UPDATE public.point_movements SET created_at=p_at WHERE idempotency_key='mission:'||aid::text;
END $$;
REVOKE ALL ON FUNCTION public.drop_demo_complete(uuid,text,text,integer,integer,timestamptz) FROM PUBLIC, anon, authenticated;

-- Seguidores de bienvenida para cada cuenta real nueva.
CREATE OR REPLACE FUNCTION public.drop_demo_welcome(p_user uuid)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF EXISTS (SELECT 1 FROM public.demo_fans WHERE user_id=p_user) THEN RETURN; END IF;
  INSERT INTO public.fan_follows(user_id,followed_id)
    SELECT user_id,p_user FROM public.demo_fans ORDER BY random() LIMIT (12+floor(random()*25))::int
  ON CONFLICT DO NOTHING;
  INSERT INTO public.fan_follows(user_id,followed_id)
    SELECT p_user,d.user_id FROM public.demo_fans d ORDER BY d.activity DESC, random() LIMIT 8
  ON CONFLICT DO NOTHING;
END $$;
REVOKE ALL ON FUNCTION public.drop_demo_welcome(uuid) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.drop_demo_welcome_trigger()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id=NEW.id AND email LIKE '%@fans.drop.demo') THEN
    PERFORM public.drop_demo_welcome(NEW.id);
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER profiles_demo_welcome AFTER INSERT ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.drop_demo_welcome_trigger();

-- Fans simulados
DO $$
DECLARE
  names text[] := ARRAY[
    'Sofi Martínez|sofi.lalita','Juli Pereyra|julipereyra','Cami Fernández|cami.brava','Agus Romero|agus_libra','Mica Gómez|micagomez.ok',
    'Fran Díaz|frandiaz','Valen Sosa|valen.soy','Lu Benítez|lubenitez','Nico Herrera|nicoherrera_','Belu Acosta|belu.acosta',
    'Tomi Ruiz|tomiruizz','Flor Medina|flor.medina','Martu Ríos|martu.rios','Santi Molina|santimolina','Pili Castro|pilicastro',
    'Ro Ortiz|ro.ortiz','Caro Silva|carosilva.lali','Lauti Torres|lautitorres','Ali Morales|ali.morales','Guada Suárez|guadasuarez',
    'Meli Navarro|meli.navarro','Joaco Ramos|joaco.ramos','Ine Vega|ine.vega','Brenda Luna|brenda.luna','Gonza Ibarra|gonza.ibarra',
    'Dani Paz|dani.paz','Emi Cabrera|emicabrera','Abril Godoy|abril.godoy','Ivo Peralta|ivoperalta','Lola Quiroga|lola.quiroga',
    'Maite Ledesma|maite.ledesma','Facu Aguirre|facu.aguirre','Rochi Vera|rochi.vera','Paz Domínguez|paz.dominguez','Male Figueroa|male.figueroa',
    'Cande Ojeda|cande.ojeda','Uri Moreno|uri.moreno','Juana Ponce|juanaponce','Bauti Correa|bauti.correa','Tati Rojas|tati.rojas'];
  bios text[] := ARRAY['Fan de LALI desde Casi Ángeles 💫','Voy a todos los shows que puedo','Coleccionista de vinilos','Team CABA 🔥','LALIVERSE forever',
    'Bailo A Bailar todos los días','Si suena LALI, subo el volumen','Cazadora de afiches','Trivia diaria o nada','Pop, perreo y LALI'];
  albums text[] := ARRAY['nvaa','lali','libra','brava','soy','abailar','nena','mechon'];
  once_m text[] := ARRAY['lali-discografia','lali-frase','lali-acertijo','lali-order','lali-qr','lali-ar'];
  uid uuid; dn text; un text; joined timestamptz; act real; i int; d int; k int; al text; m text; ts timestamptz; listened text[];
BEGIN
  PERFORM setseed(0.4242);
  FOR i IN 1..array_length(names,1) LOOP
    dn := split_part(names[i],'|',1); un := split_part(names[i],'|',2);
    uid := gen_random_uuid();
    act := power(random(),1.4)::real;
    joined := now() - make_interval(days => (22 + floor(random()*40))::int, hours => floor(random()*20)::int);
    INSERT INTO auth.users(instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at)
    VALUES ('00000000-0000-0000-0000-000000000000',uid,'authenticated','authenticated','fan'||i||'@fans.drop.demo','',joined,
            '{"provider":"email","providers":["email"]}'::jsonb,jsonb_build_object('display_name',dn),joined,joined);
    UPDATE public.profiles SET username=un, bio=bios[1+floor(random()*array_length(bios,1))::int], favorite_artists=ARRAY['LALI'], created_at=joined WHERE id=uid;
    INSERT INTO public.demo_fans(user_id,activity) VALUES (uid,act);

    -- Misiones de una sola vez
    FOREACH m IN ARRAY once_m LOOP
      IF random() < 0.2 + act*0.75 THEN
        ts := now() - make_interval(days => floor(random()*20)::int, hours => floor(random()*23)::int, mins => floor(random()*59)::int);
        CASE m
          WHEN 'lali-discografia' THEN k := 2+floor(random()*4)::int; PERFORM public.drop_demo_complete(uid,m,'once',100*k/5,200*k/5,ts);
          WHEN 'lali-order' THEN k := floor(random()*3)::int; PERFORM public.drop_demo_complete(uid,m,'once',200-40*k,400-40*k,ts);
          WHEN 'lali-qr' THEN PERFORM public.drop_demo_complete(uid,m,'once',500,500,ts);
          WHEN 'lali-ar' THEN PERFORM public.drop_demo_complete(uid,m,'once',350,500,ts);
          ELSE PERFORM public.drop_demo_complete(uid,m,'once',60,120,ts);
        END CASE;
      END IF;
    END LOOP;

    -- Misiones diarias de los últimos 21 días
    FOR d IN 1..21 LOOP
      ts := date_trunc('day', now() AT TIME ZONE 'America/Argentina/Buenos_Aires') - make_interval(days => d) + make_interval(hours => 9 + floor(random()*14)::int, mins => floor(random()*59)::int);
      ts := ts AT TIME ZONE 'America/Argentina/Buenos_Aires';
      IF random() < 0.08 + act*0.8 THEN
        k := 2+floor(random()*4)::int;
        PERFORM public.drop_demo_complete(uid,'lali-trivia',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,150*k/5,300*k/5,ts);
      END IF;
      IF random() < 0.05 + act*0.6 THEN
        PERFORM public.drop_demo_complete(uid,'lali-stream',(ts AT TIME ZONE 'America/Argentina/Buenos_Aires')::date::text,120,240,ts + interval '37 minutes');
      END IF;
    END LOOP;

    -- Álbumes escuchados
    listened := ARRAY[]::text[];
    FOREACH al IN ARRAY albums LOOP
      IF random() < 0.25 + act*0.6 THEN
        ts := joined + (now()-joined) * random();
        INSERT INTO public.point_movements(user_id,amount,reason,evidence_type,reference,campaign_delta,idempotency_key,created_at)
        VALUES (uid,120,'album_listened','self_reported',al,0,'demo-album:'||uid::text||':'||al,ts);
        listened := listened || al;
      END IF;
    END LOOP;
    UPDATE public.profiles SET listened_albums=listened WHERE id=uid;
  END LOOP;

  -- Seguimientos entre fans
  INSERT INTO public.fan_follows(user_id,followed_id)
  SELECT a.user_id,b.user_id FROM public.demo_fans a JOIN public.demo_fans b ON a.user_id<>b.user_id
  WHERE random() < 0.08 + b.activity*0.25
  ON CONFLICT DO NOTHING;
END $$;

-- Cuentas reales existentes: seguidores de bienvenida
SELECT public.drop_demo_welcome(p.id) FROM public.profiles p WHERE NOT EXISTS (SELECT 1 FROM public.demo_fans d WHERE d.user_id=p.id);

-- Reseñas
WITH r(album,title,artist,rating,body) AS (VALUES
 ('nvaa','No vayas a atender','LALI',5,'El mejor disco de LALI sin dudas. "Fanático" no sale de mi cabeza.'),
 ('nvaa','No vayas a atender','LALI',5,'La producción está en otro nivel. Cada tema tiene un easter egg.'),
 ('nvaa','No vayas a atender','LALI',4,'Más oscuro de lo que esperaba y me encanta. Falta un tema lento.'),
 ('nvaa','No vayas a atender','LALI',5,'Lo escuché entero tres veces el día que salió. Obra maestra.'),
 ('nvaa','No vayas a atender','LALI',5,'La estética rock le queda perfecta. Quiero verlo en vivo ya.'),
 ('nvaa','No vayas a atender','LALI',4,'Muy bueno, aunque extraño un poco el pop de antes.'),
 ('lali','LALI','LALI',5,'"Disciplina" es un himno. Este disco la consolidó.'),
 ('lali','LALI','LALI',4,'Disco redondo, ideal para la previa.'),
 ('lali','LALI','LALI',5,'"Quiénes son" me representa demasiado.'),
 ('libra','LIBRA','LALI',4,'Lo escuché en pandemia y me salvó el año.'),
 ('libra','LIBRA','LALI',5,'"Como así" con CNCO fue mi canción del verano.'),
 ('brava','BRAVA','LALI',5,'BRAVA es el disco que me hizo fan. "100 grados" forever.'),
 ('brava','BRAVA','LALI',4,'Muy bailable, se nota la evolución.'),
 ('brava','BRAVA','LALI',5,'"Una na" en el auto con amigas, no hay nada mejor.'),
 ('soy','Soy','LALI',4,'"Soy" es pura autoestima. Lo pongo cuando estoy bajón.'),
 ('soy','Soy','LALI',5,'Un clásico. "Ego" sigue sonando en todas las fiestas.'),
 ('abailar','A Bailar','LALI',5,'Nostalgia pura. El primer show al que fui.'),
 ('abailar','A Bailar','LALI',4,'Se nota que es el primero, pero tiene una energía única.'),
 ('abailar','A Bailar','LALI',5,'"Mil años luz" me hace llorar cada vez.'),
 ('nena','La Nena de Argentina','María Becerra',5,'María rompió todo con este disco. "Animal" es un temazo.'),
 ('nena','La Nena de Argentina','María Becerra',4,'Mucha variedad, del reggaetón a la balada.'),
 ('nena','La Nena de Argentina','María Becerra',5,'Lo pongo para entrenar, me da energía.'),
 ('mechon','Un mechón de pelo','TINI',4,'TINI más íntima que nunca. Me sorprendió.'),
 ('mechon','Un mechón de pelo','TINI',5,'Las letras son preciosas. Mi favorito de ella.'),
 ('lali','LALI','LALI',3,'Tiene temazos pero algunos se me hicieron parecidos.'),
 ('nvaa','No vayas a atender','LALI',5,'Encontré el stencil en Palermo después de escucharlo. Esta era es todo.'),
 ('brava','BRAVA','LALI',4,'Lo redescubrí gracias a la trivia de DROP.'),
 ('soy','Soy','LALI',5,'Cada vez que lo escucho me acuerdo de mi adolescencia.')
), numbered AS (SELECT r.*, row_number() OVER () n FROM r),
fans AS (SELECT p.id, p.display_name, row_number() OVER (ORDER BY d.activity DESC, p.id) n FROM public.demo_fans d JOIN public.profiles p ON p.id=d.user_id)
INSERT INTO public.reviews(user_id,author_name,subject_type,subject_id,subject_title,subject_artist,subject_image,rating,text,created_at)
SELECT f.id,f.display_name,'album',x.album,x.title,x.artist,NULL,x.rating,x.body,
       now() - make_interval(days => floor(random()*18)::int, hours => floor(random()*23)::int)
FROM numbered x JOIN fans f ON f.n = ((x.n*7) % 40) + 1
ON CONFLICT DO NOTHING;

-- Shows
INSERT INTO public.shows(id,title,artist,event_date,city,venue,image_url) VALUES
 ('lali-cordoba-2026','No vayas a atender Tour','LALI','2026-11-28 21:00-03','Córdoba','Quality Arena',NULL),
 ('lali-rosario-2026','No vayas a atender Tour','LALI','2026-12-05 21:00-03','Rosario','Estadio Metropolitano',NULL),
 ('lali-velez-2026','LALI en Vélez','LALI','2026-12-13 21:00-03','Buenos Aires','Estadio José Amalfitani',NULL),
 ('maria-movistar-2026','María Becerra en vivo','María Becerra','2026-12-19 21:00-03','Buenos Aires','Movistar Arena',NULL),
 ('dillom-obras-2026','Dillom en Obras','Dillom','2026-11-21 21:00-03','Buenos Aires','Estadio Obras',NULL)
ON CONFLICT (id) DO NOTHING;
UPDATE public.shows SET event_date='2026-11-20 20:30-03' WHERE id='listening-nvaa' AND event_date IS NULL;

INSERT INTO public.user_shows(user_id,show_id,created_at)
SELECT d.user_id,s.id,now() - make_interval(days => floor(random()*15)::int)
FROM public.demo_fans d CROSS JOIN public.shows s
WHERE random() < CASE WHEN s.artist='LALI' THEN 0.2 + d.activity*0.5 ELSE 0.12 END
ON CONFLICT DO NOTHING;

-- Recompensas
INSERT INTO public.reward_catalog(id,title,cost,active,available) VALUES
 ('wallpaper-nvaa','Wallpaper exclusivo de No vayas a atender',150,true,NULL),
 ('stickers-digitales','Pack de stickers digitales del drop',250,true,NULL),
 ('descuento-merch','20% off en merch oficial',350,true,300),
 ('sorteo-entradas','Participación en sorteo: 2 entradas para Vélez',450,true,150),
 ('meet-greet','Sorteo Meet & Greet con LALI',500,true,40)
ON CONFLICT (id) DO NOTHING;

-- Ranking público para invitados
CREATE OR REPLACE FUNCTION public.drop_public_ranking(p_campaign text)
RETURNS jsonb LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT jsonb_build_object('rows', coalesce(jsonb_agg(x ORDER BY x.score DESC, x.id), '[]'::jsonb), 'me', NULL)
  FROM (
    SELECT p.id, p.display_name, p.avatar_url, b.score, b.completed_missions AS missions, false AS following,
           dense_rank() OVER (ORDER BY b.score DESC) AS rank
    FROM public.campaign_balances b JOIN public.profiles p ON p.id=b.user_id
    WHERE b.campaign_id=p_campaign AND b.score>0
    ORDER BY b.score DESC, p.id LIMIT 50
  ) x;
$$;
GRANT EXECUTE ON FUNCTION public.drop_public_ranking(text) TO anon, authenticated;

-- Lectura pública de reseñas y shows (para invitados)
GRANT SELECT ON public.reviews, public.shows TO anon;
CREATE POLICY "Guests read community reviews" ON public.reviews FOR SELECT TO anon USING (true);
CREATE POLICY "Guests read shows" ON public.shows FOR SELECT TO anon USING (true);
