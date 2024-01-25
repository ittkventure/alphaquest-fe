export async function fetchGemCounts() {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/twitter/gem-count?newest=true`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as Promise<number>;
}

export async function fetchNarratives() {
  const res = await fetch(
    `https://api.alphaquest.io/api/app/narrative?pageNumber=1&pageSize=6&timeframe=today-12-m&keyword=`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
