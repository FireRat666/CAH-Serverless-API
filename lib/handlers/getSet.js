
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

export async function getSet(id, randomCount = null) {
  const data = await loadData();
  const pack = data.packs[id];

  if (!pack) {
    return { error: 'Pack not found', statusCode: 404 };
  }

  if (randomCount) {
    const whiteIndices = pack.white || [];
    const selectedIndices = shuffleAndPick(whiteIndices, randomCount);
    const randomCards = selectedIndices.map(idx => data.white[idx]);
    return { data: randomCards, statusCode: 200 };
  }

  const whiteCards = (pack.white || []).map(idx => data.white[idx]);
  const blackCards = (pack.black || []).map(idx => data.black[idx]);

  return {
    data: {
      name: pack.name,
      official: pack.official,
      sheetName: pack.sheetName,
      white: whiteCards,
      black: blackCards
    },
    statusCode: 200
  };
}

function shuffleAndPick(array, count) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
}

