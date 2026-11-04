CREATE TABLE public.profiles (
 id uuid PRIMARY KEY,
 display_name text NOT NULL DEFAULT '',
 avatar_url text,
 favorite_artists text[] NOT NULL DEFAULT '{}',
 listened_albums text[] NOT NULL DEFAULT '{}',
 general_points integer NOT NULL DEFAULT 0,
 active_drop text NOT NULL DEFAULT 'lali',
 ranking_points jsonb NOT NULL DEFAULT '{}',
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);