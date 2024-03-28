export const searchManga = async (queryTitle) => {
  try {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let response = await fetch(
      'https://api.mangadex.org/manga/?includes[]=cover_art&title=' + queryTitle,
      {
        method: 'GET',
        headers: headersList,
      }
    );

    const json = await response.json();
    return json.data;
  } catch (error) {
    throw error;
  }
};
