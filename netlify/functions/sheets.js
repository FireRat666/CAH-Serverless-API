import { getSheets } from '../../lib/handlers/sheets.js';

export default async function handler(req, context) {
  try {
    const sheets = await getSheets();

    return new Response(JSON.stringify(sheets), {
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
  path: "/api/sheets"
};
