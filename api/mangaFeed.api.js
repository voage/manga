async function getMangaFeed(offset = 0, limit = 10) {
  try {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let response = await fetch(
      `https://api.mangadex.org/manga?includes[]=cover_art&hasAvailableChapters=true&offset=${offset}`,
      {
        method: 'GET',
        headers: headersList,
      }
    );

    const json = await response.json();

    return json.data;
  } catch (error) {
    throw new Error('Error fetching manga feed');
  }
}

async function getTopRatedManga(offset = 0, limit = 10) {
  try {
    const order = {
      rating: 'desc',
      followedCount: 'desc',
    };

    const finalOrderQuery = {};

    // Transform the order object into query parameters
    for (const [key, value] of Object.entries(order)) {
      finalOrderQuery[`order[${key}]`] = value;
    }

    // Fetch manga data
    const resp = await fetch({
      method: 'GET',
      url: `https://api.mangadex.org/manga?includes[]=cover_art&hasAvailableChapters=true&offset=${offset}`,
      params: {
        includedTags: includedTagIDs,
        excludedTags: excludedTagIDs,
        ...finalOrderQuery,
        offset,
        limit,
      },
      headers: headersList,
    });

    if (!resp.data || !resp.data.data) {
      throw new Error('Invalid response from the server');
    }
    console.log(resp.data.data.map((manga) => manga.id));
    return resp.data.data;
  } catch (error) {
    throw new Error('Error fetching top rated manga');
  }
}

module.exports = {
  getMangaFeed,
  getTopRatedManga,
};
