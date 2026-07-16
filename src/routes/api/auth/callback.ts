import { createFileRoute } from '@tanstack/react-router';

import { db } from '@/db';
import { krogerTokens } from '@/db/schema';

export const Route = createFileRoute('/api/auth/callback')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get('code');

        const credentials = Buffer.from(
          `${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`,
        ).toString('base64');

        const tokenResponse = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${credentials}`,
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code!,
            redirect_uri: process.env.KROGER_REDIRECT_URI!,
          }),
        });

        const data = await tokenResponse.json();

        const expiresAt = new Date(Date.now() + data.expires_in * 1000);

        await db.insert(krogerTokens).values({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          expiresAt: expiresAt,
        });

        return new Response(null, {
          status: 302,
          headers: { Location: '/' },
        });
      },
    },
  },
});
