import { getMultipleSets } from '../../lib/handlers/multiSet.js';

export default async function handler(req, context) {
  try {
    const url = new URL(req.url);
    const sets = url.searchParams.get('sets');

    if (!sets) {
      return new Response(JSON.stringify({ error: 'sets query parameter required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const setIds = sets.split(',').map(s => s.trim());
    const result = await getMultipleSets(setIds);

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
  path: "/api/multi"
};
