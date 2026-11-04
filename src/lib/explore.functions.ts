import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { CommunityReview, ExploreData, ProfileExtras, SavedDrop, SavedDropStatus, ShowEvent } from './explore-data';

// Las tablas de Explorar/Mi DROP se crean al aceptar el borrador; hasta entonces
// el cliente tipado no las conoce, así que se consultan con un cliente sin tipar.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyClient = SupabaseClient<any, 'public', any>;

type MissionRow = { id: string; campaign_id: string; status: string };

// Estado de un drop guardado según la participación real del usuario.
function deriveStatus(campaignStatus: string, missions: { id: string; status: string }[], attempted: Set<string>, completed: Set<string>): SavedDropStatus {
  if (campaignStatus === 'finished') return 'finalizado';
  const playable = missions.filter((m) => m.status !== 'demo');
  if (playable.length > 0 && playable.every((m) => completed.has(m.id))) return 'completado';
  if (missions.some((m) => attempted.has(m.id) || completed.has(m.id))) return 'en_curso';
  return 'guardado';
}

export const getExploreData = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }): Promise<ExploreData> => {
  const db = context.supabase as unknown as AnyClient;
  const userId = context.userId;
  const [reviews, shows, saves, myShows] = await Promise.all([
    db.from('reviews').select('*').order('created_at', { ascending: false }).limit(30),
    db.from('shows').select('*').order('created_at', { ascending: true }),
    db.from('drop_saves').select('campaign_id').eq('user_id', userId),
    db.from('user_shows').select('show_id').eq('user_id', userId),
  ]);
  if (reviews.error || shows.error || saves.error || myShows.error) throw new Error('No pudimos cargar Explorar.');
  return {
    reviews: (reviews.data ?? []) as CommunityReview[],
    shows: (shows.data ?? []) as ShowEvent[],
    mySavedDropIds: (saves.data ?? []).map((r: { campaign_id: string }) => r.campaign_id),
    myShowIds: (myShows.data ?? []).map((r: { show_id: string }) => r.show_id),
  };
});

export const getProfileExtras = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }): Promise<ProfileExtras> => {
  const db = context.supabase as unknown as AnyClient;
  const userId = context.userId;
  const [saves, campaigns, missions, attempts, completions, reviews, myShows, shows, followers, following] = await Promise.all([
    db.from('drop_saves').select('campaign_id, created_at').eq('user_id', userId).order('created_at', { ascending: false }),
    db.from('campaigns').select('id, artist, title, status'),
    db.from('missions').select('id, campaign_id, status'),
    db.from('mission_attempts').select('mission_id').eq('user_id', userId),
    db.from('mission_completions').select('mission_id').eq('user_id', userId),
    db.from('reviews').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    db.from('user_shows').select('show_id').eq('user_id', userId),
    db.from('shows').select('*'),
    db.from('fan_follows').select('user_id', { count: 'exact', head: true }).eq('followed_id', userId),
    db.from('fan_follows').select('followed_id', { count: 'exact', head: true }).eq('user_id', userId),
  ]);
  const firstError = [saves, campaigns, missions, attempts, completions, reviews, myShows, shows, followers, following].find((r) => r.error);
  if (firstError?.error) throw new Error('No pudimos cargar tu perfil.');
  const campaignById = new Map((campaigns.data ?? []).map((c: { id: string; artist: string; title: string; status: string }) => [c.id, c]));
  const missionsByCampaign = new Map<string, { id: string; status: string }[]>();
  for (const m of (missions.data ?? []) as MissionRow[]) {
    missionsByCampaign.set(m.campaign_id, [...(missionsByCampaign.get(m.campaign_id) ?? []), m]);
  }
  const attempted = new Set((attempts.data ?? []).map((a: { mission_id: string }) => a.mission_id));
  const completed = new Set((completions.data ?? []).map((c: { mission_id: string }) => c.mission_id));
  const savedDrops: SavedDrop[] = [];
  for (const s of (saves.data ?? []) as { campaign_id: string; created_at: string }[]) {
    const campaign = campaignById.get(s.campaign_id);
    if (!campaign) continue;
    savedDrops.push({
      campaign_id: s.campaign_id,
      artist: campaign.artist,
      title: campaign.title,
      saved_at: s.created_at,
      status: deriveStatus(campaign.status, missionsByCampaign.get(s.campaign_id) ?? [], attempted, completed),
    });
  }
  const showById = new Map((shows.data ?? []).map((s: ShowEvent) => [s.id, s]));
  return {
    savedDrops,
    reviews: (reviews.data ?? []) as CommunityReview[],
    shows: (myShows.data ?? []).map((r: { show_id: string }) => showById.get(r.show_id)).filter(Boolean) as ShowEvent[],
    followers: followers.count ?? 0,
    following: following.count ?? 0,
  };
});

export const saveDropAction = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ campaign_id: z.string().min(1), save: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => {
    const db = context.supabase as unknown as AnyClient;
    const { error } = data.save
      ? await db.from('drop_saves').insert({ user_id: context.userId, campaign_id: data.campaign_id })
      : await db.from('drop_saves').delete().eq('user_id', context.userId).eq('campaign_id', data.campaign_id);
    if (error) throw new Error('No pudimos actualizar tu colección.');
    return true;
  });

const reviewInput = z.object({
  subject_type: z.enum(['album', 'artist', 'show']),
  subject_id: z.string().min(1).max(120),
  subject_title: z.string().min(1).max(160),
  subject_artist: z.string().max(160).default(''),
  subject_image: z.string().max(500).nullable().default(null),
  rating: z.number().int().min(1).max(5),
  text: z.string().max(1000).default(''),
});

export const publishReview = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => reviewInput.parse(input))
  .handler(async ({ data, context }) => {
    const db = context.supabase as unknown as AnyClient;
    const { data: profile } = await db.from('profiles').select('display_name').eq('id', context.userId).single();
    const { error } = await db.from('reviews').upsert(
      { ...data, user_id: context.userId, author_name: profile?.display_name ?? '' },
      { onConflict: 'user_id,subject_type,subject_id' },
    );
    if (error) throw new Error('No pudimos publicar tu reseña.');
    return true;
  });

export const deleteReview = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ subject_type: z.enum(['album', 'artist', 'show']), subject_id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    const db = context.supabase as unknown as AnyClient;
    const { error } = await db.from('reviews').delete().eq('user_id', context.userId).eq('subject_type', data.subject_type).eq('subject_id', data.subject_id);
    if (error) throw new Error('No pudimos eliminar tu reseña.');
    return true;
  });

export const showAttendanceAction = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ show_id: z.string().min(1), attended: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => {
    const db = context.supabase as unknown as AnyClient;
    const { error } = data.attended
      ? await db.from('user_shows').insert({ user_id: context.userId, show_id: data.show_id })
      : await db.from('user_shows').delete().eq('user_id', context.userId).eq('show_id', data.show_id);
    if (error) throw new Error('No pudimos actualizar tus shows.');
    return true;
  });
