import axios from 'axios';
import { MANGADEX_API } from '../constants/api';

export async function getMangaFeed(limit = 10) {
  try {
    const response = await axios.get(MANGADEX_API + '/manga', {
      params: {
        limit: limit,
        includes: ['cover_art'],
        hasAvailableChapters: true,
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching manga feed');
  }
}
