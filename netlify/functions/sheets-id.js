import { getSetsBySheet } from '../../lib/handlers/sheets.js';

export default async function handler(req, context) {
  try {
    const { id } = context.params;
    const result = await getSetsBySheet(id);

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
  path: "/api/sheets/:id"
};
