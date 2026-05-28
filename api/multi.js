import { getMultipleSets } from '../lib/handlers/multiSet.js';

export default async function handler(req, res) {
  try {
    const { sets } = req.query;

    if (!sets) {
      return res.status(400).json({ error: 'sets query parameter required' });
    }

    const setIds = sets.split(',').map(s => s.trim());
    const result = await getMultipleSets(setIds);

    res.status(result.statusCode).json(result.data || result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
