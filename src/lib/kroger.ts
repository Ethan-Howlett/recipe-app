import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { krogerTokens } from '@/db/schema';

const KROGER_TOKEN_URL = 'https://api.kroger.com/v1/connect/oauth2/token';
const KROGER_CART_ADD_URL = 'https://api.kroger.com/v1/cart/add';

function getCredentials() {
  const clientId = process.env.KROGER_CLIENT_ID;
  const clientSecret = process.env.KROGER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('KROGER_CLIENT_ID and KROGER_CLIENT_SECRET must be set');
  }

  return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(KROGER_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${getCredentials()}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description ?? data.error ?? 'Failed to refresh Kroger token');
  }

  return {
    accessToken: data.access_token as string,
    refreshToken: (data.refresh_token as string | undefined) ?? refreshToken,
    expiresAt: new Date(Date.now() + data.expires_in * 1000),
  };
}

export async function getValidAccessToken() {
  const [token] = await db
    .select()
    .from(krogerTokens)
    .orderBy(desc(krogerTokens.id))
    .limit(1);

  if (!token) {
    throw new Error('No Kroger token found. Visit /api/auth/login to authenticate first.');
  }

  const isExpired = token.expiresAt.getTime() <= Date.now() + 60_000;

  if (!isExpired) {
    return token.accessToken;
  }

  const refreshed = await refreshAccessToken(token.refreshToken);

  await db
    .update(krogerTokens)
    .set({
      accessToken: refreshed.accessToken,
      refreshToken: refreshed.refreshToken,
      expiresAt: refreshed.expiresAt,
    })
    .where(eq(krogerTokens.id, token.id));

  return refreshed.accessToken;
}

export type CartItem = {
  upc: string;
  quantity: number;
  modality?: string;
};

export async function addItemsToCart(items: CartItem[]) {
  const accessToken = await getValidAccessToken();

  const response = await fetch(KROGER_CART_ADD_URL, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (response.status === 204) {
    return { success: true as const };
  }

  const errorBody = await response.text();
  let message = errorBody;

  try {
    const parsed = JSON.parse(errorBody) as { errors?: Array<{ description?: string }> };
    message = parsed.errors?.[0]?.description ?? errorBody;
  } catch {
    // keep raw body
  }

  throw new Error(message || `Kroger cart API returned ${response.status}`);
}
