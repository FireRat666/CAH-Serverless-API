import { getSet } from '../../lib/handlers/getSet.js';

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const randomCount = req.query.n ? parseInt(req.query.n) : null;

    const result = await getSet(id, randomCount);
    res.status(result.statusCode).json(result.data || result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
