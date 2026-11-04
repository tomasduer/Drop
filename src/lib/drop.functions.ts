import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import type { AttemptResult, DropState, RankingResult } from './drop-data';

export const getDropState = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.rpc('drop_account_state');
  if (error) throw new Error('No pudimos cargar tu cuenta.');
  return data as unknown as DropState;
});
export const missionAction = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ action: z.enum(['start', 'answer', 'check']), payload: z.record(z.union([z.string(), z.number(), z.array(z.number())])) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: result, error } = await context.supabase.rpc('drop_mission_action', { p_action: data.action, p_payload: data.payload });
    if (error) throw new Error('No se pudo validar la misión. Revisá su disponibilidad o retomá tu intento.');
    return result as unknown as AttemptResult;
  });
export const pointsAction = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ action: z.enum(['album', 'redeem']), payload: z.record(z.union([z.string(), z.boolean()])) }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc('drop_points_action', { p_action: data.action, p_payload: data.payload });
    if (error) throw new Error('No pudimos registrar la operación. Verificá el saldo y la disponibilidad.');
    return true;
  });
export const getRanking = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ campaign: z.string().min(1), scope: z.enum(['Global', 'Amigos', 'Semanal']) }).parse(input))
  .handler(async ({ data, context }) => {
    const { data: result, error } = await context.supabase.rpc('drop_ranking', { p_campaign: data.campaign, p_scope: data.scope });
    if (error) throw new Error('No pudimos cargar el ranking.');
    return result as unknown as RankingResult;
  });
export const followFan = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid(), follow: z.boolean() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.rpc('drop_follow', { p_followed: data.id, p_follow: data.follow });
    if (error) throw new Error('No pudimos guardar el seguimiento.');
    return true;
  });