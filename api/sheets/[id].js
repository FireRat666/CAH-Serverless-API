import { getSetsBySheet } from '../../lib/handlers/sheets.js';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const result = await getSetsBySheet(id);
    res.status(result.statusCode).json(result.data || result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
