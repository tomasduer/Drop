-- Reseñas de canciones y shows: nuevo tipo 'song' y columna extras con los datos del show
-- (fotos chicas en data URL, lugar, fecha y la canción que suena de fondo).
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_subject_type;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_subject_type CHECK (subject_type IN ('album', 'artist', 'show', 'song'));
ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS extras jsonb NOT NULL DEFAULT '{}'::jsonb;
-- Tope de tamaño para que nadie suba fotos gigantes (4 fotos comprimidas entran de sobra).
ALTER TABLE public.reviews DROP CONSTRAINT IF EXISTS reviews_extras_size;
ALTER TABLE public.reviews ADD CONSTRAINT reviews_extras_size CHECK (pg_column_size(extras) < 2000000);
