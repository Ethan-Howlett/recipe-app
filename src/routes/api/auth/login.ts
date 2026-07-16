import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/auth/login')({
  server: {
    handlers: {
      GET: () => {
        const clientId = process.env.KROGER_CLIENT_ID;
        const redirectUri = process.env.KROGER_REDIRECT_URI;

        const url = new URL('https://api.kroger.com/v1/connect/oauth2/authorize');
        url.searchParams.set('client_id', clientId!);
        url.searchParams.set('response_type', 'code');
        url.searchParams.set('redirect_uri', redirectUri!);
        url.searchParams.set('scope', 'cart.basic:write');

        return new Response(null, {
          status: 302,
          headers: { Location: url.toString() },
        });
      },
    },
  },
});
