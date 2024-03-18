export async function getMangaDetails(id) {
  try {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let response = await fetch(
      'https://api.mangadex.org/manga/' + id + '/?includes[]=author&includes[]=cover_art',
      {
        method: 'GET',
        headers: headersList,
      }
    );

    const json = await response.json();

    return json.data;
  } catch (error) {
    throw new Error('Error fetching manga details');
  }
}

export async function getMangaStatistics(id) {
  try {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let response = await fetch('https://api.mangadex.org/statistics/manga/' + id, {
      method: 'GET',
      headers: headersList,
    });

    const json = await response.json();

    return json.statistics;
  } catch (error) {
    throw new Error('Error fetching manga statistics');
  }
}
