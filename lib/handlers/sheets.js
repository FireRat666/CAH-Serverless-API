let cachedData = null;

async function loadData() {
  if (cachedData) return cachedData;

  const jsonUrl = process.env.CAH_JSON_URL || 'https://raw.githubusercontent.com/FireRat666/json-against-humanity/latest/cah-all-compact.json';

  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
    cachedData = await response.json();
    return cachedData;
  } catch (error) {
    console.error('Failed to load CAH data:', error);
    throw new Error('Unable to load card data');
  }
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export async function getSheets() {
  const data = await loadData();
  const sheetsMap = new Map();

  Object.values(data.packs).forEach(pack => {
    const name = pack.sheetName || 'Other';
    const id = slugify(name);
    if (!sheetsMap.has(id)) {
      sheetsMap.set(id, { id, name });
    }
  });

  return Array.from(sheetsMap.values());
}

export async function getSetsBySheet(sheetId) {
  const data = await loadData();
  const sets = [];

  Object.entries(data.packs).forEach(([id, pack]) => {
    const name = pack.sheetName || 'Other';
    const currentSheetId = slugify(name);
    
    if (currentSheetId === sheetId) {
      sets.push({
        id,
        name: pack.name,
        official: pack.official,
        sheetName: name
      });
    }
  });

  if (sets.length === 0) {
    return { error: `Sheet with ID "${sheetId}" not found`, statusCode: 404 };
  }

  return { data: sets, statusCode: 200 };
}
