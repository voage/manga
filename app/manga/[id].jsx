import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { getMangaDetails, getMangaStatistics } from '../../api/manga.api';
import MangaHeader from './components/MangaHeader';
import MangaChapters from './components/MangaChatpers';
import { getMangaChapters } from '../../api/mangaChapters.api';

const MangaTab = () => {
  const { id } = useLocalSearchParams();

  const [mangaDetails, setMangaDetails] = useState(null);
  const [mangaStatistics, setMangaStatistics] = useState(null);
  const [mangaChapters, setMangaChapters] = useState(null);

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const [mangaDetailsResponse, mangaStatisticsResponse, mangaChaptersResponse] =
          await Promise.all([getMangaDetails(id), getMangaStatistics(id), getMangaChapters(id)]);

        setMangaDetails(mangaDetailsResponse);
        setMangaStatistics(mangaStatisticsResponse);
        setMangaChapters(mangaChaptersResponse);
      } catch (error) {
        Alert.alert('Error fetching manga data', error.message);
      }
    };

    fetchMangaData();
  }, [id]);

  return (
    <ScrollView style={{ backgroundColor: '#1c1c1c' }}>
      <View>
        <Stack.Screen
          options={{
            headerTitle: `Manga Tab for ${id}`,
          }}
        />

        {mangaDetails && <MangaHeader manga={mangaDetails} stats={mangaStatistics?.[id]} />}

        {mangaChapters && <MangaChapters chapters={mangaChapters} />}
      </View>
    </ScrollView>
  );
};

export default MangaTab;
