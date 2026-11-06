import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { DROP_CATALOG } from './drops';
import { FREE_SHIPPING_FROM, SHIPPING_COST } from './cart';

// Mercado Pago Checkout Pro. Necesita el secreto MP_ACCESS_TOKEN en Cloudflare (Worker "drop").
// Sin el secreto la tienda sigue en modo demo. Los precios se toman del catálogo, nunca del navegador.
const input = z.object({
  orderId: z.string().regex(/^DRP-[A-Z0-9]{4,12}$/),
  delivery: z.enum(['envio', 'retiro']),
  origin: z.string().url(),
  lines: z.array(z.object({ dropId: z.string().max(60), itemId: z.string().max(60), qty: z.number().int().min(1).max(10) })).min(1).max(30),
});
const ALLOWED_ORIGIN = /^(https:\/\/drop\.duerluli\.workers\.dev|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?)$/;

export type CheckoutStart = { mode: 'demo' } | { mode: 'mp'; url: string };

export const startCheckout = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => input.parse(data))
  .handler(async ({ data }): Promise<CheckoutStart> => {
    const token = process.env['MP_ACCESS_TOKEN'];
    if (!token) return { mode: 'demo' };
    const origin = ALLOWED_ORIGIN.test(data.origin) ? data.origin : 'https://drop.duerluli.workers.dev';

    const items = data.lines.map((l) => {
      const drop = DROP_CATALOG.find((d) => d.id === l.dropId);
      const item = drop?.merch?.find((m) => m.id === l.itemId);
      if (!drop || !item) throw new Error('Uno de los productos ya no está disponible.');
      return { id: `${drop.id}:${item.id}`, title: `${item.name} · ${drop.artist}`, quantity: l.qty, unit_price: item.price, currency_id: 'ARS' };
    });
    const subtotal = items.reduce((n, i) => n + i.unit_price * i.quantity, 0);
    if (data.delivery === 'envio' && subtotal < FREE_SHIPPING_FROM) {
      items.push({ id: 'envio', title: 'Envío a domicilio', quantity: 1, unit_price: SHIPPING_COST, currency_id: 'ARS' });
    }

    const back = (status: string) => `${origin}/tienda?v=pedidos&pago=${status}&ref=${data.orderId}`;
    const res = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${token}`, 'x-idempotency-key': data.orderId },
      body: JSON.stringify({
        items,
        external_reference: data.orderId,
        statement_descriptor: 'DROP',
        back_urls: { success: back('ok'), pending: back('pendiente'), failure: back('error') },
        auto_return: 'approved',
      }),
    });
    if (!res.ok) throw new Error('Mercado Pago no respondió. Probá de nuevo en un rato.');
    const pref = (await res.json()) as { init_point?: string; sandbox_init_point?: string };
    const url = token.startsWith('TEST-') ? pref.sandbox_init_point ?? pref.init_point : pref.init_point;
    if (!url) throw new Error('Mercado Pago no respondió. Probá de nuevo en un rato.');
    return { mode: 'mp', url };
  });
