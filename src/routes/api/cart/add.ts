import { createFileRoute } from '@tanstack/react-router';

import { addItemsToCart, type CartItem } from '@/lib/kroger';

type CartAddRequest = {
  items?: CartItem[];
  upc?: string;
  quantity?: number;
};

function parseCartItems(body: CartAddRequest): CartItem[] {
  if (body.items?.length) {
    return body.items.map((item) => ({
      upc: item.upc,
      quantity: item.quantity,
      ...(item.modality ? { modality: item.modality } : {}),
    }));
  }

  if (body.upc) {
    return [{ upc: body.upc, quantity: body.quantity ?? 1 }];
  }

  throw new Error('Provide either "items" or "upc" in the request body');
}

export const Route = createFileRoute('/api/cart/add')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as CartAddRequest;
          const items = parseCartItems(body);

          await addItemsToCart(items);

          return Response.json({
            success: true,
            message: 'Items added to Kroger cart',
            items,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to add items to cart';

          return Response.json({ success: false, error: message }, { status: 400 });
        }
      },
    },
  },
});
