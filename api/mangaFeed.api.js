export async function getManga(offset, endpoint) {
  try {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };
    let response = await fetch(`https://api.mangadex.org/manga?${endpoint}`, {
      method: 'GET',
      headers: headersList,
    });
    const json = await response.json();

    return json.data;
  } catch (error) {
    throw new Error('Error fetching top manga');
  }
}
