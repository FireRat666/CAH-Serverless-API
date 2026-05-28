
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

export async function getSets() {
  const data = await loadData();
  return Object.entries(data.packs).map(([id, pack]) => ({
    id,
    name: pack.name,
    official: pack.official,
    sheetName: pack.sheetName
  }));
}

