import { getSets } from '../../lib/handlers/sets.js';

export default async function handler(req, context) {
  try {
    const sets = await getSets();

    return new Response(JSON.stringify(sets), {
      status: 200,
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
  path: "/api/sets"
};
