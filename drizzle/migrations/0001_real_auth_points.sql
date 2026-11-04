CREATE TABLE public.point_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount integer NOT NULL CHECK (amount BETWEEN -500 AND 500 AND amount <> 0),
  reason text NOT NULL CHECK (reason IN ('album_listened','album_unlistened','ranking_redeem')),
  artist text,
  reference text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.point_movements TO authenticated;
GRANT ALL ON public.point_movements TO service_role;
ALTER TABLE public.point_movements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own movements" ON public.point_movements FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Insert own movements" ON public.point_movements FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE INDEX point_movements_user_idx ON public.point_movements(user_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.apply_point_movement() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE bal integer;
BEGIN
  SELECT general_points INTO bal FROM profiles WHERE id = NEW.user_id FOR UPDATE;
  IF bal IS NULL THEN RAISE EXCEPTION 'profile missing'; END IF;
  IF NEW.reason = 'ranking_redeem' THEN
    IF NEW.amount >= 0 OR NEW.artist IS NULL THEN RAISE EXCEPTION 'invalid redeem'; END IF;
    IF bal + NEW.amount < 0 THEN RAISE EXCEPTION 'insufficient points'; END IF;
    UPDATE profiles SET general_points = general_points + NEW.amount,
      ranking_points = jsonb_set(ranking_points, ARRAY[NEW.artist], to_jsonb(COALESCE((ranking_points->>NEW.artist)::int,0) - NEW.amount))
      WHERE id = NEW.user_id;
  ELSE
    IF (NEW.reason = 'album_listened' AND NEW.amount <> 120) OR (NEW.reason = 'album_unlistened' AND NEW.amount <> -120) THEN RAISE EXCEPTION 'invalid album amount'; END IF;
    UPDATE profiles SET general_points = GREATEST(0, general_points + NEW.amount) WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER point_movements_apply AFTER INSERT ON public.point_movements FOR EACH ROW EXECUTE FUNCTION public.apply_point_movement();

REVOKE UPDATE ON public.profiles FROM authenticated;
GRANT UPDATE (display_name, avatar_url, favorite_artists, listened_albums, active_drop) ON public.profiles TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (NEW.id, COALESCE(NULLIF(NEW.raw_user_meta_data->>'display_name',''), NEW.raw_user_meta_data->>'full_name', split_part(NEW.email,'@',1), 'Fan DROP'), NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();