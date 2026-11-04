-- Posteos, likes y comentarios de fans simulados (cuentas demo reales, se pueden seguir).
DO $$
DECLARE
  fans uuid[] := ARRAY(SELECT user_id FROM public.demo_fans ORDER BY activity DESC LIMIT 12);
  posts jsonb := '[
    ["lali","Ya escaneé el QR de Palermo, alguien más? 📞",3],
    ["lali","La trivia de hoy estaba difícil, saqué 4 de 5",30],
    ["dillom-lnv","La nueva violencia es el mejor disco de Dillom, no hay discusión",5],
    ["dillom-lnv","¿Alguien va a la fecha de Mendoza? Busco grupo",50],
    ["airbag","Anarquía en Buenos Aires en loop desde que salió 🤘",8],
    ["airbag","El acertijo me costó, pero lo saqué",70]
  ]'::jsonb;
  comments text[] := ARRAY['Totalmente 🙌','Yo también!!','Nos vemos ahí','Tal cual','Qué buenooo','Me pasó lo mismo jaja'];
  p jsonb; pid uuid; i int := 0; k int;
BEGIN
  IF array_length(fans,1) IS NULL THEN RETURN; END IF;
  FOR p IN SELECT * FROM jsonb_array_elements(posts) LOOP
    i := i + 1;
    INSERT INTO public.community_posts(campaign_id,user_id,text,created_at)
    VALUES (p->>0, fans[1 + (i % array_length(fans,1))], p->>1, now() - make_interval(mins => (p->>2)::int))
    RETURNING id INTO pid;
    FOR k IN 1..(3 + i % 5) LOOP
      INSERT INTO public.post_likes(post_key,user_id) VALUES ('p:'||pid, fans[1 + ((i + k) % array_length(fans,1))]) ON CONFLICT DO NOTHING;
    END LOOP;
    FOR k IN 1..(1 + i % 2) LOOP
      INSERT INTO public.post_comments(post_key,user_id,text,created_at)
      VALUES ('p:'||pid, fans[1 + ((i + k + 3) % array_length(fans,1))], comments[1 + ((i + k) % 6)], now() - make_interval(mins => (p->>2)::int - k));
    END LOOP;
  END LOOP;
END $$;
