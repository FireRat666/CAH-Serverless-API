import { getSet } from '../../lib/handlers/getSet.js';

export default async function handler(req, context) {
  try {
    const { id } = context.params;
    const url = new URL(req.url);
    const nParam = url.searchParams.get('n');
    const randomCount = nParam ? parseInt(nParam) : null;

    const result = await getSet(id, randomCount);

    return new Response(JSON.stringify(result.data || result), {
      status: result.statusCode,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const config = {
  path: "/api/sets/:id"
};
