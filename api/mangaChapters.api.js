export const getMangaChapters = async (mangaId) => {
  try {
    let headersList = {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
    };

    let response = await fetch(`https://api.mangadex.org/manga/${mangaId}/feed`, {
      method: 'GET',
      headers: headersList,
    });

    const json = await response.json();

    const sortedChapters = groupAndSortChaptersByVolume(json.data);
    return sortedChapters;
  } catch (error) {
    throw new Error('Error fetching manga chapters');
  }
};

const groupAndSortChaptersByVolume = (chapters) => {
  const groupedByVolume = {};

  chapters.forEach((chapter) => {
    const volume = chapter.attributes.volume || 'unknown';
    if (!groupedByVolume[volume]) {
      groupedByVolume[volume] = [];
    }
    groupedByVolume[volume].push(chapter);
  });

  for (const volume in groupedByVolume) {
    groupedByVolume[volume].sort((a, b) => {
      const chapterA = a.attributes.chapter ? parseInt(a.attributes.chapter, 10) : 0;
      const chapterB = b.attributes.chapter ? parseInt(b.attributes.chapter, 10) : 0;
      return chapterA - chapterB;
    });
  }

  const sortedVolumes = Object.keys(groupedByVolume).sort((a, b) => {
    if (a === 'unknown') return 1;
    if (b === 'unknown') return -1;
    return parseInt(a, 10) - parseInt(b, 10);
  });

  const sortedGroupedByVolume = {};
  sortedVolumes.forEach((volume) => {
    sortedGroupedByVolume[volume] = groupedByVolume[volume];
  });

  return sortedGroupedByVolume;
};
