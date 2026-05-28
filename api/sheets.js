import { getSheets } from '../lib/handlers/sheets.js';

export default async function handler(req, res) {
  try {
    const sheets = await getSheets();
    res.status(200).json(sheets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
