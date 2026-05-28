import { getSets } from '../lib/handlers/sets.js';

export default async function handler(req, res) {
  try {
    const sets = await getSets();
    res.status(200).json(sets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

