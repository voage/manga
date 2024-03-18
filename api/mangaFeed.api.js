export async function getMangaFeed(limit = 10) {
  try {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let response = await fetch(
      'https://api.mangadex.org/manga?includes[]=cover_art&hasAvailableChapters=true',
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
