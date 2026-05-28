
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

export async function getMultipleSets(setIds) {
  const data = await loadData();
  const result = {};
  let found = false;

  setIds.forEach(setId => {
    const pack = data.packs[setId];
    if (pack) {
      const whiteCards = (pack.white || []).map(idx => data.white[idx]);
      const blackCards = (pack.black || []).map(idx => data.black[idx]);

      result[setId] = {
        name: pack.name,
        official: pack.official,
        sheetName: pack.sheetName,
        white: whiteCards,
        black: blackCards
      };
      found = true;
    }
  });

  if (!found) {
    return { error: 'No valid packs found', statusCode: 404 };
  }

  return { data: result, statusCode: 200 };
}

